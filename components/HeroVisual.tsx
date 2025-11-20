import React from 'react';

// --- VISUAL 1: CONTEXTUAL PULSE (The "Human Heart" of Data) ---
// Represents the analysis of a human profile through multiple lenses of context.
// More organic, less "scanner", more "understanding".
export const ContextualPulse: React.FC = () => {
  return (
    <div className="relative w-[500px] h-[500px] flex items-center justify-center pointer-events-none select-none">
      
      {/* Ambient Core Glow */}
      <div className="absolute inset-0 bg-blue-500/20 blur-[80px] rounded-full animate-pulse-slow"></div>

      {/* Central Entity (The Candidate) */}
      <div className="relative z-20 w-40 h-40 bg-gradient-to-b from-slate-800/80 to-black/80 backdrop-blur-xl rounded-full border border-white/10 flex items-center justify-center shadow-[0_0_60px_rgba(56,189,248,0.15)]">
         {/* Inner Core */}
         <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-slate-900 to-slate-800 flex items-center justify-center relative overflow-hidden border border-white/5">
             <div className="absolute inset-0 bg-primary/10 animate-pulse"></div>
             <div className="text-5xl font-serif text-white/90 z-10 opacity-90">Ag</div>
             
             {/* Organic ripples inside */}
             <div className="absolute inset-0 border border-white/10 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
         </div>
      </div>

      {/* Orbit 1: Context (Tight) */}
      <div className="absolute w-[260px] h-[260px] rounded-full border border-white/5 animate-[spin_60s_linear_infinite]">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-slate-600 rounded-full blur-[1px]"></div>
      </div>

      {/* Orbit 2: Journey (Medium) */}
      <div className="absolute w-[380px] h-[380px] rounded-full border border-dashed border-white/10 animate-[spin_80s_linear_infinite_reverse]">
          <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
             <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]"></div>
          </div>
      </div>

      {/* Orbit 3: Potential (Wide) */}
      <div className="absolute w-[540px] h-[540px] rounded-full border border-primary/10 opacity-60 animate-[spin_100s_linear_infinite]">
         <div className="absolute bottom-1/4 left-[10%] w-2 h-2 bg-primary rounded-full shadow-[0_0_15px_#38bdf8]"></div>
      </div>

      {/* Floating Data Points (Portuguese) */}
      <div className="absolute inset-0">
          {/* Top Right */}
          <div className="absolute top-[15%] right-[10%] flex flex-col items-start animate-[float_6s_ease-in-out_infinite]">
              <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  <span className="text-[10px] font-mono font-medium text-primary tracking-widest">TRAJETÓRIA</span>
              </div>
              <div className="h-px w-16 bg-gradient-to-r from-primary/50 to-transparent"></div>
          </div>
          
          {/* Bottom Left */}
          <div className="absolute bottom-[20%] left-[5%] flex flex-col items-end animate-[float_7s_ease-in-out_infinite]" style={{animationDelay: '1s'}}>
              <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono font-medium text-emerald-500 tracking-widest">SOFT SKILLS</span>
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
              </div>
              <div className="h-px w-24 bg-gradient-to-l from-emerald-500/50 to-transparent"></div>
          </div>

          {/* Bottom Right (Close) */}
           <div className="absolute bottom-[30%] right-[25%] flex items-center gap-2 animate-[float_8s_ease-in-out_infinite]" style={{animationDelay: '2s'}}>
              <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-slate-300 backdrop-blur-sm">
                 CONTEXTO: ALTO
              </span>
          </div>
      </div>
    </div>
  );
};

// --- VISUAL 2: NEURAL LATTICE (The Logic) ---
export const NeuralLattice: React.FC = () => {
    return (
        <div className="relative w-full h-full overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(56,189,248,0.05),transparent_70%)]"></div>
            
            <svg className="w-full h-full opacity-40">
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(56, 189, 248, 0)" />
                        <stop offset="50%" stopColor="rgba(56, 189, 248, 0.3)" />
                        <stop offset="100%" stopColor="rgba(56, 189, 248, 0)" />
                    </linearGradient>
                </defs>
                <path d="M50,150 Q200,50 350,150 T650,150" fill="none" stroke="url(#lineGradient)" strokeWidth="1" className="animate-pulse" />
                {[100, 250, 400, 550].map((x, i) => (
                    <line key={i} x1={x} y1="100" x2={x} y2="200" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                ))}
            </svg>
        </div>
    )
}

// --- VISUAL 3: DATA ARCHITECTURE (The Blueprint) ---
export const DataArchitecture: React.FC = () => {
    return (
        <div className="relative w-full h-full p-8 flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square border border-slate-800 bg-obsidian-light/50 backdrop-blur-sm p-1">
                <div className="absolute -top-px -left-px w-4 h-4 border-t border-l border-primary"></div>
                <div className="absolute -top-px -right-px w-4 h-4 border-t border-r border-primary"></div>
                <div className="absolute -bottom-px -left-px w-4 h-4 border-b border-l border-primary"></div>
                <div className="absolute -bottom-px -right-px w-4 h-4 border-b border-r border-primary"></div>
                <div className="w-full h-full border border-slate-800/50 relative overflow-hidden grid grid-cols-2 grid-rows-2">
                     <div className="border-r border-b border-slate-800/50 p-4 flex flex-col justify-end">
                        <div className="text-[9px] font-mono text-slate-500 mb-2">FONTE_DE_DADOS</div>
                        <div className="flex gap-1 items-end h-10">
                             <div className="w-2 bg-slate-700 h-[40%] animate-pulse"></div>
                             <div className="w-2 bg-slate-700 h-[70%] animate-pulse" style={{animationDelay: '0.2s'}}></div>
                             <div className="w-2 bg-slate-700 h-[30%] animate-pulse" style={{animationDelay: '0.4s'}}></div>
                        </div>
                     </div>
                     <div className="border-b border-slate-800/50 p-4 relative">
                        <div className="absolute inset-4 border border-white/5 rounded-full animate-[spin_10s_linear_infinite]"></div>
                     </div>
                     <div className="border-r border-slate-800/50 p-4 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent animate-scan"></div>
                     </div>
                     <div className="p-4 flex items-center justify-center">
                        <div className="text-center">
                             <div className="text-2xl font-mono font-bold text-white">98.4</div>
                             <div className="text-[8px] text-primary tracking-widest uppercase">Precisão</div>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    )
}