import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, X } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tech: string[];
  github: string;
  demo: string;
  featured: boolean;
}

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Mock data - would be fetched from CMS in real implementation
  const projects: Project[] = [
    {
      id: 1,
      title: "SentimentScopex",
      description: "AI-powered sentiment analysis web application",
      longDescription: "SentimentScopex is an AI-driven platform that analyzes textual content such as social media comments, reviews, and feedback to determine positive, negative, or neutral sentiment. Built with React and hosted on Netlify, it offers a real-time, user-friendly interface to help users understand public opinion and customer sentiment effectively.",
      image: "./assets//SentimentScopex.jpg",
      tech: ["React", "TypeScript", "Node.js", "TensorFlow", "PostgreSQL", "AWS"],
      github: "https://github.com/mahendravelagapudi099-wq/SentimentScope",
      demo: "https://sentimentscopex.netlify.app/",
      featured: true
    },

    {
      id: 2,
      title: "Student Performance Dashboard",
      description: "A simple dashboard that shows student marks, attendance, and study hours with easy charts to quickly understand performance.",
      longDescription: "An interactive web dashboard that tracks student marks, attendance, and study behavior, using visual charts to reveal learning patterns, performance trends, and improvement areas in a simple, engaging format.",
      image: "/assets/Student_Performance_Dashboard.png",
      tech: ["Python", "HTML", "CSS", "JavaScript"],
      github: "https://github.com/mahendravelagapudi099-wq/Student_Performance_Dashboard.git",
      demo: "https://demo.com",
      featured: true
    },
   { id: 3, title: "Habit Tracker Web", description: "A web app to track daily habits and visualize progress with charts.", 
    longDescription: "Habit Tracker Web helps users monitor their daily habits, set goals, and stay motivated. The interactive charts and dashboards allow for easy tracking of progress over time. This project provided hands-on experience with frontend development, state management, and cloud-based database integration.", 
    image: "https://uploads.onecompiler.io/42rqwwqvz/44897vpuv/Screenshot%202025-12-21%20225947.png",
    tech: ["React.js (Hooks, Context API)", "Vite", "Tailwind CSS", "Firebase Firestore", "Recharts", "Lucide React", "GitHub Pages"], 
    github: "https://github.com/mahendravelagapudi099-wq/habit-tracker-web.git", 
    demo: "https://github.com/mahendravelagapudi099-wq/habit-tracker-web.git", 
    featured: true 
  },
    { id: 4, title: "VectorMind - AI Sales Analyst", description: "An AI-powered sales analytics platform to convert raw data into actionable insights.", 
    longDescription: "VectorMind is an intelligent sales analytics platform designed to bridge the gap between raw data and decision-making. Unlike traditional dashboards, it goes beyond charts to provide predictive analytics and insights. Built to explore AI integration with business analytics, this project helped improve skills in Python, AI/LLM frameworks, and data visualization.", 
    image: "https://uploads.onecompiler.io/42rqwwqvz/44897vpuv/dashboard.png",
    tech: ["Streamlit (Python)", "Cohere / Ollama", "LangChain", "ChromaDB", "Pandas", "NumPy", "Scikit-learn", "Prophet", "Plotly Express"], 
    github: "https://github.com/mahendravelagapudi099-wq/VectorMind---AI-Sales-Analyst-.git", 
    demo: "https://github.com/mahendravelagapudi099-wq/VectorMind---AI-Sales-Analyst-.git", 
    featured: false 
  },
  { id: 5, title: "Climate Change Insights", description: "A project analyzing and visualizing climate data to understand environmental trends.", 
    longDescription: "Climate Change Insights focuses on exploring climate-related datasets to provide meaningful visualizations and analysis. The project uses Python and data science tools to study trends in temperature, emissions, and other key environmental variables. It helps in learning effective data representation, analysis, and reporting for real-world climate data.", 
    image: "https://uploads.onecompiler.io/42rqwwqvz/44897vpuv/climate%20data%20eda.jpg",
    tech: ["Python (Pandas, NumPy, Matplotlib, Seaborn)", "Jupyter Notebook", "CSV Datasets"], 
    github: "https://github.com/mahendravelagapudi099-wq/6-CLIMATE-CHANGE-INSIGHTS.git", 
    demo: "https://github.com/mahendravelagapudi099-wq/6-CLIMATE-CHANGE-INSIGHTS.git", 
    featured: false 
  }
  ];

  const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="glass-card max-w-4xl w-full max-h-[90vh] overflow-y-auto glow-primary">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 glass-card p-2 rounded-full hover:glow-accent transition-all duration-300"
          >
            <X className="h-6 w-6" />
          </button>

          <img
            src={project.image}
            alt={project.title}
            className="w-full h-64 object-cover rounded-t-2xl"
          />

          <div className="p-8">
            <h3 className="text-3xl font-orbitron font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              {project.title}
            </h3>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              {project.longDescription}
            </p>

            <div className="mb-6">
              <h4 className="text-lg font-orbitron font-semibold mb-3">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="glass-card px-3 py-1 text-sm hover:glow-accent transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                className="glass-card glow-primary hover:scale-105 transition-all duration-300"
                onClick={() => window.open(project.github, '_blank')}
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button
                variant="outline"
                className="glass-card glow-secondary hover:scale-105 transition-all duration-300"
                onClick={() => window.open(project.demo, '_blank')}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="projects" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="fade-in text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
          Featured Projects
        </h2>
        <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
          A showcase of innovative solutions that push the boundaries of technology
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`fade-in delay-${200 + index * 100} cursor-pointer group`}
            onClick={() => setSelectedProject(project)}
          >
            <div className="glass-card overflow-hidden hover:glow-secondary transition-all duration-500 hover:scale-[1.02]">
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
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
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="glass-card px-2 py-1 text-xs"
                    >
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
                    <ExternalLink className="mr-1 h-3 w-3" />
                    Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;