
import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Download, ExternalLink, Award, BookOpen, Briefcase, ChevronLeft, GraduationCap, Home, Star, CheckCircle2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { MOCK_CANDIDATES } from '../App';

interface ProfileScreenProps {
  isDarkMode?: boolean;
  candidateId: number | null;
  onBack: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ isDarkMode = false, candidateId, onBack }) => {
  const candidate = MOCK_CANDIDATES.find(c => c.id === candidateId) || MOCK_CANDIDATES[0];
  const skills = ['React', 'TypeScript', 'Node.js', 'System Design', 'Accessibility', 'Tailwind CSS', 'Next.js'];
  
  // Mock data for Gauge
  const data = [
    { name: 'Score Bruto', value: candidate.rawScore, color: isDarkMode ? '#475569' : '#94A3B8' }, 
    { name: 'Fator Equidade', value: candidate.score - candidate.rawScore, color: '#0B5B6F' }, 
    { name: 'Restante', value: 100 - candidate.score, color: isDarkMode ? '#1E293B' : '#F1F5F9' } 
  ];
  
  return (
    // Using flex-col within the parent Max-W container
    <div className="flex flex-col gap-6">
      
      {/* 1. UNIFIED HEADER - Sticky is now managed by parent scroll if needed, but simpler to keep relative for consistency in this architecture, or use sticky -top-6 to account for padding */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          {/* Top Bar: Navigation & Actions */}
          <div className="px-6 py-3 flex justify-between items-center border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
             <button onClick={onBack} className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors group">
                <div className="p-1.5 rounded-full group-hover:bg-slate-100 dark:group-hover:bg-slate-800 mr-2">
                    <ChevronLeft size={18} />
                </div>
                Voltar para Lista
             </button>
             <div className="flex gap-3">
                 <button className="hidden md:flex px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors items-center shadow-sm">
                    <ExternalLink size={14} className="mr-2"/> Comparar Perfil
                 </button>
                 <button className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary-light shadow-md shadow-primary/20 transition-all transform active:scale-95">
                    Mover para Entrevista
                 </button>
             </div>
          </div>

          {/* Identity Section */}
          <div className="px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-start gap-8">
               {/* Avatar */}
               <div className="flex-shrink-0">
                   <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-3xl font-bold text-slate-500 dark:text-slate-400 border-4 border-white dark:border-slate-700 shadow-sm">
                        {candidate.name.substring(0,2)}
                   </div>
               </div>
               
               {/* Info Block */}
               <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                        {candidate.name}
                      </h1>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                          candidate.status === 'Entrevista' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800' :
                          'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800'
                      }`}>
                          {candidate.status}
                      </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500 dark:text-slate-400 mb-6">
                     <span className="flex items-center font-medium text-slate-700 dark:text-slate-300">
                        <Briefcase size={16} className="mr-1.5 text-slate-400" /> {candidate.role}
                     </span>
                     <span className="flex items-center">
                        <MapPin size={16} className="mr-1.5 text-slate-400" /> {candidate.location}
                     </span>
                     
                     {/* Contact Actions (Inline) */}
                     <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-700">
                        <button title="Copiar Email" className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-400 hover:text-primary transition-colors">
                            <Mail size={16} />
                        </button>
                        <button title="Ver Telefone" className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-400 hover:text-primary transition-colors">
                            <Phone size={16} />
                        </button>
                        <button title="LinkedIn" className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-400 hover:text-[#0077b5] transition-colors">
                            <Linkedin size={16} />
                        </button>
                     </div>
                  </div>

                  {/* CONTEXT TAGS */}
                  <div className="flex flex-wrap gap-2">
                     {candidate.tags?.map((tag: string) => (
                        <div key={tag} className="flex items-center px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/50 rounded-md text-xs font-semibold shadow-sm hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors cursor-help group relative">
                            <Award size={14} className="mr-1.5 text-indigo-500 dark:text-indigo-400" />
                            {tag}
                        </div>
                    ))}
                    <div className="flex items-center px-3 py-1.5 text-slate-400 text-xs font-medium border border-transparent">
                        + 2 Fatores neutros
                    </div>
                  </div>
               </div>
            </div>
          </div>
      </div>

      {/* 2. MAIN CONTENT FLOW */}
      <div className="space-y-8 pb-20">
          
          {/* SECTION A: ASSESSMENT & XAI */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
             {/* Score Gauge Card */}
             <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 relative overflow-hidden">
                 <div className="flex justify-between items-start mb-6">
                     <div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            Score de Competência Ajustado
                            <CheckCircle2 size={18} className="text-primary" />
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Análise combinada: Técnico (CV) + Contexto (Jornada)
                        </p>
                     </div>
                     <button className="text-xs font-medium text-primary border border-primary/30 px-3 py-1.5 rounded-full hover:bg-primary-pale dark:hover:bg-primary/20 transition-colors flex items-center">
                         <Download size={12} className="mr-2" /> Relatório XAI
                     </button>
                 </div>

                 <div className="flex flex-col md:flex-row gap-10 items-center">
                     {/* Chart */}
                     <div className="h-48 w-full md:w-1/2 relative flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy={140}
                                    startAngle={180}
                                    endAngle={0}
                                    innerRadius={80}
                                    outerRadius={110}
                                    paddingAngle={2}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <RechartsTooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute bottom-0 flex flex-col items-center text-center">
                            <span className="text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">
                                {candidate.score}
                                <span className="text-2xl text-slate-400 font-normal">/100</span>
                            </span>
                            <span className="text-sm font-bold text-primary uppercase tracking-wide mt-1">Potencial Alto</span>
                        </div>
                     </div>

                     {/* Legend & Breakdown */}
                     <div className="w-full md:w-1/2 space-y-4">
                        <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                             <div className="flex items-center">
                                 <div className="w-3 h-3 bg-slate-400 rounded-full mr-3"></div>
                                 <div>
                                     <span className="block text-sm font-bold text-slate-700 dark:text-slate-200">Score Técnico Bruto</span>
                                     <span className="text-xs text-slate-500">Baseado em testes e CV</span>
                                 </div>
                             </div>
                             <span className="text-xl font-bold text-slate-600 dark:text-slate-300">{candidate.rawScore}</span>
                         </div>
                         
                         <div className="flex justify-between items-center p-3 bg-primary-pale/30 dark:bg-primary/10 rounded-xl border border-primary/20 relative overflow-hidden">
                             <div className="absolute left-0 top-0 h-full w-1 bg-primary"></div>
                             <div className="flex items-center">
                                 <div className="w-3 h-3 bg-primary rounded-full mr-3 shadow-[0_0_8px_rgba(11,91,111,0.5)]"></div>
                                 <div>
                                     <span className="block text-sm font-bold text-primary dark:text-primary-light">Fator de Equidade (FE)</span>
                                     <span className="text-xs text-primary/80 dark:text-primary-light/70">Correção baseada em jornada</span>
                                 </div>
                             </div>
                             <span className="text-xl font-bold text-primary dark:text-primary-light">+{candidate.score - candidate.rawScore}</span>
                         </div>
                     </div>
                 </div>

                 <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex gap-4 items-start">
                         <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400 mt-1">
                            <Award size={20} />
                         </div>
                         <div>
                             <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Explicação da IA (XAI)</h4>
                             <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                                 O algoritmo detectou alta proficiência técnica (Top 15% do pool) considerando que a candidata teve <span className="font-semibold text-slate-800 dark:text-slate-200">menos tempo disponível para estudo</span> comparado à média. Isso indica <strong>alta curva de aprendizado</strong> e <strong>resiliência</strong> acima da média.
                             </p>
                         </div>
                    </div>
                 </div>
             </div>

             {/* Top Skills Panel */}
             <div className="lg:col-span-5 flex flex-col gap-6">
                 <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex-1">
                     <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                        <Star size={18} className="mr-2 text-amber-500" />
                        Top Competências
                     </h3>
                     <div className="flex flex-wrap gap-2 mb-6">
                        {skills.map(skill => (
                            <span key={skill} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors cursor-default">
                                {skill}
                            </span>
                        ))}
                        <span className="px-3 py-1.5 text-xs text-slate-400 font-medium border border-dashed border-slate-300 dark:border-slate-700 rounded-lg">
                            +4 outras
                        </span>
                     </div>

                     <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Sugestão de Entrevista</h4>
                     <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-sm text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700">
                        "Peça para Mariana explicar como ela aplicou <strong>System Design</strong> em seu último projeto freelance, focando na escalabilidade."
                     </div>
                 </div>
             </div>
          </section>

          {/* SECTION B: LIFE JOURNEY (Context Timeline) */}
          <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 overflow-hidden">
             <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Jornada & Contexto (Distance Traveled)</h2>
                <span className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">Dados fornecidos via questionário anonimizado</span>
             </div>
             
             <div className="relative pl-4">
                <div className="absolute left-24 top-4 bottom-4 w-0.5 bg-slate-200 dark:bg-slate-700"></div>

                <div className="space-y-8">
                    {/* Item 1 */}
                    <div className="relative flex items-start group">
                        <div className="absolute left-24 -ml-1.5 mt-1.5 w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600 ring-4 ring-white dark:ring-slate-900"></div>
                        <div className="w-20 flex-shrink-0 pt-1 pr-4 text-right">
                           <span className="text-sm font-bold text-slate-400">2015</span>
                        </div>
                        <div className="ml-10 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700 w-full hover:border-primary/30 transition-colors">
                            <div className="flex items-center mb-1">
                                <Home size={16} className="text-slate-400 mr-2" />
                                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Ensino Médio em Escola Pública</h4>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Zona Leste de SP. Conciliou estudos com trabalho informal para complementar renda familiar.
                            </p>
                            <div className="mt-2 flex items-center">
                                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-0.5 rounded">
                                    Top 5% da Turma
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="relative flex items-start group">
                         <div className="absolute left-24 -ml-1.5 mt-1.5 w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600 ring-4 ring-white dark:ring-slate-900"></div>
                        <div className="w-20 flex-shrink-0 pt-1 pr-4 text-right">
                           <span className="text-sm font-bold text-slate-400">2018</span>
                        </div>
                        <div className="ml-10 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700 w-full hover:border-primary/30 transition-colors">
                            <div className="flex items-center mb-1">
                                <GraduationCap size={16} className="text-slate-400 mr-2" />
                                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Ingresso na Universidade (Bolsista)</h4>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Primeira geração da família a ingressar no ensino superior. Bolsa integral por mérito (ProUni).
                            </p>
                             <div className="mt-2 flex gap-2">
                                <span className="text-[10px] font-bold text-primary dark:text-primary-light bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-primary/10">
                                    Resiliência
                                </span>
                                <span className="text-[10px] font-bold text-primary dark:text-primary-light bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-primary/10">
                                    Autodidata
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div className="relative flex items-start group">
                        <div className="absolute left-24 -ml-1.5 mt-1.5 w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600 ring-4 ring-white dark:ring-slate-900"></div>
                         <div className="w-20 flex-shrink-0 pt-1 pr-4 text-right">
                           <span className="text-sm font-bold text-slate-400">2021</span>
                        </div>
                         <div className="ml-10 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700 w-full hover:border-primary/30 transition-colors">
                            <div className="flex items-center mb-1">
                                <Briefcase size={16} className="text-slate-400 mr-2" />
                                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Transição para Tech</h4>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Bootcamp intensivo enquanto trabalhava em varejo. Desenvolveu 3 projetos full-stack em 6 meses.
                            </p>
                        </div>
                    </div>
                </div>
             </div>
          </section>

          {/* SECTION C: CV & EVIDENCE */}
          <section className="grid grid-cols-1 gap-6">
               <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
                  <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
                     <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                        <BookOpen size={18} className="mr-2 text-slate-500" />
                        Currículo Original (CV)
                     </h2>
                     <div className="flex gap-2">
                         <button className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors flex items-center shadow-sm">
                            <Download size={12} className="mr-1.5" /> PDF
                         </button>
                         <button className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors flex items-center shadow-sm">
                            <ExternalLink size={12} className="mr-1.5" /> Abrir
                         </button>
                     </div>
                  </div>
                  
                  {/* CV Preview Container */}
                  <div className="p-8 md:p-12 bg-slate-100 dark:bg-slate-950 flex justify-center overflow-hidden relative group">
                      <div className="w-full max-w-3xl bg-white shadow-xl border border-slate-200 p-10 md:p-16 aspect-[1/1.41] relative transition-transform duration-300 origin-top group-hover:scale-[1.01]">
                             
                             {/* Skeleton CV Content */}
                             <div className="flex justify-between items-start mb-12">
                                <div>
                                    <div className="h-8 w-48 bg-slate-800 mb-2"></div>
                                    <div className="h-4 w-64 bg-slate-400"></div>
                                </div>
                                <div className="h-12 w-12 bg-slate-200 rounded-full"></div>
                             </div>
                             
                             <div className="grid grid-cols-3 gap-12">
                                <div className="col-span-2 space-y-8">
                                    <div>
                                        <div className="h-4 w-32 bg-slate-200 mb-4 uppercase tracking-widest"></div>
                                        <div className="space-y-2">
                                            <div className="h-3 bg-slate-100 w-full"></div>
                                            <div className="h-3 bg-slate-100 w-full"></div>
                                            <div className="h-3 bg-slate-100 w-2/3"></div>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <div className="h-4 w-32 bg-slate-200 mb-4 uppercase tracking-widest"></div>
                                        <div className="space-y-6">
                                            <div>
                                                <div className="h-4 w-1/2 bg-slate-300 mb-2"></div>
                                                <div className="h-3 w-full bg-slate-100 mb-1"></div>
                                                <div className="h-3 w-full bg-slate-100"></div>
                                            </div>
                                            <div>
                                                <div className="h-4 w-1/2 bg-slate-300 mb-2"></div>
                                                <div className="h-3 w-full bg-slate-100 mb-1"></div>
                                                <div className="h-3 w-full bg-slate-100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="col-span-1 space-y-8 border-l border-slate-100 pl-8">
                                     <div>
                                        <div className="h-4 w-20 bg-slate-200 mb-4 uppercase"></div>
                                        <div className="space-y-2">
                                            <div className="h-3 bg-slate-100 w-full"></div>
                                            <div className="h-3 bg-slate-100 w-3/4"></div>
                                            <div className="h-3 bg-slate-100 w-full"></div>
                                        </div>
                                     </div>
                                </div>
                             </div>

                             {/* Hover Overlay */}
                             <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                                 <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow-lg text-xs font-bold text-slate-700 dark:text-slate-200">
                                     Clique para expandir
                                 </div>
                             </div>
                      </div>
                  </div>
               </div>
          </section>

      </div>
    </div>
  );
};

export default ProfileScreen;