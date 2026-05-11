import { useState, useEffect, useRef } from 'react';
import { Calendar, ArrowRight, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  feature_image: string;
  published_at: string;
  featured: boolean;
  tags: string[];
  reading_time: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .order('published_at', { ascending: false });

        if (error) throw error;
        setPosts(data || []);
      } catch (err) {
        console.error('Failed to load posts', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <section id="blog" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="h-96 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="py-24 px-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Latest Articles
            </h2>
            <div className="w-24 h-1.5 bg-gradient-primary mx-auto rounded-full mb-8" />
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Deep dives into AI, Machine Learning, and Modern Web Architecture.
            </p>
          </motion.div>
        </div>

        <div className="relative group">
          <Swiper
            key={posts.length}
            modules={[Navigation, Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            observer={true}
            observeParents={true}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-20"
          >
            {posts.map((post) => (
              <SwiperSlide key={post.id} className="h-auto">
                <Link to={`/blog/${post.slug}`} className="block h-full">
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="glass-card group h-full flex flex-col border border-primary/10 hover:border-primary/30 transition-all duration-500 overflow-hidden glow-hover"
                  >
                    {/* Image Container */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={post.feature_image || 'https://images.unsplash.com/photo-1518770660439-4636190af475'}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {post.featured && (
                        <div className="absolute top-4 left-4 glass-card px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary border border-primary/30">
                          Featured
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(post.published_at).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {post.reading_time || '5 min'}
                        </span>
                      </div>

                      <h3 className="text-xl font-orbitron font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags?.map((tag) => (
                          <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-tighter">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center text-primary font-bold text-sm group-hover:gap-3 transition-all duration-300">
                        Read Article <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button 
            ref={prevRef}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 w-12 h-12 rounded-full glass-card border border-primary/20 flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 hover:bg-primary hover:text-white"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button 
            ref={nextRef}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 w-12 h-12 rounded-full glass-card border border-primary/20 flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 hover:bg-primary hover:text-white"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-12 text-center">
           <p className="text-sm text-muted-foreground">
             Powered by Supabase & Open Source Technology
           </p>
        </div>
      </div>
    </section>
  );
};

export default Blog;

