import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowUpRight, 
  BookOpen, 
  Check, 
  ChevronDown 
} from 'lucide-react';
import { PROJECTS } from '@/data/projectsData';
import { RESEARCH_PAPER } from '@/data/researchData';
import { CERTIFICATES } from '@/data/credentialsData';
import { TaglineReveal } from '@/components/TaglineReveal';
import { Logo } from '@/components/Logo';
import { InvariantMonitor } from '@/components/InvariantMonitor';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "What is your primary research focus in Computer Science and Data Science?",
    answer: "My core research focuses on runtime verification for autonomous AI agents and automated analytical workflows. Rather than treating neural outputs as unexaminable black boxes, I construct deterministic static AST gates and runtime statistical oracles that bound system behavior and eliminate ungrounded hallucinations.",
  },
  {
    question: "Are you available for research fellowships or engineering roles?",
    answer: "Yes. I am actively seeking international research fellowships (such as MEXT and Honjo), data science research internships, and software engineering roles for 2025 and 2026. I am based in Hyderabad, India and open to both on-site and remote commitments.",
  },
  {
    question: "How do you verify machine learning models in your projects?",
    answer: "Every model pipeline enforces strict pre-execution dataset partitioning, Kolmogorov-Smirnov distribution drift testing, and deterministic metric logging. Benchmarks are reported with unrounded tabular precision alongside full test-set evaluation artifacts.",
  },
  {
    question: "Can I inspect the source code and reproducible benchmarks for your work?",
    answer: "All primary systems including SentimentScopex, VectorMind RAG, and working paper benchmarks are open-source and hosted on GitHub with reproducible environment definitions, automated test suites, and Docker deployment configs.",
  },
  {
    question: "What is your primary development and research stack?",
    answer: "For research and machine learning: Python, PyTorch, Scikit-learn, Pandas, NumPy, and AST parsers. For production systems: React, TypeScript, Next.js, Node.js, PostgreSQL, Tailwind CSS, and FastAPI.",
  },
  {
    question: "How do you collaborate and what is your response time for technical inquiries?",
    answer: "I respond to all academic inquiries, recruiter communications, and research collaboration proposals within 24 hours via direct email at contact@mahendraa.dev or through the verified inquiry portal.",
  },
];

export default function Home() {
  const featuredProjects = PROJECTS.filter((p) => p.featured).slice(0, 3);
  const topCredentials = CERTIFICATES.slice(0, 4);

  // FAQ open state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#FFFFFF] font-sans selection:bg-[#FFFFFF] selection:text-[#000000]">
      {/* 
        A2. SECTION 1: HERO SECTION
        Strict B5 rules:
        - Max width 680px for heading and subheading
        - Dark theme text gradient from #FFFFFF to #9B9B9B
        - Meaningful line breaks
        - One clear primary action + one proof signal
      */}
      <section className="pt-24 sm:pt-32 pb-20 px-6 max-w-5xl mx-auto border-b border-[#272727]">
        <div className="flex flex-col items-start gap-8">
          {/* Proof signal badge */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-md bg-[#181818] border border-[#272727] text-xs font-mono text-[#9B9B9B]">
            <span className="w-2 h-2 rounded-full bg-[#FFFFFF] animate-pulse" />
            <span>MREM B.Tech CSE Data Science &bull; IIT Roorkee Certified</span>
          </div>

          {/* Heading with B5 left-to-right text gradient and 680px cap */}
          <div className="max-w-[680px]">
            <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.08] hero-gradient-text">
              Building verifiable machine learning systems and reliable data pipelines.
            </h1>
          </div>

          {/* Subheading: max width 680px, outcome + audience */}
          <div className="max-w-[680px]">
            <p className="text-lg sm:text-xl text-[#9B9B9B] leading-relaxed">
              Undergraduate researcher and full-stack data scientist. I eliminate hallucination loops in autonomous workflows through deterministic AST gates and empirical invariant proofs.
            </p>
          </div>

          {/* Primary CTA + Secondary Link */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/projects"
              className="button-main bg-[#FFFFFF] text-[#000000] hover:bg-[#FFFFFF]/90"
            >
              Explore Case Studies <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/research"
              className="button-main bg-[#181818] text-[#FFFFFF] border border-[#272727] hover:bg-[#1F1F1F]"
            >
              <BookOpen className="w-4 h-4 text-[#9B9B9B]" /> Read Working Paper
            </Link>

            <a
              href="mailto:contact@mahendraa.dev"
              className="button-main bg-transparent text-[#9B9B9B] hover:text-[#FFFFFF]"
            >
              contact@mahendraa.dev &rarr;
            </a>
          </div>

          {/* 
            HERO VISUAL ARTIFACT (B5 + B8 Content Realism)
            A tangible, verifiable invariant runtime telemetry panel proving real engineering craft.
          */}
          <InvariantMonitor />
        </div>
      </section>

      {/* 
        A2. SECTION 2 / B11: MANDATORY TAGLINE REVEAL SECTION
        Scroll-driven word-by-word reveal in reading order on base curve.
      */}
      <TaglineReveal
        phrase="Empirical verification eliminates generative ambiguity. True software quality is proven by invariant benchmarks, never by declarative resume claims."
        subtext="Bridging formal static AST validation and runtime data science for resilient, production-ready architectures."
      />

      {/* 
        A2. SECTION 3: PROBLEM TO SOLUTION (Mid-Page Argument)
      */}
      <section className="py-24 px-6 max-w-5xl mx-auto border-b border-[#272727]">
        <div className="flex flex-col gap-12">
          <div className="max-w-[680px]">
            <span className="text-xs font-mono text-[#9B9B9B] uppercase tracking-widest block mb-2">
              Problem to Solution
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#FFFFFF] leading-snug">
              Why autonomous pipelines fail, and how deterministic invariant checks solve it.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Failure Mode */}
            <div className="rounded-xl border border-[#272727] bg-[#181818] p-6 sm:p-8 flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-red-400">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span>The Industry Default Failure</span>
              </div>
              <h3 className="text-xl font-semibold text-[#FFFFFF]">
                Unchecked Generative Loops
              </h3>
              <p className="text-sm text-[#9B9B9B] leading-relaxed">
                Standard AI agents generate uncontrolled code and queries directly into execution runtimes. This leads to silent data leakage, infinite retry loops, synthetic hallucinations, and zero reproducible guarantees.
              </p>
              <ul className="flex flex-col gap-2 pt-2 text-xs font-mono text-[#9B9B9B]">
                <li className="flex items-center gap-2">
                  <span className="text-red-400">&times;</span> Silent cartesian cross-join queries
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-400">&times;</span> Unbounded agent context degradation
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-400">&times;</span> Synthetic benchmark inflation
                </li>
              </ul>
            </div>

            {/* The Invariant Solution */}
            <div className="rounded-xl border border-[#272727] bg-[#181818] p-6 sm:p-8 flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>The Monograph Solution</span>
              </div>
              <h3 className="text-xl font-semibold text-[#FFFFFF]">
                Deterministic Static and Runtime Gates
              </h3>
              <p className="text-sm text-[#9B9B9B] leading-relaxed">
                We place a two-phase mathematical invariant barrier between agent code generation and live production execution. Hazardous syntax is pruned prior to runtime, and output distributions are verified against grounded historical baselines.
              </p>
              <ul className="flex flex-col gap-2 pt-2 text-xs font-mono text-[#9B9B9B]">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Pre-execution AST traversal filter
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Kolmogorov-Smirnov distribution bounds
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Full provenance coordinate citations
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 
        A2. SECTION 4: HOW IT WORKS (Three Steps)
      */}
      <section className="py-24 px-6 max-w-5xl mx-auto border-b border-[#272727]">
        <div className="flex flex-col gap-12">
          <div className="max-w-[680px]">
            <span className="text-xs font-mono text-[#9B9B9B] uppercase tracking-widest block mb-2">
              Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#FFFFFF] leading-snug">
              Three-step verification pipeline from source to proof.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-[#272727] bg-[#181818] p-6 flex flex-col gap-3">
              <span className="text-xs font-mono text-[#9B9B9B]">01 / AST Extraction</span>
              <h3 className="text-lg font-semibold text-[#FFFFFF]">Static Tree Analysis</h3>
              <p className="text-sm text-[#9B9B9B] leading-relaxed">
                Before code or analytical queries execute, Python AST nodes are validated against strict security policies and memory allocation ceilings.
              </p>
            </div>

            <div className="rounded-xl border border-[#272727] bg-[#181818] p-6 flex flex-col gap-3">
              <span className="text-xs font-mono text-[#9B9B9B]">02 / Oracle Evaluation</span>
              <h3 className="text-lg font-semibold text-[#FFFFFF]">Distribution Boundaries</h3>
              <p className="text-sm text-[#9B9B9B] leading-relaxed">
                Calculates real-time statistical significance between candidate predictions and ground-truth distributions to halt runtime model drift.
              </p>
            </div>

            <div className="rounded-xl border border-[#272727] bg-[#181818] p-6 flex flex-col gap-3">
              <span className="text-xs font-mono text-[#9B9B9B]">03 / Audit Ledger</span>
              <h3 className="text-lg font-semibold text-[#FFFFFF]">Verifiable Telemetry</h3>
              <p className="text-sm text-[#9B9B9B] leading-relaxed">
                Produces immutable provenance records for every model evaluation, with unrounded metric coordinates exported for public replication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 
        A2. SECTION 5: FEATURED ENGINEERING CASE STUDIES
      */}
      <section className="py-24 px-6 max-w-5xl mx-auto border-b border-[#272727]">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-[#9B9B9B] uppercase tracking-widest block mb-1">
                Portfolio Systems
              </span>
              <h2 className="text-3xl font-semibold tracking-tight text-[#FFFFFF]">
                Featured Engineering Case Studies
              </h2>
            </div>
            <Link
              to="/projects"
              className="text-xs font-mono text-[#9B9B9B] hover:text-[#FFFFFF] flex items-center gap-1.5 transition-colors"
            >
              All Projects ({PROJECTS.length}) <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-[#272727] border-y border-[#272727]">
            {featuredProjects.map((project) => (
              <article
                key={project.slug}
                className="py-10 group flex flex-col md:flex-row md:items-start justify-between gap-8 transition-colors"
              >
                {/* Meta column */}
                <div className="md:w-1/4 shrink-0 text-xs font-mono text-[#9B9B9B]">
                  <span className="text-[#FFFFFF] font-semibold uppercase tracking-wider block mb-1">
                    {project.category}
                  </span>
                  <span className="block mb-2">{project.date}</span>
                  <span className="text-[#9B9B9B]">{project.role}</span>
                </div>

                {/* Content column */}
                <div className="md:w-1/2 flex flex-col gap-3">
                  <h3 className="text-2xl font-semibold text-[#FFFFFF] group-hover:text-neutral-300 transition-colors">
                    <Link to={`/projects/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h3>

                  <p className="text-sm font-medium text-neutral-300 leading-snug">
                    {project.tagline}
                  </p>

                  <p className="text-sm text-[#9B9B9B] leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Benchmark tabular statistics */}
                  <div className="flex items-center gap-4 text-xs font-mono pt-1 tabular-nums text-[#9B9B9B]">
                    <span className="text-[#FFFFFF] font-semibold">
                      {project.benchmarks[0].metric}: {project.benchmarks[0].value}
                    </span>
                    <span>&bull;</span>
                    <span>{project.benchmarks[0].note}</span>
                  </div>

                  {/* Stack tags */}
                  <div className="flex flex-wrap gap-1.5 pt-3">
                    {project.tech.slice(0, 5).map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#181818] text-[#9B9B9B] border border-[#272727]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions column */}
                <div className="md:w-1/4 shrink-0 flex md:flex-col md:items-end justify-between md:justify-start gap-3 pt-2 text-xs font-mono">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 font-semibold text-[#FFFFFF] hover:opacity-80 transition-opacity"
                  >
                    Read Case Study <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <div className="flex items-center gap-4 text-[#9B9B9B]">
                    {project.liveDemo && project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#FFFFFF] flex items-center gap-1 transition-colors"
                      >
                        Demo <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#FFFFFF] flex items-center gap-1 transition-colors"
                    >
                      GitHub <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 
        A2. SECTION 6: WORKING PAPER MONOGRAPH SPOTLIGHT
      */}
      <section className="py-24 px-6 max-w-5xl mx-auto border-b border-[#272727]">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-[#9B9B9B] uppercase tracking-widest block mb-1">
                Peer Review &amp; Working Papers
              </span>
              <h2 className="text-3xl font-semibold tracking-tight text-[#FFFFFF]">
                Research Monograph
              </h2>
            </div>
            <Link
              to="/research"
              className="text-xs font-mono text-[#9B9B9B] hover:text-[#FFFFFF] flex items-center gap-1.5 transition-colors"
            >
              Full Manuscript <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="rounded-xl border border-[#272727] bg-[#181818] p-6 sm:p-10 flex flex-col gap-6 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#1F1F1F] text-[#FFFFFF] border border-[#272727]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {RESEARCH_PAPER.status}
              </span>
              <span className="text-[#9B9B9B]">
                {RESEARCH_PAPER.affiliation}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-semibold text-[#FFFFFF] leading-snug">
              <Link to="/research" className="hover:text-neutral-300 transition-colors">
                {RESEARCH_PAPER.title}
              </Link>
            </h3>

            <p className="text-sm sm:text-base text-[#9B9B9B] leading-relaxed max-w-3xl">
              {RESEARCH_PAPER.abstract}
            </p>

            <div className="pt-2">
              <Link
                to="/research"
                className="button-sm bg-[#FFFFFF] text-[#000000] hover:bg-[#FFFFFF]/90"
              >
                Inspect Mathematical Formulation &amp; Benchmark Logs &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 
        A2. SECTION 7: VERIFIED ACADEMIC & TECHNICAL CREDENTIALS
      */}
      <section className="py-24 px-6 max-w-5xl mx-auto border-b border-[#272727]">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-[#9B9B9B] uppercase tracking-widest block mb-1">
                Audited Knowledge
              </span>
              <h2 className="text-3xl font-semibold tracking-tight text-[#FFFFFF]">
                Verified Credentials &amp; Certifications
              </h2>
            </div>
            <Link
              to="/credentials"
              className="text-xs font-mono text-[#9B9B9B] hover:text-[#FFFFFF] flex items-center gap-1.5 transition-colors"
            >
              All Credentials ({CERTIFICATES.length}) <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-[#272727] border-y border-[#272727]">
            {topCredentials.map((cert) => (
              <div
                key={cert.id}
                className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono"
              >
                <div className="flex flex-col gap-1 max-w-xl">
                  <span className="text-[11px] text-[#9B9B9B] uppercase font-semibold">
                    {cert.issuer} &bull; {cert.date}
                  </span>
                  <h3 className="font-sans font-semibold text-base text-[#FFFFFF]">
                    {cert.title}
                  </h3>
                  <p className="text-[#9B9B9B] text-xs">
                    {cert.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0 text-[#9B9B9B]">
                  {cert.credentialId && (
                    <span className="text-[11px] text-[#FFFFFF] bg-[#1F1F1F] px-2.5 py-1 rounded border border-[#272727] tabular-nums">
                      {cert.credentialId}
                    </span>
                  )}
                  {cert.verificationUrl && (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FFFFFF] hover:underline flex items-center gap-1 font-semibold"
                    >
                      Verify <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        A2. SECTION 8: FAQ (Objection Handling per Part A4)
      */}
      <section className="py-24 px-6 max-w-5xl mx-auto border-b border-[#272727]">
        <div className="flex flex-col gap-10">
          <div className="max-w-[680px]">
            <span className="text-xs font-mono text-[#9B9B9B] uppercase tracking-widest block mb-2">
              Common Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#FFFFFF] leading-snug">
              Frequently Asked Questions for Collaborators &amp; Recruiters
            </h2>
          </div>

          <div className="divide-y divide-[#272727] border-y border-[#272727]">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="py-5">
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between text-left gap-4 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded"
                    aria-expanded={isOpen}
                  >
                    <span className="font-sans text-base sm:text-lg font-medium text-[#FFFFFF] group-hover:text-neutral-300 transition-colors">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#9B9B9B] shrink-0 transition-transform duration-300 ease-base ${
                        isOpen ? 'rotate-180 text-[#FFFFFF]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <p className="pt-3 text-sm text-[#9B9B9B] leading-relaxed max-w-3xl">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 
        A2. SECTION 9: RISK REVERSAL & FINAL CTA (Part A2)
      */}
      <section className="py-28 px-6 max-w-5xl mx-auto">
        <div className="rounded-xl border border-[#272727] bg-[#181818] p-8 sm:p-14 flex flex-col md:flex-row md:items-center justify-between gap-10 shadow-2xl">
          <div className="max-w-xl flex flex-col gap-3">
            <span className="text-xs font-mono text-[#9B9B9B] uppercase tracking-widest">
              Direct Dialogue
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#FFFFFF] leading-snug">
              Let us discuss runtime verification or distributed data engineering.
            </h2>
            <p className="text-sm text-[#9B9B9B] leading-relaxed">
              Open to research fellowships, data science internships, and technical collaborations. I guarantee a direct personal response within 24 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
            <Link
              to="/contact"
              className="button-main bg-[#FFFFFF] text-[#000000] hover:bg-[#FFFFFF]/90"
            >
              Initiate Inquiry <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="mailto:contact@mahendraa.dev"
              className="button-main bg-[#1F1F1F] text-[#FFFFFF] border border-[#272727] hover:bg-[#272727]"
            >
              contact@mahendraa.dev
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
