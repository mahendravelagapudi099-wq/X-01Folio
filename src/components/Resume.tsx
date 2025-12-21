import { Button } from '@/components/ui/button';
import { Download, Award, Briefcase, GraduationCap } from 'lucide-react';

const Resume = () => {
  const experience = [
    {
  title: "Python Intern",
  company: "Micro IT",
  period: "2024",
  description: "Worked on Python-based automation and mini projects while learning real-world coding practices and version control workflows."
},
{
  title: "Web Development Intern",
  company: "CodeC",
  period: "2025",
  description: "Supported the development of frontend components using HTML, CSS, and JavaScript. Improved UI responsiveness and user interactions."
},
{
  title: "Data Science Intern",
  company: "CodeAlpha",
  period: "2025",
  description: "Gained hands-on experience in data preprocessing, visualization, and model building using Python and machine learning libraries."
}

  ];

  const education = [
    {
  degree: "B.Tech in Computer Science Engineering (Data Science)",
  school: "Mallareddy Engineering College and Management Sciences",
  period: "2023 - 2027",
  focus: "Data Science, Artificial Intelligence, Machine Learning"
},
{
  degree: "Intermediate (MPC)",
  school: "Vandana Junior College",
  period: "2021 - 2023",
  focus: "Mathematics, Physics & Chemistry"
}

  ];

  const achievements = [
  "Google Data Analytics Certified",
  "Completed Generative AI and Data Science Courses",
  "MongoDB Data Modeling Certified",
  "Data Analytics & Visualization Simulations",
  "Participated in DevOps and GitHub Workshops"
];


const handleDownload = () => {
  const link = document.createElement('a');
  link.href = '/Velagapudi_Mahendra_Resume.pdf'; // just relative path from public
  link.download = 'Velagapudi_Mahendra_Resume.pdf';
  link.click();
};


  return (
    <section id="resume" className="py-20 px-6 max-w-7xl mx-auto">
      {/* Header */}
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

      {/* Content */}
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
