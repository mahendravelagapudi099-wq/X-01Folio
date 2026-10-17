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

const BlogPost = () => {
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
        return; // user dismissed the share sheet — not an error
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // clipboard blocked (permissions) — the button stays a no-op rather than lying
    }
  };

  if (isLoading) {
    return (
      <div
        role="status"
        aria-label="Loading article"
        className="flex min-h-screen items-center justify-center"
      >
        <div className="h-16 w-16 animate-spin rounded-full border-primary border-t-2 border-b-2" />
        <span className="sr-only">Loading article…</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="w-full max-w-lg">
          <PostsError onRetry={() => refetch()} />
          <div className="mt-8 text-center">
            <Link to="/blog" className="font-medium text-primary hover:underline">
              Back to all articles
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="w-full max-w-lg text-center">
          <Helmet>
            <title>Article not found | Velagapudi Mahendra</title>
            <meta name="description" content="The article you are looking for does not exist or has been moved." />
          </Helmet>
          <div className="mb-4 inline-flex rounded-2xl border border-primary/30 bg-primary/10 p-4">
            <FileQuestion className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-3 font-orbitron text-3xl font-bold">Article not found</h1>
          <p className="mb-8 text-muted-foreground">
            That article doesn&rsquo;t exist or may have been moved. Check the blog index for
            everything currently published.
          </p>
          <Button asChild variant="outline" className="glass-card">
            <Link to="/blog">Browse all articles</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
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

      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-1.5 origin-left bg-primary"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <header className="relative flex h-[60vh] min-h-[420px] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {post.feature_image ? (
            <img src={post.feature_image} alt="" className="h-full w-full object-cover opacity-30" />
          ) : (
            <div className="h-full w-full bg-gradient-hero" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        </div>

        <div className="relative z-10 max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link to="/blog" className="group mb-8 inline-flex items-center text-primary transition-all hover:gap-2">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Articles
            </Link>

            <div className="mb-6 flex flex-wrap justify-center gap-4 font-jetbrains text-sm text-muted-foreground">
              {isValidDate(post.published_at) && (
                <time dateTime={post.published_at} className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.published_at).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              )}
              {post.reading_time && (
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" /> {post.reading_time}
                </span>
              )}
            </div>

            <h1 className="mb-8 bg-gradient-primary bg-clip-text font-orbitron text-4xl font-bold text-transparent leading-tight md:text-6xl">
              {post.title}
            </h1>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="glass-card border border-primary/20 px-4 py-1 text-xs font-bold tracking-wider text-primary uppercase"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-20 mx-auto -mt-20 max-w-4xl px-6 pb-24">
        <article className="glass-card border border-primary/10 p-8 shadow-2xl md:p-12">
          {post.blocks && post.blocks.length > 0 && <BlockRenderer blocks={post.blocks} />}

          {!post.blocks && post.excerpt && (
            <p className="text-lg leading-relaxed text-muted-foreground/90">{post.excerpt}</p>
          )}

          <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-primary/10 pt-8 sm:flex-row">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={handleShare}
                aria-label={copied ? 'Link copied to clipboard' : 'Share this article'}
              >
                {copied ? <Check className="h-4 w-4 text-accent" /> : <Share2 className="h-4 w-4" />}
              </Button>
            </div>

            {copied && (
              <p className="text-sm text-accent" role="status">
                Link copied to clipboard
              </p>
            )}

            <p className="text-sm text-muted-foreground italic">
              Thanks for reading! Feel free to share your thoughts via email.
            </p>
          </div>
        </article>

        {/* Navigation */}
        <div className="mt-12 flex justify-center">
          <Link to="/blog">
            <Button variant="ghost" className="group hover:text-primary">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Articles
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default BlogPost;
