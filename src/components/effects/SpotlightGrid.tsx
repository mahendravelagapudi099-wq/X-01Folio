import React, { useEffect, useRef, useState } from 'react';

interface SpotlightGridProps {
  className?: string;
}

/**
 * Interactive Cursor Spotlight & Dot Matrix Canvas
 * Aceternity / Magic UI aesthetic:
 * Renders a subtle dark dot grid with a silky radial light gradient mask tracking the mouse.
 */
export const SpotlightGrid: React.FC<SpotlightGridProps> = ({
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseenter', () => setIsHovered(true));
      container.addEventListener('mouseleave', () => setIsHovered(false));
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Base static dot pattern */}
      <div 
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Dynamic interactive spotlight mask tracking cursor */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.35 : 0.15,
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage: `radial-gradient(350px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(350px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
        }}
      />
    </div>
  );
};

export default SpotlightGrid;

