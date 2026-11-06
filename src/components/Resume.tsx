import { Button } from '@/components/ui/button';
import { Download, Award, Briefcase, GraduationCap, ArrowUpRight } from 'lucide-react';

const Resume = () => {
  const experience = [
    {
      title: "Data Science Intern",
      company: "CodeAlpha",
      period: "2025",
      description: "Implemented machine learning pipelines and exploratory data preprocessing workflows using Python, Pandas, and Scikit-learn."
    },
    {
      title: "Web Development Intern",
      company: "CodeC",
      period: "2025",
      description: "Engineered responsive frontend interfaces and data presentation components using modern JavaScript, HTML5, and CSS3."
    },
    {
      title: "Python Intern",
      company: "Micro IT",
      period: "2024",
      description: "Developed automation scripts and core Python utilities while practicing version control workflows and test execution."
    }
  ];

  const education = [
    {
      degree: "B.Tech in Computer Science Engineering (Data Science)",
      school: "Mallareddy Engineering College and Management Sciences",
      period: "2023 - 2027",
      focus: "Specialization in Applied AI, Machine Learning, Statistical Modeling, and Database Architecture"
    },
    {
      degree: "Intermediate Higher Secondary (MPC)",
      school: "Vandana Junior College",
      period: "2021 - 2023",
      focus: "Mathematics, Physics & Chemistry"
    }
  ];

  const keyHighlights = [
    "Published working paper on Risk-Based Verification for AI Data Agents",
    "NPTEL / IIT Roorkee Certified in Data Analytics with Python",
    "MongoDB Certified in Data Modeling & Document Database Architecture",
    "Shipped SentimentScopex (Live NLP application with sub-second inference)",
    "Engineered VectorMind RAG sales analytics platform with ChromaDB"
  ];

  return (
    <section id="resume" className="py-24 px-6 max-w-7xl mx-auto" aria-labelledby="resume-heading">
      <div className="mb-16 text-center">
        <h2 id="resume-heading" className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight text-foreground mb-4">
          Experience & Education
        </h2>
        <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-4" />
        <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
          CHRONOLOGICAL TRAJECTORY & TECHNICAL FORMATION
        </p>
      </div>

      {/* Download Action */}
      <div className="text-center mb-16">
        <Button
          asChild
          size="lg"
          className="bg-primary hover:bg-sky-400 text-slate-950 font-sans font-semibold px-8 h-12 shadow-lg shadow-primary/20 transition-all duration-200"
        >
          <a href="/Velagapudi_Mahendra_Resume.pdf" download="Velagapudi_Mahendra_Resume.pdf">
            <Download className="mr-2 h-4 w-4" />
            Download Official CV (PDF)
          </a>
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Experience Column */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary">
              <Briefcase className="h-5 w-5" />
            </div>
            <h3 className="text-2xl font-sans font-bold text-foreground">Practical Experience</h3>
          </div>

          <div className="space-y-6">
            {experience.map((job, index) => (
              <div
                key={index}
                className="glass-card p-6 border border-slate-800 bg-slate-900/60 rounded-xl hover:border-primary/40 transition-all duration-200"
              >
                <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                  <h4 className="text-lg font-sans font-bold text-foreground">{job.title}</h4>
                  <span className="font-mono text-xs text-primary font-medium px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                    {job.period}
                  </span>
                </div>
                <div className="text-sm font-mono text-slate-300 mb-3">{job.company}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{job.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Highlights Column */}
        <div className="space-y-12">
          {/* Education */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                <GraduationCap className="h-5 w-5" />
              </div>
              <h3 className="text-2xl font-sans font-bold text-foreground">Formal Education</h3>
            </div>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="glass-card p-6 border border-slate-800 bg-slate-900/60 rounded-xl hover:border-primary/40 transition-all duration-200"
                >
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                    <h4 className="text-lg font-sans font-bold text-foreground">{edu.degree}</h4>
                    <span className="font-mono text-xs text-primary font-medium px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                      {edu.period}
                    </span>
                  </div>
                  <div className="text-sm font-mono text-slate-300 mb-2">{edu.school}</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{edu.focus}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Highlights */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="text-2xl font-sans font-bold text-foreground">Key Technical Highlights</h3>
            </div>

            <div className="glass-card p-6 border border-slate-800 bg-slate-900/60 rounded-xl">
              <ul className="space-y-3 font-mono text-xs text-slate-300">
                {keyHighlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{highlight}</span>
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

