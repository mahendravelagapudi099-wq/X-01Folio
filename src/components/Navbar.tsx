import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const SECTION_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'research', label: 'Research' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Close the mobile drawer on every route change.
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Highlight whichever section is actually in view (home page only).
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: [0, 0.25, 0.5] },
    );

    SECTION_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [location.pathname]);

  const scrollToSection = (id: string) => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (location.pathname !== '/') {
      navigate('/');
      // let the home page render, then scroll
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
      }, 90);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  const onBlog = location.pathname.startsWith('/blog');
  const linkBase =
    'rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';
  const linkIdle = 'text-muted-foreground hover:text-foreground';
  const linkActive = 'text-primary';

  return (
    <header className="sticky top-0 z-40 border-b border-glass-border/20 bg-background/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="bg-gradient-primary bg-clip-text font-orbitron text-lg font-bold text-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          VM
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {SECTION_ITEMS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollToSection(id)}
              className={`${linkBase} ${activeSection === id ? linkActive : linkIdle}`}
            >
              {label}
            </button>
          ))}
          <Link
            to="/blog"
            className={`${linkBase} ${onBlog ? linkActive : linkIdle}`}
          >
            Blog
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          className="flex h-10 w-10 items-center justify-center rounded-lg glass-card text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="md:hidden">
          <div
            className="fixed inset-0 top-16 z-30 bg-background/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-40 space-y-1 border-t border-glass-border/20 bg-background/95 p-4 backdrop-blur-lg">
            {SECTION_ITEMS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollToSection(id)}
                className={`block w-full rounded-lg px-4 py-3 text-left text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  activeSection === id ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-glass/50'
                }`}
              >
                {label}
              </button>
            ))}
            <Link
              to="/blog"
              className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                onBlog ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-glass/50'
              }`}
            >
              Blog
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
