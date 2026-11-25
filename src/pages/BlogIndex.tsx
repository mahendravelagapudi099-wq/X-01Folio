import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, Search, X } from 'lucide-react';
import { usePosts, isValidDate, PostMeta } from '@/lib/blog';
import { PostsEmpty } from '@/components/blog/PostsStatus';

const FILTER_MIN_POSTS = 6;
const SEARCH_MIN_POSTS = 8;
const SITE_ORIGIN = 'https://mahendraa.dev';
const BLOG_TITLE = 'Writings & Technical Notes | Velagapudi Mahendra';
const BLOG_DESCRIPTION =
  'Practical engineering notes, benchmarks, and case studies on Telugu NLP, RAG systems, data pipelines, and reinforcement learning.';

function formatDate(iso: string | null): string {
  if (!isValidDate(iso)) return '';
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function CardImage({
  src,
  alt,
  featured = false,
}: {
  src: string | null;
  alt: string;
  featured?: boolean;
}) {
  if (!src) {
    return (
      <div className="aspect-video w-full rounded border border-border/60 bg-secondary flex items-center justify-center">
        <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
          Technical Note
        </span>
      </div>
    );
  }

  return (
    <div
      className={`aspect-video w-full overflow-hidden rounded border border-border/60 bg-background ${
        featured ? '' : ''
      }`}
    >
      <img
        src={src}
        alt={alt}
        loading={featured ? 'eager' : 'lazy'}
        className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
    </div>
  );
}

export default function BlogIndex() {
  const { data: rawPosts } = usePosts();
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const posts = useMemo<PostMeta[]>(() => {
    if (!rawPosts) return [];
    return [...rawPosts].sort((a, b) => {
      const ta = a.published_at ? new Date(a.published_at).getTime() : 0;
      const tb = b.published_at ? new Date(b.published_at).getTime() : 0;
      return tb - ta;
    });
  }, [rawPosts]);

  const showFilters = posts.length >= FILTER_MIN_POSTS;
  const showSearch = posts.length >= SEARCH_MIN_POSTS;

  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags?.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [posts]);

  const featuredPost = useMemo(
    () => posts.find((p) => Boolean(p.featured)) ?? null,
    [posts]
  );

  const hasActiveFilter = selectedTag !== 'all' || searchQuery.trim().length > 0;

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return posts.filter((post) => {
      if (!hasActiveFilter && featuredPost && post.slug === featuredPost.slug) {
        return false;
      }
      if (selectedTag !== 'all' && !(post.tags || []).includes(selectedTag)) {
        return false;
      }
      if (q) {
        const haystack = [post.title, post.excerpt || '', ...(post.tags || [])]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [posts, featuredPost, selectedTag, searchQuery, hasActiveFilter]);

  const resetFilters = () => {
    setSelectedTag('all');
    setSearchQuery('');
  };

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Writings & Technical Notes',
    description: BLOG_DESCRIPTION,
    url: `${SITE_ORIGIN}/blog/`,
    author: { '@type': 'Person', name: 'Velagapudi Mahendra', url: `${SITE_ORIGIN}/` },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${SITE_ORIGIN}/blog/${p.slug}/`,
      datePublished: p.published_at || undefined,
    })),
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground pb-24 pt-28 px-6 max-w-6xl mx-auto">
      <Helmet>
        <title>{BLOG_TITLE}</title>
        <meta name="description" content={BLOG_DESCRIPTION} />
        <link rel="canonical" href={`${SITE_ORIGIN}/blog/`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_ORIGIN}/blog/`} />
        <meta property="og:title" content={BLOG_TITLE} />
        <meta property="og:description" content={BLOG_DESCRIPTION} />
        <meta property="og:image" content={`${SITE_ORIGIN}/og-image.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`${SITE_ORIGIN}/blog/`} />
        <meta name="twitter:title" content={BLOG_TITLE} />
        <meta name="twitter:description" content={BLOG_DESCRIPTION} />
        <meta name="twitter:image" content={`${SITE_ORIGIN}/og-image.png`} />
        <script type="application/ld+json">{JSON.stringify(blogJsonLd)}</script>
      </Helmet>

      {/* Compact Editorial Header */}
      <header className="border-b border-border pb-6 mb-10">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
            WRITINGS / TECHNICAL NOTES
          </span>
          <span className="text-xs font-mono text-muted-foreground tabular-nums">
            {posts.length} {posts.length === 1 ? 'article' : 'articles'}
          </span>
        </div>

        <h1 className="font-display font-normal tracking-tight text-[clamp(2rem,4vw,3rem)] leading-[1.08] text-foreground mb-3">
          Ideas, experiments &amp; engineering notes.
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground max-w-[64ch] leading-relaxed">
          {BLOG_DESCRIPTION}
        </p>

        {/* Conditional Filters & Search (shown at 6+ / 8+ posts) */}
        {(showFilters || showSearch) && (
          <div className="mt-6 pt-5 border-t border-border/60 flex flex-col gap-3">
            {showSearch && (
              <div className="relative w-full">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles by title, topic, or tag…"
                  aria-label="Search blog articles"
                  className="w-full pl-9 pr-9 py-2 rounded-lg border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}

            {showFilters && allTags.length > 0 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <button
                  type="button"
                  onClick={() => setSelectedTag('all')}
                  className={`shrink-0 px-3 py-1 rounded text-xs font-mono transition-colors ${
                    selectedTag === 'all'
                      ? 'bg-foreground text-background font-semibold'
                      : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  All ({posts.length})
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSelectedTag(tag)}
                    className={`shrink-0 px-3 py-1 rounded text-xs font-mono transition-colors ${
                      selectedTag === tag
                        ? 'bg-foreground text-background font-semibold'
                        : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-secondary'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
                {hasActiveFilter && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="shrink-0 px-2.5 py-1 rounded text-xs font-mono text-muted-foreground hover:text-foreground underline underline-offset-4"
                  >
                    Clear
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </header>

      {/* Empty State when 0 posts exist */}
      {posts.length === 0 && <PostsEmpty />}

      {/* Featured Hero Post (newest featured=true, shown when no filter/search active) */}
      {!hasActiveFilter && featuredPost && (
        <section aria-label="Featured article" className="mb-12">
          <Link
            to={`/blog/${featuredPost.slug}/`}
            className="group block rounded-lg border border-border bg-card hover:border-foreground/40 transition-colors motion-reduce:transition-none p-3 sm:p-5"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-6 lg:gap-8 items-center">
              <div className="rounded border border-border/60 bg-background p-1.5">
                <CardImage
                  src={featuredPost.feature_image}
                  alt={featuredPost.feature_image_alt || featuredPost.title}
                  featured
                />
              </div>

              <div className="flex flex-col justify-between gap-4 px-1 pb-1 lg:py-2">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-secondary text-foreground border border-border font-semibold">
                      Featured
                    </span>
                    {(featuredPost.tags || []).slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-secondary text-muted-foreground border border-border"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <h2 className="font-sans text-2xl sm:text-3xl font-semibold text-foreground leading-snug mb-3 group-hover:underline underline-offset-4">
                    {featuredPost.title}
                  </h2>

                  {featuredPost.excerpt && (
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-border/60 text-xs font-mono text-muted-foreground tabular-nums">
                  <div className="flex items-center gap-4">
                    {isValidDate(featuredPost.published_at) && (
                      <time dateTime={featuredPost.published_at} className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(featuredPost.published_at)}
                      </time>
                    )}
                    {featuredPost.reading_time && (
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {featuredPost.reading_time}
                      </span>
                    )}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-foreground font-semibold">
                    Read essay <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Articles Grid (3 cols @ 1024px+, 2 @ 768px, 1 on mobile) */}
      {posts.length > 0 && filteredPosts.length > 0 && (
        <section aria-label="All articles">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}/`}
                className="group rounded-lg border border-border bg-card hover:border-foreground/40 transition-colors motion-reduce:transition-none p-3 flex flex-col justify-between gap-4"
              >
                <div className="flex flex-col gap-3">
                  <div className="rounded border border-border/60 bg-background p-1">
                    <CardImage
                      src={post.feature_image}
                      alt={post.feature_image_alt || post.title}
                    />
                  </div>

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 px-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-secondary text-muted-foreground border border-border"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <h2 className="px-1 font-sans text-lg font-semibold text-foreground leading-snug group-hover:underline underline-offset-4">
                    {post.title}
                  </h2>

                  {post.excerpt && (
                    <p className="px-1 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                </div>

                <div className="px-1 pt-3 border-t border-border/60 flex items-center justify-between gap-2 text-[11px] font-mono text-muted-foreground tabular-nums">
                  {isValidDate(post.published_at) ? (
                    <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
                  ) : (
                    <span />
                  )}
                  {post.reading_time && <span>{post.reading_time}</span>}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* No filter matches empty state */}
      {posts.length > 0 && filteredPosts.length === 0 && (
        <PostsEmpty hasActiveFilters={hasActiveFilter} onResetFilters={resetFilters} />
      )}
    </div>
  );
}
