import { FileText, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

/** Loading state */
export const PostsLoading = ({ className = '' }: { className?: string }) => (
  <div
    role="status"
    aria-label="Loading articles"
    className={`space-y-4 ${className}`}
  >
    {[...Array(3)].map((_, i) => (
      <div key={i} className="p-6 rounded border border-border bg-card/40 animate-pulse flex flex-col gap-3" aria-hidden="true">
        <div className="h-3 w-28 rounded bg-muted" />
        <div className="h-6 w-3/4 rounded bg-muted" />
        <div className="h-4 w-full rounded bg-muted/60" />
      </div>
    ))}
    <span className="sr-only">Loading articles…</span>
  </div>
);

/** Error state */
export const PostsError = ({
  onRetry,
  className = '',
}: {
  onRetry: () => void;
  className?: string;
}) => (
  <div role="alert" className={`p-8 rounded border border-border bg-card text-center font-sans ${className}`}>
    <div className="mb-3 inline-flex rounded border border-destructive/30 bg-destructive/10 p-3">
      <AlertCircle className="h-5 w-5 text-destructive" />
    </div>
    <h3 className="mb-2 font-sans text-xl font-bold text-foreground">Failed to retrieve articles</h3>
    <p className="mx-auto mb-6 max-w-md text-sm text-muted-foreground">
      The Supabase publication endpoint did not respond. Please try reloading.
    </p>
    <Button onClick={onRetry} variant="outline" className="border-border text-xs font-mono uppercase tracking-wider gap-2">
      <RefreshCw className="h-3.5 w-3.5" /> Retry Request
    </Button>
  </div>
);

/** Empty state */
export const PostsEmpty = ({ className = '' }: { className?: string }) => (
  <div className={`p-10 rounded border border-border bg-card text-center font-sans ${className}`}>
    <div className="mb-3 inline-flex rounded border border-border bg-muted p-3">
      <FileText className="h-5 w-5 text-foreground" />
    </div>
    <h3 className="mb-2 font-sans text-xl font-bold text-foreground">No articles published yet</h3>
    <p className="mx-auto max-w-md text-sm text-muted-foreground mb-4">
      Articles published via the automated Muse AI pipeline will appear here in chronological order.
    </p>
    <a
      href="https://github.com/mahendravelagapudi099-wq"
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs font-mono font-medium text-primary hover:underline"
    >
      Follow on GitHub &rarr;
    </a>
  </div>
);

