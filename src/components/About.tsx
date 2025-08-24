import { TrendingUp, Brain, Database, BarChart3 } from "lucide-react";

const About = () => {
  const techStack = [
    "Python",
    "R",
    "SQL",
    "Pandas",
    "NumPy",
    "Scikit-learn",
    "TensorFlow",
    "PyTorch",
    "Matplotlib",
    "Seaborn",
    "Jupyter",
    "Tableau",
    "javascript", 
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "Git",
    "Docker",
    "AWS",
    "Azure",
    "Google Cloud",
    "Machine Learning",
    "Deep Learning",
    "Data Visualization",
    "Data Analysis",
    "Statistical Modeling",
    "Data Engineering",
    "ETL Processes",
    "Big Data Technologies",
    "APIs",
  ];

  const skills = [
    {
      icon: TrendingUp,
      title: "Statistical Analysis",
      description:
        "Proficient in statistical modeling, hypothesis testing, and exploratory data analysis using R and Python.",
    },
    {
      icon: Brain,
      title: "Machine Learning",
      description:
        "Experience with supervised and unsupervised learning, deep learning, and model evaluation techniques.",
    },
    {
      icon: Database,
      title: "Data Engineering",
      description:
        "Skilled in data cleaning, preprocessing, ETL pipelines, and working with various database systems.",
    },
    {
      icon: BarChart3,
      title: "Data Visualization",
      description:
        "Creating compelling visualizations and dashboards using Tableau, matplotlib, and interactive tools.",
    },
  ];

  return (
    <section id="about" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="fade-in text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
          About Me
        </h2>
        <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Profile Section */}
        <div className="fade-in delay-200">
          <div className="glass-card p-8 glow-primary">
            <div className="w-48 h-48 mx-auto mb-8 relative">
              <div className="w-full h-full rounded-full bg-gradient-primary p-1">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                  <img
                    src="src/assets/profilepic.png"
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-playfair font-semibold mb-4">
                Velagapudi Mahendra
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                A dedicated data science student passionate about transforming
                raw data into actionable insights. Currently pursuing my
                Master's in Data Science at UC Berkeley, I love working on
                projects that combine statistical rigor with creative
                problem-solving. My goal is to leverage data to drive meaningful
                impact in healthcare and social good initiatives.
              </p>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="space-y-8">
          {skills.map((skill, index) => (
            <div
              key={skill.title}
              className={`fade-in delay-${300 + index * 100}`}
            >
              <div className="glass-card p-6 hover:glow-secondary transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="glass-card p-3 rounded-xl glow-accent group-hover:scale-110 transition-transform duration-300">
                    <skill.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-playfair font-semibold mb-2">
                      {skill.title}
                    </h4>
                    <p className="text-muted-foreground">{skill.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mt-20 fade-in delay-500">
        <h3 className="text-2xl font-playfair font-semibold text-center mb-8">
          Technical Skills
        </h3>
        <div className="glass-card p-8 glow-secondary">
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="glass-card px-4 py-2 text-sm font-medium hover:glow-accent transition-all duration-300 hover:scale-105 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


export default About;
