import React, { useState } from 'react';
import { Database, ShieldCheck, Activity, CheckCircle2, ChevronRight, Terminal, Cpu } from 'lucide-react';
import { BorderBeam } from '@/components/effects/BorderBeam';
import { Logo } from '@/components/Logo';

interface StageNode {
  id: string;
  step: string;
  title: string;
  role: string;
  metric: string;
  detail: string;
  codeSnippet: string;
  status: 'active' | 'passed';
}

const STAGES: StageNode[] = [
  {
    id: 'ingest',
    step: 'STAGE 01',
    title: 'Data Ingestion',
    role: 'Multi-Modal & Query Feed',
    metric: '100% Buffered',
    detail: 'Captures raw analytical queries, agent execution loops, and incoming data partitions into an isolated runtime sandbox.',
    codeSnippet: 'stream = ingest_stream(source, validate_schema=True)',
    status: 'passed',
  },
  {
    id: 'ast',
    step: 'STAGE 02',
    title: 'Static AST Gate',
    role: 'Pre-Execution Traversal',
    metric: '99.4% Traversed',
    detail: 'Parses code into abstract syntax tree nodes. Intercepts dangerous cartesian joins, unindexed filters, and partition leakages before execution.',
    codeSnippet: 'ast_nodes = parse(code)\nassert not has_cross_join(ast_nodes)',
    status: 'active',
  },
  {
    id: 'oracle',
    step: 'STAGE 03',
    title: 'Invariant Oracle',
    role: 'Statistical Boundary Bound',
    metric: 'D_ks = 0.014',
    detail: 'Computes two-sample Kolmogorov-Smirnov distance against historical baseline distributions. Flags anomalies exceeding drift threshold.',
    codeSnippet: 'ks_dist = compute_ks(candidate, baseline)\nassert ks_dist < 0.025',
    status: 'active',
  },
  {
    id: 'ledger',
    step: 'STAGE 04',
    title: 'Verified Ledger',
    role: 'Deterministic Output',
    metric: '0.00% Leakage',
    detail: 'Certified execution emission with cryptographic coordinate citations and unrounded tabular metrics logged for reproducibility.',
    codeSnippet: 'certify_run(run_id, ks_dist, proof_signature)',
    status: 'passed',
  },
];

export const InteractiveArchitecture: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<string>('ast');

  const activeStage = STAGES.find((s) => s.id === activeStageId) || STAGES[1];

  return (
    <div className="relative w-full rounded-2xl border border-[#272727] bg-[#181818] p-5 sm:p-8 shadow-2xl overflow-hidden">
      {/* High-Craft Traveling Border Beam */}
      <BorderBeam size={220} duration={10} colorFrom="#FFFFFF" colorTo="transparent" />

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#272727] gap-3">
        <div className="flex items-center gap-3">
          <Logo size={24} />
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-[#FFFFFF] tracking-tight flex items-center gap-2">
              Verifiable ML Architecture
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1F1F1F] text-[#9B9B9B] border border-[#272727]">
                INTERACTIVE PIPELINE
              </span>
            </h3>
            <p className="text-xs text-[#9B9B9B] font-mono">
              Hover or tap a node to inspect runtime verification stages
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-[#9B9B9B]">
          <span className="inline-flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            60 FPS Live Telemetry
          </span>
          <span className="hidden md:inline">Latency: &lt;12ms</span>
        </div>
      </div>

      {/* 4 Interactive Flow Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        {STAGES.map((stage, idx) => {
          const isSelected = stage.id === activeStageId;
          return (
            <div
              key={stage.id}
              onClick={() => setActiveStageId(stage.id)}
              onMouseEnter={() => setActiveStageId(stage.id)}
              className={`relative cursor-pointer rounded-xl p-4 transition-all duration-300 ease-base flex flex-col justify-between gap-3 ${
                isSelected
                  ? 'bg-[#1F1F1F] border border-[#FFFFFF]/80 shadow-lg shadow-black/50 scale-[1.02]'
                  : 'bg-[#181818] border border-[#272727] hover:border-[#9B9B9B]/50 hover:bg-[#1F1F1F]/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#9B9B9B] uppercase tracking-wider font-semibold">
                  {stage.step}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#FFFFFF]">
                  {stage.title}
                </h4>
                <p className="text-xs text-[#9B9B9B] mt-0.5">
                  {stage.role}
                </p>
              </div>

              <div className="pt-2 border-t border-[#272727]/80 flex items-center justify-between text-xs font-mono">
                <span className="text-[#9B9B9B] text-[11px]">Metric</span>
                <span className="text-[#FFFFFF] font-semibold tabular-nums text-[11px]">
                  {stage.metric}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* SVG Traveling Beam Connecting Nodes on Desktop */}
      <div className="hidden md:block relative my-4 h-6">
        <svg className="w-full h-6" viewBox="0 0 800 24" fill="none">
          <line
            x1="20"
            y1="12"
            x2="780"
            y2="12"
            stroke="#272727"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <line
            x1="20"
            y1="12"
            x2="780"
            y2="12"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeDasharray="40 120"
            className="animate-pulse-beam"
          />
        </svg>
      </div>

      {/* Live Stage Inspection Display */}
      <div className="mt-4 rounded-xl border border-[#272727] bg-[#131209]/40 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
        <div className="flex flex-col gap-1 max-w-lg">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-semibold">{activeStage.title} Verified:</span>
            <span className="text-[#FFFFFF] font-medium">{activeStage.metric}</span>
          </div>
          <p className="text-[#9B9B9B] text-[11px] leading-relaxed">
            {activeStage.detail}
          </p>
        </div>

        <div className="w-full sm:w-auto shrink-0 rounded-lg bg-[#000000] border border-[#272727] p-3 text-[11px] text-[#FFFFFF]/90">
          <div className="flex items-center gap-2 pb-1.5 mb-1.5 border-b border-[#272727]/70 text-[#9B9B9B] text-[10px]">
            <Terminal className="w-3 h-3 text-emerald-400" />
            <span>Inspection AST Sandbox</span>
          </div>
          <pre className="text-emerald-400 font-mono overflow-x-auto whitespace-pre">
            {activeStage.codeSnippet}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default InteractiveArchitecture;

