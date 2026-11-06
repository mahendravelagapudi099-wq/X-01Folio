import React from 'react';

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

/**
 * High-Craft Traveling Border Beam Effect (Aceternity / Magic UI aesthetic)
 * Pure CSS/SVG hardware-accelerated beam that loops smoothly along card perimeters.
 */
export const BorderBeam: React.FC<BorderBeamProps> = ({
  className = '',
  size = 180,
  duration = 8,
  borderWidth = 1.5,
  colorFrom = '#FFFFFF',
  colorTo = 'transparent',
  delay = 0,
}) => {
  return (
    <div
      style={
        {
          '--size': `${size}px`,
          '--duration': `${duration}s`,
          '--border-width': `${borderWidth}px`,
          '--color-from': colorFrom,
          '--color-to': colorTo,
          '--delay': `-${delay}s`,
        } as React.CSSProperties
      }
      className={`pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)] ${className}`}
    >
      <div
        className="absolute aspect-square w-[var(--size)] bg-gradient-to-l from-[var(--color-from)] to-[var(--color-to)]"
        style={{
          offsetPath: 'rect(0 auto auto 0 round inherit)',
          offsetAnchor: 'calc(var(--size) / 2) calc(var(--size) / 2)',
          animation: 'border-beam-anim var(--duration) infinite linear var(--delay)',
        }}
      />
    </div>
  );
};

export default BorderBeam;

