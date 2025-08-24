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
      title: "AI-Powered Analytics Dashboard",
      description: "Real-time analytics platform with machine learning insights",
      longDescription: "A comprehensive analytics dashboard that leverages machine learning to provide predictive insights and real-time data visualization. Built with React, Node.js, and TensorFlow, it processes millions of data points to deliver actionable business intelligence.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      tech: ["React", "TypeScript", "Node.js", "TensorFlow", "PostgreSQL", "AWS"],
      github: "https://github.com",
      demo: "https://demo.com",
      featured: true
    },
    {
      id: 2,
      title: "Blockchain Trading Platform",
      description: "Decentralized trading platform with smart contract integration",
      longDescription: "A secure and scalable decentralized trading platform built on Ethereum. Features include automated trading strategies, portfolio management, and real-time market analysis with smart contract integration for secure transactions.",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
      tech: ["React", "Web3", "Solidity", "Node.js", "MongoDB", "Express"],
      github: "https://github.com",
      demo: "https://demo.com",
      featured: true
    },
    {
      id: 3,
      title: "Cloud Infrastructure Manager",
      description: "Automated cloud resource management and optimization",
      longDescription: "An intelligent cloud infrastructure management system that automatically optimizes resource allocation, monitors performance, and reduces costs. Integrates with major cloud providers to deliver seamless scaling and management.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
      tech: ["Python", "AWS", "Terraform", "Docker", "Kubernetes", "React"],
      github: "https://github.com",
      demo: "https://demo.com",
      featured: false
    },
    {
      id: 4,
      title: "Neural Network Visualizer",
      description: "Interactive tool for visualizing neural network architectures",
      longDescription: "An educational tool that provides interactive visualization of neural network architectures and training processes. Helps students and researchers understand complex AI models through intuitive visual representations.",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=600&fit=crop",
      tech: ["D3.js", "Python", "FastAPI", "React", "WebGL", "TensorFlow"],
      github: "https://github.com",
      demo: "https://demo.com",
      featured: false
    },
    {
      id: 5,
      title: "Neural Network Visualizer",
      description: "Interactive tool for visualizing neural network architectures",
      longDescription: "An educational tool that provides interactive visualization of neural network architectures and training processes. Helps students and researchers understand complex AI models through intuitive visual representations.",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=600&fit=crop",
      tech: ["D3.js", "Python", "FastAPI", "React", "WebGL", "TensorFlow"],
      github: "https://github.com",
      demo: "https://demo.com",
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