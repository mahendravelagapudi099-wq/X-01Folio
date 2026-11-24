import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield } from 'lucide-react';

export const HeroVisual: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ascii' | 'hacker'>('ascii');

  return (
    <div className="flex flex-col gap-3 w-full max-w-[440px] mx-auto select-none">
      {/* View Toggle Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#0A0A0A] border border-[#1E1E1E]">
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full animate-pulse ${activeTab === 'ascii' ? 'bg-emerald-400' : 'bg-blue-400'}`} />
          <span className="text-[10px] font-mono text-[#777777] uppercase tracking-wider">Visual Telemetry</span>
        </div>
        <div className="flex items-center gap-1 bg-[#141414] p-0.5 rounded-md border border-[#222222]">
          <button
            type="button"
            onClick={() => setActiveTab('ascii')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-mono transition-all duration-200 ${
              activeTab === 'ascii'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                : 'text-[#666666] hover:text-[#AAAAAA]'
            }`}
          >
            <Terminal className="w-3 h-3" />
            ASCII
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('hacker')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-mono transition-all duration-200 ${
              activeTab === 'hacker'
                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30 font-semibold shadow-[0_0_12px_rgba(59,130,246,0.2)]'
                : 'text-[#666666] hover:text-[#AAAAAA]'
            }`}
          >
            <Shield className="w-3 h-3" />
            Cyber HUD
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'ascii' ? (
          /* TAB 1: ASCII Mode with HUD Overlay */
          <motion.div
            key="ascii"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="relative rounded-xl overflow-hidden border border-[#1E2E1E] bg-[#04060a] group shadow-[0_0_40px_rgba(16,185,129,0.08)]"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-[#162616] bg-[#050D06]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]/80" />
                <span className="ml-2 text-[10px] font-mono text-emerald-400/80">
                  SYS://ASCII_TELEMETRY
                </span>
              </div>
              <span className="text-[9px] font-mono text-[#385838] uppercase tracking-wider">
                RAW_186x225 · 0x4D
              </span>
            </div>

            {/* Container for ASCII Portrait */}
            <div
              className="relative w-full overflow-hidden bg-[#04060a]"
              style={{ aspectRatio: '186 / 225' }}
            >
              <img
                src="/ascii-portrait.png"
                alt="ASCII portrait of Mahendra"
                className="w-full h-full object-cover object-top"
              />

              {/* HUD Crosshairs & Telemetry Elements */}
              <div className="absolute top-3 left-3 text-[10px] font-mono text-emerald-400/60 leading-none pointer-events-none">
                ┌── [TARGET_ACQUIRED]
              </div>
              <div className="absolute top-3 right-3 text-[10px] font-mono text-emerald-400/60 leading-none pointer-events-none">
                [VM_099] ──┐
              </div>
              <div className="absolute bottom-12 left-3 text-[10px] font-mono text-emerald-400/60 leading-none pointer-events-none">
                └── [STATUS: ONLINE]
              </div>
              <div className="absolute bottom-12 right-3 text-[10px] font-mono text-emerald-400/60 leading-none pointer-events-none">
                [ASCII_RAW] ──┘
              </div>

              {/* Gradient Vignette at bottom */}
              <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#04060a] via-[#04060a]/60 to-transparent pointer-events-none" />

              {/* Bottom Identity Badge */}
              <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-[10px] font-mono text-white/90 bg-[#050D06]/85 backdrop-blur-sm px-3 py-1.5 rounded border border-[#162616]">
                <div className="flex flex-col">
                  <span className="font-semibold text-white">Velagapudi Mahendra</span>
                  <span className="text-[9px] text-emerald-400/70">B.Tech CSE (Data Science)</span>
                </div>
                <span className="text-emerald-400 text-[10px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                  ASCII VERIFIED
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          /* TAB 2: Cyber HUD Mode with Real Photo */
          <motion.div
            key="hacker"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="relative rounded-xl overflow-hidden border border-[#222E3E] bg-[#04060a] group shadow-[0_0_40px_rgba(59,130,246,0.08)]"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-[#162232] bg-[#050B12]">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span className="text-[10px] font-mono text-blue-400/80">
                  SYS://AGENT_IDENTITY
                </span>
              </div>
              <span className="text-[9px] font-mono text-[#324862] uppercase tracking-wider">
                NODE_OK · MREM_HYD
              </span>
            </div>

            {/* Container for Real Photo */}
            <div
              className="relative w-full overflow-hidden bg-[#04060a]"
              style={{ aspectRatio: '186 / 225' }}
            >
              <img
                src="/assets/hero-portrait.jpg"
                alt="Velagapudi Mahendra"
                className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
              />

              {/* Cyber Crosshairs & HUD Elements */}
              <div className="absolute top-3 left-3 text-[10px] font-mono text-blue-400/60 leading-none pointer-events-none">
                ┌── [TARGET_ACQUIRED]
              </div>
              <div className="absolute top-3 right-3 text-[10px] font-mono text-blue-400/60 leading-none pointer-events-none">
                [VM_099] ──┐
              </div>
              <div className="absolute bottom-12 left-3 text-[10px] font-mono text-blue-400/60 leading-none pointer-events-none">
                └── [STATUS: ONLINE]
              </div>
              <div className="absolute bottom-12 right-3 text-[10px] font-mono text-blue-400/60 leading-none pointer-events-none">
                [2023-2027] ──┘
              </div>

              {/* Gradient Vignette at bottom */}
              <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#04060a] via-[#04060a]/60 to-transparent pointer-events-none" />

              {/* Bottom Identity Badge */}
              <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-[10px] font-mono text-white/90 bg-[#050B12]/85 backdrop-blur-sm px-3 py-1.5 rounded border border-[#162232]">
                <div className="flex flex-col">
                  <span className="font-semibold text-white">Velagapudi Mahendra</span>
                  <span className="text-[9px] text-[#5A7A9A]">B.Tech CSE (Data Science)</span>
                </div>
                <span className="text-blue-400 text-[10px] bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/40">
                  VERIFIED
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroVisual;
