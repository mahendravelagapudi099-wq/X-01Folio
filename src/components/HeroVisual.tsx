import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, Eye, Sparkles } from 'lucide-react';

export const HeroVisual: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ascii' | 'hacker'>('ascii');

  return (
    <div className="flex flex-col gap-3 w-full max-w-[440px] mx-auto select-none">
      {/* View Toggle Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#0A0A0A] border border-[#1E1E1E]">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
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
          /* TAB 1: ASCII Terminal Art Card */
          <motion.div
            key="ascii"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="relative rounded-xl overflow-hidden border border-[#1E2E1E] bg-[#030804] group shadow-[0_0_40px_rgba(16,185,129,0.06)]"
          >
            {/* Terminal Top Bar */}
            <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-[#162616] bg-[#050D06]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]/80" />
                <span className="ml-2 text-[10px] font-mono text-emerald-400/70">
                  tty1 · mahendra.ascii
                </span>
              </div>
              <span className="text-[9px] font-mono text-[#385838] uppercase tracking-wider">
                RAW_BUFFER: 0x4D
              </span>
            </div>

            {/* ASCII Image Canvas */}
            <div className="relative aspect-[3/4] overflow-hidden bg-[#020503] flex items-center justify-center">
              <img
                src="/assets/hero-ascii.png"
                alt="ASCII art portrait of Velagapudi Mahendra"
                className="w-full h-full object-cover opacity-95 group-hover:scale-[1.02] transition-transform duration-500"
                style={{ filter: 'contrast(1.15) brightness(1.05)' }}
              />

              {/* CRT Scanline Overlay */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 100, 0.04) 2px, rgba(0, 255, 100, 0.04) 4px)',
                }}
              />

              {/* Phosphor Glow Vignette */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#020503] via-transparent to-transparent opacity-80" />

              {/* Bottom Terminal Telemetry */}
              <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-[10px] font-mono text-emerald-400/80 bg-[#050D06]/85 backdrop-blur-sm px-3 py-1.5 rounded border border-[#162616]">
                <div className="flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>RENDER: INDIC_BERTV2</span>
                </div>
                <span className="text-[#385838]">UTF-8 · 2026</span>
              </div>
            </div>
          </motion.div>
        ) : (
          /* TAB 2: Cyber HUD / Hacker Portrait Card */
          <motion.div
            key="hacker"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="relative rounded-xl overflow-hidden border border-[#222E3E] bg-[#03060A] group shadow-[0_0_40px_rgba(59,130,246,0.08)]"
          >
            {/* HUD Top Bar */}
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

            {/* Portrait Image Canvas */}
            <div className="relative aspect-[3/4] overflow-hidden bg-[#020408]">
              <img
                src="/assets/hero-portrait.jpg"
                alt="Velagapudi Mahendra"
                className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
              />

              {/* Cyber Crosshairs & HUD Elements */}
              <div className="absolute top-3 left-3 text-[10px] font-mono text-blue-400/60 leading-none">
                ┌── [TARGET_ACQUIRED]
              </div>
              <div className="absolute top-3 right-3 text-[10px] font-mono text-blue-400/60 leading-none">
                [VM_099] ──┐
              </div>
              <div className="absolute bottom-12 left-3 text-[10px] font-mono text-blue-400/60 leading-none">
                └── [STATUS: ONLINE]
              </div>
              <div className="absolute bottom-12 right-3 text-[10px] font-mono text-blue-400/60 leading-none">
                [2023-2027] ──┘
              </div>

              {/* Gradient Vignette */}
              <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#03060A] via-[#03060A]/60 to-transparent" />

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
