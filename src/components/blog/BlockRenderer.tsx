import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Copy } from 'lucide-react';

export type Block = 
  | { type: 'text'; content: string }
  | { type: 'code'; code: string; language: string }
  | { type: 'image'; url: string; caption?: string }
  | { type: 'heading'; text: string; level: 1 | 2 | 3 }
  | { type: 'quote'; text: string; author?: string };

interface BlockRendererProps {
  blocks: Block[];
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ blocks }) => {
  if (!blocks || !Array.isArray(blocks)) return null;

  return (
    <div className="space-y-6 text-foreground">
      {blocks.map((block, index) => (
        <React.Fragment key={index}>
          {renderBlock(block, index)}
        </React.Fragment>
      ))}
    </div>
  );
};

const CodeBlock = ({ code, language }: { code: string; language: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded border border-border bg-card overflow-hidden">
      <div className="bg-muted px-4 py-2 text-xs font-mono text-muted-foreground border-b border-border flex items-center justify-between">
        <span className="uppercase tracking-wider font-medium">{language || 'text'}</span>
        <button 
          onClick={handleCopy}
          className="hover:text-foreground transition-colors flex items-center gap-1.5"
          aria-label="Copy code block"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-foreground" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language || 'text'}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: '1.25rem',
          fontSize: '0.85rem',
          lineHeight: '1.6',
          backgroundColor: '#0c0e12',
          fontFamily: 'JetBrains Mono, monospace',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

const renderBlock = (block: Block, index: number) => {
  switch (block.type) {
    case 'heading':
      switch (block.level) {
        case 1:
          return (
            <h1 className="text-3xl sm:text-4xl font-sans font-bold text-foreground mt-10 mb-4 leading-tight">
              {block.text}
            </h1>
          );
        case 2:
          return (
            <h2 className="text-2xl sm:text-3xl font-sans font-bold text-foreground mt-8 mb-3 leading-snug">
              {block.text}
            </h2>
          );
        case 3:
          return (
            <h3 className="text-xl sm:text-2xl font-sans font-semibold text-foreground mt-6 mb-2">
              {block.text}
            </h3>
          );
        default:
          return null;
      }

    case 'text':
      return (
        <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-[68ch] whitespace-pre-wrap">
          {block.content}
        </p>
      );

    case 'code':
      return <CodeBlock code={block.code} language={block.language} />;

    case 'image':
      return (
        <figure className="my-8 rounded border border-border overflow-hidden bg-card">
          <img
            src={block.url}
            alt={block.caption || 'Article illustration'}
            className="w-full h-auto object-cover max-h-[500px]"
            loading="lazy"
          />
          {block.caption && (
            <figcaption className="p-3 text-xs font-mono text-muted-foreground border-t border-border bg-background/60 text-center">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case 'quote':
      return (
        <blockquote className="my-6 border-l-2 border-primary pl-5 italic text-foreground/90 max-w-[68ch] text-base leading-relaxed">
          &ldquo;{block.text}&rdquo;
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
};

