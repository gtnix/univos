import React from 'react';
import { Calendar, TrendingUp, Users, Target, ArrowUpRight } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, Tooltip, XAxis } from 'recharts';

interface InsightsScreenProps {
  isDarkMode?: boolean;
}

const InsightsScreen: React.FC<InsightsScreenProps> = ({ isDarkMode = false }) => {
  
  const retentionData = [
    { name: 'Q1', legacy: 85, cee: 92 },
    { name: 'Q2', legacy: 84, cee: 94 },
    { name: 'Q3', legacy: 86, cee: 95 },
    { name: 'Q4', legacy: 82, cee: 96 },
  ];

  const diversityData = [
    { name: 'Grupo A', value: 35, color: '#0B5B6F' },
    { name: 'Grupo B', value: 25, color: '#15829E' },
    { name: 'Grupo C', value: 20, color: isDarkMode ? '#64748B' : '#64748B' },
    { name: 'Outros', value: 20, color: isDarkMode ? '#334155' : '#CBD5E1' },
  ];

  const tickColor = isDarkMode ? '#94A3B8' : '#64748B';
  const legacyBarColor = isDarkMode ? '#334155' : '#E2E8F0';

  return (
    <div className="h-full bg-slate-50 dark:bg-slate-950 p-8 flex flex-col transition-colors duration-300">
      {/* Executive Header */}
      <div className="flex justify-between items-center mb-8 bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Resultados Executivos: Q3 2024</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Impacto do UNIVOS na organização.</p>
        </div>
        <div className="flex gap-4">
            <div className="text-right">
                <p className="text-xs text-slate-400 uppercase">Tempo de Uso</p>
                <p className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1"><Calendar size={14} /> 6 Meses</p>
            </div>
            <div className="h-10 w-px bg-slate-200 dark:bg-slate-700"></div>
            <div className="text-right">
                 <p className="text-xs text-slate-400 uppercase">Contratações via UNIVOS</p>
                 <p className="font-semibold text-primary dark:text-primary-light">142 Talentos</p>
            </div>
        </div>
      </div>

      {/* Main Insights Grid */}
      <div className="grid grid-cols-2 gap-8 flex-1">
        
        {/* Insight 1: Retention */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col transition-colors duration-300">
            <div className="flex items-start justify-between mb-6">
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg text-indigo-600 dark:text-indigo-400">
                    <Target size={24} />
                </div>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full text-sm flex items-center">
                    <ArrowUpRight size={16} className="mr-1" /> +12% vs Benchmark
                </span>
            </div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">+18%</h2>
            <h3 className="text-lg font-medium text-slate-700 dark:text-slate-200 mb-2">Aumento na Retenção (90 dias)</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                Candidatos avaliados pelo contexto demonstraram maior lealdade e fit cultural do que aqueles selecionados apenas por pedigree acadêmico.
            </p>
            
            {/* Mini Chart */}
            <div className="flex-1 w-full h-32">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={retentionData}>
                        <Tooltip 
                          cursor={{fill: 'transparent'}} 
                          contentStyle={{
                              backgroundColor: isDarkMode ? '#1E293B' : '#FFF',
                              borderColor: isDarkMode ? '#334155' : '#CCC',
                              color: isDarkMode ? '#F1F5F9' : '#000'
                          }}
                        />
                        <Bar dataKey="cee" fill="#0B5B6F" radius={[4,4,0,0]} name="Contratados UNIVOS" />
                        <Bar dataKey="legacy" fill={legacyBarColor} radius={[4,4,0,0]} name="Benchmark Anterior" />
                         <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: tickColor}} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Insight 2: Performance Prediction */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col relative overflow-hidden transition-colors duration-300">
             <div className="flex items-start justify-between mb-6">
                <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg text-amber-600 dark:text-amber-400">
                    <TrendingUp size={24} />
                </div>
            </div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">2.5x</h2>
            <h3 className="text-lg font-medium text-slate-700 dark:text-slate-200 mb-2">Performance na Promoção</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                Talentos com alto "Fator de Equidade" foram promovidos 2.5x mais rápido que a média, validando a tese de que <span className="font-semibold text-primary dark:text-primary-light">distância percorrida = potencial futuro</span>.
            </p>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-4 mb-2 overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{width: '75%'}}></div>
            </div>
            <p className="text-xs text-slate-400 text-right">Confiança Estatística: 98%</p>
        </div>

        {/* Insight 3: Diversity Composition */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col transition-colors duration-300">
             <div className="flex items-start justify-between mb-6">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg text-emerald-600 dark:text-emerald-400">
                    <Users size={24} />
                </div>
            </div>
            <div className="flex gap-6">
                <div className="w-32 h-32 relative">
                     <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={diversityData} innerRadius={30} outerRadius={50} paddingAngle={5} dataKey="value">
                                {diversityData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">Div.</div>
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-medium text-slate-700 dark:text-slate-200 mb-2">Ampliação do Talent Pool</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Acesso a demografias anteriormente filtradas por "rejeição de faculdade de elite". O UNIVOS diversificou a entrada sem baixar a barra técnica.
                    </p>
                </div>
            </div>
        </div>

        {/* CTA Card */}
        <div className="bg-primary dark:bg-primary-light/90 p-8 rounded-xl shadow-lg flex flex-col justify-center items-center text-center relative overflow-hidden transition-colors duration-300">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <h2 className="text-2xl font-bold text-white mb-4 relative z-10">Pronto para escalar a equidade?</h2>
            <p className="text-primary-pale mb-8 relative z-10">Agende uma demonstração completa com seus dados anonimizados.</p>
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-slate-100 transition-colors relative z-10 shadow-lg">
                Solicitar Demo Personalizada
            </button>
        </div>

      </div>
    </div>
  );
};

export default InsightsScreen;