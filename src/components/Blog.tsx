import { useState, useEffect, useCallback } from 'react';
import { Calendar, Tag } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import GhostContentAPI, { PostOrPage } from '@tryghost/content-api';
import 'swiper/css';
import 'swiper/css/navigation';

const ghostClient = new GhostContentAPI({
  url: import.meta.env.VITE_GHOST_API_URL || 'https://demo.ghost.io',
  key: import.meta.env.VITE_GHOST_CONTENT_API_KEY || '22444f78447824223cefc48062',
  version: 'v5.0'
});

const Blog = () => {
  const [posts, setPosts] = useState<PostOrPage[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [slides, setSlides] = useState<PostOrPage[][]>([]);
  const blogUrl = import.meta.env.VITE_BLOG_URL || 'http://localhost:5173'; // Subdomain base URL

  useEffect(() => {
    ghostClient.posts.browse({ limit: 'all', include: ['tags'] })
      .then(data => {
        setPosts(data);
      })
      .catch(err => console.error('Failed to load posts', err));
  }, []);

  const allTags = Array.from(new Set(posts.flatMap(post => post.tags?.map(t => t.name) || []))).filter(Boolean) as string[];
  const filteredPosts = selectedTag
    ? posts.filter(post => post.tags?.some(t => t.name === selectedTag))
    : posts;

  const getSlides = useCallback(() => {
    const width = window.innerWidth;
    let postsPerSlide = 6;
    if (width < 768) postsPerSlide = 1;
    return filteredPosts.reduce<PostOrPage[][]>((acc, post, i) => {
      const slideIndex = Math.floor(i / postsPerSlide);
      if (!acc[slideIndex]) acc[slideIndex] = [];
      acc[slideIndex].push(post);
      return acc;
    }, []);
  }, [filteredPosts]);

  useEffect(() => {
    setSlides(getSlides());
    const handleResize = () => setSlides(getSlides());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getSlides]);

  return (
    <section id="blog" className="py-16 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="fade-in text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-bold mb-4 sm:mb-6 bg-gradient-primary bg-clip-text text-transparent">
          Latest Articles
        </h2>
        <div className="w-20 h-1 sm:w-24 bg-gradient-primary mx-auto rounded-full" />
        <p className="text-muted-foreground mt-4 sm:mt-6 max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-base">
          Read my latest thoughts on software engineering over at my new blog.
        </p>
      </div>

      <div className="fade-in delay-200 mb-8 sm:mb-12 flex flex-wrap justify-center gap-2 sm:gap-3">
        <button
          onClick={() => setSelectedTag(null)}
          className={`glass-card px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm transition-all duration-300 ${
            !selectedTag ? 'glow-primary' : 'hover:glow-secondary'
          }`}
        >
          All Posts
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`glass-card px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm transition-all duration-300 ${
              selectedTag === tag ? 'glow-primary' : 'hover:glow-secondary'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <Swiper
        navigation
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        loop={slides.length >= 3}
        autoplay={slides.length > 1 ? {
          delay: 3000,
          disableOnInteraction: false,
        } : false}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 1, spaceBetween: 15 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 1, spaceBetween: 30 },
        }}
      >
        {slides.map((slidePosts, index) => (
          <SwiperSlide key={index}>
            <div
              className={`
                grid gap-6
                lg:grid-cols-3 lg:grid-rows-2
                md:grid-cols-2 md:grid-rows-3
                grid-cols-1 grid-rows-1
              `}
            >
              {slidePosts.map(post => (
                <a
                  key={post.id}
                  href={`${blogUrl}/post/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer group"
                >
                  <div className="glass-card overflow-hidden hover:glow-secondary transition-all duration-500 hover:scale-[1.02] h-full flex flex-col">
                    <div className="relative overflow-hidden">
                      {post.feature_image && (
                        <img
                          src={post.feature_image}
                          alt={post.title}
                          className="w-full h-48 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      )}
                      {post.featured && (
                        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 glass-card px-2 py-1 text-xs sm:text-sm font-medium glow-accent">
                          Featured
                        </div>
                      )}
                    </div>
                    <div className="p-4 sm:p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {post.published_at ? new Date(post.published_at).toLocaleDateString() : ''}
                        </div>
                      </div>
                      <h3 className="text-base sm:text-lg font-orbitron font-semibold mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3 flex-1 text-sm sm:text-base">
                        {post.custom_excerpt || post.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {post.tags?.slice(0, 3).map(tag => (
                          <span key={tag.id} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded border border-primary/20">
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <div className="mt-12 text-center">
        <a 
          href={blogUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          View All Articles on My Blog
        </a>
      </div>
    </section>
  );
};

export default Blog;
