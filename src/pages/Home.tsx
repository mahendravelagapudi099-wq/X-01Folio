import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  Cpu,
  ShieldCheck,
  Code2,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { PROJECTS } from '@/data/projectsData';
import { RESEARCH_PAPER } from '@/data/researchData';
import { CERTIFICATES } from '@/data/credentialsData';
import { TaglineReveal } from '@/components/TaglineReveal';
import { SpotlightGrid } from '@/components/effects/SpotlightGrid';
import { BorderBeam } from '@/components/effects/BorderBeam';

/* ------------------------------------------------------------------ */
/* Design Read:                                                         */
/* Developer portfolio for research recruiters & academic hiring.      */
/* Language: Linear-style dark-tech editorial.                         */
/* Dials: VARIANCE 7 / MOTION_INTENSITY 7 / VISUAL_DENSITY 4          */
/* Stack: framer-motion (whileInView), Tailwind, Redaction 50 display  */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* Animated counter — no React state on each RAF frame                 */
/* ------------------------------------------------------------------ */
function useCountUp(target: number, duration = 1400, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const startTime = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return value;
}

function CounterStat({ value, suffix = '', label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [fired, setFired] = useState(false);
  const count = useCountUp(value, 1400, fired);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setFired(true); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <span className="font-display text-5xl sm:text-6xl font-normal tracking-tight text-white tabular-nums">
        {count}{suffix}
      </span>
      <span className="text-[10px] font-mono text-[#555555] uppercase tracking-[0.18em]">{label}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Typewriter — load-time effect                                       */
/* ------------------------------------------------------------------ */
function useTypewriter(text: string, speed = 32) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(id); setDone(true); }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return { displayed, done };
}

/* ------------------------------------------------------------------ */
/* Shared motion variants (whileInView, no scroll listener)           */
/* ------------------------------------------------------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

/* ------------------------------------------------------------------ */
/* Glint card — mouse position via DOM direct, no React state          */
/* ------------------------------------------------------------------ */
function GlintCard({
  children,
  className = '',
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'article';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--gx', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--gy', `${((e.clientY - r.top) / r.height) * 100}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) { el.style.setProperty('--gx', '50%'); el.style.setProperty('--gy', '50%'); }
  };
  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`glint-card ${className}`}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ data                                                             */
/* ------------------------------------------------------------------ */
const FAQS = [
  {
    q: 'What is your primary research focus?',
    a: 'Runtime verification for autonomous AI agents. I construct deterministic static AST gates and runtime statistical oracles that bound system behavior and eliminate ungrounded hallucinations in production pipelines.',
  },
  {
    q: 'Available for research fellowships or engineering roles?',
    a: 'Yes. Actively seeking international research fellowships (MEXT, Honjo), data science internships, and software engineering roles for 2025-2026. Based in Hyderabad; open to remote or on-site.',
  },
  {
    q: 'How do you verify ML models?',
    a: 'Every pipeline enforces pre-execution dataset partitioning, Kolmogorov-Smirnov distribution drift testing, and deterministic metric logging. Benchmarks ship with unrounded tabular precision and full test-set artifacts.',
  },
  {
    q: 'Can I inspect source code and reproducible benchmarks?',
    a: 'All primary systems (SentimentScopex, VectorMind RAG, working paper benchmarks) are open-source on GitHub with reproducible environment definitions, automated test suites, and Docker configs.',
  },
  {
    q: 'What is your primary development stack?',
    a: 'Research: Python, PyTorch, Scikit-learn, Pandas, NumPy, AST parsers. Production: React, TypeScript, Node.js, PostgreSQL, Tailwind, FastAPI.',
  },
  {
    q: 'Response time for technical inquiries?',
    a: 'All academic, recruiter, and research collaboration messages receive a direct personal response within 24 hours via contact@mahendraa.dev or the inquiry portal.',
  },
];

/* ================================================================== */
export default function Home() {
  const featuredProjects = PROJECTS.filter((p) => p.featured).slice(0, 3);
  const topCredentials = CERTIFICATES.slice(0, 4);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const headline = 'Architecting Verifiable AI & High-Throughput Data Systems.';
  const { displayed, done } = useTypewriter(reduce ? '' : headline, 30);

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-white selection:text-black">

      {/* ============================================================ */}
      {/* HERO — left-aligned, asymmetric, SpotlightGrid BG            */}
      {/* Max 4 text elements: badge / headline / sub / CTAs           */}
      {/* ============================================================ */}
      <section className="relative min-h-[100dvh] flex flex-col justify-center pt-20 sm:pt-24 pb-16 px-6 max-w-6xl mx-auto border-b border-[#141414] overflow-hidden">
        <SpotlightGrid />

        {/* Aurora blobs — fixed pseudo-elements in CSS, no DOM */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="aurora-blob-1 absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full" />
          <div className="aurora-blob-2 absolute top-20 right-0 w-[400px] h-[400px] rounded-full" />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col items-start gap-8 max-w-[820px]">

          {/* 1. Eyebrow — this is the ONLY eyebrow in the hero */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0E0E0E] border border-[#1E1E1E] text-[11px] font-mono text-[#666666]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ boxShadow: '0 0 6px rgba(52,211,153,0.6)' }} />
              MREM B.Tech CSE · IIT Roorkee Certified · JNTUH
            </div>
          </motion.div>

          {/* 2. Headline — typewriter on load */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.6rem] font-normal tracking-tight leading-[1.08] hero-gradient-text">
              {reduce ? headline : (
                <>
                  {displayed}
                  {!done && <span className="inline-block w-[2px] h-[0.85em] bg-white/50 ml-1 align-middle animate-pulse" />}
                </>
              )}
            </h1>
          </motion.div>

          {/* 3. Sub-lead */}
          <motion.p
            className="text-base sm:text-lg text-[#7A7A7A] leading-relaxed max-w-[600px]"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          >
            Undergraduate researcher at{' '}
            <strong className="text-white font-medium">MREM</strong>. Building
            deterministic static AST gates and runtime statistical oracles that
            eliminate hallucination loops in autonomous analytical pipelines.
          </motion.p>

          {/* 4. CTAs — primary + secondary only */}
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black text-sm font-semibold hover:bg-white/90 active:scale-[0.97] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              Explore Case Studies <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/research"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#222222] text-[#CCCCCC] text-sm font-medium hover:border-[#3A3A3A] hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
            >
              <BookOpen className="w-4 h-4 text-[#555555]" /> Working Paper
            </Link>
            <a
              href="mailto:contact@mahendraa.dev"
              className="text-sm font-mono text-[#444444] hover:text-[#AAAAAA] transition-colors duration-200 hidden sm:block"
            >
              contact@mahendraa.dev →
            </a>
          </motion.div>

          {/* Skill chips — below CTAs, decorative */}
          <motion.div
            className="flex flex-wrap gap-2 pt-1"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.32 }}
          >
            {[
              { icon: <Cpu className="w-3 h-3 text-emerald-500" />, label: 'Python · PyTorch' },
              { icon: <ShieldCheck className="w-3 h-3 text-blue-400" />, label: 'Runtime AST Verification' },
              { icon: <Code2 className="w-3 h-3 text-neutral-500" />, label: 'Full-Stack TypeScript' },
              { icon: <Sparkles className="w-3 h-3 text-amber-400" />, label: 'IIT Roorkee · NPTEL' },
              { icon: <Terminal className="w-3 h-3 text-neutral-500" />, label: 'FastAPI · PostgreSQL' },
            ].map(({ icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#0C0C0C] text-[#888888] border border-[#1A1A1A] hover:border-[#2E2E2E] hover:text-[#CCCCCC] transition-colors duration-200"
              >
                {icon} {label}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Stats — anchored to bottom of hero, full-width divider */}
        <motion.div
          className="relative z-10 mt-16 pt-10 border-t border-[#141414] grid grid-cols-2 sm:grid-cols-4 gap-8"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <CounterStat value={PROJECTS.length} suffix="+" label="Shipped Projects" />
          <CounterStat value={CERTIFICATES.length} suffix="" label="Certifications" />
          <CounterStat value={94} suffix="%" label="Best Model Accuracy" />
          <CounterStat value={24} suffix="h" label="Response Guarantee" />
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/* TAGLINE REVEAL                                               */}
      {/* ============================================================ */}
      <TaglineReveal
        phrase="Empirical verification eliminates generative ambiguity. True software quality is proven by invariant benchmarks, never by declarative resume claims."
        subtext="Bridging formal static AST validation and runtime data science for resilient, production-ready architectures."
      />

      {/* ============================================================ */}
      {/* PROBLEM → SOLUTION                                            */}
      {/* Two-column contrast, no eyebrow (eyebrow budget used by hero) */}
      {/* ============================================================ */}
      <section className="py-28 px-6 max-w-6xl mx-auto border-b border-[#141414]">
        <div className="flex flex-col gap-14">

          <motion.div
            className="max-w-[600px]"
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.8rem] font-normal tracking-tight text-white leading-[1.1]">
              Why autonomous pipelines fail, and how invariant checks fix it.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Failure — tinted red surface */}
            <motion.div
              variants={fadeUp}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <GlintCard className="h-full rounded-2xl border border-[#2A1010] bg-[#0A0404] p-7 flex flex-col gap-5">
                <div className="inline-flex items-center gap-2 text-[11px] font-mono text-red-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  Industry default failure
                </div>
                <h3 className="text-xl font-semibold text-white leading-snug">
                  Unchecked Generative Loops
                </h3>
                <p className="text-sm text-[#7A7A7A] leading-relaxed">
                  Standard AI agents generate uncontrolled code and queries directly
                  into execution runtimes. Silent data leakage, infinite retry spirals,
                  synthetic hallucinations, zero reproducible guarantees.
                </p>
                <ul className="flex flex-col gap-2.5 text-xs font-mono text-[#666666]">
                  {['Silent cartesian cross-join queries', 'Unbounded context window degradation', 'Synthetic benchmark inflation'].map(item => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="text-red-600 mt-0.5 leading-none shrink-0">x</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </GlintCard>
            </motion.div>

            {/* Solution — tinted green surface */}
            <motion.div
              variants={fadeUp}
              custom={0.08}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <GlintCard className="h-full rounded-2xl border border-[#0E2A14] bg-[#040A05] p-7 flex flex-col gap-5">
                <div className="inline-flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  The monograph solution
                </div>
                <h3 className="text-xl font-semibold text-white leading-snug">
                  Deterministic Static &amp; Runtime Gates
                </h3>
                <p className="text-sm text-[#7A7A7A] leading-relaxed">
                  A two-phase mathematical invariant barrier between agent code
                  generation and live production execution. Hazardous syntax pruned
                  pre-runtime; outputs verified against grounded historical baselines.
                </p>
                <ul className="flex flex-col gap-2.5 text-xs font-mono text-[#666666]">
                  {['Pre-execution AST traversal filter', 'Kolmogorov-Smirnov distribution bounds', 'Full provenance coordinate citations'].map(item => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check className="w-3 h-3 text-emerald-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </GlintCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* METHODOLOGY — bento-style asymmetric trio (not 3 equal cards) */}
      {/* ============================================================ */}
      <section className="py-28 px-6 max-w-6xl mx-auto border-b border-[#141414]">
        <div className="flex flex-col gap-14">

          <motion.div
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.8rem] font-normal tracking-tight text-white leading-[1.1] max-w-[480px]">
              Verification pipeline from source to proof.
            </h2>
            <p className="text-sm text-[#555555] leading-relaxed max-w-xs sm:text-right">
              Three deterministic steps enforced before any output reaches production.
            </p>
          </motion.div>

          {/* Asymmetric bento: 1 large + 2 small */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Large tile */}
            <motion.div
              className="md:col-span-3"
              variants={fadeUp}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <GlintCard className="h-full rounded-2xl border border-[#1E1E1E] bg-[#080808] p-8 flex flex-col gap-6 min-h-[260px]">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-mono text-[#444444] uppercase tracking-[0.18em]">
                    Static Tree Analysis
                  </span>
                  <span className="font-display text-[80px] leading-none text-[#111111] select-none font-normal">
                    01
                  </span>
                </div>
                <div className="mt-auto flex flex-col gap-3">
                  <h3 className="text-xl font-semibold text-white">AST Extraction Gate</h3>
                  <p className="text-sm text-[#7A7A7A] leading-relaxed max-w-sm">
                    Before code or analytical queries execute, Python AST nodes are
                    validated against strict security policies and memory allocation
                    ceilings. Hazardous patterns are pruned with zero runtime overhead.
                  </p>
                </div>
              </GlintCard>
            </motion.div>

            {/* Two small tiles stacked */}
            <div className="md:col-span-2 flex flex-col gap-4">
              {[
                {
                  n: '02',
                  label: 'Oracle Evaluation',
                  title: 'Distribution Boundaries',
                  body: 'Real-time statistical significance between candidate predictions and ground-truth halts model drift before it reaches production.',
                },
                {
                  n: '03',
                  label: 'Audit Ledger',
                  title: 'Verifiable Telemetry',
                  body: 'Immutable provenance records for every evaluation. Unrounded metric coordinates exported for public replication and peer review.',
                },
              ].map((s, i) => (
                <motion.div
                  key={s.n}
                  variants={fadeUp}
                  custom={0.08 + i * 0.08}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <GlintCard className="rounded-2xl border border-[#1E1E1E] bg-[#080808] p-6 flex flex-col gap-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[10px] font-mono text-[#444444] uppercase tracking-[0.18em]">{s.label}</span>
                      <span className="font-display text-4xl leading-none text-[#111111] select-none font-normal">{s.n}</span>
                    </div>
                    <h3 className="text-base font-semibold text-white">{s.title}</h3>
                    <p className="text-xs text-[#666666] leading-relaxed">{s.body}</p>
                  </GlintCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FEATURED CASE STUDIES — horizontal article list              */}
      {/* Different layout: table-of-contents editorial style          */}
      {/* ============================================================ */}
      <section className="py-28 px-6 max-w-6xl mx-auto border-b border-[#141414]">
        <div className="flex flex-col gap-10">

          <motion.div
            className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4"
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.8rem] font-normal tracking-tight text-white leading-[1.1]">
              Featured Case Studies
            </h2>
            <Link
              to="/projects"
              className="shrink-0 text-xs font-mono text-[#444444] hover:text-white flex items-center gap-1.5 transition-colors duration-200"
            >
              All {PROJECTS.length} projects <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          <div className="flex flex-col">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.slug}
                variants={fadeUp}
                custom={i * 0.06}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <GlintCard
                  as="article"
                  className="group border-t border-[#141414] last:border-b py-9 flex flex-col md:flex-row md:items-start gap-6 hover:bg-[#050505] transition-colors duration-300 cursor-default"
                >
                  {/* Index */}
                  <div className="md:w-12 shrink-0 font-display text-5xl text-[#1A1A1A] font-normal leading-none select-none pt-1">
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  {/* Meta */}
                  <div className="md:w-40 shrink-0 text-xs font-mono text-[#444444] flex flex-col gap-1 pt-1.5">
                    <span className="text-white font-semibold uppercase tracking-wider text-[10px]">{project.category}</span>
                    <span>{project.date}</span>
                    <span>{project.role}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col gap-3">
                    <h3 className="text-xl sm:text-2xl font-semibold text-white group-hover:text-neutral-300 transition-colors duration-300">
                      <Link to={`/projects/${project.slug}`}>{project.title}</Link>
                    </h3>
                    <p className="text-sm text-[#7A7A7A] leading-relaxed max-w-xl">{project.summary}</p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tech.slice(0, 5).map(t => (
                        <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#0C0C0C] text-[#555555] border border-[#181818]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="md:w-32 shrink-0 flex flex-row md:flex-col md:items-end gap-4 md:gap-3 text-xs font-mono pt-1">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-neutral-400 transition-colors"
                    >
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#444444] hover:text-white flex items-center gap-1 transition-colors"
                    >
                      GitHub <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </GlintCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* RESEARCH MONOGRAPH — full-width feature card                  */}
      {/* Different layout: single hero research card                   */}
      {/* ============================================================ */}
      <section className="py-28 px-6 max-w-6xl mx-auto border-b border-[#141414]">
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="relative rounded-2xl border border-[#1E1E1E] bg-[#060606] p-8 sm:p-12 overflow-hidden">
            <BorderBeam size={300} duration={10} colorFrom="#FFFFFF" colorTo="transparent" />

            {/* Noise grain inside card — fixed pseudo in CSS */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.025] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
            />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-start justify-between gap-8">
              <div className="flex flex-col gap-5 max-w-2xl">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0A1A0A] text-emerald-400 border border-[#122012]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {RESEARCH_PAPER.status}
                  </span>
                  <span className="text-[#444444]">{RESEARCH_PAPER.affiliation}</span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-white leading-[1.1]">
                  <Link to="/research" className="hover:text-neutral-300 transition-colors">
                    {RESEARCH_PAPER.title}
                  </Link>
                </h2>

                <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
                  {RESEARCH_PAPER.abstract}
                </p>
              </div>

              <div className="shrink-0 flex flex-col gap-3">
                <Link
                  to="/research"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black text-sm font-semibold hover:bg-white/90 active:scale-[0.97] transition-all duration-200 whitespace-nowrap"
                >
                  Inspect Formulation <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/* CREDENTIALS — compact horizontal rows, different from projects */}
      {/* ============================================================ */}
      <section className="py-28 px-6 max-w-6xl mx-auto border-b border-[#141414]">
        <div className="flex flex-col gap-10">

          <motion.div
            className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4"
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-normal tracking-tight text-white leading-[1.1]">
              Verified Credentials
            </h2>
            <Link
              to="/credentials"
              className="shrink-0 text-xs font-mono text-[#444444] hover:text-white flex items-center gap-1.5 transition-colors duration-200"
            >
              All {CERTIFICATES.length} credentials <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          {/* Grid layout — different from project list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topCredentials.map((cert, i) => (
              <motion.div
                key={cert.id}
                variants={fadeUp}
                custom={i * 0.05}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <GlintCard className="h-full rounded-xl border border-[#161616] bg-[#070707] p-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                      <span className="text-[10px] font-mono text-[#444444] uppercase tracking-[0.15em]">
                        {cert.issuer} · {cert.date}
                      </span>
                      <h3 className="text-sm font-semibold text-white leading-snug">{cert.title}</h3>
                    </div>
                    {cert.verificationUrl && (
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 text-[11px] font-mono text-[#444444] hover:text-white flex items-center gap-1 transition-colors"
                      >
                        Verify <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-[#555555] leading-relaxed">{cert.description}</p>
                  {cert.credentialId && (
                    <span className="self-start text-[10px] font-mono text-[#333333] bg-[#0A0A0A] px-2 py-0.5 rounded border border-[#181818] tabular-nums">
                      {cert.credentialId}
                    </span>
                  )}
                </GlintCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FAQ — accordion with smooth max-height transition             */}
      {/* ============================================================ */}
      <section className="py-28 px-6 max-w-6xl mx-auto border-b border-[#141414]">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-14">

          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-normal tracking-tight text-white leading-[1.1] lg:sticky lg:top-24">
              Common Questions
            </h2>
          </motion.div>

          <div className="flex flex-col">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={i * 0.04}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                >
                  <div className="border-t border-[#141414] last:border-b py-5">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-center justify-between text-left gap-4 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm sm:text-base font-medium text-white group-hover:text-neutral-300 transition-colors duration-200">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#444444] shrink-0 transition-transform duration-300 ease-smooth ${isOpen ? 'rotate-180 text-white' : ''}`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-spring ${isOpen ? 'max-h-56 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}
                    >
                      <p className="text-sm text-[#7A7A7A] leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FINAL CTA — full-width, no duplicate intent with hero CTA     */}
      {/* ============================================================ */}
      <section className="py-32 px-6 max-w-6xl mx-auto">
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="relative rounded-2xl border border-[#1A1A1A] bg-[#060606] p-10 sm:p-16 flex flex-col md:flex-row md:items-center justify-between gap-12 overflow-hidden">
            <BorderBeam size={340} duration={14} colorFrom="#FFFFFF" colorTo="transparent" />

            <div className="max-w-xl flex flex-col gap-4 relative z-10">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] font-normal tracking-tight text-white leading-[1.08]">
                Let's discuss runtime verification or distributed data engineering.
              </h2>
              <p className="text-sm text-[#666666] leading-relaxed">
                Open to research fellowships, data science internships, and technical
                collaborations. Personal response within 24 hours, guaranteed.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-start gap-3 shrink-0 relative z-10">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white text-black text-sm font-semibold hover:bg-white/90 active:scale-[0.97] transition-all duration-200 whitespace-nowrap"
              >
                Start a Conversation <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="mailto:contact@mahendraa.dev"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-[#222222] text-[#CCCCCC] text-sm hover:border-[#3A3A3A] hover:text-white transition-all duration-200 whitespace-nowrap"
              >
                contact@mahendraa.dev
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
