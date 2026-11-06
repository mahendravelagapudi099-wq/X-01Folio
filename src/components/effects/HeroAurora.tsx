/**
 * HeroAurora — zero-dependency GPU-accelerated background effect.
 * Two slow-rotating radial cones + film grain noise overlay.
 * Pure CSS animation, no JS animation loop, respects prefers-reduced-motion.
 */
export function HeroAurora() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Noise grain texture — SVG filter approach, no external image */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035] mix-blend-screen" xmlns="http://www.w3.org/2000/svg">
        <filter id="noise-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-filter)" />
      </svg>

      {/* Aurora cone 1 — left warm */}
      <div
        className="aurora-cone-1 absolute -top-32 -left-48 w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.055) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Aurora cone 2 — right, offset phase */}
      <div
        className="aurora-cone-2 absolute -top-16 right-0 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(180,180,255,0.04) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Subtle horizontal light seam */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.12) 70%, transparent 100%)',
        }}
      />
    </div>
  );
}
