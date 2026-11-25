import React, { useState } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql';
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml';
import markdown from 'react-syntax-highlighter/dist/esm/languages/prism/markdown';
import { Check, Copy } from 'lucide-react';

SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('py', python);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('js', javascript);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('ts', typescript);
SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('sh', bash);
SyntaxHighlighter.registerLanguage('sql', sql);
SyntaxHighlighter.registerLanguage('yaml', yaml);
SyntaxHighlighter.registerLanguage('yml', yaml);
SyntaxHighlighter.registerLanguage('markdown', markdown);

/** Monochrome editorial Prism theme matching #181818 surface and #9B9B9B / #FFFFFF tokens */
const monochromePrismTheme: Record<string, React.CSSProperties> = {
  'code[class*="language-"]': {
    color: '#E5E5E5',
    background: 'transparent',
    fontFamily: '"Geist Mono", monospace',
    fontSize: '0.875rem',
    lineHeight: '1.65',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    tabSize: 2,
  },
  'pre[class*="language-"]': {
    color: '#E5E5E5',
    background: 'transparent',
    fontFamily: '"Geist Mono", monospace',
    fontSize: '0.875rem',
    lineHeight: '1.65',
    margin: 0,
    padding: 0,
    overflow: 'visible',
  },
  comment: { color: '#737373', fontStyle: 'italic' },
  prolog: { color: '#737373' },
  doctype: { color: '#737373' },
  cdata: { color: '#737373' },
  punctuation: { color: '#8A8A8A' },
  property: { color: '#D4D4D4' },
  tag: { color: '#FFFFFF', fontWeight: '600' },
  boolean: { color: '#D4D4D4' },
  number: { color: '#D4D4D4' },
  constant: { color: '#D4D4D4' },
  symbol: { color: '#D4D4D4' },
  selector: { color: '#E5E5E5' },
  'attr-name': { color: '#B5B5B5' },
  string: { color: '#B5B5B5' },
  char: { color: '#B5B5B5' },
  builtin: { color: '#E5E5E5' },
  operator: { color: '#9B9B9B' },
  entity: { color: '#D4D4D4' },
  url: { color: '#B5B5B5' },
  variable: { color: '#E5E5E5' },
  atrule: { color: '#FFFFFF' },
  'attr-value': { color: '#B5B5B5' },
  keyword: { color: '#FFFFFF', fontWeight: '500' },
  function: { color: '#F5F5F5' },
  'class-name': { color: '#FFFFFF' },
  regex: { color: '#B5B5B5' },
  important: { color: '#FFFFFF', fontWeight: '600' },
  bold: { fontWeight: '600' },
  italic: { fontStyle: 'italic' },
};

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, filename }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked
    }
  };

  return (
    <div className="my-6 rounded-lg border border-border bg-card overflow-hidden">
      <div className="bg-secondary px-4 py-2 text-xs font-mono text-muted-foreground border-b border-border flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="uppercase tracking-wider font-medium text-foreground/80 shrink-0">
            {language || 'text'}
          </span>
          {filename && (
            <span className="text-muted-foreground truncate border-l border-border pl-3">
              {filename}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="hover:text-foreground transition-colors flex items-center gap-1.5 shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded px-1"
          aria-label="Copy code block"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-foreground" />
              <span className="text-foreground">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
        <span className="sr-only" aria-live="polite">
          {copied ? 'Code copied to clipboard' : ''}
        </span>
      </div>
      <div className="relative overflow-x-auto">
        <SyntaxHighlighter
          language={language || 'text'}
          style={monochromePrismTheme}
          customStyle={{
            margin: 0,
            padding: '1.25rem',
            backgroundColor: '#181818',
            fontFamily: '"Geist Mono", monospace',
            minWidth: 'max-content',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
