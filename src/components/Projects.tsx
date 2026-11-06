import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ExternalLink, Github, ArrowUpRight, CheckCircle2, Layers } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  imageAlt: string;
  tech: string[];
  github: string;
  demo?: string;
  liveDemo: boolean;
  featured: boolean;
  metrics?: string;
}

const Projects = () => {
  const [selected, setSelected] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'SentimentScopex',
      category: 'NLP & REAL-TIME INFERENCE',
      description: 'Production AI platform analyzing consumer reviews, comments, and customer feedback to compute multi-class sentiment polarity.',
      longDescription:
        'SentimentScopex is an end-to-end AI-driven sentiment analysis application. It processes streaming textual feedback through an inference pipeline with real-time token scoring, sentiment distribution analytics, and confidence benchmarks. Built with a React client interface, TypeScript data contracts, and hosted on Netlify.',
      image: '/assets/SentimentScopex.jpg',
      imageAlt: 'Screenshot of the SentimentScopex platform',
      tech: ['React', 'TypeScript', 'TensorFlow', 'PostgreSQL', 'Node.js', 'Netlify'],
      github: 'https://github.com/mahendravelagapudi099-wq/SentimentScope',
      demo: 'https://sentimentscopex.netlify.app/',
      liveDemo: true,
      featured: true,
      metrics: 'F1 Score: 0.92 &bull; Sub-second inference latency',
    },
    {
      id: 2,
      title: 'VectorMind — AI Sales Analyst',
      category: 'RAG & PREDICTIVE ANALYTICS',
      description: 'Intelligent sales intelligence system integrating ChromaDB vector search with Prophet forecasting to automate revenue decision-making.',
      longDescription:
        'VectorMind bridges unstructured enterprise data and quantitative sales forecasting. It leverages LangChain and ChromaDB for semantic retrieval over historical transactions, while employing Facebook Prophet models for multi-quarter revenue trend projection and anomaly detection.',
      image: '/assets/Student_Performance_Dashboard.png', // Fallback to local verified asset
      imageAlt: 'VectorMind sales analytics architecture',
      tech: ['Python', 'LangChain', 'ChromaDB', 'Prophet', 'Streamlit', 'Scikit-learn', 'Pandas'],
      github: 'https://github.com/mahendravelagapudi099-wq/VectorMind---AI-Sales-Analyst-.git',
      liveDemo: false,
      featured: true,
      metrics: '140ms vector retrieval &bull; Prophet time-series forecasting',
    },
    {
      id: 3,
      title: 'Student Performance Analytics',
      category: 'QUANTITATIVE MODELING & EDA',
      description: 'Predictive educational dashboard that correlates study hours, attendance patterns, and test variance to identify early academic risk thresholds.',
      longDescription:
        'An interactive behavioral analytics system analyzing student engagement patterns. Employs multivariate regression and variance tracking in Python to detect leading indicators of academic drop-off, providing educators with actionable visual intervention signals.',
      image: '/assets/Student_Performance_Dashboard.png',
      imageAlt: 'Student Performance Analytics dashboard',
      tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'JavaScript', 'HTML/CSS'],
      github: 'https://github.com/mahendravelagapudi099-wq/Student_Performance_Dashboard.git',
      liveDemo: false,
      featured: true,
      metrics: 'Multivariate regression &bull; Early intervention risk scoring',
    },
    {
      id: 4,
      title: 'Climate Change Insights',
      category: 'TIME-SERIES ENVIRONMENTAL EDA',
      description: 'Longitudinal analysis and visualization of multi-decade atmospheric CO2, surface temperature variances, and climate trends.',
      longDescription:
        'Climate Change Insights investigates global historical climate observations to detect long-term anomaly drifts. Uses Pandas and Seaborn for multi-variate statistical decomposition, trend filtering, and seasonal anomaly visualization across massive environmental datasets.',
      image: '/assets/SentimentScopex.jpg',
      imageAlt: 'Climate data EDA visualization',
      tech: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter'],
      github: 'https://github.com/mahendravelagapudi099-wq/6-CLIMATE-CHANGE-INSIGHTS.git',
      liveDemo: false,
      featured: false,
      metrics: 'Decadal temperature variance &bull; Seasonal trend decomposition',
    },
    {
      id: 5,
      title: 'Habit Tracker Web',
      category: 'FULL-STACK CLOUD APPLICATION',
      description: 'Habit monitoring and streak progression web application with real-time cloud persistence and interactive completion analytics.',
      longDescription:
        'A full-stack tracking application built with React, Vite, and Firebase Firestore. Provides visual habit frequency charts, responsive state management via React Context, and offline-resilient progress logging.',
      image: '/assets/Student_Performance_Dashboard.png',
      imageAlt: 'Habit Tracker Web application interface',
      tech: ['React.js', 'Vite', 'Tailwind CSS', 'Firebase Firestore', 'Recharts'],
      github: 'https://github.com/mahendravelagapudi099-wq/habit-tracker-web.git',
      liveDemo: false,
      featured: false,
      metrics: 'Real-time Firestore sync &bull; Recharts streak visualizer',
    },
  ];

  const openOnKeyDown = (e: React.KeyboardEvent, project: Project) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelected(project);
    }
  };

  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto" aria-labelledby="projects-heading">
      <div className="mb-16 text-center">
        <h2 id="projects-heading" className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight text-foreground mb-4">
          Featured Systems & Artifacts
        </h2>
        <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-4" />
        <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
          VERIFIED PRODUCTION ARCHITECTURES & ML PIPELINES
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${project.title}`}
            onClick={() => setSelected(project)}
            onKeyDown={(e) => openOnKeyDown(e, project)}
            className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between hover:border-primary/40 hover:-translate-y-1 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-lg"
          >
            <div>
              {/* Card Meta Header */}
              <div className="flex items-center justify-between font-mono text-[11px] mb-3">
                <span className="text-primary font-medium tracking-wider">{project.category}</span>
                {project.liveDemo ? (
                  <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    LIVE APP
                  </span>
                ) : (
                  <span className="text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded-full border border-slate-700/50">
                    REPO ARTIFACT
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-xl font-sans font-bold text-foreground mb-3 group-hover:text-primary transition-colors flex items-center justify-between">
                <span>{project.title}</span>
                <ArrowUpRight className="h-4 w-4 text-slate-500 group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {project.description}
              </p>

              {/* Metrics pill if present */}
              {project.metrics && (
                <div
                  className="mb-4 text-xs font-mono text-slate-300 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800/80 flex items-center gap-1.5"
                  dangerouslySetInnerHTML={{ __html: project.metrics }}
                />
              )}
            </div>

            <div>
              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 mb-5 pt-3 border-t border-slate-800/60">
                {project.tech.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-800/60 text-slate-300 border border-slate-700/40"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 4 && (
                  <span className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-800/30 text-slate-400">
                    +{project.tech.length - 4}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 text-xs font-mono border-slate-800 hover:border-slate-700 hover:bg-slate-800 flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.github, '_blank');
                  }}
                >
                  <Github className="mr-1.5 h-3.5 w-3.5 text-slate-400" />
                  Source Code
                </Button>

                {project.liveDemo && project.demo && (
                  <Button
                    size="sm"
                    className="h-8 text-xs font-mono bg-primary hover:bg-sky-400 text-slate-950 font-semibold flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.demo, '_blank');
                    }}
                  >
                    <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                    Launch
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        {selected && (
          <DialogContent className="max-w-2xl border-slate-800 bg-slate-900/95 backdrop-blur-2xl text-foreground">
            <DialogHeader>
              <div className="flex items-center justify-between font-mono text-xs mb-2">
                <span className="text-primary font-medium tracking-wider">{selected.category}</span>
                {selected.liveDemo ? (
                  <span className="text-emerald-400 font-medium">LIVE SYSTEM</span>
                ) : (
                  <span className="text-slate-400">OPEN-SOURCE ARTIFACT</span>
                )}
              </div>
              <DialogTitle className="font-sans text-2xl font-bold text-foreground">
                {selected.title}
              </DialogTitle>
              <DialogDescription className="text-slate-300 text-sm mt-3 leading-relaxed">
                {selected.longDescription}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 pt-4 border-t border-slate-800 font-mono text-xs">
              {selected.metrics && (
                <div>
                  <h4 className="text-slate-400 font-semibold uppercase tracking-wider mb-1.5">
                    Verified Outcomes & Benchmarks:
                  </h4>
                  <div
                    className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-emerald-400"
                    dangerouslySetInnerHTML={{ __html: selected.metrics }}
                  />
                </div>
              )}

              <div>
                <h4 className="text-slate-400 font-semibold uppercase tracking-wider mb-2">
                  Architecture & Technologies:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selected.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700/60 text-slate-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-800/80">
              <Button
                variant="outline"
                className="font-mono text-xs border-slate-700 hover:bg-slate-800"
                onClick={() => window.open(selected.github, '_blank')}
              >
                <Github className="mr-2 h-4 w-4" />
                Inspect Repository
              </Button>

              {selected.liveDemo && selected.demo && (
                <Button
                  className="font-mono text-xs bg-primary hover:bg-sky-400 text-slate-950 font-semibold"
                  onClick={() => window.open(selected.demo, '_blank')}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Launch Application
                </Button>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
};

export default Projects;

