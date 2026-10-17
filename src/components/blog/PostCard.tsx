import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import { isValidDate, type PostMeta } from '@/lib/blog';

/**
 * One article card. The whole card is a real <Link> to the internal article
 * route (/blog/:slug) so it is keyboard-activizable, focusable, and never
 * points at an external host again.
 */
export const PostCard = ({
  post,
  index = 0,
  headingLevel = 'h3',
}: {
  post: PostMeta;
  index?: number;
  headingLevel?: 'h2' | 'h3';
}) => {
  const Heading = headingLevel;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.08, 0.4) }}
      className="h-full"
    >
      <Link
        to={`/blog/${post.slug}`}
        aria-label={`Read article: ${post.title}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl glass-card transition-all duration-500 hover:scale-[1.02] hover:glow-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <div className="relative h-48 overflow-hidden">
          {post.feature_image ? (
            <img
              src={post.feature_image}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="h-full w-full bg-gradient-primary opacity-30" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          {post.featured && (
            <div className="absolute left-4 top-4 glass-card border border-primary/30 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              Featured
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            {isValidDate(post.published_at) && (
              <time dateTime={post.published_at} className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(post.published_at).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </time>
            )}
            {post.reading_time && (
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.reading_time}
              </span>
            )}
          </div>

          <Heading className="mb-3 line-clamp-2 font-orbitron text-xl font-bold transition-colors group-hover:text-primary">
            {post.title}
          </Heading>

          {post.excerpt && (
            <p className="mb-6 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {post.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] uppercase tracking-tighter text-primary"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center font-bold text-sm text-primary transition-all duration-300 group-hover:gap-3">
            Read Article
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
