import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Twitter, Mail, Instagram, Users, X } from 'lucide-react';

const QuickConnect = () => {
  const [isOpen, setIsOpen] = useState(false);

  const socialLinks = [
    {
      icon: Instagram,
      href: "https://instagram.com",
      label: "Instagram",
      color: "from-pink-300/80 to-purple-300/80",
      hoverColor: "hover:from-pink-400 hover:to-purple-400"
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/velagapudi-mahendra-543481353/",
      label: "LinkedIn", 
      color: "from-blue-300/80 to-indigo-300/80",
      hoverColor: "hover:from-blue-400 hover:to-indigo-400"
    },
    {
      icon: Github,
      href: "https://github.com/mahendravelagapudi099-wq",
      label: "GitHub",
      color: "from-slate-300/80 to-gray-300/80",
      hoverColor: "hover:from-slate-400 hover:to-gray-400"
    },
    {
      icon: Twitter,
      href: "https://twitter.com",
      label: "Twitter",
      color: "from-sky-300/80 to-cyan-300/80",
      hoverColor: "hover:from-sky-400 hover:to-cyan-400"
    },
    {
      icon: Mail,
      href: "mailto:sarah.watson@email.com",
      label: "Email",
      color: "from-emerald-300/80 to-teal-300/80",
      hoverColor: "hover:from-emerald-400 hover:to-teal-400"
    }
  ];

  return (
    <>
      {/* Floating Quick Connect Button with Text */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center">
        {/* Text above button */}
        <span className="mb-2 text-sm font-semibold text-primary animate-bounce">
         Hey!
         👋 Wave at me!
        </span>

        <div className="relative">
          {/* Pulse rings */}
          <div className="absolute inset-0 rounded-full animate-ping bg-primary/20 scale-110"></div>
          <div className="absolute inset-0 rounded-full animate-pulse bg-primary/10 scale-125 animation-delay-75"></div>
          
          <Button
            onClick={() => setIsOpen(true)}
            className="glass-card w-16 h-16 rounded-full p-0 glow-primary hover:glow-accent hover:scale-110 transition-all duration-500 group relative overflow-hidden"
            variant="outline"
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-500"></div>
            
            <Users className="h-7 w-7 text-primary group-hover:text-accent transition-all duration-500 relative z-10 group-hover:scale-110" />
          </Button>
        </div>
      </div>

      {/* Social Links Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in-0 duration-300">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-lg"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Popup Content */}
          <div className="relative glass-card p-8 rounded-3xl glow-primary max-w-sm w-full animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl"></div>
            
            {/* Close Button */}
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              className="absolute top-4 right-4 w-9 h-9 p-0 rounded-full hover:bg-destructive/20 backdrop-blur-sm border border-glass-border/20 transition-all duration-300 hover:scale-110"
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Header */}
            <div className="text-center mb-8 relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 mb-4 backdrop-blur-sm border border-glass-border/30">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-playfair font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Quick Connect
              </h3>
              <p className="text-muted-foreground text-sm font-inter">
                Let's connect on social media!
              </p>
            </div>

            {/* Social Links Grid */}
            <div className="grid grid-cols-2 gap-4 relative z-10">
              {socialLinks.map(({ icon: Icon, href, label, color, hoverColor }, index) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`glass-card p-5 rounded-2xl hover:glow-accent transition-all duration-500 hover:scale-105 hover:-translate-y-1 group text-center animate-in fade-in-0 slide-in-from-bottom-4 duration-700`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setIsOpen(false)}
                >
                  <div className={`w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${color} ${hoverColor} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                    <Icon className="h-7 w-7 text-white drop-shadow-sm" />
                  </div>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300 font-inter">
                    {label}
                  </span>
                </a>
              ))}
            </div>

            {/* Footer Message */}
            <div className="text-center mt-8 pt-6 border-t border-glass-border/30 relative z-10">
              <p className="text-xs text-muted-foreground font-inter leading-relaxed">
                Follow me for updates on my data science journey! ✨
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickConnect;
