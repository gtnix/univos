import React from 'react';
import { ArrowLeft, Users, Clock, Award, Filter, ChevronDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface JobDetailScreenProps {
  isDarkMode?: boolean;
  jobId: string | null;
  onBack: () => void;
  onViewCandidates: () => void;
}

const JobDetailScreen: React.FC<JobDetailScreenProps> = ({ isDarkMode = false, jobId, onBack, onViewCandidates }) => {
  // Mock data for funnel
  const funnelData = [
    { name: 'Inscritos', value: 120, equity: 40 },
    { name: 'Triagem', value: 45, equity: 25 },
    { name: 'Teste', value: 20, equity: 12 },
    { name: 'Entrevista', value: 8, equity: 5 },
    { name: 'Oferta', value: 2, equity: 2 },
  ];

  return (
    <div className="h-full bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-300 overflow-y-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-6 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto">
             <button onClick={onBack} className="flex items-center text-sm text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 mb-4 transition-colors">
                <ArrowLeft size={16} className="mr-1" /> Voltar ao Dashboard
             </button>
             <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Senior Frontend Developer</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">ID: #JOB-2024-001 • São Paulo (Híbrido) • Abertura: 14/02/2024</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300">
                        <Filter size={16} className="mr-2" /> Editar Filtros da Vaga
                    </button>
                    <button onClick={onViewCandidates} className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-light shadow-sm">
                        Ver Lista de Candidatos
                    </button>
                </div>
             </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto w-full p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-6">
             <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Total de Candidatos</h3>
                    <Users size={18} className="text-blue-500" />
                </div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">124</p>
                <p className="text-xs text-emerald-600 mt-1 flex items-center">32 novos hoje</p>
             </div>
             <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Tempo Médio (SLA)</h3>
                    <Clock size={18} className="text-amber-500" />
                </div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">14 dias</p>
                <p className="text-xs text-slate-400 mt-1">Na meta (15 dias)</p>
             </div>
             <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Qualidade do Pool (FE)</h3>
                    <Award size={18} className="text-primary" />
                </div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">8.4/10</p>
                <p className="text-xs text-emerald-600 mt-1">+1.2 vs média da empresa</p>
             </div>
          </div>

          {/* Funnel Chart */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Funil de Recrutamento & Equidade</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={funnelData}>
                        <defs>
                            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#64748B" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#64748B" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0B5B6F" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#0B5B6F" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#1E293B' : '#E2E8F0'} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: isDarkMode ? '#94A3B8' : '#64748B'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: isDarkMode ? '#94A3B8' : '#64748B'}} />
                        <Tooltip 
                            contentStyle={{
                                backgroundColor: isDarkMode ? '#1E293B' : '#FFF',
                                borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                                color: isDarkMode ? '#F1F5F9' : '#0F172A'
                            }}
                        />
                        <Area type="monotone" dataKey="value" name="Total Candidatos" stroke="#64748B" fillOpacity={1} fill="url(#colorTotal)" />
                        <Area type="monotone" dataKey="equity" name="Perfil Prioritário (FE+)" stroke="#0B5B6F" strokeWidth={2} fillOpacity={1} fill="url(#colorEquity)" />
                    </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="text-center text-xs text-slate-500 mt-4">A conversão de perfis prioritários na etapa "Teste" está 15% superior à média.</p>
          </div>

          {/* Requirements Analysis */}
          <div className="grid grid-cols-2 gap-6">
             <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Critérios de Aprovação</h3>
                <ul className="space-y-3">
                    <li className="flex justify-between text-sm pb-2 border-b border-slate-50 dark:border-slate-800">
                        <span className="text-slate-600 dark:text-slate-400">React.js Avançado</span>
                        <span className="font-medium text-slate-900 dark:text-white">Peso: Alto</span>
                    </li>
                    <li className="flex justify-between text-sm pb-2 border-b border-slate-50 dark:border-slate-800">
                        <span className="text-slate-600 dark:text-slate-400">Inglês Fluente</span>
                        <span className="font-medium text-slate-900 dark:text-white">Peso: Médio (Flexível)</span>
                    </li>
                    <li className="flex justify-between text-sm pb-2 border-b border-slate-50 dark:border-slate-800">
                        <span className="text-slate-600 dark:text-slate-400">Experiência Remota</span>
                        <span className="font-medium text-slate-900 dark:text-white">Peso: Baixo</span>
                    </li>
                </ul>
             </div>
             
             <div className="bg-indigo-50 dark:bg-indigo-900/10 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800/30">
                <h3 className="font-bold text-indigo-900 dark:text-indigo-300 mb-2">Sugestão do Motor de Equidade</h3>
                <p className="text-sm text-indigo-700 dark:text-indigo-400 leading-relaxed mb-4">
                    Analisamos que a exigência de "Diploma em Federal" está filtrando 45% dos candidatos com score técnico alto. Sugerimos remover este filtro para aumentar a diversidade do topo do funil.
                </p>
                <button className="text-xs font-bold bg-white dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 px-3 py-2 rounded border border-indigo-200 dark:border-indigo-700 shadow-sm hover:bg-indigo-50">
                    Aplicar Sugestão
                </button>
             </div>
          </div>
      </div>
    </div>
  );
};

export default JobDetailScreen;