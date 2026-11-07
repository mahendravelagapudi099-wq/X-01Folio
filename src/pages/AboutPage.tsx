import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Award, Download } from 'lucide-react';
import { CERTIFICATES } from '@/data/credentialsData';

export default function AboutPage() {
  const skillsWithRatings = [
    { name: 'Python & ML', level: 92 },
    { name: 'SQL', level: 88 },
    { name: 'Data Visualization', level: 90 },
    { name: 'AI Search', level: 85 },
    { name: 'Web Development', level: 88 },
    { name: 'Data Engineering', level: 82 },
    { name: 'C++ Proficient', level: 82 },
    { name: 'R Proficient', level: 78 },
    { name: 'Apache Spark & SQL Expert', level: 84 },
    { name: 'AWS', level: 82 },
    { name: 'GCP', level: 84 },
  ];

  return (
    <article className="min-h-screen bg-background text-foreground pt-28 pb-24 px-6 max-w-4xl mx-auto font-sans">
      <Helmet>
        <title>About &amp; Trajectory | Velagapudi Mahendra</title>
        <meta
          name="description"
          content="Academic background, experience, and verified technical competencies of Velagapudi Mahendra."
        />
        <link rel="canonical" href="https://mahendraa.dev/about" />
      </Helmet>
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
          B.Tech CSE (Data Science) student at Malla Reddy Engineering College and Management Sciences, Hyderabad.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-6">
          <a
            href="/Velagapudi_Mahendra_Resume.pdf"
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

      {/* Stats Strip */}
      <section className="mb-12 p-6 rounded-xl border border-border bg-card grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        <div>
          <span className="font-display text-3xl sm:text-4xl font-normal text-foreground">8</span>
          <span className="block text-[11px] font-mono text-muted-foreground uppercase tracking-wider mt-1">Projects</span>
        </div>
        <div>
          <span className="font-display text-3xl sm:text-4xl font-normal text-foreground">6</span>
          <span className="block text-[11px] font-mono text-muted-foreground uppercase tracking-wider mt-1">Certifications</span>
        </div>
        <div>
          <span className="font-display text-3xl sm:text-4xl font-normal text-foreground">0.733</span>
          <span className="block text-[11px] font-mono text-muted-foreground uppercase tracking-wider mt-1">Macro-F1 (IndicBERTv2)</span>
        </div>
        <div>
          <span className="font-display text-3xl sm:text-4xl font-normal text-foreground">&lt; 24h</span>
          <span className="block text-[11px] font-mono text-muted-foreground uppercase tracking-wider mt-1">Replies Within 24h</span>
        </div>
      </section>

      {/* Education */}
      <section className="mb-12 border-b border-border pb-10">
        <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
          Education
        </h2>
        <div className="p-5 rounded border border-border bg-card">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
            <div>
              <span className="text-xs font-mono text-primary font-semibold tabular-nums">2023 &ndash; 2027</span>
              <h3 className="font-sans font-bold text-base text-foreground mt-1">
                B.Tech Computer Science and Engineering (Data Science)
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                Malla Reddy Engineering College &amp; Management Sciences, Hyderabad
              </p>
            </div>
            <span className="text-xs font-mono text-muted-foreground shrink-0 sm:text-right">
              Currently pursuing (7th semester)
            </span>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="mb-12 border-b border-border pb-10">
        <h2 className="text-2xl font-sans font-bold text-foreground mb-6">
          Experience &amp; Leadership Timeline
        </h2>
        <div className="space-y-4">
          <div className="p-5 rounded border border-border bg-card">
            <span className="text-xs font-mono text-primary font-semibold tabular-nums">May &ndash; Jun 2025</span>
            <h3 className="font-sans font-bold text-base text-foreground mt-1">
              Data Science Intern &bull; Codec Technologies Pvt. Ltd (Remote)
            </h3>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              Contributed to VectorMind, a sales-analytics platform that explains trends, forecasts sales, and answers natural-language questions about sales data.
            </p>
          </div>

          <div className="p-5 rounded border border-border bg-card">
            <span className="text-xs font-mono text-neutral-300 font-semibold tabular-nums">2025</span>
            <h3 className="font-sans font-bold text-base text-foreground mt-1">
              Google Tech Sprint Hackathon 2025 &bull; 4th Place
            </h3>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              Built MDM, a tamper-evident digital certificate platform with cryptographically signed credentials, automated PDF generation, IPFS anchoring, QR verification, and role-based access.
            </p>
          </div>

          <div className="p-5 rounded border border-border bg-card">
            <span className="text-xs font-mono text-neutral-300 font-semibold tabular-nums">Feb 2025 &ndash; Present</span>
            <h3 className="font-sans font-bold text-base text-foreground mt-1">
              Student Chair &bull; CODE FORGE Student Club
            </h3>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              Leading student technical club activities, coding workshops, and peer collaboration initiatives.
            </p>
          </div>

          <div className="p-5 rounded border border-border bg-card">
            <span className="text-xs font-mono text-neutral-300 font-semibold tabular-nums">Jan &ndash; Jul 2026</span>
            <h3 className="font-sans font-bold text-base text-foreground mt-1">
              Campus Mantri &bull; GeeksforGeeks (6 months)
            </h3>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              Campus Mantri representative for GeeksforGeeks student community engagements.
            </p>
          </div>
        </div>
      </section>

      {/* Confirmed Skills with Self-Ratings */}
      <section className="mb-12">
        <h2 className="text-2xl font-sans font-bold text-foreground mb-6">
          Skills &amp; Technical Competencies
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skillsWithRatings.map((skill) => (
            <div key={skill.name} className="p-4 rounded border border-border bg-card flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="font-semibold text-foreground">{skill.name}</span>
                <span className="text-muted-foreground tabular-nums">{skill.level}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-foreground h-full rounded-full transition-all duration-500"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
