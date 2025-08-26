import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, ArrowDown, Github, Linkedin, Mail, BarChart3, Database } from 'lucide-react';
import heroBackground from '@/assets/hero-bg.jpg';
import profileImage from '@/assets/profilepic.png';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const codeSnippets = [
    "import pandas as pd",
    "model = LinearRegression().fit(X, y)",
    "# Analyzing patterns in data",
    "accuracy = cross_val_score(model, X, y).mean()",
    "plt.scatter(X, y, alpha=0.7)",
    "df.groupby('category').mean()"
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      
      {/* Parallax Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20"
        style={{
          transform: `translate(${mousePosition.x / 50}px, ${mousePosition.y / 50}px)`,
        }}
      />

      {/* Floating Particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Code Snippets */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {codeSnippets.map((snippet, i) => (
          <div
            key={i}
            className="absolute glass-card px-3 py-2 text-xs font-mono text-primary/70 opacity-20 animate-float"
            style={{
              left: `${15 + (i * 20)}%`,
              top: `${20 + (i * 15)}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${8 + i}s`,
            }}
          >
            {snippet}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Profile Image */}
        <div className="fade-in mb-8">
          <div className="relative mx-auto w-48 h-48 mb-6">
            <div className="absolute inset-0 bg-gradient-primary rounded-full animate-pulse opacity-50"></div>
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/30 glass-card glow-primary">
              <img 
                src={profileImage} 
                alt="Alex Chen - Full Stack Developer"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Data Science Icon Decoration */}
            <div className="absolute -top-2 -right-2 glass-card p-2 rounded-full glow-accent">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <div className="absolute -bottom-2 -left-2 glass-card p-2 rounded-full glow-secondary">
              <Database className="h-5 w-5 text-secondary" />
            </div>
          </div>
        </div>
        
        <div className="fade-in delay-100">
          <h1 className="whitespace-nowrap text-[clamp(2rem,6vw,5rem)] font-playfair font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Velagapudi Mahendra
          </h1>
        </div>
        
        <div className="fade-in delay-200">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6 glow-accent">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-jetbrains text-muted-foreground">Seeking Data Science Internships</span>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-light">
            Data Science Student • ML Researcher • Analytics Enthusiast
          </p>
        </div>

        {/* Code Terminal Mockup */}
        <div className="fade-in delay-300 mb-8 max-w-2xl mx-auto">
          <div className="glass-card p-4 rounded-xl border border-primary/20 text-left">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-xs text-muted-foreground font-jetbrains ml-2">data_analysis.py</span>
            </div>
            <div className="font-jetbrains text-sm space-y-1">
              <div className="text-muted-foreground">
                <span className="text-secondary">import</span> <span className="text-primary">pandas</span> <span className="text-secondary">as</span> <span className="text-primary">pd</span>
              </div>
              <div className="text-muted-foreground">
                <span className="text-secondary">import</span> <span className="text-primary">numpy</span> <span className="text-secondary">as</span> <span className="text-primary">np</span>
              </div>
              <div className="text-muted-foreground">&nbsp;</div>
              <div className="text-muted-foreground">
                <span className="text-accent">df</span> = <span className="text-primary">pd</span>.<span className="text-accent">read_csv</span>(<span className="text-green-400">'dataset.csv'</span>)
              </div>
              <div className="text-muted-foreground">
                <span className="text-accent">insights</span> = <span className="text-accent">df</span>.<span className="text-primary">describe</span>()
              </div>
              <div className="text-muted-foreground">
                <span className="text-secondary">print</span>(<span className="text-green-400">'Data analysis complete! 📊'</span>)</div>
            </div>
          </div>
        </div>

        <div className="fade-in delay-400">
          <p className="text-lg text-muted-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Passionate about extracting insights from data to solve real-world problems. 
            Currently B.Tech in Data Science with a focus on machine learning and statistical analysis.
          </p>
        </div>

        <div className="fade-in delay-500 flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Button 
            size="lg" 
            className="glass-card glow-primary px-8 py-4 text-lg font-medium hover:scale-105 transition-all duration-300"
            onClick={scrollToProjects}
          >
            View Projects
            <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
  variant="outline" 
  size="lg"
  className="glass-card glow-secondary px-8 py-4 text-lg font-medium border-primary/50 hover:border-primary hover:scale-105 transition-all duration-300"
  asChild
>
  <a href="/cv.pdf" download>
    <Download className="mr-2 h-5 w-5" />
    Download CV
  </a>
</Button>

        </div>

        {/* Social Links */}
        <div className="fade-in delay-600 flex justify-center gap-6">
          {[
            { Icon: Github, href: "https://github.com/mahendravelagapudi099-wq", label: "GitHub" },
            { Icon: Linkedin, href: "https://www.linkedin.com/in/velagapudi-mahendra-543481353", label: "LinkedIn" },
            { Icon: Mail, href: "mahendravelagapudi099@gmail.com", label: "Contact" }
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              className="glass-card p-4 rounded-full hover:glow-accent transition-all duration-300 hover:scale-110"
              aria-label={label}
            >
              <Icon className="h-6 w-6 text-primary" />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;