import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const contentDir = path.join(rootDir, 'content', 'blog');
const outBlogDataPath = path.join(rootDir, 'src', 'data', 'blogData.ts');
const outRoutesPath = path.join(rootDir, 'scripts', 'blog-routes.json');
const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');

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

function parseMarkdownToBlocks(markdown) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Skip empty lines
    if (!line.trim()) {
      i++;
      continue;
    }

    // Fenced code block
    if (line.trim().startsWith('```')) {
      const language = line.trim().slice(3).trim() || 'text';
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      blocks.push({ type: 'code', language, code: codeLines.join('\n') });
      continue;
    }

    // Headings (#, ##, ###)
    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      blocks.push({
        type: 'heading',
        level: headingMatch[1].length,
        text: headingMatch[2].trim(),
      });
      i++;
      continue;
    }

    // Image ![caption](url)
    const imgMatch = line.trim().match(/^!\[(.*?)\]\((.+?)\)$/);
    if (imgMatch) {
      blocks.push({
        type: 'image',
        url: imgMatch[2].trim(),
        ...(imgMatch[1].trim() ? { caption: imgMatch[1].trim() } : {}),
      });
      i++;
      continue;
    }

    // Blockquote
    if (line.trim().startsWith('>')) {
      const quoteLines = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      let author = undefined;
      if (quoteLines.length > 1 && quoteLines[quoteLines.length - 1].startsWith('— ')) {
        author = quoteLines.pop().slice(2).trim();
      }
      blocks.push({
        type: 'quote',
        text: quoteLines.join(' ').trim(),
        ...(author ? { author } : {}),
      });
      continue;
    }

    // Paragraph (collect contiguous non-special lines)
    const paraLines = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith('```') &&
      !/^#{1,3}\s+/.test(lines[i]) &&
      !lines[i].trim().startsWith('>') &&
      !/^!\[(.*?)\]\((.+?)\)$/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }
    if (paraLines.length > 0) {
      blocks.push({ type: 'text', content: paraLines.join(' ') });
    }
  }

  return blocks;
}

if (!fs.existsSync(contentDir)) {
  console.log('No content/blog directory found. Skipping sync.');
  process.exit(0);
}

const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md'));
const posts = files.map((file) => {
  const raw = fs.readFileSync(path.join(contentDir, file), 'utf-8');
  const { data, body } = parseFrontmatter(raw);
  const slug = data.slug || file.replace(/\.md$/, '');
  const blocks = parseMarkdownToBlocks(body);

  return {
    slug,
    title: data.title || slug,
    excerpt: data.excerpt || '',
    feature_image: data.feature_image || null,
    published_at: data.published_at || new Date().toISOString(),
    featured: Boolean(data.featured),
    tags: Array.isArray(data.tags) ? data.tags : [],
    reading_time: data.reading_time || '4 min read',
    blocks,
  };
});

// Sort newest first
posts.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());

// Assign deterministic IDs
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
}));
fs.writeFileSync(outRoutesPath, JSON.stringify(blogRoutes, null, 2), 'utf-8');

// Update public/sitemap.xml Blog Articles section
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
  const marker = '  <!-- Blog Articles -->';
  const markerIdx = sitemap.indexOf(marker);
  if (markerIdx !== -1) {
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
