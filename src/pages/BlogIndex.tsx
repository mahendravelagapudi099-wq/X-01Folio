import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { usePosts } from '@/lib/blog';
import { PostCard } from '@/components/blog/PostCard';
import { PostsLoading, PostsError, PostsEmpty } from '@/components/blog/PostsStatus';

const BlogIndex = () => {
  const { data: posts, isLoading, isError, refetch } = usePosts();

  return (
    <div className="min-h-screen bg-background pb-24 pt-20">
      <Helmet>
        <title>Blog | Velagapudi Mahendra</title>
        <meta
          name="description"
          content="Deep dives into AI, machine learning, data science and modern web architecture by Velagapudi Mahendra."
        />
        <link rel="canonical" href="https://mahendraa.dev/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Blog | Velagapudi Mahendra" />
        <meta
          property="og:description"
          content="Deep dives into AI, machine learning, data science and modern web architecture by Velagapudi Mahendra."
        />
      </Helmet>

      <div className="mx-auto max-w-7xl px-6">
        <Link
          to="/"
          className="group mb-10 inline-flex items-center font-medium text-primary transition-all hover:gap-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>

        <div className="mb-16 text-center">
          <h1 className="mb-6 inline-block bg-gradient-primary bg-clip-text font-orbitron text-4xl font-bold text-transparent md:text-6xl">
            The Blog
          </h1>
          <div className="mx-auto mb-8 h-1.5 w-24 rounded-full bg-gradient-primary" />
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Deep dives into AI, machine learning, and modern web architecture.
          </p>
        </div>

        {isLoading && <PostsLoading />}

        {isError && <PostsError onRetry={() => refetch()} />}

        {!isLoading && !isError && posts && posts.length > 0 && (
          <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2">
            {posts.map((post, index) => (
              <PostCard key={post.id} post={post} index={index} headingLevel="h2" />
            ))}
          </div>
        )}

        {!isLoading && !isError && (!posts || posts.length === 0) && <PostsEmpty />}
      </div>
    </div>
  );
};

export default BlogIndex;
