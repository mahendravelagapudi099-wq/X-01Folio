import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Award, Download, CheckCircle2 } from 'lucide-react';
import { CERTIFICATES } from '@/data/credentialsData';

export default function AboutPage() {
  return (
    <article className="min-h-screen bg-background text-foreground pt-28 pb-24 px-6 max-w-4xl mx-auto font-sans">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-8">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <span className="text-foreground">About &amp; Trajectory</span>
      </div>

      {/* Header */}
      <header className="border-b border-border pb-8 mb-10">
        <h1 className="text-4xl sm:text-5xl font-sans font-bold text-foreground mb-4">
          Velagapudi Mahendra
        </h1>
        <p className="text-xl font-sans text-muted-foreground leading-snug">
          Computer Science &amp; Data Science student at MREM. Researcher-builder focused on verifiable data systems, runtime invariant assertions, and empirical machine learning.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-6">
          <a
            href="/resume/Mahendra_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-foreground text-background text-xs font-mono font-semibold hover:opacity-90 transition-opacity uppercase tracking-wider"
          >
            <Download className="w-3.5 h-3.5" /> Download Formal CV (PDF)
          </a>
          <Link
            to="/credentials"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded border border-border bg-card hover:bg-muted text-xs font-mono text-foreground transition-colors"
          >
            <Award className="w-3.5 h-3.5 text-primary" /> Verified Credentials
          </Link>
          <a
            href="mailto:contact@mahendraa.dev"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            contact@mahendraa.dev
          </a>
        </div>
      </header>

      {/* Trajectory & Bio */}
      <section className="space-y-6 text-foreground text-base leading-relaxed mb-12">
        <h2 className="text-2xl font-sans font-bold text-foreground">
          Academic Trajectory
        </h2>
        <p className="text-muted-foreground leading-relaxed max-w-[70ch]">
          I am currently pursuing a Bachelor of Technology in Computer Science &amp; Engineering (Data Science) at <strong className="text-foreground">Malla Reddy Engineering College (MREM)</strong>, affiliated with Jawaharlal Nehru Technological University Hyderabad (JNTUH), graduating in 2027.
        </p>
        <p className="text-muted-foreground leading-relaxed max-w-[70ch]">
          My primary focus sits at the intersection of <strong className="text-foreground">runtime verification for autonomous AI agents</strong> and <strong className="text-foreground">scalable data intelligence</strong>. Rather than treating machine learning outputs as black boxes, my work explores deterministic symbolic oracles, abstract syntax tree (AST) execution gates, and calibrated statistical invariants to eliminate silent failure modes in automated analytical pipelines.
        </p>
      </section>

      {/* Core Technical Philosophy */}
      <section className="p-6 sm:p-8 rounded border border-border bg-card mb-12">
        <h2 className="text-xl font-sans font-bold text-foreground mb-4">
          Core Engineering Principles
        </h2>
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-foreground shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">Baseline First:</strong> Never deploy complex neural architectures where regularized regression, gradient boosted trees, or structured heuristic rules deliver comparable performance with superior interpretability and lower latency.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-foreground shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">Deterministic Guardrails:</strong> Autonomous AI agents must never self-certify. Output validation requires independent, non-neural assertions that inspect AST code invariants and demand ground-truth matrix coordinates before conclusions are finalized.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-foreground shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">Code Economy:</strong> Write the minimum code required to solve the problem completely. Eliminate decorative abstractions, unmaintained dependencies, and artificial marketing fluff.
            </div>
          </div>
        </div>
      </section>

      {/* Academic Timeline */}
      <section className="mb-12 border-b border-border pb-12">
        <h2 className="text-2xl font-sans font-bold text-foreground mb-6">
          Education &amp; Academic Milestones
        </h2>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between p-5 rounded border border-border bg-card gap-2">
            <div>
              <span className="text-xs font-mono text-primary font-semibold tabular-nums">2023 &ndash; 2027</span>
              <h3 className="font-sans font-bold text-base text-foreground mt-1">
                B.Tech in Computer Science &amp; Engineering (Data Science)
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                Malla Reddy Engineering College (MREM) &bull; JNTUH Affiliated
              </p>
              <p className="text-xs text-muted-foreground mt-2 max-w-xl">
                Coursework: Advanced Data Structures, Probability &amp; Statistics, Machine Learning, Database Management Systems, Distributed Computing, Design &amp; Analysis of Algorithms.
              </p>
            </div>
            <span className="text-xs font-mono text-muted-foreground shrink-0 sm:text-right">
              Hyderabad, India
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start justify-between p-5 rounded border border-border bg-card gap-2">
            <div>
              <span className="text-xs font-mono text-neutral-300 font-semibold tabular-nums">Jan &ndash; Apr 2025</span>
              <h3 className="font-sans font-bold text-base text-foreground mt-1">
                Data Analytics with Python (12-Week Proctored Program)
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                NPTEL &bull; Indian Institute of Technology (IIT) Roorkee
              </p>
              <p className="text-xs text-muted-foreground mt-2 max-w-xl">
                Proctored examination covering exploratory data analysis, hypothesis testing, regression modeling, and statistical estimation. Credential ID: NPTEL25CS17S1147000547.
              </p>
            </div>
            <a
              href="https://nptel.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-primary hover:underline flex items-center gap-1 shrink-0"
            >
              Verify <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* Toolkit & Systems Environment */}
      <section className="mb-12">
        <h2 className="text-2xl font-sans font-bold text-foreground mb-6">
          Technical Toolkit &amp; Systems
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded border border-border bg-card">
            <span className="text-foreground uppercase tracking-wider block mb-2 font-semibold text-[11px]">
              Machine Learning &amp; Statistics
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['Python', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'SciPy', 'ChromaDB', 'LangChain', 'Prophet'].map((t) => (
                <span key={t} className="px-2 py-0.5 rounded bg-muted text-foreground border border-border">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded border border-border bg-card">
            <span className="text-foreground uppercase tracking-wider block mb-2 font-semibold text-[11px]">
              Full-Stack &amp; Web Interfaces
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['TypeScript', 'React', 'Next.js', 'Vite', 'Tailwind CSS', 'Node.js', 'HTML5', 'CSS3'].map((t) => (
                <span key={t} className="px-2 py-0.5 rounded bg-muted text-foreground border border-border">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded border border-border bg-card">
            <span className="text-foreground uppercase tracking-wider block mb-2 font-semibold text-[11px]">
              Data Persistence &amp; Storage
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['PostgreSQL', 'MongoDB', 'Supabase', 'Firebase Firestore', 'Redis', 'SQLite'].map((t) => (
                <span key={t} className="px-2 py-0.5 rounded bg-muted text-foreground border border-border">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded border border-border bg-card">
            <span className="text-foreground uppercase tracking-wider block mb-2 font-semibold text-[11px]">
              Developer Workflow &amp; Tooling
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['Git', 'GitHub Actions', 'Linux (Ubuntu)', 'Postman', 'Docker', 'Bash', 'Jupyter Lab'].map((t) => (
                <span key={t} className="px-2 py-0.5 rounded bg-muted text-foreground border border-border">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

