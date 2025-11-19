import React, { useState } from 'react';
import { 
  Search, Download, Plus, MoreHorizontal, 
  Eye, EyeOff, ChevronDown, ArrowUpRight, 
  Briefcase, MapPin, CheckSquare, Square,
  Users, Target, Lock,
  GitCommit, Zap, Layers
} from 'lucide-react';

interface CandidatesScreenProps {
  isDarkMode?: boolean;
  onSelectCandidate: (id: number) => void;
}

// Extended Mock Data specifically for this detailed table view
const DETAILED_CANDIDATES = [
  { 
    id: 4829, 
    name: 'Mariana Silva', 
    lastContact: '2h atrás',
    source: 'Indicação Interna',
    role: 'Senior Frontend Dev', 
    department: 'Engenharia',
    location: 'São Paulo, SP',
    format: 'Híbrido',
    ceeTags: [{ label: 'Primeira Geração', color: 'blue' }, { label: 'Mãe Solo', color: 'purple' }],
    careerProfile: 'Liderança Técnica · 7 anos XP',
    careerDetail: 'Fullstack · System Design · Scalability',
    skills: ['React', 'TypeScript', 'System Design', 'A11y'],
    stage: 'Entrevista Técnica',
    timeInStage: 3,
    rawScore: 75,
    adjustedScore: 89,
    boost: '+14%',
  },
  { 
    id: 9201, 
    name: 'João Paulo Costa', 
    lastContact: '1d atrás',
    source: 'Banco de Talentos',
    role: 'Senior Frontend Dev', 
    department: 'Engenharia',
    location: 'Osasco, SP',
    format: 'Remoto',
    ceeTags: [{ label: 'Periferia', color: 'amber' }, { label: 'Escola Pública', color: 'emerald' }],
    careerProfile: 'Sênior · 5 anos XP',
    careerDetail: 'Frontend Focus · Performance',
    skills: ['React', 'Vue.js', 'Node.js'],
    stage: 'Triagem',
    timeInStage: 1,
    rawScore: 69,
    adjustedScore: 87,
    boost: '+18%',
  },
  { 
    id: 3392, 
    name: 'Aline Santos', 
    lastContact: '3d atrás',
    source: 'LinkedIn',
    role: 'Senior Frontend Dev', 
    department: 'Engenharia',
    location: 'Recife, PE',
    format: 'Remoto',
    ceeTags: [{ label: 'Mulher Tech', color: 'rose' }, { label: 'Transição Carreira', color: 'indigo' }],
    careerProfile: 'Especialista · 6 anos XP',
    careerDetail: 'Java Legacy → Modern Frontend',
    skills: ['React', 'Angular', 'Java'],
    stage: 'Teste Técnico',
    timeInStage: 4,
    rawScore: 75,
    adjustedScore: 85,
    boost: '+10%',
  },
  { 
    id: 1023, 
    name: 'Carlos Mendes', 
    lastContact: '1 sem',
    source: 'Gupy',
    role: 'Senior Frontend Dev', 
    department: 'Engenharia',
    location: 'São Paulo, SP',
    format: 'Presencial',
    ceeTags: [{ label: 'Pai Atípico', color: 'cyan' }],
    careerProfile: 'Engenheiro de Software · 8 anos XP',
    careerDetail: 'Cloud AWS · Arquitetura Limpa',
    skills: ['React', 'Redux', 'AWS'],
    stage: 'Triagem',
    timeInStage: 2,
    rawScore: 77,
    adjustedScore: 82,
    boost: '+5%',
  },
  { 
    id: 5591, 
    name: 'Beatriz Oliveira', 
    lastContact: '4h atrás',
    source: 'Indicação',
    role: 'UX Designer', 
    department: 'Design',
    location: 'Salvador, BA',
    format: 'Remoto',
    ceeTags: [{ label: 'Mulher Negra', color: 'rose' }, { label: 'Liderança Comunitária', color: 'orange' }],
    careerProfile: 'Product Designer · 4 anos XP',
    careerDetail: 'UX Research · Design Systems',
    skills: ['Figma', 'Design System', 'Research'],
    stage: 'Entrevista',
    timeInStage: 5,
    rawScore: 80,
    adjustedScore: 91,
    boost: '+11%',
  },
  { 
    id: 7720, 
    name: 'Roberto Almeida', 
    lastContact: 'Hoje',
    source: 'Site Carreiras',
    role: 'DevOps Engineer', 
    department: 'Operações',
    location: 'Curitiba, PR',
    format: 'Híbrido',
    ceeTags: [{ label: 'Reintegração', color: 'teal' }, { label: '>50 Anos', color: 'slate' }],
    careerProfile: 'Sênior Infra · 20+ anos XP',
    careerDetail: 'Linux · Containerization · CI/CD',
    skills: ['Docker', 'Kubernetes', 'Linux'],
    stage: 'Novo',
    timeInStage: 0,
    rawScore: 60,
    adjustedScore: 78,
    boost: '+18%',
  },
];

const CandidatesScreen: React.FC<CandidatesScreenProps> = ({ isDarkMode = false, onSelectCandidate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todas');
  const [blindMode, setBlindMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Filter Logic
  const filteredCandidates = DETAILED_CANDIDATES.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (activeFilter === 'Todas') return matchesSearch;
    if (activeFilter === 'Alta Prioridade UNIVOS') return matchesSearch && c.ceeTags.length > 1;
    return matchesSearch && (c.department.includes(activeFilter) || c.department === activeFilter);
  });

  const toggleSelection = (id: number) => {
    if (selectedIds.includes(id)) setSelectedIds(selectedIds.filter(i => i !== id));
    else setSelectedIds([...selectedIds, id]);
  };

  const toggleAll = () => {
    if (selectedIds.length === filteredCandidates.length) setSelectedIds([]);
    else setSelectedIds(filteredCandidates.map(c => c.id));
  };

  return (
    <div className="flex flex-col h-full gap-8 pb-8 font-sans text-slate-600 dark:text-slate-300">
      
      {/* 1. Header & Summary Cards */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-end">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                    Base de Talentos
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
                    Visão unificada de pipeline e equidade.
                </p>
            </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SummaryCard 
                title="Candidatos Ativos" 
                value="42" 
                subtext="+5 nesta semana"
                icon={Users}
                color="blue"
            />
            <SummaryCard 
                title="Grupos Prioritários (UNIVOS)" 
                value="38%" 
                subtext="Meta trimestral: 40%"
                icon={Target}
                color="emerald"
            />
            <SummaryCard 
                title="Vagas com Equidade" 
                value="8" 
                subtext="12 vagas totais abertas"
                icon={Briefcase}
                color="indigo"
            />
        </div>
      </div>

      {/* 2. Controls Bar & Filters */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
             
             <div className="flex items-center gap-3 flex-1 w-full pl-2">
                {/* Global Search */}
                <div className="relative w-full max-w-sm group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-primary transition-colors" size={16} />
                    <input 
                        type="text" 
                        placeholder="Buscar por nome, cargo, skill..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-transparent border-none text-sm text-slate-900 dark:text-white focus:ring-0 placeholder:text-slate-400" 
                    />
                </div>
                <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden lg:block"></div>
                
                {/* Quick Filters */}
                <div className="hidden xl:flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                    {['Todas', 'Engenharia', 'Produto', 'Design', 'Operações', 'Alta Prioridade UNIVOS'].map(filter => (
                        <button 
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                                activeFilter === filter 
                                ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white font-semibold shadow-sm' 
                                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
             </div>

             {/* Right Actions */}
             <div className="flex items-center gap-3 w-full lg:w-auto justify-end pr-2">
                {/* Smart Blind Mode Toggle */}
                <div 
                    className={`group flex items-center gap-2.5 px-3 py-1.5 rounded-lg border cursor-pointer select-none transition-all ${blindMode ? 'bg-primary/5 border-primary/20' : 'border-slate-200 dark:border-slate-700 hover:border-primary/30 bg-white dark:bg-slate-800'}`}
                    onClick={() => setBlindMode(!blindMode)}
                    title="Oculta nomes e dados demográficos sensíveis para reduzir vieses"
                >
                    {blindMode ? <EyeOff size={16} className="text-primary" /> : <Eye size={16} className="text-slate-400 group-hover:text-primary transition-colors" />}
                    <span className={`text-sm font-medium ${blindMode ? 'text-primary' : 'text-slate-600 dark:text-slate-400'}`}>
                        Modo Cego
                    </span>
                </div>

                <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden lg:block mx-1"></div>

                <button className="p-2 text-slate-500 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors" title="Exportar CSV">
                    <Download size={18} />
                </button>
                <button className="flex items-center px-4 py-2 text-sm font-bold text-white bg-primary hover:bg-primary-light rounded-lg shadow-sm shadow-primary/20 transition-all transform active:scale-95">
                    <Plus size={16} className="mr-2" />
                    <span className="hidden sm:inline">Candidato</span>
                </button>
             </div>
        </div>
      </div>

      {/* 3. Enterprise Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex-1 flex flex-col overflow-hidden">
        <div className="overflow-auto flex-1 custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[1200px]">
                <thead className="bg-slate-50/60 dark:bg-slate-900/90 backdrop-blur-md sticky top-0 z-20 border-b border-slate-200 dark:border-slate-800">
                    <tr>
                        <th className="px-6 py-3 w-14 text-center">
                            <div className="flex items-center justify-center cursor-pointer text-slate-400 hover:text-primary transition-colors" onClick={toggleAll}>
                                {selectedIds.length === filteredCandidates.length && filteredCandidates.length > 0 ? <CheckSquare size={16} /> : <Square size={16} />}
                            </div>
                        </th>
                        <TableHeader label="Candidato" />
                        <TableHeader label="Vaga / Área" />
                        <TableHeader label="Contexto de Equidade" />
                        <TableHeader label="Perfil Profissional" />
                        <TableHeader label="Skills" />
                        <TableHeader label="Etapa" />
                        <TableHeader label="Score Ajustado" align="right" highlight />
                        <th className="px-6 py-3 w-12"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                    {filteredCandidates.map((candidate) => (
                        <tr 
                            key={candidate.id} 
                            className={`group transition-colors duration-150 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 ${selectedIds.includes(candidate.id) ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`}
                        >
                            {/* Checkbox */}
                            <td className="px-6 py-5 align-top text-center">
                                <div className="flex items-center justify-center mt-1 cursor-pointer text-slate-300 hover:text-primary transition-colors" onClick={() => toggleSelection(candidate.id)}>
                                    {selectedIds.includes(candidate.id) ? <CheckSquare size={16} className="text-primary" /> : <Square size={16} />}
                                </div>
                            </td>

                            {/* Candidato (Smart Blind Logic) */}
                            <td className="px-6 py-5 align-top max-w-[260px]">
                                <div className="flex items-start gap-3">
                                    {/* Avatar Placeholder or Initials */}
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 border border-slate-100 dark:border-slate-700 shadow-sm ${blindMode ? 'bg-slate-100 text-slate-400 dark:bg-slate-800' : 'bg-white text-primary dark:bg-slate-800 dark:text-primary-light'}`}>
                                        {blindMode ? <Lock size={12} /> : candidate.name.split(' ').map(n => n[0]).join('').substring(0,2)}
                                    </div>
                                    
                                    <div className="flex-1 min-w-0 pt-0.5">
                                        <div 
                                            className={`font-medium text-sm text-slate-900 dark:text-white mb-1 hover:text-primary cursor-pointer flex items-center gap-2 truncate ${blindMode ? 'font-mono text-slate-600' : ''}`}
                                            onClick={() => onSelectCandidate(candidate.id)}
                                        >
                                            {blindMode ? `Candidato #${candidate.id}` : candidate.name}
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-[11px] font-normal text-slate-500 dark:text-slate-400 flex items-center gap-1.5 truncate">
                                                <MapPin size={10} className="text-slate-400" /> {candidate.location}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </td>

                            {/* Vaga */}
                            <td className="px-6 py-5 align-top">
                                <div className="pt-0.5">
                                    <div className="text-[13px] font-medium text-slate-700 dark:text-slate-200 mb-1.5">{candidate.role}</div>
                                    <StandardChip color="slate" className="text-[10px]">
                                        {candidate.department}
                                    </StandardChip>
                                </div>
                            </td>

                            {/* Contexto CEE (Smart Blind Logic) */}
                            <td className="px-6 py-5 align-top max-w-[220px]">
                                <div className="flex flex-wrap gap-2 pt-0.5">
                                    {blindMode ? (
                                        // Blind Mode: Generic Protected Tag
                                        <StandardChip color="slate" className="cursor-help" title="Informações demográficas ocultas para evitar viés inconsciente">
                                            <EyeOff size={10} className="mr-1.5 text-slate-400" />
                                            Contexto Protegido
                                        </StandardChip>
                                    ) : (
                                        // Normal Mode: Detailed Tags
                                        candidate.ceeTags.map((tag, idx) => (
                                            <StandardChip key={idx} color={tag.color}>
                                                {tag.label}
                                            </StandardChip>
                                        ))
                                    )}
                                </div>
                            </td>

                            {/* Perfil Profissional (CLEAN: TECHNICAL & INCLUSIVE) */}
                            <td className="px-6 py-5 align-top max-w-[220px]">
                                <div className="flex flex-col gap-1 pt-0.5">
                                    <div className="text-[13px] font-medium text-slate-800 dark:text-slate-200 leading-tight">
                                        {candidate.careerProfile}
                                    </div>
                                    <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                                        {candidate.careerDetail}
                                    </div>
                                </div>
                            </td>

                            {/* Skills */}
                            <td className="px-6 py-5 align-top">
                                <div className="flex flex-wrap gap-1.5 max-w-[180px] pt-0.5">
                                    {candidate.skills.slice(0, 3).map((skill, idx) => (
                                        <StandardChip key={idx} color="white">
                                            {skill}
                                        </StandardChip>
                                    ))}
                                    {candidate.skills.length > 3 && (
                                        <span className="inline-flex items-center px-1.5 py-1 text-[10px] font-semibold text-slate-400 dark:text-slate-500 cursor-help hover:text-slate-600 dark:hover:text-slate-300 transition-colors" title={candidate.skills.slice(3).join(', ')}>
                                            +{candidate.skills.length - 3}
                                        </span>
                                    )}
                                </div>
                            </td>

                            {/* Etapa */}
                            <td className="px-6 py-5 align-top">
                                <div className="flex flex-col items-start gap-1.5 pt-0.5">
                                    <StageChip stage={candidate.stage} />
                                    <div className="text-[10px] text-slate-400 pl-0.5 flex items-center gap-1">
                                        <GitCommit size={10} /> {candidate.timeInStage}d na etapa
                                    </div>
                                </div>
                            </td>

                            {/* Score Ajustado (Premium Highlight) */}
                            <td className="px-6 py-5 align-top text-right">
                                <div className="flex flex-col items-end pt-0.5">
                                    <div className="flex items-baseline gap-2.5 mb-1">
                                        <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">CV {candidate.rawScore}</span>
                                        <div className="text-primary dark:text-primary-light font-bold text-base leading-none">
                                            {candidate.adjustedScore}
                                        </div>
                                    </div>
                                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/30">
                                        <Zap size={8} strokeWidth={3} className="fill-current" /> {candidate.boost}
                                    </span>
                                </div>
                            </td>

                            {/* Actions */}
                            <td className="px-6 py-5 align-middle text-center">
                                <button className="p-1.5 rounded text-slate-400 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800 dark:hover:text-primary-light opacity-0 group-hover:opacity-100 transition-all">
                                    <MoreHorizontal size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
        {/* Table Footer / Pagination (Cosmetic) */}
        <div className="border-t border-slate-100 dark:border-slate-800 p-4 bg-white dark:bg-slate-900 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium">Mostrando 6 de 42 candidatos</span>
            <div className="flex gap-2">
                <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium disabled:opacity-50 transition-colors shadow-sm" disabled>Anterior</button>
                <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium transition-colors shadow-sm">Próximo</button>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-components with Enhanced Aesthetics ---

const SummaryCard = ({ title, value, subtext, icon: Icon, color }: any) => {
    const colors: any = {
        blue: 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800',
        emerald: 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800',
        indigo: 'text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800',
    };

    return (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
            <div className={`p-3 rounded-lg border ${colors[color]}`}>
                <Icon size={20} strokeWidth={2.5} />
            </div>
            <div className="flex-1">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{title}</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{value}</span>
                    <span className="text-xs font-medium text-slate-400">{subtext}</span>
                </div>
            </div>
        </div>
    );
}

const TableHeader = ({ label, align = 'left', highlight = false }: { label: string, align?: 'left' | 'right', highlight?: boolean }) => (
    <th className={`px-6 py-3 text-[10px] font-semibold uppercase tracking-wider ${align === 'right' ? 'text-right' : 'text-left'} ${highlight ? 'text-primary dark:text-primary-light' : 'text-slate-500 dark:text-slate-400'}`}>
        <div className={`flex items-center gap-1 group cursor-pointer ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
            {label}
            <ChevronDown size={12} className={`transition-all text-slate-300 group-hover:text-slate-500 ${highlight ? 'opacity-100 text-primary/50' : 'opacity-0 group-hover:opacity-100'}`} />
        </div>
    </th>
);

// Unified Standard Chip Component
interface StandardChipProps {
    children: React.ReactNode;
    color?: string;
    className?: string;
    title?: string;
}

const StandardChip = ({ children, color = 'slate', className = '', title }: StandardChipProps) => {
    // Base style ensures uniform height, padding, and border radius for ALL chips
    const baseStyle = "inline-flex items-center justify-center px-2.5 py-1 rounded-md text-[11px] font-medium border transition-colors select-none";
    
    const colors: any = {
        slate: 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
        white: 'bg-white text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 shadow-sm', // For Skills
        
        // CEE / Tags colors - Desaturated & Harmonized
        blue: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800/30',
        purple: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800/30',
        amber: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800/30',
        emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800/30',
        rose: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-300 dark:border-rose-800/30',
        indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800/30',
        cyan: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-900/20 dark:text-cyan-300 dark:border-cyan-800/30',
        orange: 'bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800/30',
        teal: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900/20 dark:text-teal-300 dark:border-teal-800/30',
    };

    const chosenStyle = colors[color] || colors['slate'];

    return (
        <span className={`${baseStyle} ${chosenStyle} ${className}`} title={title}>
            {children}
        </span>
    );
};

// Specialized Chip for Stages (inherits StandardChip style but handles status mapping)
const StageChip = ({ stage }: { stage: string }) => {
    let color = 'slate';
    let dotColor = 'bg-slate-400';
    
    switch(stage) {
        case 'Novo': 
            color = 'slate'; 
            dotColor = 'bg-slate-400';
            break;
        case 'Triagem': 
            color = 'blue'; 
            dotColor = 'bg-blue-500';
            break;
        case 'Teste Técnico': 
            color = 'purple'; 
            dotColor = 'bg-purple-500';
            break;
        case 'Entrevista': 
        case 'Entrevista Técnica':
            color = 'amber'; 
            dotColor = 'bg-amber-500';
            break;
        case 'Oferta': 
            color = 'emerald'; 
            dotColor = 'bg-emerald-500';
            break;
    }

    return (
        <StandardChip color={color}>
            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${dotColor}`}></span>
            {stage}
        </StandardChip>
    )
}

export default CandidatesScreen;