import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Block } from '@/components/blog/BlockRenderer';

/**
 * The Supabase `posts` table is the single source of truth for blog content.
 *
 * Columns verified against the live PostgREST endpoint (probe 2026-10-18) with
 * the anon key, so every field selected here is guaranteed to exist:
 *   id, created_at, slug, title, excerpt, feature_image, published_at,
 *   featured, tags, reading_time, blocks
 * (note: there is no `published` boolean — `published_at` is the only date column).
 */

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

const LIST_FIELDS =
  'id,slug,title,excerpt,feature_image,published_at,featured,tags,reading_time';

/** True only when the value parses to a real date — guards against rendering
 *  "Invalid Date" or an obviously wrong meta line. */
export const isValidDate = (value?: string | null): value is string =>
  Boolean(value) && !Number.isNaN(new Date(value as string).getTime());

/** All posts, newest first. */
export const fetchPosts = async (): Promise<PostMeta[]> => {
  const { data, error } = await supabase
    .from('posts')
    .select(LIST_FIELDS)
    .order('published_at', { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as PostMeta[];
};

/** One post by slug, or null when no such row exists. */
export const fetchPostBySlug = async (slug: string): Promise<Post | null> => {
  const { data, error } = await supabase
    .from('posts')
    .select(`${LIST_FIELDS},blocks`)
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return (data as Post) ?? null;
};

/** Cached, shared list query — home section and /blog index use the same cache entry. */
export const usePosts = () =>
  useQuery({
    queryKey: ['posts', 'list'],
    queryFn: fetchPosts,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

export const usePost = (slug: string | undefined) =>
  useQuery({
    queryKey: ['posts', 'slug', slug],
    queryFn: () => fetchPostBySlug(slug as string),
    enabled: Boolean(slug),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
