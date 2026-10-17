import { TrendingUp, Brain, Database, BarChart3 } from "lucide-react";
import profileImage from '@/assets/profilepic.png';


const About = () => {
  // Same items as before, grouped by category so they scan instead of reading as a wall.
  const skillGroups = [
    { title: 'Programming', items: ['Python', 'SQL', 'Git & GitHub'] },
    {
      title: 'Data',
      items: ['Data Cleaning', 'Exploratory Data Analysis (EDA)', 'Pandas', 'NumPy', 'Statistics (Basics)'],
    },
    {
      title: 'Machine Learning',
      items: ['Machine Learning (Basics)', 'Scikit-learn', 'Model Evaluation (Intro)'],
    },
    { title: 'Visualization', items: ['Matplotlib', 'Seaborn', 'Data Visualization'] },
    { title: 'Tools', items: ['Jupyter Notebook'] },
  ];

  const skills = [
    {
      icon: TrendingUp,
      title: "Data Analysis",
      description:
        "Understanding data analysis concepts including data cleaning, exploratory data analysis, and basic statistical techniques.",
    },
    {
      icon: Brain,
      title: "Machine Learning (Beginner)",
      description:
        "Learning fundamentals of machine learning such as supervised and unsupervised learning, model training, and evaluation.",
    },
    {
      icon: Database,
      title: "Databases & Data Modeling",
      description:
        "Working with MongoDB basics including schema design, indexing concepts, and query optimization fundamentals.",
    },
    {
      icon: BarChart3,
      title: "Data Visualization",
      description:
        "Creating basic visualizations using tools like Tableau, spreadsheets, and Python libraries to present insights clearly.",
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
                    src={profileImage}
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
               I’m a Data Science student passionate about transforming raw data into meaningful insights. Currently pursuing my B.Tech in Data Science at MREM, I enjoy working on projects that combine analytical thinking with creative problem-solving. I aspire to apply data-driven approaches to make a positive impact in healthcare and social good initiatives.
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group) => (
            <div key={group.title} className="glass-card p-6 hover:glow-accent transition-all duration-300">
              <h4 className="font-orbitron font-semibold text-primary mb-4">{group.title}</h4>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="glass-card px-3 py-1.5 text-sm font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default About;
