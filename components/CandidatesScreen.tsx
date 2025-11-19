import React, { useState } from 'react';
import { 
  Search, Filter, Download, Plus, MoreHorizontal, 
  Mail, Linkedin, Eye, CheckCircle2, Clock, 
  ChevronDown, ArrowUpRight, Briefcase, MapPin, LayoutGrid, List, SlidersHorizontal 
} from 'lucide-react';
import { MOCK_CANDIDATES } from '../App';

interface CandidatesScreenProps {
  isDarkMode?: boolean;
  onSelectCandidate: (id: number) => void;
}

const CandidatesScreen: React.FC<CandidatesScreenProps> = ({ isDarkMode = false, onSelectCandidate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Mock enhancements for the "Enterprise" feel without changing global App data
  const enhancedCandidates = MOCK_CANDIDATES.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.role.toLowerCase().includes(searchTerm.toLowerCase())
  ).map(c => ({
    ...c,
    department: c.role.includes('Dev') || c.role.includes('Eng') ? 'Engenharia' : c.role.includes('Design') ? 'Design' : 'Produto',
    appliedDate: '14 Fev',
    timeInStage: '3 dias',
    currentCompany: 'Empresa Confidencial', // Mock data simulation
    skills: ['React', 'TypeScript', 'Node.js'].slice(0, Math.floor(Math.random() * 3) + 1) // Randomize visible skills slightly
  }));

  return (
    <div className="flex flex-col h-full gap-6 pb-10 animate-in fade-in duration-500">
      
      {/* 1. Enterprise Header & Controls */}
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-end">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                    Base de Talentos
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs font-medium border border-slate-200 dark:border-slate-700">
                        {enhancedCandidates.length} ativos
                    </span>
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Gerenciamento unificado de pipeline e equidade.</p>
            </div>
            <div className="flex gap-3">
                <button className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-3 py-2 rounded-lg text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center shadow-sm h-9">
                    <Download size={14} className="mr-2" /> Exportar
                </button>
                <button className="bg-primary text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-primary-light transition-colors shadow-sm shadow-primary/20 flex items-center h-9">
                    <Plus size={14} className="mr-2" /> Adicionar Candidato
                </button>
            </div>
        </div>

        {/* Advanced Toolbar */}
        <div className="bg-white dark:bg-slate-900 p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-2 justify-between items-center">
             {/* Search */}
             <div className="relative w-full md:w-80 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-primary transition-colors" size={14} />
                <input 
                  type="text" 
                  placeholder="Buscar por nome, cargo, skill..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 bg-transparent border-none text-sm text-slate-900 dark:text-white focus:ring-0 placeholder:text-slate-400" 
                />
             </div>

             <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden md:block"></div>

             {/* Quick Filters */}
             <div className="flex items-center gap-1 w-full md:w-auto overflow-x-auto no-scrollbar">
                 <FilterTab label="Todos" active={activeFilter === 'Todos'} onClick={() => setActiveFilter('Todos')} />
                 <FilterTab label="Engenharia" count={4} active={activeFilter === 'Engenharia'} onClick={() => setActiveFilter('Engenharia')} />
                 <FilterTab label="Design" count={2} active={activeFilter === 'Design'} onClick={() => setActiveFilter('Design')} />
                 <FilterTab label="Alta Prioridade (CEE)" icon={CheckCircle2} active={activeFilter === 'Prioridade'} onClick={() => setActiveFilter('Prioridade')} />
             </div>

             <div className="flex-1"></div>

             {/* View Controls */}
             <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-700">
                 <button className="flex items-center px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors">
                    <SlidersHorizontal size={14} className="mr-2" />
                    Filtros
                 </button>
                 <div className="flex bg-slate-100 dark:bg-slate-800 rounded p-0.5">
                    <button 
                        onClick={() => setViewMode('list')}
                        className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                        <List size={14} />
                    </button>
                    <button 
                        onClick={() => setViewMode('grid')}
                        className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                        <LayoutGrid size={14} />
                    </button>
                 </div>
             </div>
        </div>
      </div>

      {/* 2. ATS Data Grid (The Core Redesign) */}
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex-1 flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
                        <th className="px-4 py-3 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-[280px]">Candidato</th>
                        <th className="px-4 py-3 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden md:table-cell">Vaga / Área</th>
                        <th className="px-4 py-3 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden lg:table-cell">Contexto (CEE)</th>
                        <th className="px-4 py-3 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden xl:table-cell">Skills</th>
                        <th className="px-4 py-3 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Score Técnico</th>
                        <th className="px-4 py-3 text-[10px] font-bold text-primary dark:text-primary-light uppercase tracking-wider text-right border-l border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900">
                            Score Ajustado
                        </th>
                        <th className="px-4 py-3 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Etapa</th>
                        <th className="px-4 py-3 w-12"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {enhancedCandidates.map((candidate) => (
                        <tr 
                            key={candidate.id} 
                            onClick={() => onSelectCandidate(candidate.id)}
                            className="group hover:bg-blue-50/30 dark:hover:bg-slate-800/40 transition-colors cursor-pointer relative"
                        >
                            {/* 1. Identity */}
                            <td className="px-4 py-3 align-top">
                                <div className="flex gap-3">
                                    <div className="relative mt-0.5">
                                        <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 group-hover:border-primary/40 transition-colors">
                                            {candidate.name.substring(0,2)}
                                        </div>
                                        <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-sm text-slate-900 dark:text-white leading-tight group-hover:text-primary transition-colors">
                                            {candidate.name}
                                        </div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1.5">
                                            <span className="truncate max-w-[100px]">{candidate.currentCompany}</span>
                                            <span className="text-slate-300 dark:text-slate-700">•</span>
                                            <span className="flex items-center"><MapPin size={10} className="mr-0.5" /> {candidate.location.split(',')[0]}</span>
                                        </div>
                                    </div>
                                </div>
                            </td>

                            {/* 2. Job & Area */}
                            <td className="px-4 py-3 align-top hidden md:table-cell">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-medium text-slate-800 dark:text-slate-200">{candidate.role}</span>
                                        {candidate.status === 'Novo' && (
                                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-[10px] font-medium text-slate-500 bg-slate-50 dark:bg-slate-800">
                                            {candidate.department}
                                        </span>
                                        <span className="text-[10px] text-slate-400 flex items-center">
                                            <Clock size={10} className="mr-1" /> Aplicou: {candidate.appliedDate}
                                        </span>
                                    </div>
                                </div>
                            </td>

                            {/* 3. Context (CEE) */}
                            <td className="px-4 py-3 align-top hidden lg:table-cell">
                                <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                                    {candidate.tags.map((tag, i) => (
                                        <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-medium bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800/50 whitespace-nowrap">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </td>

                            {/* 4. Skills */}
                            <td className="px-4 py-3 align-top hidden xl:table-cell">
                                <div className="flex flex-wrap gap-1">
                                    {candidate.skills?.map((skill, i) => (
                                        <span key={i} className="px-1.5 py-0.5 rounded text-[10px] text-slate-500 border border-slate-200 dark:border-slate-700">
                                            {skill}
                                        </span>
                                    ))}
                                    <span className="px-1.5 py-0.5 text-[10px] text-slate-400">+2</span>
                                </div>
                            </td>

                            {/* 5. Raw Score */}
                            <td className="px-4 py-3 align-middle text-right">
                                <div className="inline-flex flex-col items-end">
                                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">{candidate.rawScore}</span>
                                    <span className="text-[10px] text-slate-400">cv only</span>
                                </div>
                            </td>

                            {/* 6. Adjusted Score (The Hero) */}
                            <td className="px-4 py-3 align-middle text-right border-l border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 group-hover:bg-white dark:group-hover:bg-slate-800 transition-colors relative">
                                <div className="flex items-center justify-end gap-2">
                                    <div className="flex flex-col items-end">
                                        <span className="text-lg font-bold text-primary dark:text-primary-light leading-none">{candidate.score}</span>
                                        <div className="flex items-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                                            <ArrowUpRight size={10} strokeWidth={3} /> {candidate.boost}
                                        </div>
                                    </div>
                                </div>
                            </td>

                            {/* 7. Stage */}
                            <td className="px-4 py-3 align-middle">
                                <div className="flex flex-col gap-1">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide w-fit border ${
                                        candidate.status === 'Entrevista' 
                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800' 
                                            : candidate.status === 'Teste Técnico'
                                            ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800'
                                            : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                                    }`}>
                                        {candidate.status}
                                    </span>
                                    <span className="text-[10px] text-slate-400">
                                        {candidate.timeInStage} na etapa
                                    </span>
                                </div>
                            </td>

                            {/* 8. Actions (Hover Reveal) */}
                            <td className="px-4 py-3 align-middle text-right">
                                <div className="flex justify-end items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <ActionIcon icon={Mail} label="Email" />
                                    <ActionIcon icon={Linkedin} label="LinkedIn" />
                                    <button 
                                        className="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 transition-colors"
                                        onClick={(e) => { e.stopPropagation(); onSelectCandidate(candidate.id); }}
                                    >
                                        <Eye size={14} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
          
          {/* Sticky Pagination Footer */}
          <div className="mt-auto p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-between items-center text-xs sticky bottom-0">
             <div className="text-slate-500">
                Mostrando <strong>1-6</strong> de <strong>{enhancedCandidates.length}</strong> candidatos
             </div>
             <div className="flex gap-2">
                <button className="px-3 py-1.5 border border-slate-300 dark:border-slate-700 rounded-md text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 disabled:opacity-50">Anterior</button>
                <button className="px-3 py-1.5 border border-slate-300 dark:border-slate-700 rounded-md text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50">Próximo</button>
             </div>
          </div>
      </div>
    </div>
  );
};

// Micro-components for cleaner code
const FilterTab = ({ label, count, active, icon: Icon, onClick }: any) => (
    <button 
        onClick={onClick}
        className={`whitespace-nowrap px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5
      ${active 
        ? 'bg-slate-800 dark:bg-white text-white dark:text-slate-900 shadow-sm' 
        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
      }`}>
      {Icon && <Icon size={12} className={active ? 'text-emerald-400 dark:text-emerald-600' : 'text-slate-400'} />}
      {label}
      {count && <span className={`ml-1 px-1.5 rounded-full text-[10px] ${active ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'}`}>{count}</span>}
    </button>
);

const ActionIcon = ({ icon: Icon, label }: any) => (
    <button 
        className="w-7 h-7 flex items-center justify-center rounded text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        title={label}
        onClick={(e) => e.stopPropagation()}
    >
        <Icon size={14} />
    </button>
);

export default CandidatesScreen;