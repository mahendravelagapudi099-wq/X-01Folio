import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Copy, Check, ArrowUpRight } from 'lucide-react';
import { RESEARCH_PAPER } from '@/data/researchData';

export default function ResearchPage() {
  const [copied, setCopied] = useState(false);

  const handleCopyBibtex = () => {
    navigator.clipboard.writeText(RESEARCH_PAPER.bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="min-h-screen bg-background text-foreground pt-28 pb-24 px-6 max-w-4xl mx-auto font-sans">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-8">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <span className="text-foreground">Academic Research</span>
      </div>

      {/* Monograph Header */}
      <header className="border-b border-border pb-8 mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-mono">
          <span className="text-neutral-300 font-semibold">
            {RESEARCH_PAPER.status}
          </span>
          <span className="text-muted-foreground">&bull;</span>
          <span className="text-muted-foreground">
            {RESEARCH_PAPER.date}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-sans font-bold text-foreground leading-[1.12] mb-4">
          {RESEARCH_PAPER.title}
        </h1>

        <p className="text-lg sm:text-xl font-sans text-muted-foreground leading-snug mb-6">
          {RESEARCH_PAPER.subtitle}
        </p>

        {/* Authors & Affiliation Metadata */}
        <div className="p-4 rounded border border-border bg-card flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div>
            <span className="text-muted-foreground block text-[11px] uppercase">Author</span>
            <strong className="text-foreground text-sm font-sans">{RESEARCH_PAPER.authors.join(', ')}</strong>
          </div>
          <div className="sm:text-right">
            <span className="text-muted-foreground block text-[11px] uppercase">Affiliation</span>
            <span className="text-foreground">{RESEARCH_PAPER.affiliation}</span>
          </div>
        </div>
      </header>

      {/* Abstract Box (Academic Paper Presentation) */}
      <section className="p-6 sm:p-8 rounded border-l-2 border-primary bg-card/60 mb-12">
        <h2 className="text-sm font-sans font-bold uppercase tracking-wider text-foreground mb-3">
          Abstract
        </h2>
        <p className="text-base text-foreground/90 leading-relaxed italic max-w-[70ch]">
          &ldquo;{RESEARCH_PAPER.abstract}&rdquo;
        </p>
        <div className="flex flex-wrap items-center gap-1.5 pt-4 mt-4 border-t border-border/50 text-xs font-mono">
          <span className="text-muted-foreground mr-1">Index Terms:</span>
          {RESEARCH_PAPER.keywords.map((kw) => (
            <span
              key={kw}
              className="px-2 py-0.5 rounded bg-muted border border-border text-foreground"
            >
              {kw}
            </span>
          ))}
        </div>
      </section>

      {/* Main Body */}
      <div className="space-y-12 text-foreground leading-relaxed text-base">
        {/* Section 1 */}
        <section className="border-b border-border pb-10">
          <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
            1. Problem Formulation &amp; Operational Failure Modes
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed max-w-[70ch]">
            {RESEARCH_PAPER.motivation}
          </p>
          <div className="p-4 rounded border border-border bg-card text-sm font-mono text-muted-foreground">
            <span className="text-foreground font-semibold block mb-2">Empirical Failure Taxonomy:</span>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>
                <strong className="text-foreground">Silent Cartesian Invariant Drift:</strong> Output cardinality $|A \times B| \gg \max(|A|, |B|)$ causing artificial row multiplications in downstream analytical rollups.
              </li>
              <li>
                <strong className="text-foreground">Post-Split Target Leakage:</strong> Normalization parameters, imputation medians, or target encodings fit across cross-validation boundaries.
              </li>
              <li>
                <strong className="text-foreground">Unchecked Null Coalescence:</strong> Unhandled NaN/None tokens silently dropping critical segments during aggregation groupings.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 2 */}
        <section className="border-b border-border pb-10">
          <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
            2. Two-Tier Verification Architecture
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {RESEARCH_PAPER.architectureTiers.map((tier) => (
              <div
                key={tier.tier}
                className="p-6 rounded border border-border bg-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2 text-xs font-mono">
                    <span className="text-primary font-semibold">
                      {tier.tier}
                    </span>
                    <ShieldCheck className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-sans font-bold text-lg text-foreground mb-1">
                    {tier.title}
                  </h3>
                  <span className="text-xs font-mono text-muted-foreground block mb-3">
                    Mechanism: {tier.mechanism}
                  </span>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tier.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Empirical Benchmarks with Booktabs Styling */}
        <section className="border-b border-border pb-10">
          <h2 className="text-2xl font-sans font-bold text-foreground mb-3">
            3. Empirical Evaluation &amp; Benchmark Findings
          </h2>
          <p className="text-muted-foreground text-sm mb-6 leading-relaxed max-w-[70ch]">
            Tested across real-world tabular data pipelines across three distinct operational domains. The baseline represents unconstrained LLM code execution with self-critique prompting. The verified rate represents execution guarded by our two-tier symbolic oracle.
          </p>

          <div className="overflow-x-auto rounded border border-border">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="bg-muted/70 border-b-2 border-border text-foreground font-semibold uppercase tracking-wider">
                  <th className="p-3.5">Dataset &bull; Benchmark Domain</th>
                  <th className="p-3.5">Baseline Hallucination</th>
                  <th className="p-3.5 text-foreground">Verified Rate</th>
                  <th className="p-3.5">AST Gate Latency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 bg-card/40 tabular-nums">
                {RESEARCH_PAPER.evaluation.map((evalRow, idx) => (
                  <tr key={idx} className="hover:bg-muted/30 transition-colors">
                    <td className="p-3.5 text-foreground font-medium">{evalRow.dataset}</td>
                    <td className="p-3.5 text-neutral-400 font-semibold">{evalRow.baselineHallucinationRate}</td>
                    <td className="p-3.5 text-foreground font-bold">{evalRow.verifiedHallucinationRate}</td>
                    <td className="p-3.5 text-muted-foreground">{evalRow.astGateLatency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Mathematical Invariant */}
        <section className="border-b border-border pb-10">
          <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
            4. Invariant Assertion Formulation
          </h2>
          <p className="text-muted-foreground text-sm mb-4 leading-relaxed max-w-[70ch]">
            For any analytical transformation T: D_in &rarr; D_out, runtime validation evaluates the empirical distribution divergence:
          </p>

          <div className="p-4 rounded border border-border bg-card font-mono text-sm text-foreground overflow-x-auto tabular-nums">
            <code>
              D_KS(F_in, F_out) = sup_x | F_n(x) - F_0(x) | &le; &epsilon;_threshold
            </code>
          </div>
          <p className="text-muted-foreground text-xs font-mono mt-2">
            If the Kolmogorov-Smirnov distance exceeds calibrated threshold &epsilon;, execution is quarantined and returned to the agent with concrete invariant violation counterexamples.
          </p>
        </section>

        {/* Section 5: BibTeX Citation */}
        <section className="pt-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-sans font-bold text-foreground">
              Cite This Working Paper (BibTeX)
            </h2>
            <button
              onClick={handleCopyBibtex}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono bg-card border border-border hover:bg-muted transition-colors text-foreground"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-foreground" /> Copied to Clipboard
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copy BibTeX
                </>
              )}
            </button>
          </div>

          <pre className="p-4 rounded border border-border bg-card text-xs font-mono text-muted-foreground overflow-x-auto leading-relaxed">
            {RESEARCH_PAPER.bibtex}
          </pre>
        </section>
      </div>
    </article>
  );
}

