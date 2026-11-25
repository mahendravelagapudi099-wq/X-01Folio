import React from 'react';
import { Inline, sanitizeHref, isExternalHref } from './types';

interface InlineRendererProps {
  nodes: Inline[];
}

export const InlineRenderer: React.FC<InlineRendererProps> = ({ nodes }) => {
  return (
    <>
      {nodes.map((node, idx) => {
        switch (node.type) {
          case 'text':
            return <React.Fragment key={idx}>{node.value}</React.Fragment>;

          case 'strong':
            return (
              <strong key={idx} className="font-semibold text-foreground">
                <InlineRenderer nodes={node.children} />
              </strong>
            );

          case 'em':
            return (
              <em key={idx} className="italic">
                <InlineRenderer nodes={node.children} />
              </em>
            );

          case 'code':
            return (
              <code
                key={idx}
                className="font-mono text-[0.875em] px-1.5 py-0.5 rounded bg-secondary border border-border text-foreground"
              >
                {node.value}
              </code>
            );

          case 'link': {
            const safeHref = sanitizeHref(node.href);
            if (!safeHref) {
              return <InlineRenderer key={idx} nodes={node.children} />;
            }
            const external = isExternalHref(safeHref);
            return (
              <a
                key={idx}
                href={safeHref}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors [overflow-wrap:anywhere]"
              >
                <InlineRenderer nodes={node.children} />
              </a>
            );
          }

          default:
            return null;
        }
      })}
    </>
  );
};
