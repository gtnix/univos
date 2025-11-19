import React from 'react';
import { Search, AlertCircle, ChevronUp, Users, UserCheck, TrendingUp, Briefcase } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MOCK_CANDIDATES } from '../App';

interface DashboardScreenProps {
  isDarkMode?: boolean;
  onOpenCandidates: () => void;
  onSelectCandidate: (id: number) => void;
  onSelectJob: (id: string) => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ isDarkMode = false, onOpenCandidates, onSelectCandidate, onSelectJob }) => {
  const chartData = [
    { name: 'Eng. de Software', bruto: 65, ajustado: 82, id: 'job-eng' },
    { name: 'Analista de Dados', bruto: 70, ajustado: 85, id: 'job-data' },
    { name: 'Gerente de Produto', bruto: 55, ajustado: 78, id: 'job-pm' },
    { name: 'UX Designer', bruto: 60, ajustado: 80, id: 'job-ux' },
    { name: 'DevOps', bruto: 72, ajustado: 88, id: 'job-devops' },
  ];

  const topCandidates = MOCK_CANDIDATES.slice(0, 4);

  const tickColor = isDarkMode ? '#94A3B8' : '#64748B';
  const gridColor = isDarkMode ? '#1E293B' : '#E2E8F0';
  const tooltipBg = isDarkMode ? '#1E293B' : '#FFFFFF';
  const tooltipText = isDarkMode ? '#F1F5F9' : '#1E293B';

  return (
    // Removed h-full to allow natural scrolling within the App Shell
    <div className="flex flex-col gap-8">
      
      {/* Header - Simplified for Enterprise Look */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Visão geral de performance, equidade e pipeline de talentos.</p>
        </div>
        <div className="flex gap-3">
            <button 
              onClick={onOpenCandidates}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-lg text-sm font-medium flex items-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
                <Users size={16} className="mr-2" />
                Ver Todos Candidatos
            </button>
            <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-light transition-colors shadow-sm shadow-primary/20">
                + Nova Vaga
            </button>
        </div>
      </div>

      {/* KPI Cards - Grid adjusted for standard container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="Vagas Abertas" value="12" change="+2 nesta semana" icon={Briefcase} color="blue" isDarkMode={isDarkMode} />
        <KpiCard title="Diversidade Alcançada" value="42%" change="+5% vs meta" icon={UserCheck} color="emerald" isDarkMode={isDarkMode} />
        <KpiCard title="Retenção Projetada" value="94%" change="Alta confiança" icon={TrendingUp} color="indigo" isDarkMode={isDarkMode} />
        <KpiCard title="Alertas de Viés" value="3" change="Requer atenção" icon={AlertCircle} color="amber" isAlert isDarkMode={isDarkMode} />
      </div>

      {/* Main Content Grid - Optimized for 1440px max width */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Chart Section */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">Impacto do Fator de Equidade (FE) por Vaga</h3>
            <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Clique para detalhes</span>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barGap={8} onClick={(data: any) => { if (data && data.activePayload) onSelectJob('job-generic'); }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: tickColor, fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: tickColor, fontSize: 12}} />
                <Tooltip 
                    cursor={{fill: isDarkMode ? '#334155' : '#F1F5F9'}}
                    contentStyle={{
                        borderRadius: '8px', 
                        border: isDarkMode ? '1px solid #334155' : 'none', 
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        backgroundColor: tooltipBg,
                        color: tooltipText
                    }}
                    itemStyle={{ color: tooltipText }}
                    labelStyle={{ color: tooltipText }}
                />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
                <Bar name="Score Bruto (CV)" dataKey="bruto" fill={isDarkMode ? '#475569' : '#CBD5E1'} radius={[4, 4, 0, 0]} barSize={24} className="cursor-pointer hover:opacity-80" />
                <Bar name="Score Ajustado (CEE)" dataKey="ajustado" fill="#0B5B6F" radius={[4, 4, 0, 0]} barSize={24} className="cursor-pointer hover:opacity-80" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Candidate List Section */}
        <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex-1">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200">Top Candidatos</h3>
                    <button onClick={onOpenCandidates} className="text-primary text-xs font-bold uppercase tracking-wide hover:underline">
                        Ver Todos
                    </button>
                </div>
                
                <div className="space-y-3">
                    {topCandidates.map((candidate, index) => (
                        <div 
                            key={index} 
                            onClick={() => onSelectCandidate(candidate.id)}
                            className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg border border-transparent hover:border-slate-100 dark:hover:border-slate-700 transition-colors cursor-pointer group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 text-xs font-bold border border-slate-200 dark:border-slate-700">
                                    {candidate.name.split(' ').map(n => n[0]).join('').substring(0,2)}
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{candidate.name}</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{candidate.role}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">{candidate.score}</span>
                                    <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-1.5 py-0.5 rounded border border-emerald-100 dark:border-emerald-900/30">
                                        {candidate.boost}
                                    </span>
                                </div>
                                <span className="text-[10px] text-slate-400 uppercase tracking-wide">{candidate.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-xl flex gap-3 items-start">
                <div className="mt-0.5 text-blue-600 dark:text-blue-400"><AlertCircle size={18} /></div>
                <div>
                    <p className="text-sm text-blue-800 dark:text-blue-300 font-semibold">Insight de Equidade</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 leading-relaxed">O CEE identificou 2 candidatos de alta performance em pools sub-representados para a vaga de <strong>UX Designer</strong>.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const KpiCard = ({ title, value, change, icon: Icon, color, isAlert = false, isDarkMode }: any) => {
    const colorClasses: any = {
        blue: isDarkMode ? 'text-blue-400 bg-blue-900/30' : 'text-blue-600 bg-blue-50',
        emerald: isDarkMode ? 'text-emerald-400 bg-emerald-900/30' : 'text-emerald-600 bg-emerald-50',
        indigo: isDarkMode ? 'text-indigo-400 bg-indigo-900/30' : 'text-indigo-600 bg-indigo-50',
        amber: isDarkMode ? 'text-amber-400 bg-amber-900/30' : 'text-amber-600 bg-amber-50',
    };

    const textChangeColor = isAlert 
      ? (isDarkMode ? 'text-amber-400' : 'text-amber-600')
      : (isDarkMode ? 'text-emerald-400' : 'text-emerald-600');

    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-2.5 rounded-lg ${colorClasses[color] || 'bg-slate-100 dark:bg-slate-800'}`}>
                    <Icon size={20} />
                </div>
                {isAlert && <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></div>}
            </div>
            <div className="flex flex-col">
                <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">{title}</span>
                <div className="flex items-baseline mt-2 gap-2">
                    <span className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{value}</span>
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${isAlert ? 'bg-amber-50 dark:bg-amber-900/20' : 'bg-emerald-50 dark:bg-emerald-900/20'} ${textChangeColor}`}>{change}</span>
                </div>
            </div>
        </div>
    )
}

export default DashboardScreen;