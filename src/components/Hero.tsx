import { Button } from '@/components/ui/button';
import { ArrowDown, Download, Github, Linkedin, Mail, ArrowUpRight, Terminal, CheckCircle2, Cpu } from 'lucide-react';
import profileImage from '@/assets/profilepic.png';

const Hero = () => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
      {/* Subtle ambient gradient vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(56,189,248,0.12),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typographic & Bio Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Live Availability Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/10 border border-secondary/25 text-secondary text-xs font-mono font-medium tracking-wide mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              <span>OPEN TO DATA SCIENCE & AI INTERNSHIPS &bull; 2026</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-foreground leading-[1.08] mb-6">
              Velagapudi <span className="text-primary">Mahendra</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-xl sm:text-2xl font-sans font-medium text-slate-300 mb-6">
              Computer Science & Data Science Engineer
            </p>

            {/* Mature, Truthful Bio */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-8">
              Undergraduate researcher and full-stack builder at MREM. I design applied machine learning systems, architect scalable data pipelines, and conduct research on risk-based verification for AI data agents.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 items-center mb-10 w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-primary hover:bg-sky-400 text-slate-950 font-sans font-semibold px-7 h-12 shadow-lg shadow-primary/20 transition-all duration-200"
                onClick={scrollToProjects}
              >
                Explore Projects
                <ArrowDown className="ml-2 h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-slate-800 bg-slate-900/80 hover:bg-slate-800/80 text-foreground font-sans font-medium px-6 h-12 transition-all duration-200"
                asChild
              >
                <a href="/Velagapudi_Mahendra_Resume.pdf" download="Velagapudi_Mahendra_Resume.pdf">
                  <Download className="mr-2 h-4 w-4 text-primary" />
                  Download CV
                </a>
              </Button>
            </div>

            {/* Social Proof & Profiles */}
            <div className="flex items-center gap-4 text-sm font-mono text-muted-foreground">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Verified Links:</span>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/mahendravelagapudi099-wq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900/60 border border-slate-800 hover:border-primary/40 hover:text-primary transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-4 w-4" />
                  <span className="text-xs">GitHub</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/velagapudi-mahendra-543481353"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900/60 border border-slate-800 hover:border-primary/40 hover:text-primary transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="text-xs">LinkedIn</span>
                </a>

                <a
                  href="mailto:mahendravelagapudi099@gmail.com"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900/60 border border-slate-800 hover:border-primary/40 hover:text-primary transition-colors"
                  aria-label="Email Mahendra"
                >
                  <Mail className="h-4 w-4" />
                  <span className="text-xs">Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Instrument Telemetry Card + Profile */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
            <div className="w-full max-w-md glass-card rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900/60 backdrop-blur-xl">
              
              {/* Card Header: Lab Instrument Panel */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800/80 bg-slate-950/70 font-mono text-xs">
                <div className="flex items-center gap-2 text-slate-400">
                  <Terminal className="h-3.5 w-3.5 text-primary" />
                  <span>SYSTEM_TELEMETRY.SYS</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                  <span className="text-[11px] text-emerald-400 font-medium">ONLINE</span>
                </div>
              </div>

              {/* Photo & Snapshot Section */}
              <div className="p-6">
                <div className="flex items-center gap-5 mb-6">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-700/80 shrink-0 bg-slate-800 shadow-inner">
                    <img
                      src={profileImage}
                      alt="Velagapudi Mahendra"
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-lg text-foreground leading-tight">
                      Velagapudi Mahendra
                    </h3>
                    <p className="text-xs font-mono text-primary mt-1">
                      B.Tech Data Science &bull; MREM
                    </p>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                      <span>Hyderabad, India</span> &bull; <span>Remote Friendly</span>
                    </p>
                  </div>
                </div>

                {/* Empirical Benchmark & Systems Table */}
                <div className="space-y-2.5 font-mono text-xs border-t border-slate-800/80 pt-4">
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-800/40">
                    <span className="text-slate-400">Primary Specialization</span>
                    <span className="text-slate-200 font-medium">AI/ML & Data Engineering</span>
                  </div>

                  <div className="flex justify-between items-center py-1.5 border-b border-slate-800/40">
                    <span className="text-slate-400">SentimentScopex Metric</span>
                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> F1: 0.92 (Inference)
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1.5 border-b border-slate-800/40">
                    <span className="text-slate-400">VectorMind RAG Latency</span>
                    <span className="text-primary font-medium">~140ms (ChromaDB)</span>
                  </div>

                  <div className="flex justify-between items-center py-1.5 border-b border-slate-800/40">
                    <span className="text-slate-400">Production Codebases</span>
                    <span className="text-slate-200 font-medium">5 Verified Repos</span>
                  </div>

                  <div className="flex justify-between items-center py-1.5">
                    <span className="text-slate-400">Active Research</span>
                    <span className="text-amber-400 font-medium">Agent Risk Verification</span>
                  </div>
                </div>

                {/* Quick Link to Current Work */}
                <div className="mt-5 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">
                    Featured: SentimentScopex
                  </span>
                  <a
                    href="https://sentimentscopex.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono text-primary hover:underline"
                  >
                    Launch Live Demo
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
