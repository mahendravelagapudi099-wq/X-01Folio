import React, { useEffect, useState } from 'react';
import { ChevronDown, List } from 'lucide-react';
import { TocHeading } from './types';

interface TableOfContentsProps {
  headings: TocHeading[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ headings }) => {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? '');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (headings.length < 3) return;

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '-96px 0px -65% 0px', threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${id}`);
    setActiveId(id);
    setMobileOpen(false);
  };

  const navList = (
    <ul className="space-y-2 text-xs font-mono">
      {headings.map((h) => {
        const isActive = activeId === h.id;
        return (
          <li key={h.id} className={h.level === 3 ? 'pl-3' : ''}>
            <a
              href={`#${h.id}`}
              onClick={(e) => handleLinkClick(e, h.id)}
              className={`block py-0.5 leading-snug transition-colors border-l-2 pl-2.5 ${
                isActive
                  ? 'border-foreground text-foreground font-medium'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              {h.text}
            </a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Mobile collapsible TOC */}
      <div className="lg:hidden mb-8 rounded-lg border border-border bg-card">
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-toc-list"
          className="w-full px-4 py-3 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-foreground"
        >
          <span className="flex items-center gap-2">
            <List className="w-3.5 h-3.5 text-muted-foreground" />
            On This Page ({headings.length})
          </span>
          <ChevronDown
            className={`w-4 h-4 text-muted-foreground transition-transform ${mobileOpen ? 'rotate-180' : ''}`}
          />
        </button>
        {mobileOpen && (
          <nav id="mobile-toc-list" aria-label="Table of contents" className="px-4 pb-4 pt-1 border-t border-border">
            {navList}
          </nav>
        )}
      </div>

      {/* Desktop sticky TOC */}
      <aside className="hidden lg:block">
        <nav aria-label="Table of contents" className="sticky top-28">
          <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-muted-foreground mb-3">
            Contents
          </div>
          {navList}
        </nav>
      </aside>
    </>
  );
};
