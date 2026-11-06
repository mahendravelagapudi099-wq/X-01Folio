import { ShieldCheck, BookOpen, GitBranch, CheckCircle2, FileText, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RESEARCH_TITLE =
  'Risk-Based Verification and Evidence-Grounded Self-Correction for AI Data-Analysis Agents';

const KEYWORDS = [
  'Autonomous AI Agents',
  'Runtime Verification',
  'Self-Correction Oracles',
  'Data Pipeline Integrity',
  'AST Code Analysis',
  'Tabular Benchmarking'
];

const Research = () => (
  <section id="research" className="py-24 px-6 max-w-7xl mx-auto" aria-labelledby="research-heading">
    <div className="mb-16 text-center">
      <h2
        id="research-heading"
        className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight text-foreground mb-4"
      >
        Academic & Applied Research
      </h2>
      <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-4" />
      <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
        WORKING PAPERS &bull; SYSTEMATIC VERIFICATION METHODOLOGIES
      </p>
    </div>

    <div className="max-w-4xl mx-auto">
      <article className="glass-card p-8 md:p-10 border border-slate-800 bg-slate-900/60 rounded-2xl relative overflow-hidden">
        {/* Subtle accent highlight line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-sky-400 to-secondary" />

        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              ONGOING RESEARCH &bull; WORKING PAPER
            </span>
          </div>
          <span className="text-xs font-mono text-slate-500">
            AFFILIATION: MREM DATA SCIENCE
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-sans font-bold text-foreground leading-snug mb-6">
          {RESEARCH_TITLE}
        </h3>

        {/* Structured Research Sections */}
        <div className="space-y-6 text-sm text-slate-300 leading-relaxed mb-8">
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-primary mb-2 flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" />
              1. The Problem & Motivation
            </h4>
            <p className="text-muted-foreground">
              Autonomous AI coding and data-analysis agents generate plausible-sounding analytical findings that frequently mask subtle statistical hallucinations—such as silent data leakage, improper aggregation grouping, or unchecked null propagations. In enterprise and scientific settings, blind trust in unverified agent outputs introduces serious operational risk.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-primary mb-2 flex items-center gap-1.5">
              <GitBranch className="h-4 w-4" />
              2. Proposed Two-Tier Verification Architecture
            </h4>
            <ul className="space-y-2 text-muted-foreground pl-4 border-l border-slate-800">
              <li>
                <strong className="text-slate-200">Phase I &mdash; Risk-Based Execution Gate:</strong> Static AST inspection of generated analytical scripts to identify high-variance joins, unconstrained filtering, and type-unsafe transformations prior to runtime execution.
              </li>
              <li>
                <strong className="text-slate-200">Phase II &mdash; Evidence-Grounded Self-Correction:</strong> Runtime test oracles computing deterministic distribution checks, invariant constraints, and automated remediation feedback loops that force the agent to cite concrete dataframe evidence before finalizing conclusions.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-primary mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" />
              3. Empirical Evaluation Plan
            </h4>
            <p className="text-muted-foreground">
              Benchmarking the system across standardized tabular datasets (financial time-series and healthcare records) to quantitatively measure error-catch recall, hallucination mitigation rates, and token efficiency compared to standard unconstrained agent baselines.
            </p>
          </div>
        </div>

        {/* Keywords */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {KEYWORDS.map((keyword) => (
              <span
                key={keyword}
                className="rounded-md border border-slate-800 bg-slate-950/60 px-2.5 py-1 text-[11px] font-mono text-slate-400"
              >
                #{keyword}
              </span>
            ))}
          </div>

          <Button
            size="sm"
            variant="outline"
            className="text-xs font-mono border-slate-700 hover:bg-slate-800"
            asChild
          >
            <a href="#contact">
              Discuss Methodology
              <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </article>
    </div>
  </section>
);

export default Research;

