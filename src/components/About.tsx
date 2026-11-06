import { TrendingUp, Brain, Database, BarChart3, Code2, ShieldCheck } from "lucide-react";
import profileImage from '@/assets/profilepic.png';

const About = () => {
  const skillClusters = [
    {
      title: 'Programming & Web',
      items: ['Python', 'SQL', 'TypeScript', 'React', 'Node.js', 'Git & GitHub'],
    },
    {
      title: 'Data Science & Analytics',
      items: ['Exploratory Data Analysis (EDA)', 'Pandas', 'NumPy', 'Data Cleaning', 'Statistical Modeling'],
    },
    {
      title: 'Machine Learning',
      items: ['Scikit-learn', 'Supervised & Unsupervised Learning', 'Model Evaluation & Cross-Validation', 'TensorFlow Basics'],
    },
    {
      title: 'Data Storage & Retrieval',
      items: ['PostgreSQL', 'MongoDB', 'ChromaDB (Vector Search)', 'Schema Design & Indexing'],
    },
    {
      title: 'Visualization & Tooling',
      items: ['Matplotlib', 'Seaborn', 'Streamlit', 'Recharts', 'Jupyter Notebooks', 'Vite'],
    },
  ];

  const focusAreas = [
    {
      icon: TrendingUp,
      title: "Data Engineering & Analytics",
      description:
        "Building reliable data wrangling workflows, identifying anomalies, and deriving actionable statistical distributions from complex raw datasets.",
    },
    {
      icon: Brain,
      title: "Applied Machine Learning",
      description:
        "Developing predictive regression and classification pipelines with rigorous cross-validation, feature selection, and evaluation benchmarks.",
    },
    {
      icon: Database,
      title: "Database Architecture",
      description:
        "Designing relational (PostgreSQL) and document-based (MongoDB) data schemas with indexing strategies tailored for analytical throughput.",
    },
    {
      icon: ShieldCheck,
      title: "Agent Verification & Reliability",
      description:
        "Investigating risk-based validation techniques to prevent hallucination in autonomous data-analysis and code-generation agents.",
    },
  ];

  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto" aria-labelledby="about-heading">
      <div className="mb-16 text-center">
        <h2 id="about-heading" className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight text-foreground mb-4">
          About & Technical Profile
        </h2>
        <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-4" />
        <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
          ENGINEERING DISCIPLINE &bull; ACADEMIC RIGOR
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 items-start mb-20">
        {/* Profile Card */}
        <div className="lg:col-span-5">
          <div className="glass-card p-8 border border-slate-800 bg-slate-900/60 rounded-2xl">
            <div className="w-36 h-36 mx-auto mb-6 relative">
              <div className="w-full h-full rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-800 shadow-xl">
                <img
                  src={profileImage}
                  alt="Velagapudi Mahendra"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-sans font-bold text-foreground mb-1">
                Velagapudi Mahendra
              </h3>
              <p className="text-xs font-mono text-primary mb-4">
                B.Tech in Data Science (2023 - 2027) &bull; MREM
              </p>
              <p className="text-sm text-slate-300 leading-relaxed text-left">
                I build software at the intersection of data engineering and machine learning. Currently pursuing my B.Tech in Data Science at Mallareddy Engineering College and Management Sciences, my work focuses on applied ML pipelines, RAG systems, and risk-based verification for AI analytics agents. I believe code should be benchmarked, evidence-backed, and built to solve tangible operational problems.
              </p>
            </div>
          </div>
        </div>

        {/* Focus Areas 2x2 Grid */}
        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
          {focusAreas.map((area) => (
            <div
              key={area.title}
              className="glass-card p-6 border border-slate-800/80 bg-slate-900/40 rounded-xl hover:border-primary/40 transition-all duration-200"
            >
              <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 w-fit mb-4 text-primary">
                <area.icon className="h-5 w-5" />
              </div>
              <h4 className="text-base font-sans font-semibold text-foreground mb-2">
                {area.title}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Structured Technical Skills by Cluster */}
      <div className="glass-card p-8 border border-slate-800/80 bg-slate-900/40 rounded-2xl">
        <h3 className="text-xl font-sans font-bold text-foreground mb-6 flex items-center gap-2">
          <Code2 className="h-5 w-5 text-primary" />
          Technical Stack & Tooling
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillClusters.map((cluster) => (
            <div key={cluster.title} className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/60">
              <h4 className="text-xs font-mono font-semibold text-primary uppercase tracking-wider mb-3">
                {cluster.title}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {cluster.items.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 text-xs font-mono rounded-md bg-slate-800/60 text-slate-300 border border-slate-700/50"
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

