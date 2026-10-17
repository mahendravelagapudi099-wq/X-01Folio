import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, FileText } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Keeps a breadcrumb of broken links in the console for maintenance.
    console.error('404: user attempted to access a non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 pt-16 text-center">
      <p className="mb-4 bg-gradient-primary bg-clip-text font-orbitron text-7xl font-bold text-transparent md:text-9xl">
        404
      </p>
      <h1 className="mb-3 font-orbitron text-2xl font-semibold md:text-3xl">Page not found</h1>
      <p className="mb-10 max-w-md text-muted-foreground">
        The link{' '}
        <span className="font-jetbrains text-primary">{location.pathname}</span>
        {' '}doesn&rsquo;t exist. It may have been moved or renamed.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button asChild className="glass-card glow-primary">
          <Link to="/">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <Button asChild variant="outline" className="glass-card">
          <Link to="/blog">
            <FileText className="mr-2 h-4 w-4" />
            Read the Blog
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
