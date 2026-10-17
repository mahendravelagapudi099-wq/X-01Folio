import { Component, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Catches render-time errors anywhere below it so a broken component can't
 * blank out the whole app. Errors are logged for diagnostics; the user gets a
 * recovery UI.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: { componentStack?: string | null }) {
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught:', error, info?.componentStack ?? '');
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] items-center justify-center px-6 pt-16">
          <div className="w-full max-w-lg glass-card p-8 text-center md:p-12">
            <h1 className="mb-3 font-orbitron text-3xl font-bold">Something broke</h1>
            <p className="mb-8 text-muted-foreground">
              An unexpected error happened while rendering this page. Try reloading &mdash;
              if it keeps failing, head back home.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="rounded-lg glass-card px-6 py-3 font-medium text-primary transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Reload page
              </button>
              <Link
                to="/"
                className="rounded-lg border border-glass-border px-6 py-3 font-medium text-muted-foreground transition-all duration-300 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Go home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
