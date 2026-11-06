import React, { useRef, useEffect, useState } from 'react';

interface TaglineRevealProps {
  phrase?: string;
  subtext?: string;
}

/**
 * Mandatory Tagline Reveal Section per rule B11 of elayadesign/ai-design-skills.
 * Words start in muted tone (25-35% opacity) and transition individually
 * to full color in reading order on scroll using the base curve.
 */
export const TaglineReveal: React.FC<TaglineRevealProps> = ({
  phrase = "Empirical verification eliminates generative ambiguity. Software quality is proven by invariant benchmarks, not declarative claims.",
  subtext = "Bridging formal static analysis and runtime data validation for resilient autonomous systems.",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check user accessibility preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start activating when top enters 80% of viewport, finish by 30%
      const start = windowHeight * 0.8;
      const end = windowHeight * 0.3;
      const total = start - end;
      const current = start - rect.top;

      const progress = Math.min(Math.max(current / total, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  const words = phrase.split(' ');

  return (
    <section
      ref={containerRef}
      className="py-24 sm:py-32 px-6 max-w-5xl mx-auto border-b border-[#272727] select-none"
      aria-label="Core Philosophy"
    >
      <div className="max-w-[680px] mx-auto text-center flex flex-col gap-6">
        <span className="text-xs font-mono text-[#9B9B9B] uppercase tracking-widest">
          The Architectural Thesis
        </span>

        <h2 className="text-2xl sm:text-4xl font-display font-normal tracking-tight leading-snug">
          {words.map((word, index) => {
            if (prefersReducedMotion) {
              return (
                <span key={index} className="text-[#FFFFFF] inline-block mr-2.5">
                  {word}
                </span>
              );
            }

            // Stagger activation across words based on scrollProgress
            const threshold = index / words.length;
            const isRevealed = scrollProgress >= threshold;

            return (
              <span
                key={index}
                className={`inline-block mr-2.5 transition-colors duration-500 ease-base ${
                  isRevealed ? 'text-[#FFFFFF]' : 'text-[#FFFFFF]/30'
                }`}
              >
                {word}
              </span>
            );
          })}
        </h2>

        {subtext && (
          <p className="text-base text-[#9B9B9B] font-sans leading-relaxed max-w-lg mx-auto">
            {subtext}
          </p>
        )}
      </div>
    </section>
  );
};

export default TaglineReveal;

