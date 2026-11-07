export interface ResearchPaper {
  slug: string;
  title: string;
  author: string;
  status: string;
  summary: string;
}

export const RESEARCH_PAPER: ResearchPaper = {
  slug: 'risk-based-verification-ai-agents',
  title: 'Risk-Based Verification and Evidence-Grounded Self-Correction for AI Data-Analysis Agents',
  author: 'Velagapudi Mahendra',
  status: 'Research proposal. Plan finalized October 17, 2026. No experiments run yet and no results yet.',
  summary:
    'A proposal for verifying AI data-analysis agents: check risky steps before they run, ground answers in evidence, and correct the agent when the evidence does not support its output.',
};
