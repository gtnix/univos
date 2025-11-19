import React from 'react';
import { ArrowRight, Activity, Layers, Globe } from 'lucide-react';

interface HeroScreenProps {
  onNext: () => void;
  isDarkMode?: boolean;
}

const HeroScreen: React.FC<HeroScreenProps> = ({ onNext, isDarkMode }) => {
  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 flex flex-col relative p-16 overflow-hidden transition-colors duration-300">
      
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
        <div className="grid grid-cols-12 gap-4 p-10 transform -rotate-12 translate-x-20 -translate-y-20">
          {Array.from({ length: 144 }).map((_, i) => (
            <div 
              key={i} 
              className={`w-2 h-2 rounded-full ${Math.random() > 0.7 ? 'bg-primary' : 'bg-slate-400 dark:bg-slate-600'}`}
            />
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-10 left-10 opacity-5">
        <Globe size={400} className="text-primary" />
      </div>

      {/* Navbar Placeholder */}
      <header className="flex justify-between items-center mb-20 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Layers className="text-white" size={18} />
          </div>
          <span className="text-slate-900 dark:text-white font-bold text-xl tracking-tight">UNIVOS <span className="font-normal text-slate-500 dark:text-slate-400">| Enterprise</span></span>
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Solução de Recrutamento Inteligente</div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl z-10 mt-10">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-pale dark:bg-primary/20 text-primary dark:text-primary-light text-xs font-bold tracking-wide uppercase mb-6 border border-primary/20 dark:border-primary/30">
          Novo Módulo de IA Ética
        </div>
        
        <h1 className="text-6xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
          UNIVOS
        </h1>
        
        <h2 className="text-3xl text-slate-500 dark:text-slate-400 font-light mb-10 leading-snug">
          Transforme potencial oculto em <span className="text-primary dark:text-primary-light font-medium">vantagem competitiva</span> através de recrutamento justo.
        </h2>

        <div className="flex gap-4">
          <button 
            onClick={onNext}
            className="bg-primary hover:bg-primary-light text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center transition-all shadow-lg hover:shadow-xl"
          >
            Veja o fluxo em 3 passos
            <ArrowRight className="ml-2" size={20} />
          </button>
          <button className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all">
            Agendar Demo
          </button>
        </div>

        {/* Micro Legend */}
        <div className="mt-16 grid grid-cols-3 gap-8 border-t border-slate-200 dark:border-slate-800 pt-8 max-w-2xl">
          <div className="flex flex-col">
            <div className="flex items-center text-primary dark:text-primary-light mb-1">
              <Activity size={16} className="mr-2" />
              <span className="font-bold">Análise de Contexto</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Avalia a jornada, não apenas o ponto de chegada.</p>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center text-primary dark:text-primary-light mb-1">
              <Layers size={16} className="mr-2" />
              <span className="font-bold">Correção Algorítmica</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Reduz vieses estruturais automaticamente.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HeroScreen;