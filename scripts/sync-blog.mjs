/**
 * Blog Content Sync Script (content/blog/*.md -> src/data/blogData.ts, scripts/blog-routes.json, public/sitemap.xml)
 *
 * Supported Markdown Conventions in Sveltia CMS:
 * - Headings: ## Section (H2), ### Subsection (H3). Any H1 (#) in body is demoted to H2.
 * - Lists: Ordered (1. item) and unordered (- item, * item, or • item), including nested lists.
 * - Tables: Standard GFM pipe tables (| Col A | Col B |).
 * - Inline formatting: **bold**, *italic*, `inline code`, [links](https://...), and bare https:// URLs.
 * - Code blocks: Fenced with optional filename, e.g. ```python title="app.py"
 *   Normalized languages: py->python, js->javascript, ts->typescript, sh/shell->bash, yml->yaml.
 * - Callouts: Blockquotes starting with [!NOTE], [!INFO], [!TIP], [!WARNING], [!IMPORTANT], or [!CAUTION].
 * - Blockquotes: Standard > quote text, with optional attribution on the last line starting with "> — Author".
 * - Images: ![alt text](/assets/blog/file.png "Optional caption"). Caption falls back to alt text.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const contentDir = path.join(rootDir, 'content', 'blog');
const outBlogDataPath = path.join(rootDir, 'src', 'data', 'blogData.ts');
const outRoutesPath = path.join(rootDir, 'scripts', 'blog-routes.json');
const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');

const LANG_ALIASES = {
  py: 'python',
  js: 'javascript',
  ts: 'typescript',
  sh: 'bash',
  shell: 'bash',
  yml: 'yaml',
};

function parseScalar(raw) {
  const s = raw.trim();
  if (s === 'true') return true;
  if (s === 'false') return false;
  if (s === 'null' || s === '~') return null;
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    try {
      if (s.startsWith('"')) return JSON.parse(s);
      return s.slice(1, -1).replace(/''/g, "'");
    } catch {
      return s.slice(1, -1);
    }
  }
  return s;
}

function parseFrontmatter(content) {
  const normalized = content.replace(/\r\n/g, '\n');
  if (!normalized.startsWith('---\n')) {
    return { data: {}, body: normalized };
  }
  const endIdx = normalized.indexOf('\n---\n', 4);
  if (endIdx === -1) {
    return { data: {}, body: normalized };
  }
  const fmRaw = normalized.slice(4, endIdx);
  const body = normalized.slice(endIdx + 5).trim();
  const data = {};
  let currentKey = null;

  for (const line of fmRaw.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    if (trimmed.startsWith('- ') && currentKey) {
      if (!Array.isArray(data[currentKey])) data[currentKey] = [];
      data[currentKey].push(parseScalar(trimmed.slice(2)));
      continue;
    }
    const colonIdx = line.indexOf(':');
    if (colonIdx !== -1) {
      const key = line.slice(0, colonIdx).trim();
      const val = line.slice(colonIdx + 1).trim();
      currentKey = key;
      if (val === '') {
        data[key] = [];
      } else if (val.startsWith('[') && val.endsWith(']')) {
        data[key] = val
          .slice(1, -1)
          .split(',')
          .map((item) => parseScalar(item))
          .filter((x) => x !== '');
      } else {
        data[key] = parseScalar(val);
      }
    }
  }

  return { data, body };
}

/** Convert lines starting with `•` outside fenced code blocks into `- ` list items */
function preprocessBullets(markdown) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  let inFence = false;
  return lines
    .map((line) => {
      if (line.trim().startsWith('```')) {
        inFence = !inFence;
        return line;
      }
      if (!inFence) {
        return line.replace(/^(\s*)•\s+/, '$1- ');
      }
      return line;
    })
    .join('\n');
}

/** Compute reading time from markdown body excluding fenced code blocks */
function computeReadingTime(markdown) {
  const withoutCode = markdown.replace(/```[\s\S]*?```/g, ' ');
  const plain = withoutCode
    .replace(/!\[.*?\]\(.*?\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#>*`_\-|]/g, ' ');
  const words = plain.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

/** Auto-link bare http(s) URLs inside a plain text string */
function linkifyText(text) {
  if (!text) return [];
  const urlRegex = /(https?:\/\/[^\s<>"')]+)/g;
  const result = [];
  let lastIdx = 0;
  let match;

  while ((match = urlRegex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      result.push({ type: 'text', value: text.slice(lastIdx, match.index) });
    }
    let url = match[1];
    let trailing = '';
    while (/[.,;:!?)]$/.test(url)) {
      trailing = url.slice(-1) + trailing;
      url = url.slice(0, -1);
    }
    result.push({
      type: 'link',
      href: url,
      children: [{ type: 'text', value: url }],
    });
    if (trailing) {
      result.push({ type: 'text', value: trailing });
    }
    lastIdx = match.index + match[0].length;
  }

  if (lastIdx < text.length) {
    result.push({ type: 'text', value: text.slice(lastIdx) });
  }
  return result;
}

function mapInlineTokens(tokens = []) {
  const inlines = [];

  for (const token of tokens) {
    switch (token.type) {
      case 'text':
      case 'escape':
        if (token.tokens && token.tokens.length > 0) {
          inlines.push(...mapInlineTokens(token.tokens));
        } else {
          inlines.push(...linkifyText(token.text ?? token.raw ?? ''));
        }
        break;
      case 'strong':
        inlines.push({ type: 'strong', children: mapInlineTokens(token.tokens) });
        break;
      case 'em':
        inlines.push({ type: 'em', children: mapInlineTokens(token.tokens) });
        break;
      case 'codespan':
        inlines.push({ type: 'code', value: token.text });
        break;
      case 'link': {
        const children = token.tokens && token.tokens.length > 0
          ? mapInlineTokens(token.tokens)
          : [{ type: 'text', value: token.text || token.href }];
        inlines.push({ type: 'link', href: token.href, children });
        break;
      }
      case 'br':
        inlines.push({ type: 'text', value: ' ' });
        break;
      case 'del':
        inlines.push(...linkifyText(token.text ?? ''));
        break;
      default:
        if (token.raw || token.text) {
          inlines.push(...linkifyText(token.text ?? token.raw));
        }
        break;
    }
  }

  return inlines;
}

function inlineToPlain(inlines = []) {
  return inlines
    .map((node) => {
      if (node.type === 'text' || node.type === 'code') return node.value;
      if (node.type === 'strong' || node.type === 'em' || node.type === 'link') {
        return inlineToPlain(node.children);
      }
      return '';
    })
    .join('');
}

function parseCodeInfo(langRaw = '') {
  const trimmed = langRaw.trim();
  if (!trimmed) return { language: 'text' };

  const titleMatch = trimmed.match(/title=(?:"([^"]+)"|'([^']+)')/);
  const filename = titleMatch ? (titleMatch[1] || titleMatch[2]) : undefined;
  const rawLang = trimmed.split(/\s+/)[0].toLowerCase();
  const language = LANG_ALIASES[rawLang] || rawLang || 'text';

  return { language, ...(filename ? { filename } : {}) };
}

function mapListToken(token) {
  return {
    type: 'list',
    ordered: Boolean(token.ordered),
    items: token.items.map((item) => {
      const inlineTokens = [];
      let sublist = undefined;

      for (const child of item.tokens || []) {
        if (child.type === 'list') {
          sublist = mapListToken(child);
        } else if (child.tokens) {
          inlineTokens.push(...child.tokens);
        } else if (child.text) {
          inlineTokens.push({ type: 'text', text: child.text });
        }
      }

      const inline = mapInlineTokens(inlineTokens);
      return {
        inline,
        ...(sublist ? { sublist } : {}),
      };
    }),
  };
}

function parseMarkdownToBlocks(markdown) {
  const preprocessed = preprocessBullets(markdown);
  const tokens = marked.lexer(preprocessed, { gfm: true, breaks: false });
  const blocks = [];

  for (const token of tokens) {
    switch (token.type) {
      case 'space':
        break;

      case 'heading': {
        const level = token.depth === 1 ? 2 : Math.min(3, Math.max(2, token.depth));
        blocks.push({
          type: 'heading',
          level,
          text: token.text.trim(),
        });
        break;
      }

      case 'paragraph': {
        const childTokens = token.tokens || [];
        if (childTokens.length === 1 && childTokens[0].type === 'image') {
          const img = childTokens[0];
          const caption = img.title || img.text || undefined;
          blocks.push({
            type: 'image',
            url: img.href,
            ...(img.text ? { alt: img.text } : {}),
            ...(caption ? { caption } : {}),
          });
        } else {
          const inline = mapInlineTokens(childTokens);
          blocks.push({
            type: 'text',
            content: inlineToPlain(inline),
            inline,
          });
        }
        break;
      }

      case 'code': {
        const { language, filename } = parseCodeInfo(token.lang);
        blocks.push({
          type: 'code',
          language,
          ...(filename ? { filename } : {}),
          code: token.text,
        });
        break;
      }

      case 'list':
        blocks.push(mapListToken(token));
        break;

      case 'table':
        blocks.push({
          type: 'table',
          headers: token.header.map((cell) => mapInlineTokens(cell.tokens)),
          rows: token.rows.map((row) => row.map((cell) => mapInlineTokens(cell.tokens))),
        });
        break;

      case 'blockquote': {
        const rawInner = (token.text || '').trim();
        const calloutMatch = rawInner.match(/^\[!(NOTE|INFO|TIP|WARNING|IMPORTANT|CAUTION)\]\s*/i);
        if (calloutMatch) {
          const rawVariant = calloutMatch[1].toLowerCase();
          const variant = rawVariant === 'caution' ? 'warning' : rawVariant;
          const stripped = rawInner.slice(calloutMatch[0].length).trim();
          const inline = mapInlineTokens(marked.Lexer.lexInline(stripped));
          blocks.push({
            type: 'callout',
            variant,
            inline,
          });
        } else {
          const quoteLines = rawInner.split('\n').map((l) => l.trim()).filter(Boolean);
          let author = undefined;
          if (quoteLines.length > 1 && quoteLines[quoteLines.length - 1].startsWith('— ')) {
            author = quoteLines.pop().slice(2).trim();
          }
          const quoteText = quoteLines.join(' ').trim();
          const inline = mapInlineTokens(marked.Lexer.lexInline(quoteText));
          blocks.push({
            type: 'quote',
            text: inlineToPlain(inline) || quoteText,
            ...(author ? { author } : {}),
            inline,
          });
        }
        break;
      }

      default:
        break;
    }
  }

  return blocks;
}

if (!fs.existsSync(contentDir)) {
  console.log('No content/blog directory found. Skipping sync.');
  process.exit(0);
}

const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md')).sort();
const posts = files.map((file) => {
  const raw = fs.readFileSync(path.join(contentDir, file), 'utf-8');
  const { data, body } = parseFrontmatter(raw);

  if (!data.published_at || Number.isNaN(new Date(data.published_at).getTime())) {
    console.error(`Error in content/blog/${file}: missing or invalid "published_at" frontmatter.`);
    process.exit(1);
  }

  const slug = data.slug || file.replace(/\.md$/, '');
  const blocks = parseMarkdownToBlocks(body);
  const readingTime =
    typeof data.reading_time === 'string' && data.reading_time.trim()
      ? data.reading_time.trim()
      : computeReadingTime(body);

  return {
    slug,
    title: data.title || slug,
    excerpt: data.excerpt || '',
    feature_image: data.feature_image || null,
    ...(data.feature_image_alt ? { feature_image_alt: data.feature_image_alt } : {}),
    ...(data.repo_url ? { repo_url: data.repo_url } : {}),
    ...(data.demo_url ? { demo_url: data.demo_url } : {}),
    ...(data.docs_url ? { docs_url: data.docs_url } : {}),
    published_at: data.published_at,
    featured: Boolean(data.featured),
    tags: Array.isArray(data.tags) ? data.tags : [],
    reading_time: readingTime,
    blocks,
  };
});

// Sort newest first, tie-break by slug for deterministic builds
posts.sort((a, b) => {
  const diff = new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
  return diff !== 0 ? diff : a.slug.localeCompare(b.slug);
});

const finalPosts = posts.map((post, idx) => ({
  id: `post-${posts.length - idx}`,
  ...post,
}));

// Write src/data/blogData.ts
const tsOutput = `// AUTO-GENERATED from content/blog/*.md by scripts/sync-blog.mjs
import type { Block } from '@/components/blog/BlockRenderer';

export interface BlogPostData {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  feature_image: string | null;
  feature_image_alt?: string | null;
  repo_url?: string | null;
  demo_url?: string | null;
  docs_url?: string | null;
  published_at: string;
  featured: boolean;
  tags: string[];
  reading_time: string;
  blocks: Block[];
}

export const GENUINE_POSTS: BlogPostData[] = ${JSON.stringify(finalPosts, null, 2)};
`;

fs.writeFileSync(outBlogDataPath, tsOutput, 'utf-8');

// Write scripts/blog-routes.json for prerender-routes.mjs
const blogRoutes = finalPosts.map((p) => ({
  path: `/blog/${p.slug}/`,
  title: `${p.title} | Velagapudi Mahendra`,
  description: p.excerpt,
  excerpt: p.excerpt,
  feature_image: p.feature_image,
  published_at: p.published_at,
  tags: p.tags,
}));
fs.writeFileSync(outRoutesPath, JSON.stringify(blogRoutes, null, 2), 'utf-8');

// Update public/sitemap.xml Blog Articles section
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
  const markers = ['  <!-- Verified Blog Posts -->', '  <!-- Blog Articles -->'];
  const marker = markers.find((m) => sitemap.includes(m));
  const markerIdx = marker ? sitemap.indexOf(marker) : -1;
  if (marker && markerIdx !== -1) {
    const blogXmlEntries = finalPosts
      .map((p) => {
        const date = String(p.published_at).slice(0, 10);
        return `  <url>
    <loc>https://mahendraa.dev/blog/${p.slug}/</loc>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
      })
      .join('\n');
    const updatedSitemap = `${sitemap.slice(0, markerIdx)}${marker}\n${blogXmlEntries}\n</urlset>\n`;
    fs.writeFileSync(sitemapPath, updatedSitemap, 'utf-8');
  }
}

console.log(`Synced ${finalPosts.length} blog posts from content/blog/*.md`);
