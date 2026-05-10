import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from 'framer-motion';

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
    <div className="space-y-8">
      {blocks.map((block, index) => {
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            {renderBlock(block)}
          </motion.div>
        );
      })}
    </div>
  );
};

const renderBlock = (block: Block) => {
  switch (block.type) {
    case 'heading':
      const Tag = `h${block.level}` as keyof JSX.IntrinsicElements;
      const sizes = {
        h1: 'text-4xl sm:text-5xl font-bold mb-8 font-orbitron',
        h2: 'text-3xl sm:text-4xl font-bold mb-6 font-orbitron mt-12',
        h3: 'text-2xl sm:text-3xl font-bold mb-4 font-orbitron mt-8',
      };
      return (
        <Tag className={`${sizes[Tag as keyof typeof sizes]} bg-gradient-primary bg-clip-text text-transparent`}>
          {block.text}
        </Tag>
      );

    case 'text':
      return (
        <p className="text-lg leading-relaxed text-muted-foreground/90 whitespace-pre-wrap">
          {block.content}
        </p>
      );

    case 'code':
      return (
        <div className="relative group my-8">
          <div className="absolute -inset-0.5 bg-gradient-primary rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative rounded-lg overflow-hidden border border-primary/20">
            <div className="bg-muted px-4 py-2 text-xs font-mono text-muted-foreground border-b border-primary/10 flex justify-between">
              <span>{block.language}</span>
              <button 
                onClick={() => navigator.clipboard.writeText(block.code)}
                className="hover:text-primary transition-colors"
              >
                Copy
              </button>
            </div>
            <SyntaxHighlighter
              language={block.language}
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: '1.5rem',
                fontSize: '0.9rem',
                backgroundColor: 'transparent',
              }}
            >
              {block.code}
            </SyntaxHighlighter>
          </div>
        </div>
      );

    case 'image':
      return (
        <figure className="my-10 space-y-3">
          <div className="relative rounded-2xl overflow-hidden border border-primary/20 glow-secondary">
            <img 
              src={block.url} 
              alt={block.caption || 'Blog image'} 
              className="w-full h-auto object-cover"
            />
          </div>
          {block.caption && (
            <figcaption className="text-center text-sm text-muted-foreground italic font-light">
              — {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case 'quote':
      return (
        <blockquote className="my-10 pl-6 border-l-4 border-primary italic">
          <p className="text-2xl font-light text-foreground mb-2">"{block.text}"</p>
          {block.author && <cite className="text-sm text-primary font-medium">— {block.author}</cite>}
        </blockquote>
      );

    default:
      return null;
  }
};
