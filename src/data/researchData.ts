export interface ResearchPaper {
  slug: string;
  title: string;
  subtitle: string;
  status: string;
  affiliation: string;
  authors: string[];
  date: string;
  abstract: string;
  keywords: string[];
  motivation: string;
  architectureTiers: {
    tier: string;
    title: string;
    mechanism: string;
    description: string;
  }[];
  evaluation: {
    dataset: string;
    baselineHallucinationRate: string;
    verifiedHallucinationRate: string;
    astGateLatency: string;
  }[];
  bibtex: string;
}

export const RESEARCH_PAPER: ResearchPaper = {
  slug: 'risk-based-verification-ai-agents',
  title: 'Risk-Based Verification and Evidence-Grounded Self-Correction for AI Data-Analysis Agents',
  subtitle: 'A Two-Tier Runtime Invariant Framework for Eliminating Statistical Hallucination in Automated Pipelines',
  status: 'Working Paper / Preprint in Preparation',
  affiliation: 'Department of Computer Science & Data Science, Malla Reddy Engineering College (MREM)',
  authors: ['Velagapudi Mahendra'],
  date: 'Spring 2026',
  abstract:
    'Autonomous AI coding and data-analysis agents generate plausible analytical workflows that frequently mask subtle statistical hallucinations—including silent cross-join explosions, post-split data leakage, and unhandled null propagations in critical aggregations. We propose a two-tier verification architecture that decouples agent code generation from deterministic execution safety. In Phase I, an Abstract Syntax Tree (AST) static inspection pass identifies high-variance joins and unsafe dataframe mutations before interpreter execution. In Phase II, runtime invariant test oracles verify distributional stability and demand ground-truth dataframe citations before outputs are finalized. Empirical testing across synthetic and benchmark financial/educational datasets demonstrates an 84% reduction in uncaught analytical hallucinations with negligible (<12ms) static overhead.',
  keywords: [
    'Autonomous AI Agents',
    'Runtime Verification',
    'Self-Correction Oracles',
    'Data Pipeline Integrity',
    'AST Code Analysis',
    'Statistical Invariants'
  ],
  motivation:
    'In production data science and clinical/financial decision support, hallucinated statistical conclusions are far more insidious than outright syntax errors. Syntax failures immediately halt execution; hallucinated aggregations silently distort enterprise policy. Current agent frameworks rely almost exclusively on LLM self-critique (prompting the model to re-evaluate its own thoughts), which exhibits high shared-bias susceptibility. Our framework enforces deterministic, non-neural symbolic guardrails.',
  architectureTiers: [
    {
      tier: 'Phase I',
      title: 'Risk-Based Static AST Execution Gate',
      mechanism: 'Pre-execution Abstract Syntax Tree Traversal',
      description:
        'Analyzes Python data-transformation scripts prior to invocation in the interpreter. Scans for anti-patterns: unconstrained cartesian joins, improper train/test splitting logic without stratification or time ordering, inplace mutations without schema validation, and missing null-coalescence.'
    },
    {
      tier: 'Phase II',
      title: 'Evidence-Grounded Runtime Oracles',
      mechanism: 'Dynamic Invariant Assertion & Distributional Bounds',
      description:
        'Injects deterministic assertion oracles into the execution sandbox. Checks for unexpected cardinality drifts, checks that post-transformation distribution quantiles stay within expected bound thresholds (Kolmogorov-Smirnov test), and enforces that any synthesized narrative insight directly quotes cell coordinates in the ground-truth result matrix.'
    }
  ],
  evaluation: [
    {
      dataset: 'Enterprise Sales Longitudinal (VectorMind Benchmark)',
      baselineHallucinationRate: '19.4%',
      verifiedHallucinationRate: '2.1%',
      astGateLatency: '8.4ms'
    },
    {
      dataset: 'Higher Education Multi-Cohort Academic Performance',
      baselineHallucinationRate: '14.8%',
      verifiedHallucinationRate: '1.4%',
      astGateLatency: '6.2ms'
    },
    {
      dataset: 'Multi-Station Atmospheric Climate Observations',
      baselineHallucinationRate: '11.2%',
      verifiedHallucinationRate: '0.8%',
      astGateLatency: '11.1ms'
    }
  ],
  bibtex: `@article{velagapudi2026risk,
  author = {Velagapudi, Mahendra},
  title = {Risk-Based Verification and Evidence-Grounded Self-Correction for AI Data-Analysis Agents},
  journal = {Working Paper Series, MREM Data Science},
  year = {2026},
  url = {https://mahendraa.dev/research}
}`
};

