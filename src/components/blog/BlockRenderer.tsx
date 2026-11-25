import React, { useState } from 'react';
import { Check, Link2 } from 'lucide-react';
import {
  Block,
  CalloutVariant,
  ListBlock,
  createHeadingIdFactory,
} from './types';
import { InlineRenderer } from './InlineRenderer';
import { CodeBlock } from './CodeBlock';

export type { Block, Inline, ListBlock, ListItem, CalloutVariant, TocHeading } from './types';

interface BlockRendererProps {
  blocks: Block[];
}

const CALLOUT_STYLES: Record<CalloutVariant, { label: string; borderClass: string }> = {
  note: { label: 'NOTE', borderClass: 'border-l-[#9B9B9B]' },
  info: { label: 'INFO', borderClass: 'border-l-[#9B9B9B]' },
  tip: { label: 'TIP', borderClass: 'border-l-[#D4D4D4]' },
  important: { label: 'IMPORTANT', borderClass: 'border-l-[#FFFFFF]' },
  warning: { label: 'WARNING', borderClass: 'border-l-[#FFFFFF]' },
};

const HeadingBlock: React.FC<{ id: string; level: 1 | 2 | 3; text: string }> = ({
  id,
  level,
  text,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAnchor = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard blocked
    }
  };

  const Tag = level === 3 ? 'h3' : 'h2';
  const headingClasses =
    level === 3
      ? 'text-[1.25rem] font-sans font-semibold text-foreground mt-8 mb-3 leading-snug scroll-mt-24'
      : 'text-[1.6rem] font-sans font-semibold text-foreground mt-12 mb-4 leading-snug scroll-mt-24';

  return (
    <Tag id={id} className={`${headingClasses} group flex items-baseline gap-2`}>
      <span>{text}</span>
      <button
        type="button"
        onClick={handleCopyAnchor}
        aria-label={`Copy link to section ${text}`}
        className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity text-muted-foreground hover:text-foreground shrink-0 p-1 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-foreground" /> : <Link2 className="w-3.5 h-3.5" />}
      </button>
    </Tag>
  );
};

const ListBlockRenderer: React.FC<{ block: ListBlock }> = ({ block }) => {
  const Tag = block.ordered ? 'ol' : 'ul';
  const listClass = block.ordered
    ? 'my-5 pl-6 list-decimal space-y-2 text-[17px] lg:text-[18px] leading-[1.75] text-foreground/90 marker:text-muted-foreground marker:font-mono marker:text-sm'
    : 'my-5 pl-6 list-disc space-y-2 text-[17px] lg:text-[18px] leading-[1.75] text-foreground/90 marker:text-muted-foreground';

  return (
    <Tag className={listClass}>
      {block.items.map((item, idx) => (
        <li key={idx}>
          <InlineRenderer nodes={item.inline} />
          {item.sublist && <ListBlockRenderer block={item.sublist} />}
        </li>
      ))}
    </Tag>
  );
};

export const BlockRenderer: React.FC<BlockRendererProps> = ({ blocks }) => {
  if (!blocks || !Array.isArray(blocks)) return null;

  const nextId = createHeadingIdFactory();

  return (
    <div className="text-foreground">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'heading': {
            const id = nextId(block.text);
            const normalizedLevel = block.level === 1 ? 2 : block.level;
            return <HeadingBlock key={index} id={id} level={normalizedLevel} text={block.text} />;
          }

          case 'text':
            return (
              <p
                key={index}
                className="text-[17px] lg:text-[18px] leading-[1.75] text-foreground/90 mb-[1.25em] last:mb-0"
              >
                {block.inline ? <InlineRenderer nodes={block.inline} /> : block.content}
              </p>
            );

          case 'code':
            return (
              <CodeBlock
                key={index}
                code={block.code}
                language={block.language}
                filename={block.filename}
              />
            );

          case 'list':
            return <ListBlockRenderer key={index} block={block} />;

          case 'table':
            return (
              <div key={index} className="my-6 overflow-x-auto rounded-lg border border-border bg-card">
                <table className="w-full border-collapse text-left text-sm">
                  <thead className="bg-secondary border-b border-border">
                    <tr>
                      {block.headers.map((headerCell, hIdx) => (
                        <th
                          key={hIdx}
                          className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-foreground font-semibold"
                        >
                          <InlineRenderer nodes={headerCell} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {block.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-secondary/40 transition-colors">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="px-4 py-3 text-foreground/90 leading-relaxed">
                            <InlineRenderer nodes={cell} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case 'callout': {
            const style = CALLOUT_STYLES[block.variant] || CALLOUT_STYLES.note;
            return (
              <aside
                key={index}
                className={`my-6 rounded-lg border border-border border-l-2 ${style.borderClass} bg-card p-5`}
              >
                <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-foreground mb-2 font-semibold">
                  {style.label}
                </div>
                <div className="text-[15px] leading-relaxed text-muted-foreground">
                  <InlineRenderer nodes={block.inline} />
                </div>
              </aside>
            );
          }

          case 'image':
            return (
              <figure key={index} className="my-8 rounded-lg border border-border overflow-hidden bg-card">
                <div className="overflow-x-auto">
                  <img
                    src={block.url}
                    alt={block.alt || block.caption || 'Article illustration'}
                    className="w-full h-auto object-cover max-h-[500px]"
                    loading="lazy"
                  />
                </div>
                {block.caption && (
                  <figcaption className="p-3 text-xs font-mono text-muted-foreground border-t border-border bg-background/60 text-center">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case 'quote':
            return (
              <blockquote
                key={index}
                className="my-6 border-l-2 border-border pl-5 italic text-foreground/90 text-[17px] leading-[1.7]"
              >
                {block.inline ? <InlineRenderer nodes={block.inline} /> : block.text}
                {block.author && (
                  <cite className="block not-italic text-xs font-mono text-muted-foreground mt-2 uppercase tracking-wider">
                    &mdash; {block.author}
                  </cite>
                )}
              </blockquote>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};
