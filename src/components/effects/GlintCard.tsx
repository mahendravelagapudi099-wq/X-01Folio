import React, { useRef } from 'react';

interface GlintCardProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'section';
}

/**
 * GlintCard — on-hover, a sharp glint light sweeps across the card surface
 * following the mouse X position. Pure CSS perspective + mouse tracking.
 * No libraries. GPU composited.
 */
export function GlintCard({ children, className = '', as: Tag = 'div' }: GlintCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--glint-x', `${x}%`);
    el.style.setProperty('--glint-y', `${y}%`);
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--glint-x', '50%');
    el.style.setProperty('--glint-y', '50%');
  };

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glint-card ${className}`}
    >
      {children}
    </Tag>
  );
}
