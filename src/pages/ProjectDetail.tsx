import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { PROJECTS, Project } from '@/data/projectsData';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();

  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[projectIndex];

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground pt-36 pb-20 px-6 max-w-3xl mx-auto text-center font-sans">
        <h1 className="text-3xl font-sans font-bold mb-4">Case Study Not Found</h1>
        <p className="text-muted-foreground mb-8 text-sm">
          The requested system slug <code className="px-2 py-1 bg-muted rounded font-mono text-xs">/{slug}</code> is not in the active registry.
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-foreground text-background font-mono text-xs uppercase tracking-wider font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Project Catalog
        </Link>
      </div>
    );
  }

  const prevProject = projectIndex > 0 ? PROJECTS[projectIndex - 1] : null;
  const nextProject = projectIndex < PROJECTS.length - 1 ? PROJECTS[projectIndex + 1] : null;

  return (
    <article className="min-h-screen bg-background text-foreground pt-28 pb-24 px-6 max-w-4xl mx-auto font-sans">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-8">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <Link to="/projects" className="hover:text-foreground">
          Projects
        </Link>
        <span>/</span>
        <span className="text-foreground truncate">{project.title}</span>
      </div>

      {/* Case Study Header */}
      <header className="flex flex-col gap-4 border-b border-border pb-8 mb-12">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-muted-foreground">
          <span className="text-primary font-semibold uppercase tracking-wider">
            {project.category}
          </span>
          <div className="flex items-center gap-3">
            <span>{project.role}</span>
            <span>&bull;</span>
            <span>{project.date}</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl font-sans font-bold text-foreground leading-[1.12]">
          {project.title}
        </h1>

        <p className="text-lg sm:text-xl font-sans text-muted-foreground leading-snug">
          {project.tagline}
        </p>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {project.liveDemo && project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded bg-foreground text-background text-xs font-mono font-semibold hover:opacity-90 transition-opacity"
            >
              Open Live Application <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded border border-border bg-card hover:bg-muted text-xs font-mono font-medium text-foreground transition-colors"
          >
            <Github className="w-3.5 h-3.5" /> Source Repository <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* Benchmark Grid (Tabular Numerals, Authoritative Heading) */}
      <section className="mb-14">
        <h2 className="text-xl font-sans font-bold text-foreground mb-4">
          Empirical Performance Benchmarks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {project.benchmarks.map((bm, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg border border-border bg-card flex flex-col justify-between"
            >
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                {bm.metric}
              </span>
              <span className="text-2xl font-sans font-bold text-foreground my-1 tabular-nums">
                {bm.value}
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                {bm.note}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Visual Asset / Preview */}
      {project.image && (
        <figure className="mb-14 rounded-lg border border-border overflow-hidden bg-card">
          <img
            src={project.image}
            alt={project.imageAlt}
            className="w-full h-auto object-cover max-h-[440px]"
            loading="lazy"
          />
          <figcaption className="p-3 text-xs font-mono text-muted-foreground border-t border-border bg-background/60 flex items-center justify-between">
            <span>{project.imageAlt}</span>
            <span className="uppercase">Verified Artifact</span>
          </figcaption>
        </figure>
      )}

      {/* Case Study Content Sections */}
      <div className="space-y-12 leading-relaxed text-foreground">
        {/* Section 1: The Problem */}
        <section className="border-b border-border pb-10">
          <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
            Operational Challenge &amp; Problem Statement
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed max-w-[70ch]">
            {project.problem}
          </p>
        </section>

        {/* Section 2: Technical Architecture */}
        <section className="border-b border-border pb-10">
          <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
            Technical Architecture &amp; Execution Pipeline
          </h2>
          <div className="space-y-4">
            {project.architecture.map((archStep, idx) => {
              const [heading, ...descParts] = archStep.split(':');
              return (
                <div
                  key={idx}
                  className="p-4 rounded-lg border border-border bg-card flex items-start gap-4"
                >
                  <span className="font-mono text-xs font-bold text-primary shrink-0 mt-0.5 tabular-nums">
                    [{idx + 1}]
                  </span>
                  <div>
                    <strong className="text-sm font-sans font-semibold text-foreground block mb-0.5">
                      {heading}
                    </strong>
                    <span className="text-sm text-muted-foreground leading-relaxed">
                      {descParts.join(':')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 3: Tech Stack & System Specifications */}
        <section className="border-b border-border pb-10">
          <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
            Data Contracts &amp; Technologies
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 rounded text-xs font-mono font-medium bg-card border border-border text-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* Footer Navigation */}
      <footer className="pt-12 mt-12 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
        {prevProject ? (
          <Link
            to={`/projects/${prevProject.slug}`}
            className="flex flex-col items-start gap-1 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>&larr; Previous Case Study</span>
            <span className="font-sans font-bold text-sm text-foreground">
              {prevProject.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        <Link
          to="/projects"
          className="px-4 py-2 rounded border border-border bg-card hover:bg-muted text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          All Case Studies
        </Link>

        {nextProject ? (
          <Link
            to={`/projects/${nextProject.slug}`}
            className="flex flex-col items-end gap-1 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>Next Case Study &rarr;</span>
            <span className="font-sans font-bold text-sm text-foreground">
              {nextProject.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </footer>
    </article>
  );
}

