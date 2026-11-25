import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Clock,
  Share2,
  Check,
  FileQuestion,
} from 'lucide-react';
import { usePost, usePosts, isValidDate } from '@/lib/blog';
import { BlockRenderer } from '@/components/blog/BlockRenderer';
import { extractHeadings } from '@/components/blog/types';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { PostsError } from '@/components/blog/PostsStatus';

const SITE_ORIGIN = 'https://mahendraa.dev';

function toAbsoluteUrl(urlOrPath?: string | null): string {
  if (!urlOrPath) return `${SITE_ORIGIN}/og-image.png`;
  if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) return urlOrPath;
  return `${SITE_ORIGIN}${urlOrPath.startsWith('/') ? '' : '/'}${urlOrPath}`;
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, isError, refetch } = usePost(slug);
  const { data: allPosts } = usePosts();
  const [copied, setCopied] = useState(false);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const headings = useMemo(() => extractHeadings(post?.blocks), [post?.blocks]);

  const { relatedPosts, prevPost, nextPost } = useMemo(() => {
    if (!post || !allPosts || allPosts.length === 0) {
      return { relatedPosts: [], prevPost: null, nextPost: null };
    }

    const sorted = [...allPosts].sort((a, b) => {
      const ta = a.published_at ? new Date(a.published_at).getTime() : 0;
      const tb = b.published_at ? new Date(b.published_at).getTime() : 0;
      return tb - ta;
    });

    const currentIdx = sorted.findIndex((p) => p.slug === post.slug);
    const newer = currentIdx > 0 ? sorted[currentIdx - 1] : null;
    const older = currentIdx >= 0 && currentIdx < sorted.length - 1 ? sorted[currentIdx + 1] : null;

    const currentTags = new Set((post.tags || []).map((t) => t.toLowerCase()));
    const related = sorted
      .filter((p) => p.slug !== post.slug)
      .map((p) => {
        const overlap = (p.tags || []).filter((t) => currentTags.has(t.toLowerCase())).length;
        return { post: p, overlap };
      })
      .filter((item) => item.overlap > 0)
      .sort((a, b) => b.overlap - a.overlap)
      .slice(0, 3)
      .map((item) => item.post);

    return { relatedPosts: related, prevPost: older, nextPost: newer };
  }, [post, allPosts]);

  const handleShare = async () => {
    if (!post) return;
    const url = `${SITE_ORIGIN}/blog/${post.slug}/`;

    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title: post.title, text: post.excerpt ?? undefined, url });
        return;
      } catch {
        return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // clipboard blocked
    }
  };

  if (isLoading) {
    return (
      <div
        role="status"
        aria-label="Loading article"
        className="flex min-h-[60vh] items-center justify-center font-sans"
      >
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
        <span className="sr-only">Loading article…</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-background px-6 font-sans">
        <div className="w-full max-w-lg text-center">
          <PostsError onRetry={() => refetch()} />
          <div className="mt-6">
            <Link to="/blog/" className="text-xs font-mono text-foreground hover:underline uppercase tracking-wider">
              &larr; Back to all articles
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-background px-6 font-sans">
        <div className="w-full max-w-lg text-center">
          <Helmet>
            <title>Article not found | Velagapudi Mahendra</title>
            <meta name="description" content="The article you are looking for does not exist." />
          </Helmet>
          <div className="mb-4 inline-flex rounded border border-border bg-card p-3">
            <FileQuestion className="h-6 w-6 text-foreground" />
          </div>
          <h1 className="mb-2 font-sans text-2xl font-bold text-foreground">Article not found</h1>
          <p className="mb-6 text-sm text-muted-foreground">
            The article at this route does not exist or has been relocated.
          </p>
          <Link
            to="/blog/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded bg-foreground text-background text-xs font-mono uppercase tracking-wider font-semibold"
          >
            Browse all articles
          </Link>
        </div>
      </div>
    );
  }

  const canonicalUrl = `${SITE_ORIGIN}/blog/${post.slug}/`;
  const absImage = toAbsoluteUrl(post.feature_image);
  const firstTag = post.tags && post.tags.length > 0 ? post.tags[0] : 'Article';
  const hasToc = headings.length >= 3;
  const hasResources = Boolean(post.repo_url || post.demo_url || post.docs_url);

  const blogPostingLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || post.title,
    datePublished: post.published_at || undefined,
    image: absImage,
    author: {
      '@type': 'Person',
      name: 'Velagapudi Mahendra',
      url: `${SITE_ORIGIN}/`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Helmet>
        <title>{post.title} | Velagapudi Mahendra</title>
        <meta name="description" content={post.excerpt || post.title} />
        {post.tags && post.tags.length > 0 && (
          <meta name="keywords" content={post.tags.join(', ')} />
        )}
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${post.title} | Velagapudi Mahendra`} />
        <meta property="og:description" content={post.excerpt || post.title} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={absImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={`${post.title} | Velagapudi Mahendra`} />
        <meta name="twitter:description" content={post.excerpt || post.title} />
        <meta name="twitter:image" content={absImage} />
        {isValidDate(post.published_at) && (
          <meta property="article:published_time" content={post.published_at} />
        )}
        <script type="application/ld+json">{JSON.stringify(blogPostingLd)}</script>
      </Helmet>

      {/* Reading Progress Indicator */}
      {!reduceMotion && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left bg-foreground"
          style={{ scaleX }}
        />
      )}

      <article className="pt-28 pb-24 px-6 max-w-[980px] mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/blog/" className="hover:text-foreground transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span className="text-foreground truncate">{firstTag}</span>
        </nav>

        {/* Article Header */}
        <header className="border-b border-border pb-8 mb-10">
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-secondary text-muted-foreground border border-border"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="font-display font-normal tracking-tight text-[clamp(2rem,4vw,3rem)] leading-[1.08] max-w-[24ch] text-foreground mb-5">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg sm:text-xl font-sans text-muted-foreground leading-relaxed max-w-[64ch] mb-6">
              {post.excerpt}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-muted-foreground tabular-nums pt-2">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="text-foreground font-medium">Velagapudi Mahendra</span>
              {isValidDate(post.published_at) && (
                <time dateTime={post.published_at} className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  {new Date(post.published_at).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
              )}
              {post.reading_time && (
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  {post.reading_time}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-border bg-card hover:bg-secondary hover:text-foreground transition-colors font-medium"
              aria-label="Share article"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-foreground" />
                  <span className="text-foreground">Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>
            <span className="sr-only" aria-live="polite">
              {copied ? 'Article link copied to clipboard' : ''}
            </span>
          </div>
        </header>

        {/* Feature Image (16:9 framed container for dark surface consistency) */}
        {post.feature_image && (
          <figure className="mb-12 rounded-lg border border-border bg-card p-2 sm:p-3 overflow-hidden">
            <div className="aspect-video w-full overflow-hidden rounded border border-border/60 bg-background">
              <img
                src={post.feature_image}
                alt={post.feature_image_alt || post.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </figure>
        )}

        {/* Article Grid: Sticky TOC (200px) + Body (max-w-[720px]) */}
        <div
          className={
            hasToc
              ? 'lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-12 items-start'
              : 'max-w-[720px]'
          }
        >
          {hasToc && <TableOfContents headings={headings} />}

          <main className="min-w-0 max-w-[720px]">
            {post.blocks && post.blocks.length > 0 && <BlockRenderer blocks={post.blocks} />}

            {(!post.blocks || post.blocks.length === 0) && post.excerpt && (
              <p className="text-[17px] lg:text-[18px] leading-[1.75] text-foreground/90">
                {post.excerpt}
              </p>
            )}
          </main>
        </div>

        {/* Article Footer */}
        <footer className="mt-16 pt-10 border-t border-border space-y-10">
          {/* Resource Links (only when post provides them) */}
          {hasResources && (
            <div className="flex flex-wrap items-center gap-3">
              {post.repo_url && (
                <a
                  href={post.repo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded border border-border bg-card hover:bg-secondary text-xs font-mono text-foreground transition-colors"
                >
                  Source Repository <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
              {post.demo_url && (
                <a
                  href={post.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded border border-border bg-card hover:bg-secondary text-xs font-mono text-foreground transition-colors"
                >
                  Live Demo <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
              {post.docs_url && (
                <a
                  href={post.docs_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded border border-border bg-card hover:bg-secondary text-xs font-mono text-foreground transition-colors"
                >
                  Documentation <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          )}

          {/* Author Card */}
          <div className="p-6 rounded-lg border border-border bg-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-muted-foreground mb-1">
                Author
              </div>
              <div className="text-base font-semibold text-foreground">Velagapudi Mahendra</div>
              <p className="text-sm text-muted-foreground mt-1 max-w-[56ch]">
                B.Tech CSE (Data Science) undergraduate at MREM, Hyderabad. Building NLP, RAG, and verifiable AI systems.
              </p>
            </div>
            <Link
              to="/about/"
              className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded border border-border bg-secondary hover:bg-accent text-xs font-mono text-foreground transition-colors"
            >
              About &amp; Experience <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Related Posts (by tag overlap; hidden if none) */}
          {relatedPosts.length > 0 && (
            <div>
              <h2 className="text-xs font-mono uppercase tracking-[0.16em] text-muted-foreground mb-4">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedPosts.map((rel) => (
                  <Link
                    key={rel.slug}
                    to={`/blog/${rel.slug}/`}
                    className="p-4 rounded-lg border border-border bg-card hover:bg-secondary transition-colors flex flex-col justify-between gap-3 group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-foreground group-hover:underline leading-snug mb-2">
                        {rel.title}
                      </div>
                      {rel.excerpt && (
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                          {rel.excerpt}
                        </p>
                      )}
                    </div>
                    <div className="text-[11px] font-mono text-muted-foreground tabular-nums">
                      {rel.reading_time || ''}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Previous / Next Post Navigation */}
          {(prevPost || nextPost) && (
            <nav
              aria-label="Article navigation"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border"
            >
              <div>
                {prevPost && (
                  <Link
                    to={`/blog/${prevPost.slug}/`}
                    className="block p-4 rounded-lg border border-border bg-card hover:bg-secondary transition-colors group"
                  >
                    <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 mb-1">
                      <ArrowLeft className="w-3 h-3" /> Previous Article
                    </span>
                    <span className="text-sm font-semibold text-foreground group-hover:underline line-clamp-1">
                      {prevPost.title}
                    </span>
                  </Link>
                )}
              </div>
              <div>
                {nextPost && (
                  <Link
                    to={`/blog/${nextPost.slug}/`}
                    className="block p-4 rounded-lg border border-border bg-card hover:bg-secondary transition-colors text-left sm:text-right group"
                  >
                    <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1.5 mb-1">
                      Next Article <ArrowRight className="w-3 h-3" />
                    </span>
                    <span className="block text-sm font-semibold text-foreground group-hover:underline line-clamp-1">
                      {nextPost.title}
                    </span>
                  </Link>
                )}
              </div>
            </nav>
          )}

          <div className="pt-2">
            <Link
              to="/blog/"
              className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to all articles
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}
