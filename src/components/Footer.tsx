import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/mahendravelagapudi099-wq",
      label: "GitHub"
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/velagapudi-mahendra-543481353",
      label: "LinkedIn"
    },
    {
      icon: Twitter,
      href: "https://twitter.com",
      label: "Twitter"
    },
    {
      icon: Mail,
      href: "mahendravelagapudi099@gmail.com",
      label: "Email"
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 px-6 border-t border-glass-border/20">
      <div className="max-w-7xl mx-auto">
        <div className="fade-in text-center">
          {/* Logo/Name */}
          <button 
            onClick={scrollToTop}
            className="text-3xl font-orbitron font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            VELAGAPUDI   MAHENDRA
          </button>
          
          {/* Tagline */}
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Building the future through innovative technology solutions and meaningful digital experiences.
          </p>
          
          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-8">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-4 rounded-full hover:glow-accent transition-all duration-300 hover:scale-110 group"
                aria-label={label}
              >
                <Icon className="h-5 w-5 text-primary group-hover:text-accent transition-colors duration-300" />
              </a>
            ))}
          </div>
          
          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-glass-border to-transparent mb-8" />
          
          {/* Copyright */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 text-sm text-muted-foreground">
            <span>© 2024 Velagapudi  Mahendra . All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-accent animate-pulse" />
              <span>and lots of caffeine</span>
            </div>
          </div>
          
          {/* Tech Stack Credit */}
          <p className="text-xs text-muted-foreground/60 mt-4">
            Built with React, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;