import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { usePosts } from '@/lib/blog';
import { PostCard } from '@/components/blog/PostCard';
import { PostsLoading, PostsError, PostsEmpty } from '@/components/blog/PostsStatus';
import { Button } from '@/components/ui/button';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Blog = () => {
  const { data: allPosts, isLoading, isError, refetch } = usePosts();
  const posts = allPosts?.slice(0, 6);
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  return (
    <section
      id="blog"
      className="relative overflow-hidden px-6 py-24"
      aria-labelledby="blog-heading"
    >
      {/* Background Orbs */}
      <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2
            id="blog-heading"
            className="mb-6 inline-block bg-gradient-primary bg-clip-text font-orbitron text-4xl font-bold text-transparent md:text-5xl lg:text-6xl"
          >
            Latest Articles
          </h2>
          <div className="mx-auto mb-8 h-1.5 w-24 rounded-full bg-gradient-primary" />
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Deep dives into AI, Machine Learning, and Modern Web Architecture.
          </p>
        </div>

        {isLoading && <PostsLoading />}

        {isError && <PostsError onRetry={() => refetch()} />}

        {!isLoading && !isError && posts && posts.length > 0 && (
          <div className="group relative">
            <Swiper
              key={`swiper-${posts.length}`}
              modules={[Navigation, Autoplay, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{ prevEl, nextEl }}
              pagination={{ clickable: true, dynamicBullets: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="!pb-4"
              a11y={{ prevSlideMessage: 'Previous article', nextSlideMessage: 'Next article' }}
            >
              {posts.map((post, index) => (
                <SwiperSlide key={post.id} className="h-auto !flex">
                  <PostCard post={post} index={index} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button
              ref={setPrevEl}
              type="button"
              aria-label="Previous article"
              className="absolute top-1/2 left-0 z-20 -translate-x-6 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full glass-card border border-primary/20 text-primary opacity-0 transition-all duration-300 hover:bg-primary hover:text-white group-hover:translate-x-0 group-hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:opacity-100"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              ref={setNextEl}
              type="button"
              aria-label="Next article"
              className="absolute top-1/2 right-0 z-20 translate-x-6 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full glass-card border border-primary/20 text-primary opacity-0 transition-all duration-300 hover:bg-primary hover:text-white group-hover:translate-x-0 group-hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:opacity-100"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        )}

        {!isLoading && !isError && (!posts || posts.length === 0) && <PostsEmpty />}

        <div className="mt-12 flex flex-col items-center gap-4">
          <Button asChild variant="outline" className="glass-card">
            <Link to="/blog">
              View all articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground">
            Powered by Supabase &amp; Open Source Technology
          </p>
        </div>
      </div>
    </section>
  );
};

export default Blog;
