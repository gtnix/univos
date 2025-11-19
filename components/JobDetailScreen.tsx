import React from 'react';
import { ArrowLeft, Users, Clock, Award, Filter, MapPin, Calendar } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
    <div className="flex flex-col gap-8">
         
         {/* HEADER SECTION - Integrated directly into flow */}
         <div className="flex flex-col gap-5">
             {/* Breadcrumb */}
             <button onClick={onBack} className="flex items-center text-sm font-medium text-slate-500 hover:text-primary transition-colors w-fit group">
                <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Voltar ao Dashboard
             </button>

             {/* Title & Actions Row */}
             <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="space-y-3">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                      Senior Frontend Developer
                    </h1>
                    
                    {/* Meta Data Strip */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                        <span className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-md text-xs font-mono font-medium text-slate-600 dark:text-slate-300">
                          #JOB-2024-001
                        </span>
                        <div className="flex items-center gap-1.5">
                           <MapPin size={16} className="text-slate-400" />
                           <span>São Paulo (Híbrido)</span>
                        </div>
                        <div className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
                        <div className="flex items-center gap-1.5">
                           <Calendar size={16} className="text-slate-400" />
                           <span>Abertura: 14/02/2024</span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-1">
                    <button className="flex items-center px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                        <Filter size={16} className="mr-2 text-slate-400" /> 
                        Editar Filtros
                    </button>
                    <button onClick={onViewCandidates} className="flex items-center px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary-light shadow-lg shadow-primary/20 transition-all transform active:scale-95">
                        <Users size={18} className="mr-2" />
                        Ver Lista de Candidatos
                    </button>
                </div>
             </div>
         </div>

         {/* STATS & CONTENT BODY */}
         <div className="flex flex-col gap-8">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={funnelData} margin={{top: 10, right: 10, left: -20, bottom: 0}}>
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
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12}} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12}} />
                          <Tooltip 
                              contentStyle={{
                                  backgroundColor: isDarkMode ? '#1E293B' : '#FFF',
                                  borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                                  color: isDarkMode ? '#F1F5F9' : '#0F172A',
                                  borderRadius: '8px'
                              }}
                          />
                          <Area type="monotone" dataKey="value" name="Total Candidatos" stroke="#64748B" strokeWidth={2} fillOpacity={1} fill="url(#colorTotal)" />
                          <Area type="monotone" dataKey="equity" name="Perfil Prioritário (FE+)" stroke="#0B5B6F" strokeWidth={2} fillOpacity={1} fill="url(#colorEquity)" />
                      </AreaChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-center text-xs text-slate-500 mt-6">A conversão de perfis prioritários na etapa "Teste" está 15% superior à média.</p>
            </div>

            {/* Requirements Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  <button className="text-xs font-bold bg-white dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 px-3 py-2 rounded border border-indigo-200 dark:border-indigo-700 shadow-sm hover:bg-indigo-50 transition-colors">
                      Aplicar Sugestão
                  </button>
               </div>
            </div>
         </div>
    </div>
  );
};

export default JobDetailScreen;