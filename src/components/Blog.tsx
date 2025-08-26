import { useState, useEffect } from 'react';
import { Calendar, Clock, Tag, X } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  readTime: string;
  tags: string[];
  featured: boolean;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [slides, setSlides] = useState<BlogPost[][]>([]);

  useEffect(() => {
    fetch('/posts.json')
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort(
          (a: BlogPost, b: BlogPost) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setPosts(sorted);
      })
      .catch(err => console.error('Failed to load posts', err));
  }, []);

  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));
  const filteredPosts = selectedTag
    ? posts.filter(post => post.tags.includes(selectedTag))
    : posts;

  // Function to split posts into slides based on screen width
  const getSlides = () => {
    const width = window.innerWidth;
    let postsPerSlide = 6; // Default for desktop
    if (width < 768) postsPerSlide = 1; // Mobile
    return filteredPosts.reduce<BlogPost[][]>((acc, post, i) => {
      const slideIndex = Math.floor(i / postsPerSlide);
      if (!acc[slideIndex]) acc[slideIndex] = [];
      acc[slideIndex].push(post);
      return acc;
    }, []);
  };

  useEffect(() => {
    setSlides(getSlides());
    const handleResize = () => setSlides(getSlides());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [filteredPosts]);

  const BlogModal = ({ post, onClose }: { post: BlogPost; onClose: () => void }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm">
      <div className="glass-card w-full max-w-xl max-h-[90vh] overflow-y-auto glow-primary">
        <div className="relative">
          <button
            onClick={onClose}
            aria-label="Close blog post"
            className="absolute top-4 right-4 glass-card p-2 rounded-full hover:glow-accent transition-all duration-300"
          >
            <X className="h-6 w-6" />
          </button>

          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-56 sm:h-64 object-cover rounded-t-2xl"
          />

          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                {new Date(post.date).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                {post.readTime}
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-orbitron font-bold mb-4 sm:mb-6 bg-gradient-primary bg-clip-text text-transparent">
              {post.title}
            </h3>

            <div className="prose prose-invert max-w-none mb-4 sm:mb-6">
              <p className="text-muted-foreground leading-relaxed">{post.content}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="glass-card px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm hover:glow-accent transition-all duration-300 flex items-center gap-1"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="blog" className="py-16 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="fade-in text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-bold mb-4 sm:mb-6 bg-gradient-primary bg-clip-text text-transparent">
          Latest Articles
        </h2>
        <div className="w-20 h-1 sm:w-24 bg-gradient-primary mx-auto rounded-full" />
        <p className="text-muted-foreground mt-4 sm:mt-6 max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-base">
          Insights, tutorials, and thoughts on the latest in technology and development
        </p>
      </div>

      {/* Tag Filter */}
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

      {/* Swiper Carousel */}
      <Swiper
        navigation
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 1, spaceBetween: 15 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 1, spaceBetween: 30 }, // Desktop shows full grid
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
                <div
                  key={post.id}
                  className="cursor-pointer group"
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="glass-card overflow-hidden hover:glow-secondary transition-all duration-500 hover:scale-[1.02] h-full flex flex-col">
                    <div className="relative overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-48 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
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
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </div>
                      </div>
                      <h3 className="text-base sm:text-lg font-orbitron font-semibold mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-2 sm:mb-4 line-clamp-3 flex-1 text-sm sm:text-base">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedPost && <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />}
    </section>
  );
};

export default Blog;
