import { useQuery } from '@tanstack/react-query';
import type { Block } from '@/components/blog/BlockRenderer';
import { GENUINE_POSTS, BlogPostData } from '@/data/blogData';

export interface PostMeta {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  feature_image: string | null;
  published_at: string | null;
  featured: boolean | null;
  tags: string[] | null;
  reading_time: string | null;
}

export interface Post extends PostMeta {
  blocks: Block[] | null;
}

/** True only when the value parses to a real date. */
export const isValidDate = (value?: string | null): value is string =>
  Boolean(value) && !Number.isNaN(new Date(value as string).getTime());

/** All genuine verified posts, newest first. */
export const fetchPosts = async (): Promise<PostMeta[]> => {
  return GENUINE_POSTS.map(({ blocks, ...meta }) => meta);
};

/** One genuine verified post by slug, or null when no such post exists. */
export const fetchPostBySlug = async (slug: string): Promise<Post | null> => {
  const found = GENUINE_POSTS.find((p) => p.slug === slug);
  return found ?? null;
};

/** Cached, shared list query — home section and /blog index use the same cache entry. */
export const usePosts = () =>
  useQuery({
    queryKey: ['posts', 'list'],
    queryFn: fetchPosts,
    staleTime: 5 * 60 * 1000,
  });

export const usePost = (slug: string | undefined) =>
  useQuery({
    queryKey: ['posts', 'slug', slug],
    queryFn: () => fetchPostBySlug(slug as string),
    enabled: Boolean(slug),
    staleTime: 5 * 60 * 1000,
  });
