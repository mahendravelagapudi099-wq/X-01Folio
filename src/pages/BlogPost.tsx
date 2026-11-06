import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Share2, Check, FileQuestion } from 'lucide-react';
import { usePost, isValidDate } from '@/lib/blog';
import { BlockRenderer } from '@/components/blog/BlockRenderer';
import { PostsError } from '@/components/blog/PostsStatus';
import { Button } from '@/components/ui/button';

const SITE_ORIGIN = 'https://mahendraa.dev';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, isError, refetch } = usePost(slug);
  const [copied, setCopied] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const handleShare = async () => {
    if (!post) return;
    const url = `${SITE_ORIGIN}/blog/${post.slug}`;

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
            <Link to="/blog" className="text-xs font-mono text-primary hover:underline uppercase tracking-wider">
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
            <FileQuestion className="h-6 w-6 text-primary" />
          </div>
          <h1 className="mb-2 font-sans text-2xl font-bold text-foreground">Article not found</h1>
          <p className="mb-6 text-sm text-muted-foreground">
            The article at this route does not exist or has been relocated.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded bg-foreground text-background text-xs font-mono uppercase tracking-wider font-semibold"
          >
            Browse all articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Helmet>
        <title>{post.title} | Velagapudi Mahendra</title>
        <meta name="description" content={post.excerpt || post.title} />
        <link rel="canonical" href={`${SITE_ORIGIN}/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || post.title} />
        <meta property="og:url" content={`${SITE_ORIGIN}/blog/${post.slug}`} />
        {post.feature_image && <meta property="og:image" content={post.feature_image} />}
        <meta name="twitter:card" content={post.feature_image ? 'summary_large_image' : 'summary'} />
        {isValidDate(post.published_at) && (
          <meta name="article:published_time" content={post.published_at} />
        )}
      </Helmet>

      {/* Reading Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-1 origin-left bg-primary"
        style={{ scaleX }}
      />

      <article className="pt-28 pb-24 px-6 max-w-4xl mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-foreground">
            Blog
          </Link>
          <span>/</span>
          <span className="text-foreground truncate">{post.title}</span>
        </div>

        {/* Article Header */}
        <header className="border-b border-border pb-8 mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-muted-foreground mb-4 tabular-nums">
            <div className="flex items-center gap-4">
              {isValidDate(post.published_at) && (
                <time dateTime={post.published_at} className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
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
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors font-medium"
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
          </div>

          <h1 className="font-sans text-3xl sm:text-5xl font-bold text-foreground leading-[1.12] mb-4">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg sm:text-xl font-sans text-muted-foreground leading-snug">
              {post.excerpt}
            </p>
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-[11px] font-mono bg-muted text-muted-foreground border border-border"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Feature Image */}
        {post.feature_image && (
          <figure className="mb-12 rounded border border-border overflow-hidden bg-card">
            <img
              src={post.feature_image}
              alt={post.title}
              className="w-full h-auto object-cover max-h-[480px]"
            />
          </figure>
        )}

        {/* Content Body */}
        <main className="max-w-[70ch] leading-relaxed">
          {post.blocks && post.blocks.length > 0 && <BlockRenderer blocks={post.blocks} />}

          {!post.blocks && post.excerpt && (
            <p className="text-base text-muted-foreground leading-relaxed">{post.excerpt}</p>
          )}
        </main>

        {/* Article Footer */}
        <footer className="pt-10 mt-16 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Technical Articles
          </Link>

          <span className="text-muted-foreground">
            Written by Velagapudi Mahendra &bull; MREM Data Science
          </span>
        </footer>
      </article>
    </div>
  );
}

