import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { PROJECTS, Project } from '@/data/projectsData';

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'nlp', label: 'NLP & Language' },
    { id: 'data', label: 'Data Science & ML' },
    { id: 'rag', label: 'RAG & Retrieval' },
    { id: 'rl', label: 'Reinforcement Learning' },
  ];

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'nlp') return p.category.toLowerCase().includes('nlp');
    if (activeFilter === 'rag') return p.category.toLowerCase().includes('rag');
    if (activeFilter === 'rl') return p.category.toLowerCase().includes('reinforcement');
    if (activeFilter === 'data') {
      return (
        p.category.toLowerCase().includes('data') ||
        p.category.toLowerCase().includes('monitoring') ||
        p.category.toLowerCase().includes('visualization')
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background text-foreground pt-28 pb-20 px-6 max-w-5xl mx-auto font-sans">
      <Helmet>
        <title>Projects &amp; Case Studies | Velagapudi Mahendra</title>
        <meta
          name="description"
          content="Data science, machine learning, and engineering projects by Velagapudi Mahendra."
        />
        <link rel="canonical" href="https://mahendraa.dev/projects" />
      </Helmet>
      {/* Header */}
      <div className="flex flex-col gap-4 mb-12 border-b border-border pb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground">Engineering &amp; Systems</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-sans font-bold text-foreground">
          Systems &amp; Engineering Case Studies
        </h1>

        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
          Production AI inference engines, vector retrieval pipelines, time-series forecasting models, and statistical analysis applications. Every project addresses a concrete operational bottleneck with measurable benchmarks.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-3.5 py-1.5 rounded text-xs font-mono font-medium transition-colors ${
                activeFilter === cat.id
                  ? 'bg-foreground text-background font-semibold'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Ledger (Asymmetric Editorial Layout) */}
      <div className="divide-y divide-border border-y border-border">
        {filteredProjects.map((project) => (
          <article
            key={project.slug}
            className="py-10 group flex flex-col md:flex-row md:items-start justify-between gap-8"
          >
            {/* Left Metadata Column */}
            <div className="md:w-1/4 shrink-0 text-xs font-mono text-muted-foreground">
              <span className="text-primary font-semibold uppercase tracking-wider block mb-1">
                {project.category}
              </span>
              <span className="block mb-2 tabular-nums">{project.date}</span>
              <span className="text-muted-foreground/80 block">{project.role}</span>
            </div>

            {/* Center Content Column */}
            <div className="md:w-1/2 flex flex-col gap-3">
              <h2 className="text-2xl font-sans font-bold text-foreground group-hover:text-primary transition-colors">
                <Link to={`/projects/${project.slug}`}>
                  {project.title}
                </Link>
              </h2>

              <p className="text-sm font-medium text-foreground/80 leading-snug">
                {project.tagline}
              </p>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.summary}
              </p>

              {/* Benchmarks Strip with Tabular Numerals */}
              {project.benchmarks && project.benchmarks.length > 0 && (
                <div className="p-3.5 rounded border border-border bg-card text-xs font-mono tabular-nums space-y-1">
                  {project.benchmarks.map((b, idx) => (
                    <div key={idx} className="flex items-baseline justify-between gap-2">
                      <span className="text-muted-foreground text-[11px] uppercase">{b.metric}:</span>
                      <span className="font-semibold text-foreground">{b.value}</span>
                      <span className="text-muted-foreground text-[10px] hidden sm:inline">({b.note})</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-muted text-muted-foreground border border-border"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Action Column */}
            <div className="md:w-1/4 shrink-0 flex md:flex-col md:items-end justify-between md:justify-start gap-3 pt-2 text-xs font-mono">
              <Link
                to={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1 font-semibold text-foreground group-hover:text-primary transition-colors"
              >
                Read Deep Case Study <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <div className="flex items-center gap-3 text-muted-foreground">
                {project.liveDemo && project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground flex items-center gap-1 transition-colors"
                  >
                    Live Demo <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground flex items-center gap-1 transition-colors"
                  >
                    GitHub <ArrowUpRight className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-muted-foreground/60">
                    {project.githubLabel || 'Private repo'}
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

