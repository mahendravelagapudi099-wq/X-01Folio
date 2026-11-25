export type Inline =
  | { type: 'text'; value: string }
  | { type: 'strong'; children: Inline[] }
  | { type: 'em'; children: Inline[] }
  | { type: 'code'; value: string }
  | { type: 'link'; href: string; children: Inline[] };

export interface ListItem {
  inline: Inline[];
  sublist?: ListBlock;
}

export interface ListBlock {
  type: 'list';
  ordered: boolean;
  items: ListItem[];
}

export type CalloutVariant = 'note' | 'info' | 'tip' | 'warning' | 'important';

export type Block =
  | { type: 'text'; content: string; inline?: Inline[] }
  | { type: 'code'; code: string; language: string; filename?: string }
  | { type: 'image'; url: string; alt?: string; caption?: string }
  | { type: 'heading'; text: string; level: 1 | 2 | 3 }
  | { type: 'quote'; text: string; author?: string; inline?: Inline[] }
  | ListBlock
  | { type: 'table'; headers: Inline[][]; rows: Inline[][][] }
  | { type: 'callout'; variant: CalloutVariant; inline: Inline[] };

export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-') || 'section';
}

export function createHeadingIdFactory(): (text: string) => string {
  const counts = new Map<string, number>();
  return (text: string) => {
    const base = slugifyHeading(text);
    const seen = counts.get(base) ?? 0;
    counts.set(base, seen + 1);
    return seen === 0 ? base : `${base}-${seen}`;
  };
}

export function extractHeadings(blocks: Block[] | null | undefined): TocHeading[] {
  if (!blocks || !Array.isArray(blocks)) return [];
  const nextId = createHeadingIdFactory();
  const headings: TocHeading[] = [];

  for (const block of blocks) {
    if (block.type === 'heading') {
      const level = block.level === 1 ? 2 : block.level;
      const id = nextId(block.text);
      if (level === 2 || level === 3) {
        headings.push({ id, text: block.text, level });
      }
    }
  }
  return headings;
}

/** Allow only http(s), mailto, relative paths, and #hash anchors. */
export function sanitizeHref(raw: string | undefined): string | null {
  if (!raw || typeof raw !== 'string') return null;
  const href = raw.trim();
  if (!href) return null;
  if (href.startsWith('#') || href.startsWith('/') || href.startsWith('./') || href.startsWith('../')) {
    return href;
  }
  try {
    const parsed = new URL(href);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:' || parsed.protocol === 'mailto:') {
      return href;
    }
  } catch {
    return null;
  }
  return null;
}

export function isExternalHref(href: string): boolean {
  return href.startsWith('http://') || href.startsWith('https://');
}
