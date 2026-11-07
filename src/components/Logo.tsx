import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showWordmark?: boolean;
}

/**
 * Bespoke Architectural Emblem for Velagapudi Mahendra / Folio
 * Designed according to elayadesign/ai-design-skills:
 * Pure geometric vector with crisp monochrome precision, no clashing gradients,
 * representing data synthesis (M) and precision runtime verification.
 */
export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 28,
  showWordmark = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 ease-base group-hover:scale-105"
        aria-label="Velagapudi Mahendra Logo"
      >
        {/* Background shield surface */}
        <rect
          x="1"
          y="1"
          width="30"
          height="30"
          rx="6"
          fill="#181818"
          stroke="#272727"
          strokeWidth="1.5"
        />

        {/* Faceted M Architectural Mark */}
        {/* Left upright pillar */}
        <path
          d="M8 23V9L13.5 17L16 13.5"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Right upright pillar */}
        <path
          d="M24 23V9L18.5 17L16 13.5"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Center precision node & horizon */}
        <circle cx="16" cy="13.5" r="1.5" fill="#FFFFFF" />
        <path
          d="M11 23H21"
          stroke="#9B9B9B"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      {showWordmark && (
        <div className="flex flex-col">
          <span className="font-sans text-sm font-semibold tracking-tight text-foreground leading-tight">
            Mahendra
          </span>
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest leading-none">
            Folio
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;

