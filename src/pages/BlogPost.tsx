import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Share2, Tag, Bookmark } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { BlockRenderer, Block } from '@/components/blog/BlockRenderer';
import { Button } from '@/components/ui/button';

interface Post {
  title: string;
  excerpt: string;
  feature_image: string;
  published_at: string;
  reading_time: string;
  blocks: Block[];
  tags: string[];
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        setPost(data);
      } catch (err) {
        console.error('Error fetching post:', err);
        navigate('/404');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
    window.scrollTo(0, 0);
  }, [slug, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{post.title} | Mahendra's Blog</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <header className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={post.feature_image || 'https://images.unsplash.com/photo-1518770660439-4636190af475'} 
            className="w-full h-full object-cover opacity-30" 
            alt="" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        </div>

        <div className="relative z-10 max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link to="/" className="inline-flex items-center text-primary mb-8 hover:gap-2 transition-all group">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
            </Link>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground mb-6 font-jetbrains">
              <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {new Date(post.published_at).toLocaleDateString()}</span>
              <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> {post.reading_time || '5 min'} read</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap justify-center gap-2">
              {post.tags?.map(tag => (
                <span key={tag} className="glass-card px-4 py-1 text-xs font-bold uppercase tracking-wider text-primary border border-primary/20">
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pb-24 -mt-20 relative z-20">
        <article className="glass-card p-8 md:p-12 border border-primary/10 shadow-2xl">
          <BlockRenderer blocks={post.blocks} />
          
          <div className="mt-16 pt-8 border-t border-primary/10 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="rounded-full">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground italic">
              Thanks for reading! Feel free to share your thoughts via email.
            </p>
          </div>
        </article>

        {/* Navigation */}
        <div className="mt-12 flex justify-center">
          <Link to="/">
            <Button variant="ghost" className="hover:text-primary group">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
              Back to Articles
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default BlogPost;
