import { Button } from '@/components/ui/button';
import { Download, Award, Briefcase, GraduationCap } from 'lucide-react';

const Resume = () => {
  const experience = [
    {
      title: "Senior Full Stack Developer",
      company: "TechCorp Innovation",
      period: "2022 - Present",
      description: "Leading development of scalable web applications serving 1M+ users. Architected microservices infrastructure reducing load times by 40%."
    },
    {
      title: "Full Stack Developer",
      company: "StartupXYZ",
      period: "2020 - 2022",
      description: "Built and maintained React/Node.js applications. Implemented CI/CD pipelines and automated testing, improving deployment frequency by 300%."
    },
    {
      title: "Junior Developer",
      company: "Digital Solutions Inc",
      period: "2019 - 2020",
      description: "Developed responsive web interfaces and collaborated on API integrations. Gained expertise in modern JavaScript frameworks and cloud technologies."
    }
  ];

  const education = [
    {
      degree: "Master of Science in Computer Science",
      school: "Stanford University",
      period: "2017 - 2019",
      focus: "Artificial Intelligence & Machine Learning"
    },
    {
      degree: "Bachelor of Science in Software Engineering",
      school: "UC Berkeley",
      period: "2013 - 2017",
      focus: "Web Technologies & Systems Design"
    }
  ];

  const achievements = [
    "AWS Certified Solutions Architect",
    "Google Cloud Professional Developer",
    "Won 'Best Innovation' at TechCorp Hackathon 2023",
    "Speaker at React Conference 2022",
    "Published 15+ technical articles with 50K+ reads"
  ];

  const handleDownload = () => {
    // In a real implementation, this would download the actual PDF
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // This would be a real PDF file
    link.download = 'Alex_Chen_Resume.pdf';
    link.click();
  };

  return (
    <section id="resume" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="fade-in text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
          Resume
        </h2>
        <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
          My professional journey in technology and innovation
        </p>
      </div>

      {/* Download Button */}
      <div className="fade-in delay-200 text-center mb-16">
        <Button 
          onClick={handleDownload}
          size="lg"
          className="glass-card glow-primary px-8 py-4 text-lg font-medium hover:scale-105 transition-all duration-300"
        >
          <Download className="mr-2 h-5 w-5" />
          Download PDF Resume
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Experience */}
        <div className="fade-in delay-300">
          <div className="flex items-center gap-3 mb-8">
            <div className="glass-card p-3 rounded-xl glow-accent">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-orbitron font-semibold">Experience</h3>
          </div>
          
          <div className="space-y-6">
            {experience.map((job, index) => (
              <div key={index} className="glass-card p-6 hover:glow-secondary transition-all duration-300">
                <h4 className="text-xl font-orbitron font-semibold mb-2">{job.title}</h4>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-primary font-medium">{job.company}</span>
                  <span className="text-sm text-muted-foreground">{job.period}</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{job.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Achievements */}
        <div className="space-y-12">
          {/* Education */}
          <div className="fade-in delay-400">
            <div className="flex items-center gap-3 mb-8">
              <div className="glass-card p-3 rounded-xl glow-accent">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-orbitron font-semibold">Education</h3>
            </div>
            
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="glass-card p-6 hover:glow-secondary transition-all duration-300">
                  <h4 className="text-lg font-orbitron font-semibold mb-2">{edu.degree}</h4>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-primary font-medium">{edu.school}</span>
                    <span className="text-sm text-muted-foreground">{edu.period}</span>
                  </div>
                  <p className="text-muted-foreground">{edu.focus}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="fade-in delay-500">
            <div className="flex items-center gap-3 mb-8">
              <div className="glass-card p-3 rounded-xl glow-accent">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-orbitron font-semibold">Achievements</h3>
            </div>
            
            <div className="glass-card p-6 glow-purple">
              <ul className="space-y-3">
                {achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;