import { useState } from 'react';
import { Github, Linkedin, Mail, MessageSquare, X, ArrowUpRight } from 'lucide-react';

const QuickConnect = () => {
  const [isOpen, setIsOpen] = useState(false);

  const channels = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/velagapudi-mahendra-543481353/",
      label: "LinkedIn",
      sublabel: "Professional Profile",
    },
    {
      icon: Github,
      href: "https://github.com/mahendravelagapudi099-wq",
      label: "GitHub",
      sublabel: "Code & Artifacts",
    },
    {
      icon: Mail,
      href: "mailto:contact@mahendraa.dev",
      label: "Email",
      sublabel: "contact@mahendraa.dev",
    }
  ];

  return (
    <>
      {/* Precision Floating Quick Connect Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open quick connect panel"
          className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-[#181818] border border-[#272727] text-[#FFFFFF] shadow-xl hover:border-[#FFFFFF]/60 active:scale-[0.98] transition-all duration-300 ease-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[#FFFFFF] border border-[#000000]" />
          <MessageSquare className="h-4 w-4" />
        </button>
      </div>

      {/* Quick Connect Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in-0 duration-300">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#000000]/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Content Card with nested radius formula: outer rounded-xl (12px), p-6 (24px) */}
          <div className="relative p-6 sm:p-8 rounded-xl border border-[#272727] bg-[#181818] max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-300 ease-base font-sans">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close dialog"
              className="absolute top-4 right-4 p-1.5 rounded-md text-[#9B9B9B] hover:text-[#FFFFFF] hover:bg-[#1F1F1F] transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="text-left mb-6">
              <span className="text-[11px] font-mono text-[#9B9B9B] font-semibold tracking-wider uppercase">
                DIRECT CONTACT
              </span>
              <h3 className="text-xl font-semibold text-[#FFFFFF] mt-1">
                Connect with Mahendra
              </h3>
              <p className="text-xs text-[#9B9B9B] mt-1 leading-relaxed">
                Available for research fellowships, data science internships, and technical collaboration.
              </p>
            </div>

            {/* Channel List */}
            <div className="space-y-2.5">
              {channels.map(({ icon: Icon, href, label, sublabel }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center justify-between p-3.5 rounded-lg border border-[#272727] bg-[#1F1F1F] hover:border-[#FFFFFF]/40 transition-all duration-300 ease-base group"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-[#272727] text-[#FFFFFF]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#FFFFFF] group-hover:text-neutral-300 transition-colors">
                        {label}
                      </div>
                      <div className="text-[11px] font-mono text-[#9B9B9B]">
                        {sublabel}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[#9B9B9B] group-hover:text-[#FFFFFF] transition-colors" />
                </a>
              ))}
            </div>

            {/* Footer note */}
            <div className="mt-6 pt-4 border-t border-[#272727] text-center">
              <p className="text-[11px] font-mono text-[#9B9B9B]">
                Responses typically within 24 hours &bull; Hyderabad (IST)
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickConnect;
