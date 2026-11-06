import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, BookOpen } from 'lucide-react';
import { usePosts, isValidDate } from '@/lib/blog';
import { PostsLoading, PostsError, PostsEmpty } from '@/components/blog/PostsStatus';

export default function BlogIndex() {
  const { data: posts, isLoading, isError, refetch } = usePosts();
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Extract all unique tags
  const allTags = React.useMemo(() => {
    if (!posts) return [];
    const set = new Set<string>();
    posts.forEach((p) => p.tags?.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [posts]);

  const filteredPosts = React.useMemo(() => {
    if (!posts) return [];
    if (selectedTag === 'all') return posts;
    return posts.filter((p) => p.tags?.includes(selectedTag));
  }, [posts, selectedTag]);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground pb-24 pt-28 px-6 max-w-5xl mx-auto">
      <Helmet>
        <title>Technical Blog &amp; Writings | Velagapudi Mahendra</title>
        <meta
          name="description"
          content="Deep dives into runtime verification, autonomous AI agent safety, and empirical data science by Velagapudi Mahendra."
        />
        <link rel="canonical" href="https://mahendraa.dev/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Technical Blog | Velagapudi Mahendra" />
        <meta
          property="og:description"
          content="Deep dives into runtime verification, autonomous AI agent safety, and empirical data science by Velagapudi Mahendra."
        />
      </Helmet>

      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-8">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <span className="text-foreground">Technical Blog</span>
      </div>

      {/* Header */}
      <header className="border-b border-border pb-8 mb-12">
        <h1 className="text-4xl sm:text-5xl font-sans font-bold text-foreground mb-4">
          Writings &amp; Technical Essays
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
          Analytical essays and research notes covering autonomous AI agent runtime safety, abstract syntax tree (AST) execution gates, and scalable data systems.
        </p>

        {/* Filter Tags */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-6">
            <button
              onClick={() => setSelectedTag('all')}
              className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                selectedTag === 'all'
                  ? 'bg-foreground text-background font-semibold'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              All Articles ({posts?.length ?? 0})
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                  selectedTag === tag
                    ? 'bg-foreground text-background font-semibold'
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Status States */}
      {isLoading && <PostsLoading />}
      {isError && <PostsError onRetry={() => refetch()} />}

      {/* Articles Ledger */}
      {!isLoading && !isError && filteredPosts.length > 0 && (
        <div className="divide-y divide-border border-y border-border">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="py-8 group flex flex-col md:flex-row md:items-start justify-between gap-6"
            >
              {/* Left Column: Date & Reading Time in Tabular Numerals */}
              <div className="md:w-1/4 shrink-0 text-xs font-mono text-muted-foreground tabular-nums">
                {isValidDate(post.published_at) && (
                  <time dateTime={post.published_at} className="block font-medium text-foreground mb-1">
                    {new Date(post.published_at).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                )}
                {post.reading_time && (
                  <span className="block text-muted-foreground">{post.reading_time}</span>
                )}
                {post.featured && (
                  <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-muted text-primary border border-border">
                    Featured
                  </span>
                )}
              </div>

              {/* Center Column: Title & Excerpt */}
              <div className="md:w-1/2 flex flex-col gap-2">
                <h2 className="text-xl sm:text-2xl font-sans font-bold text-foreground group-hover:text-primary transition-colors">
                  <Link to={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                {post.excerpt && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                )}

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {post.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-muted text-muted-foreground border border-border"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Link Action */}
              <div className="md:w-1/4 shrink-0 flex md:justify-end pt-1">
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-foreground group-hover:text-primary transition-colors"
                >
                  Read Essay <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      {!isLoading && !isError && filteredPosts.length === 0 && <PostsEmpty />}
    </div>
  );
}

