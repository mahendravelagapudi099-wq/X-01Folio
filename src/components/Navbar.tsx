import React, { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Logo } from '@/components/Logo';

const NAV_ITEMS = [
  { path: '/projects', label: 'Projects' },
  { path: '/research', label: 'Research' },
  { path: '/credentials', label: 'Credentials' },
  { path: '/about', label: 'About' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Close the mobile drawer on every route change.
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-1.5 rounded-md text-xs font-mono transition-colors duration-300 ease-base ${
      isActive
        ? 'text-foreground bg-[#1F1F1F] font-semibold border border-[#272727]'
        : 'text-muted-foreground hover:text-foreground hover:bg-[#181818]'
    }`;

  return (
    <header className="sticky top-0 z-50 pt-3 px-4 sm:px-6">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6 rounded-xl border border-[#272727] bg-[#181818]/90 backdrop-blur-md shadow-lg shadow-black/40">
        {/* Brand Logo Lockup */}
        <Link
          to="/"
          className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
          aria-label="Home - Velagapudi Mahendra"
        >
          <Logo size={26} showWordmark={true} />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-1 sm:flex">
          {NAV_ITEMS.map(({ path, label }) => (
            <NavLink key={path} to={path} className={navLinkClass}>
              {label}
            </NavLink>
          ))}
        </div>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#FFFFFF] text-[#000000] font-sans text-xs font-semibold hover:opacity-90 active:scale-[0.98] transition-all duration-300 ease-base"
          >
            Inquire
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-[#1F1F1F] sm:hidden transition-colors"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="sm:hidden mt-2 mx-auto max-w-5xl rounded-xl border border-[#272727] bg-[#181818]/95 backdrop-blur-xl p-4 flex flex-col gap-1 shadow-2xl">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm font-sans ${
                isActive ? 'text-foreground bg-[#1F1F1F] font-semibold' : 'text-muted-foreground hover:text-foreground'
              }`
            }
          >
            Home
          </NavLink>
          {NAV_ITEMS.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-sans ${
                  isActive ? 'text-foreground bg-[#1F1F1F] font-semibold' : 'text-muted-foreground hover:text-foreground'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <div className="pt-2 mt-2 border-t border-[#272727]">
            <Link
              to="/contact"
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-md bg-[#FFFFFF] text-[#000000] font-sans text-xs font-semibold"
            >
              Inquire <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
