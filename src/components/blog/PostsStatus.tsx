import { FileText, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

/** Loading placeholder — decorative shimmer, announced as a status region. */
export const PostsLoading = ({ className = '' }: { className?: string }) => (
  <div
    role="status"
    aria-label="Loading articles"
    className={`grid gap-8 md:grid-cols-2 lg:grid-cols-3 ${className}`}
  >
    {[...Array(3)].map((_, i) => (
      <div key={i} className="glass-card overflow-hidden animate-pulse" aria-hidden="true">
        <div className="h-48 bg-glass-border/40" />
        <div className="p-6 space-y-4">
          <div className="h-3 w-24 rounded bg-glass-border/40" />
          <div className="h-5 w-3/4 rounded bg-glass-border/40" />
          <div className="h-3 w-full rounded bg-glass-border/30" />
          <div className="h-3 w-2/3 rounded bg-glass-border/30" />
        </div>
      </div>
    ))}
    <span className="sr-only">Loading articles…</span>
  </div>
);

/** Error state — turns Supabase/network failures into an actionable message. */
export const PostsError = ({
  onRetry,
  className = '',
}: {
  onRetry: () => void;
  className?: string;
}) => (
  <div role="alert" className={`glass-card p-10 text-center ${className}`}>
    <div className="mb-4 inline-flex rounded-2xl border border-destructive/30 bg-destructive/10 p-4">
      <AlertCircle className="h-7 w-7 text-destructive" />
    </div>
    <h3 className="mb-2 font-orbitron text-xl font-semibold">Couldn&rsquo;t load articles</h3>
    <p className="mx-auto mb-6 max-w-md text-muted-foreground">
      The blog didn&rsquo;t respond. That&rsquo;s usually temporary &mdash; please try again in a
      moment.
    </p>
    <Button onClick={onRetry} variant="outline" className="glass-card gap-2">
      <RefreshCw className="h-4 w-4" /> Try again
    </Button>
  </div>
);

/** Empty state — the table has no rows yet. Replaces the previous `return null`,
 *  which silently hid the whole section from readers. */
export const PostsEmpty = ({ className = '' }: { className?: string }) => (
  <div className={`glass-card p-10 text-center ${className}`}>
    <div className="mb-4 inline-flex rounded-2xl border border-primary/30 bg-primary/10 p-4">
      <FileText className="h-7 w-7 text-primary" />
    </div>
    <h3 className="mb-2 font-orbitron text-xl font-semibold">No articles published yet</h3>
    <p className="mx-auto max-w-md text-muted-foreground">
      New writing is on the way. In the meantime, take a look at the projects section or
      follow along on GitHub.
    </p>
    <a
      href="https://github.com/mahendravelagapudi099-wq"
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
    >
      github.com/mahendravelagapudi099-wq
    </a>
  </div>
);
