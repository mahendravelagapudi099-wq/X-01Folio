const RESEARCH_TITLE =
  'Risk-Based Verification and Evidence-Grounded Self-Correction for AI Data-Analysis Agents';

const KEYWORDS = ['AI Agents', 'Verification', 'Self-Correction', 'Data Analysis'];

const Research = () => (
  <section id="research" className="py-20 px-6 max-w-7xl mx-auto" aria-labelledby="research-heading">
    <div className="fade-in mb-16 text-center">
      <h2
        id="research-heading"
        className="mb-6 bg-gradient-primary bg-clip-text font-orbitron text-4xl font-bold text-transparent md:text-5xl"
      >
        Research
      </h2>
      <div className="mx-auto h-1 w-24 rounded-full bg-gradient-primary" />
    </div>

    <div className="mx-auto max-w-4xl fade-in delay-200">
      <article className="glass-card p-8 transition-all duration-300 hover:glow-secondary md:p-12">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="glass-card border border-primary/30 px-3 py-1 text-xs font-bold tracking-wider text-primary uppercase">
            In progress
          </span>
        </div>

        <h3 className="mb-6 bg-gradient-primary bg-clip-text font-orbitron text-2xl font-bold leading-snug text-transparent md:text-3xl">
          {RESEARCH_TITLE}
        </h3>

        <p className="mb-6 leading-relaxed text-muted-foreground">
          A full write-up is on the way &mdash; watch this space for the abstract, method,
          and results once it&rsquo;s published. Happy to talk about the work in the meantime;
          the fastest way is the contact form.
        </p>

        <div className="flex flex-wrap gap-2">
          {KEYWORDS.map((keyword) => (
            <span
              key={keyword}
              className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] tracking-wide text-primary uppercase"
            >
              {keyword}
            </span>
          ))}
        </div>
      </article>
    </div>
  </section>
);

export default Research;
