import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { RESEARCH_PAPER } from '@/data/researchData';

export default function ResearchPage() {
  return (
    <article className="min-h-screen bg-background text-foreground pt-28 pb-24 px-6 max-w-4xl mx-auto font-sans">
      <Helmet>
        <title>Research Proposal | Velagapudi Mahendra</title>
        <meta
          name="description"
          content="Risk-Based Verification and Evidence-Grounded Self-Correction for AI Data-Analysis Agents — Research proposal by Velagapudi Mahendra."
        />
        <link rel="canonical" href="https://mahendraa.dev/research" />
      </Helmet>
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-8">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <span className="text-foreground">Research Proposal</span>
      </div>

      {/* Header */}
      <header className="border-b border-border pb-8 mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-mono">
          <span className="text-primary font-semibold">
            {RESEARCH_PAPER.status}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-sans font-bold text-foreground leading-[1.12] mb-6">
          {RESEARCH_PAPER.title}
        </h1>

        <div className="p-4 rounded border border-border bg-card flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div>
            <span className="text-muted-foreground block text-[11px] uppercase">Author</span>
            <strong className="text-foreground text-sm font-sans">{RESEARCH_PAPER.author}</strong>
          </div>
          <div className="sm:text-right">
            <span className="text-muted-foreground block text-[11px] uppercase">Institution</span>
            <span className="text-foreground">Malla Reddy Engineering College &amp; Management Sciences, Hyderabad</span>
          </div>
        </div>
      </header>

      {/* Summary Section */}
      <section className="p-6 sm:p-8 rounded border-l-2 border-primary bg-card/60 mb-12">
        <h2 className="text-sm font-sans font-bold uppercase tracking-wider text-foreground mb-3">
          Proposal Summary
        </h2>
        <p className="text-base text-foreground/90 leading-relaxed max-w-[70ch]">
          {RESEARCH_PAPER.summary}
        </p>
      </section>

      {/* Status & Scope Notice */}
      <section className="space-y-6 text-foreground leading-relaxed text-sm">
        <div className="p-5 rounded border border-border bg-card">
          <h2 className="text-base font-sans font-bold text-foreground mb-2">
            Status Notice
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            This is a research proposal finalized on October 17, 2026. No experiments have been conducted yet and no empirical results exist at this stage. Experimental benchmarks and formal preprint links will be published once validation runs are completed.
          </p>
        </div>
      </section>
    </article>
  );
}
