import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Logo } from '@/components/Logo';

const Footer = () => {
  return (
    <footer className="border-t border-[#272727] bg-[#181818] py-16 px-6 font-sans">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
          {/* Brand & Mission */}
          <div className="max-w-md flex flex-col gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
              aria-label="Velagapudi Mahendra"
            >
              <Logo size={28} showWordmark={true} />
            </Link>
            <p className="text-sm text-[#9B9B9B] leading-relaxed">
              B.Tech CSE (Data Science) student at Malla Reddy Engineering College &amp; Management Sciences, Hyderabad.
            </p>
          </div>

          {/* Quick Route Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs font-mono">
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-foreground uppercase tracking-wider text-[11px]">
                Systems
              </span>
              <Link to="/projects" className="text-[#9B9B9B] hover:text-foreground transition-colors duration-300 ease-base">
                All Projects
              </Link>
              <Link to="/projects/sentimentscopex" className="text-[#9B9B9B] hover:text-foreground transition-colors duration-300 ease-base">
                SentimentScopex
              </Link>
              <Link to="/projects/vectormind" className="text-[#9B9B9B] hover:text-foreground transition-colors duration-300 ease-base">
                VectorMind
              </Link>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-semibold text-foreground uppercase tracking-wider text-[11px]">
                Research &amp; CV
              </span>
              <Link to="/research" className="text-[#9B9B9B] hover:text-foreground transition-colors duration-300 ease-base">
                Research Proposal
              </Link>
              <Link to="/credentials" className="text-[#9B9B9B] hover:text-foreground transition-colors duration-300 ease-base">
                Verified Credentials
              </Link>
              <Link to="/about" className="text-[#9B9B9B] hover:text-foreground transition-colors duration-300 ease-base">
                Trajectory &amp; Bio
              </Link>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-semibold text-foreground uppercase tracking-wider text-[11px]">
                Channels
              </span>
              <a
                href="https://github.com/mahendravelagapudi099-wq"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9B9B9B] hover:text-foreground transition-colors duration-300 ease-base flex items-center gap-1"
              >
                GitHub <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href="https://www.linkedin.com/in/velagapudi-mahendra-543481353"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9B9B9B] hover:text-foreground transition-colors duration-300 ease-base flex items-center gap-1"
              >
                LinkedIn <ArrowUpRight className="w-3 h-3" />
              </a>
              <Link to="/contact" className="text-[#9B9B9B] hover:text-foreground transition-colors duration-300 ease-base">
                Contact &amp; Inquiries
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#272727] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#9B9B9B]">
          <span>
            &copy; 2026 Velagapudi Mahendra &bull; Hyderabad, India
          </span>
          <div className="flex items-center gap-4">
            <Link to="/blog" className="hover:text-foreground transition-colors duration-300 ease-base">
              Technical Monograph
            </Link>
            <span>&bull;</span>
            <a
              href="mailto:contact@mahendraa.dev"
              className="hover:text-foreground transition-colors duration-300 ease-base"
            >
              contact@mahendraa.dev
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
