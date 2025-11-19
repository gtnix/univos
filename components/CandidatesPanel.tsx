import React, { useState } from 'react';
import { X, Search, Filter, SlidersHorizontal, ArrowUpDown, ChevronUp, Eye, EyeOff } from 'lucide-react';

interface CandidatesPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCandidate: (id: number) => void;
  candidates: any[];
  isDarkMode?: boolean;
}

const CandidatesPanel: React.FC<CandidatesPanelProps> = ({ isOpen, onClose, onSelectCandidate, candidates, isDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [blindMode, setBlindMode] = useState(false);
  
  if (!isOpen) return null;

  const filteredCandidates = candidates.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="absolute inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Panel */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 h-full shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Lista de Candidatos</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Gerenciando {candidates.length} perfis ativos</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Filters & Search */}
        <div className="p-6 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nome, skill ou cargo..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary shadow-sm" 
            />
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-1">
            <FilterButton label="Vaga: Todas" active />
            <FilterButton label="FE Score > 80" />
            <FilterButton label="Status: Em Processo" />
            <FilterButton label="Local: SP" />
          </div>

          <div className="flex justify-between items-center pt-2">
             <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 cursor-pointer select-none" onClick={() => setBlindMode(!blindMode)}>
                {blindMode ? <EyeOff size={16} className="text-primary" /> : <Eye size={16} />}
                <span className={blindMode ? "font-medium text-primary" : ""}>Modo Cego (Recrutamento Justo)</span>
             </div>
             <div className="flex items-center gap-1 text-sm text-slate-500 hover:text-primary cursor-pointer">
                <ArrowUpDown size={14} />
                Ordenar por: Relevância
             </div>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
           {filteredCandidates.map((candidate) => (
             <div 
                key={candidate.id}
                onClick={() => onSelectCandidate(candidate.id)}
                className="group flex flex-col p-4 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-primary hover:shadow-md transition-all cursor-pointer"
             >
                <div className="flex justify-between items-start mb-3">
                   <div className="flex gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white ${blindMode ? 'bg-slate-400' : 'bg-slate-600 dark:bg-slate-500'}`}>
                         {blindMode ? 'User' : candidate.name.substring(0,2)}
                      </div>
                      <div>
                         <h3 className={`font-bold text-slate-900 dark:text-white ${blindMode ? 'blur-sm select-none' : ''}`}>
                            {blindMode ? 'Candidato Oculto' : candidate.name}
                         </h3>
                         <p className="text-sm text-slate-500 dark:text-slate-400">{candidate.role}</p>
                         <div className="flex gap-2 mt-2">
                            {candidate.tags.map((tag: string) => (
                                <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                                   {tag}
                                </span>
                            ))}
                         </div>
                      </div>
                   </div>
                   <div className="text-right">
                      <div className="flex items-center justify-end gap-2 mb-1">
                         <span className="text-xs text-slate-400 font-medium">Score Ajustado</span>
                         <span className="text-xl font-bold text-primary dark:text-primary-light">{candidate.score}</span>
                      </div>
                      <div className="flex items-center justify-end gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded">
                         <ChevronUp size={10} />
                         FE {candidate.boost}
                      </div>
                   </div>
                </div>
                
                <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-700/50">
                   <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{candidate.status}</span>
                   <button className="text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wide">
                      Ver Perfil Completo →
                   </button>
                </div>
             </div>
           ))}
        </div>
        
        {/* Footer actions */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-between items-center text-xs text-slate-400">
           <span>Mostrando {filteredCandidates.length} de {candidates.length}</span>
           <div className="flex gap-2">
              <button className="px-3 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50">Anterior</button>
              <button className="px-3 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50">Próximo</button>
           </div>
        </div>
      </div>
    </div>
  );
};

const FilterButton = ({ label, active }: {label: string, active?: boolean}) => (
  <button className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium border transition-all flex items-center
    ${active 
      ? 'bg-primary text-white border-primary' 
      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-primary/50'
    }`}>
    {label}
    <ChevronUp size={12} className="ml-1 rotate-180 opacity-50" />
  </button>
)

export default CandidatesPanel;