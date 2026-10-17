import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  imageAlt: string;
  tech: string[];
  github: string;
  /** Points at the repo when no live deployment exists — the button label adapts. */
  demo: string;
  liveDemo: boolean;
  featured: boolean;
}

const Projects = () => {
  const [selected, setSelected] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'SentimentScopex',
      description: 'AI-powered sentiment analysis web application',
      longDescription:
        'SentimentScopex is an AI-driven platform that analyzes textual content such as social media comments, reviews, and feedback to determine positive, negative, or neutral sentiment. Built with React and hosted on Netlify, it offers a real-time, user-friendly interface to help users understand public opinion and customer sentiment effectively.',
      image: '/assets/SentimentScopex.jpg',
      imageAlt: 'Screenshot of the SentimentScopex web application',
      tech: ['React', 'TypeScript', 'Node.js', 'TensorFlow', 'PostgreSQL', 'AWS'],
      github: 'https://github.com/mahendravelagapudi099-wq/SentimentScope',
      demo: 'https://sentimentscopex.netlify.app/',
      liveDemo: true,
      featured: true,
    },
    {
      id: 2,
      title: 'Student Performance Dashboard',
      description:
        'A simple dashboard that shows student marks, attendance, and study hours with easy charts to quickly understand performance.',
      longDescription:
        'An interactive web dashboard that tracks student marks, attendance, and study behavior, using visual charts to reveal learning patterns, performance trends, and improvement areas in a simple, engaging format.',
      image: '/assets/Student_Performance_Dashboard.png',
      imageAlt: 'Screenshot of the Student Performance Dashboard',
      tech: ['Python', 'HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/mahendravelagapudi099-wq/Student_Performance_Dashboard.git',
      demo: 'https://github.com/mahendravelagapudi099-wq/Student_Performance_Dashboard.git',
      liveDemo: false,
      featured: true,
    },
    {
      id: 3,
      title: 'Habit Tracker Web',
      description: 'A web app to track daily habits and visualize progress with charts.',
      longDescription:
        'Habit Tracker Web helps users monitor their daily habits, set goals, and stay motivated. The interactive charts and dashboards allow for easy tracking of progress over time. This project provided hands-on experience with frontend development, state management, and cloud-based database integration.',
      image: 'https://uploads.onecompiler.io/42rqwwqvz/44897vpuv/Screenshot%202025-12-21%20225947.png',
      imageAlt: 'Screenshot of the Habit Tracker Web app',
      tech: [
        'React.js (Hooks, Context API)',
        'Vite',
        'Tailwind CSS',
        'Firebase Firestore',
        'Recharts',
        'Lucide React',
        'GitHub Pages',
      ],
      github: 'https://github.com/mahendravelagapudi099-wq/habit-tracker-web.git',
      demo: 'https://github.com/mahendravelagapudi099-wq/habit-tracker-web.git',
      liveDemo: false,
      featured: true,
    },
    {
      id: 4,
      title: 'VectorMind - AI Sales Analyst',
      description: 'An AI-powered sales analytics platform to convert raw data into actionable insights.',
      longDescription:
        'VectorMind is an intelligent sales analytics platform designed to bridge the gap between raw data and decision-making. Unlike traditional dashboards, it goes beyond charts to provide predictive analytics and insights. Built to explore AI integration with business analytics, this project helped improve skills in Python, AI/LLM frameworks, and data visualization.',
      image: 'https://uploads.onecompiler.io/42rqwwqvz/44897vpuv/dashboard.png',
      imageAlt: 'Screenshot of the VectorMind sales analytics dashboard',
      tech: [
        'Streamlit (Python)',
        'Cohere / Ollama',
        'LangChain',
        'ChromaDB',
        'Pandas',
        'NumPy',
        'Scikit-learn',
        'Prophet',
        'Plotly Express',
      ],
      github: 'https://github.com/mahendravelagapudi099-wq/VectorMind---AI-Sales-Analyst-.git',
      demo: 'https://github.com/mahendravelagapudi099-wq/VectorMind---AI-Sales-Analyst-.git',
      liveDemo: false,
      featured: false,
    },
    {
      id: 5,
      title: 'Climate Change Insights',
      description: 'A project analyzing and visualizing climate data to understand environmental trends.',
      longDescription:
        'Climate Change Insights focuses on exploring climate-related datasets to provide meaningful visualizations and analysis. The project uses Python and data science tools to study trends in temperature, emissions, and other key environmental variables. It helps in learning effective data representation, analysis, and reporting for real-world climate data.',
      image: 'https://uploads.onecompiler.io/42rqwwqvz/44897vpuv/climate%20data%20eda.jpg',
      imageAlt: 'Climate data EDA visualization from the Climate Change Insights project',
      tech: ['Python (Pandas, NumPy, Matplotlib, Seaborn)', 'Jupyter Notebook', 'CSV Datasets'],
      github: 'https://github.com/mahendravelagapudi099-wq/6-CLIMATE-CHANGE-INSIGHTS.git',
      demo: 'https://github.com/mahendravelagapudi099-wq/6-CLIMATE-CHANGE-INSIGHTS.git',
      liveDemo: false,
      featured: false,
    },
  ];

  const openOnKeyDown = (e: React.KeyboardEvent, project: Project) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelected(project);
    }
  };

  return (
    <section id="projects" className="py-20 px-6 max-w-7xl mx-auto" aria-labelledby="projects-heading">
      <div className="fade-in text-center mb-16">
        <h2 id="projects-heading" className="text-4xl md:text-5xl font-orbitron font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
          Projects
        </h2>
        <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
          Things I&rsquo;ve built while learning data science and full-stack development
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <div
            key={project.id}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${project.title}`}
            onClick={() => setSelected(project)}
            onKeyDown={(e) => openOnKeyDown(e, project)}
            className={`fade-in delay-${300 + index * 100} cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-2xl`}
          >
            <div className="glass-card overflow-hidden hover:glow-secondary transition-all duration-500 hover:scale-[1.02] group-focus-visible:glow-secondary">
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  loading="lazy"
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {project.featured && (
                  <div className="absolute top-4 left-4 glass-card px-3 py-1 text-xs font-medium glow-accent">
                    Featured
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-orbitron font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span key={tech} className="glass-card px-2 py-1 text-xs">
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{project.tech.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button
                    size="sm"
                    className="glass-card text-xs hover:glow-primary transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.github, '_blank');
                    }}
                  >
                    <Github className="mr-1 h-3 w-3" />
                    Code
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="glass-card text-xs hover:glow-secondary transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.demo, '_blank');
                    }}
                  >
                    {project.liveDemo ? (
                      <>
                        <ExternalLink className="mr-1 h-3 w-3" />
                        Live Demo
                      </>
                    ) : (
                      <>
                        <Github className="mr-1 h-3 w-3" />
                        Source Code
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail modal — Radix Dialog handles focus trap, Escape, scroll lock and ARIA. */}
      <Dialog open={!!selected} onOpenChange={(open) => { if (!open) setSelected(null); }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass-card border border-primary/20 glow-primary p-0">
          {selected && (
            <>
              <img
                src={selected.image}
                alt={selected.imageAlt}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <div className="p-8">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-orbitron font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
                    {selected.title}
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground leading-relaxed text-base">
                    {selected.longDescription}
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-6 mb-6">
                  <h4 className="font-orbitron text-lg font-semibold mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selected.tech.map((tech) => (
                      <span
                        key={tech}
                        className="glass-card px-3 py-1 text-sm hover:glow-accent transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button
                    asChild
                    className="glass-card glow-primary hover:scale-105 transition-all duration-300"
                  >
                    <a href={selected.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="glass-card hover:scale-105 transition-all duration-300"
                  >
                    <a href={selected.demo} target="_blank" rel="noopener noreferrer">
                      {selected.liveDemo ? (
                        <>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Demo
                        </>
                      ) : (
                        <>
                          <Github className="mr-2 h-4 w-4" />
                          Source Code
                        </>
                      )}
                    </a>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;
