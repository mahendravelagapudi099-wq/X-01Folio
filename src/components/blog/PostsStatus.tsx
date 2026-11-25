import { FileText, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

/** Error state (retained for route-level error fallback) */
export const PostsError = ({
  onRetry,
  className = '',
}: {
  onRetry: () => void;
  className?: string;
}) => (
  <div role="alert" className={`p-8 rounded-lg border border-border bg-card text-center font-sans ${className}`}>
    <div className="mb-3 inline-flex rounded border border-destructive/30 bg-destructive/10 p-3">
      <AlertCircle className="h-5 w-5 text-destructive" />
    </div>
    <h3 className="mb-2 font-sans text-xl font-bold text-foreground">Failed to retrieve articles</h3>
    <p className="mx-auto mb-6 max-w-md text-sm text-muted-foreground">
      Unable to load articles at this time. Please try reloading.
    </p>
    <Button onClick={onRetry} variant="outline" className="border-border text-xs font-mono uppercase tracking-wider gap-2">
      <RefreshCw className="h-3.5 w-3.5" /> Retry Request
    </Button>
  </div>
);

/** Empty state for no posts or no filter matches */
export const PostsEmpty = ({
  hasActiveFilters = false,
  onResetFilters,
  className = '',
}: {
  hasActiveFilters?: boolean;
  onResetFilters?: () => void;
  className?: string;
}) => (
  <div
    role="status"
    aria-live="polite"
    className={`p-10 rounded-lg border border-border bg-card text-center font-sans ${className}`}
  >
    <div className="mb-3 inline-flex rounded border border-border bg-secondary p-3">
      <FileText className="h-5 w-5 text-foreground" />
    </div>
    <h3 className="mb-2 font-sans text-xl font-semibold text-foreground">
      {hasActiveFilters ? 'No matching articles' : 'No articles published yet'}
    </h3>
    <p className="mx-auto max-w-md text-sm text-muted-foreground mb-5">
      {hasActiveFilters
        ? 'No articles match your current tag or search filter.'
        : 'Technical notes and case studies will appear here as they are published.'}
    </p>
    {hasActiveFilters && onResetFilters ? (
      <button
        type="button"
        onClick={onResetFilters}
        className="inline-flex items-center gap-2 px-4 py-2 rounded border border-border bg-secondary hover:bg-accent text-xs font-mono uppercase tracking-wider text-foreground transition-colors"
      >
        Reset Filters
      </button>
    ) : (
      <a
        href="https://github.com/mahendravelagapudi099-wq"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs font-mono font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
      >
        Follow on GitHub &rarr;
      </a>
    )}
  </div>
);
