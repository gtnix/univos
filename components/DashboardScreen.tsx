import React from 'react';
import { 
  AlertTriangle, 
  ArrowUpRight, 
  Briefcase, 
  Calendar, 
  ChevronRight, 
  Clock, 
  Filter, 
  Info, 
  Lightbulb, 
  Users, 
  Activity
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface DashboardScreenProps {
  isDarkMode?: boolean;
  onOpenCandidates: () => void;
  onSelectCandidate: (id: number) => void;
  onSelectJob: (id: string) => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ isDarkMode = false, onOpenCandidates, onSelectJob }) => {
  
  // 1. KPI Data
  const kpiData = {
    igre: 82, // Índice Geral de Recrutamento Ético
    igreChange: '+4.5%',
    tmiVulnerable: 18, // Dias
    tmiGeneral: 14, // Dias
    inclusiveJobs: 68, // %
    retentionRate: 94 // %
  };

  // 2. Funnel Data (Equity Drop-Off)
  const funnelData = [
    { stage: 'Candidatura', geral: 100, prioritario: 100 },
    { stage: 'Triagem IA', geral: 65, prioritario: 58 },
    { stage: 'Entrevista', geral: 35, prioritario: 22 }, // Drop-off point
    { stage: 'Oferta', geral: 15, prioritario: 8 },
  ];

  // 3. Hiring Trend Data
  const trendData = [
    { month: 'Jan', mulheres: 12, negros: 8, pcd: 2 },
    { month: 'Fev', mulheres: 15, negros: 10, pcd: 3 },
    { month: 'Mar', mulheres: 18, negros: 14, pcd: 3 },
    { month: 'Abr', mulheres: 22, negros: 13, pcd: 4 },
    { month: 'Mai', mulheres: 20, negros: 18, pcd: 5 },
    { month: 'Jun', mulheres: 28, negros: 22, pcd: 6 },
  ];

  // 4. Vulnerability Map Data (Now representing Hired Demographics)
  const vulnerabilityData = [
    { name: 'Mulheres Tech', value: 45, color: '#0B5B6F' },
    { name: 'Pessoas Negras', value: 32, color: '#15829E' },
    { name: 'Escola Pública', value: 28, color: '#2563EB' },
    { name: 'LGBTQIA+', value: 18, color: '#7C3AED' },
    { name: 'Pessoas 50+', value: 12, color: '#D97706' },
    { name: 'PCD', value: 8, color: '#059669' },
  ];
  
  // Calculate total for Pie Chart percentages
  const totalHires = vulnerabilityData.reduce((acc, curr) => acc + curr.value, 0);

  // 5. Low Equity Jobs
  const lowEquityJobs = [
    { id: 'job-1', title: 'Senior Backend Engineer', score: 42, gap: '-32%', status: 'Crítico' },
    { id: 'job-2', title: 'Director of Product', score: 55, gap: '-24%', status: 'Atenção' },
    { id: 'job-3', title: 'Lead UX Designer', score: 61, gap: '-15%', status: 'Atenção' },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 p-3 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl">
          <p className="text-sm font-bold text-slate-900 dark:text-white mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 mb-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
              <span>{entry.name}:</span>
              <span className="font-bold">{entry.value}{entry.unit || ''}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percent = ((data.value / totalHires) * 100).toFixed(1);
      return (
        <div className="bg-white dark:bg-slate-800 p-3 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl z-50">
          <div className="flex items-center gap-2 mb-2 border-b border-slate-100 dark:border-slate-700 pb-2">
             <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: data.color }}></div>
             <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide">{data.name}</span>
          </div>
          <div className="flex justify-between gap-6 text-xs">
             <span className="text-slate-500 dark:text-slate-400">Contratações:</span>
             <span className="font-mono font-bold text-slate-700 dark:text-slate-200">{data.value}</span>
          </div>
          <div className="flex justify-between gap-6 text-xs mt-1">
             <span className="text-slate-500 dark:text-slate-400">Share:</span>
             <span className="font-mono font-bold text-primary dark:text-primary-light">{percent}%</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-8 pb-10">
      
      {/* Header Strategic Context */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-primary/10 text-primary tracking-wider border border-primary/20">
              Enterprise View
            </span>
            <span className="text-xs text-slate-400">Atualizado hoje, 09:41</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Performance de Equidade & Inclusão
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm max-w-2xl">
            Monitoramento estratégico do <span className="font-semibold text-slate-700 dark:text-slate-300">UNIVOS™</span> sobre o pipeline de talentos.
          </p>
        </div>
        
        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
          <button className="flex items-center px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors">
            <Calendar size={14} className="mr-2 text-slate-400" />
            Q3 2024
          </button>
          <div className="w-px h-4 bg-slate-200 dark:bg-slate-700"></div>
          <button className="flex items-center px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors">
            <Filter size={14} className="mr-2 text-slate-400" />
            Todos os Departamentos
          </button>
        </div>
      </div>

      {/* SECTION 1: NORTH STAR METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* KPI 1: IGRE (Principal) */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-primary/30 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Activity size={64} className="text-primary" />
          </div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Índice de Recrutamento Ético</h3>
            <Info size={14} className="text-slate-300 cursor-help" />
          </div>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold text-slate-900 dark:text-white tracking-tighter">{kpiData.igre}</span>
            <span className="text-sm font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded mb-1 flex items-center border border-emerald-100 dark:border-emerald-800">
              <ArrowUpRight size={14} className="mr-1" /> {kpiData.igreChange}
            </span>
          </div>
          <div className="mt-4 w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{ width: `${kpiData.igre}%` }}></div>
          </div>
          <p className="text-xs text-slate-400 mt-2">Meta anual: 85</p>
        </div>

        {/* KPI 2: Pipeline Representation Drop-off (TMI) */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tempo Médio de Inclusão</h3>
            <Clock size={14} className="text-slate-300" />
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-slate-900 dark:text-white tracking-tighter">{kpiData.tmiVulnerable} <span className="text-base font-normal text-slate-500">dias</span></span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-2 rounded border border-amber-100 dark:border-amber-800/30">
            <AlertTriangle size={12} />
            <span>+4 dias vs. média geral ({kpiData.tmiGeneral} dias)</span>
          </div>
        </div>

        {/* KPI 3: Inclusive Opportunities */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Abertura de Oportunidades</h3>
            <Briefcase size={14} className="text-slate-300" />
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-slate-900 dark:text-white tracking-tighter">{kpiData.inclusiveJobs}%</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Das vagas ativas possuem critérios flexibilizados ou busca ativa por grupos sub-representados.
          </p>
        </div>

         {/* KPI 4: Retention */}
         <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Retenção de Diversidade</h3>
            <Users size={14} className="text-slate-300" />
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-slate-900 dark:text-white tracking-tighter">{kpiData.retentionRate}%</span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-1.5 py-0.5 rounded border border-emerald-100 dark:border-emerald-800">+2%</span>
          </div>
           <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Taxa de permanência após 12 meses de contratação via UNIVOS.
          </p>
        </div>
      </div>

      {/* SECTION 2: DEEP DIVE & ALERTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* CHART: Equity Drop-Off Funnel */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-200">Funil de Equidade (Equity Drop-off)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Comparativo de conversão entre Pipeline Geral vs. Grupos Prioritários</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center text-xs text-slate-500">
                <span className="w-2 h-2 rounded-full bg-slate-300 mr-1"></span> Geral
              </div>
              <div className="flex items-center text-xs text-slate-500">
                <span className="w-2 h-2 rounded-full bg-primary mr-1"></span> Prioritário
              </div>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} barSize={32} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#1E293B' : '#E2E8F0'} />
                <XAxis dataKey="stage" axisLine={false} tickLine={false} tick={{fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12}} unit="%" />
                <Tooltip cursor={{fill: 'transparent'}} content={<CustomTooltip />} />
                <Bar dataKey="geral" name="Geral" fill={isDarkMode ? '#334155' : '#CBD5E1'} radius={[4, 4, 0, 0]} />
                <Bar dataKey="prioritario" name="Prioritário" fill="#0B5B6F" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800/30 rounded-lg flex items-start gap-3">
             <AlertTriangle size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
             <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
               <strong>Ponto Crítico Detectado:</strong> A conversão de grupos prioritários cai drasticamente (<strong>-36%</strong>) entre a Triagem e a Entrevista Técnica. Isso sugere viés nos testes técnicos ou na seleção manual de gestores.
             </p>
          </div>
        </div>

        {/* ALERTS PANEL */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden">
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
            <h3 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              Alertas de Viés Ativos
              <span className="bg-red-100 text-red-600 text-[10px] px-1.5 py-0.5 rounded-full font-bold border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800">3</span>
            </h3>
          </div>
          <div className="p-4 flex flex-col gap-3 overflow-y-auto flex-1">
            
            {/* Alert 1 */}
            <div className="p-3 rounded-lg border border-red-100 bg-red-50 dark:bg-red-900/10 dark:border-red-800/30 group hover:shadow-md transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-bold uppercase text-red-600 dark:text-red-400 tracking-wide">Alta Criticidade</span>
                <ChevronRight size={14} className="text-red-400" />
              </div>
              <h4 className="text-sm font-bold text-red-900 dark:text-red-200 mb-1">Gargalo: Mulheres 50+</h4>
              <p className="text-xs text-red-700 dark:text-red-300 leading-snug">
                Têm <strong>68% menos chance</strong> de avançar da fase de triagem para entrevista na área de Engenharia.
              </p>
            </div>

            {/* Alert 2 */}
            <div className="p-3 rounded-lg border border-amber-100 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-800/30 group hover:shadow-md transition-all cursor-pointer">
               <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-bold uppercase text-amber-600 dark:text-amber-400 tracking-wide">Média Criticidade</span>
                <ChevronRight size={14} className="text-amber-400" />
              </div>
              <h4 className="text-sm font-bold text-amber-900 dark:text-amber-200 mb-1">Delay: Candidatos Negros</h4>
              <p className="text-xs text-amber-700 dark:text-amber-300 leading-snug">
                Recebem feedback final em média <strong>2.1 dias depois</strong> de candidatos brancos.
              </p>
            </div>

             {/* Alert 3 */}
             <div className="p-3 rounded-lg border border-slate-200 bg-white dark:bg-slate-800 dark:border-slate-700 group hover:shadow-md transition-all cursor-pointer">
               <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wide">Observação</span>
                <ChevronRight size={14} className="text-slate-400" />
              </div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Concentração Geográfica</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
                Candidatos de periferia estão concentrados em 90% nas vagas de nível Júnior.
              </p>
            </div>

          </div>
          <div className="p-3 border-t border-slate-100 dark:border-slate-800 text-center">
            <button className="text-xs font-medium text-primary hover:underline">Ver relatório completo de viés</button>
          </div>
        </div>
      </div>

      {/* SECTION 3: TRENDS & DISTRIBUTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         
         {/* TREND CHART */}
         <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="mb-6">
              <h3 className="font-bold text-slate-800 dark:text-slate-200">Evolução de Contratações Inclusivas</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Volume absoluto mensal por grupo identitário</p>
            </div>
            <div className="h-[250px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                     <defs>
                        <linearGradient id="colorMulheres" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#0B5B6F" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#0B5B6F" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorNegros" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#15829E" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#15829E" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#1E293B' : '#E2E8F0'} />
                     <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12}} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12}} />
                     <Tooltip cursor={{stroke: '#94a3b8', strokeWidth: 1}} content={<CustomTooltip />} />
                     <Area type="monotone" dataKey="mulheres" name="Mulheres" stroke="#0B5B6F" strokeWidth={2} fillOpacity={1} fill="url(#colorMulheres)" />
                     <Area type="monotone" dataKey="negros" name="Pessoas Negras" stroke="#15829E" strokeWidth={2} fillOpacity={1} fill="url(#colorNegros)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* DISTRIBUTION MAP (PIE CHART) */}
         <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
            <div className="mb-6">
              <h3 className="font-bold text-slate-800 dark:text-slate-200">Representatividade de Grupos Vulneráveis Contratados</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Período: <span className="font-semibold text-slate-700 dark:text-slate-300">Q3 2024</span></p>
            </div>
            
            <div className="flex-1 flex flex-col sm:flex-row items-center min-h-[250px]">
               {/* Chart */}
               <div className="h-[220px] w-full sm:w-1/2 relative flex items-center justify-center">
                   <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                         <Pie
                            data={vulnerabilityData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                         >
                            {vulnerabilityData.map((entry, index) => (
                               <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                         </Pie>
                         <Tooltip content={<CustomPieTooltip />} />
                      </PieChart>
                   </ResponsiveContainer>
                   {/* Inner Text (Total) */}
                   <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-2xl font-bold text-slate-800 dark:text-white leading-none">{totalHires}</span>
                        <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-1">Contratados</span>
                   </div>
               </div>

               {/* Custom Legend List */}
               <div className="w-full sm:w-1/2 mt-4 sm:mt-0 sm:pl-4 border-t sm:border-t-0 sm:border-l border-slate-100 dark:border-slate-800 pt-4 sm:pt-0">
                   <div className="space-y-2.5">
                       {vulnerabilityData.map((item, idx) => {
                           const percent = ((item.value / totalHires) * 100).toFixed(0);
                           return (
                               <div key={idx} className="flex justify-between items-center group cursor-default">
                                   <div className="flex items-center gap-2.5 overflow-hidden">
                                       <div className="w-2.5 h-2.5 rounded-full shadow-sm flex-shrink-0" style={{ backgroundColor: item.color }}></div>
                                       <span className="text-slate-600 dark:text-slate-300 font-medium text-xs truncate">{item.name}</span>
                                   </div>
                                   <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                                       <span className="text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">{item.value}</span>
                                       <span className="font-bold text-slate-700 dark:text-slate-200 text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 min-w-[36px] text-center">{percent}%</span>
                                   </div>
                               </div>
                           )
                       })}
                   </div>
               </div>
            </div>
         </div>
      </div>

      {/* SECTION 4: ACTIONABLE LISTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* LOW EQUITY JOBS TABLE */}
         <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
             <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <h3 className="font-bold text-slate-800 dark:text-slate-200">Vagas com Baixa Equidade</h3>
                <button onClick={onOpenCandidates} className="text-xs font-medium text-primary hover:underline">Ver todas as vagas</button>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left text-sm">
                 <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs uppercase text-slate-500 dark:text-slate-400">
                   <tr>
                     <th className="px-6 py-3 font-medium">Vaga</th>
                     <th className="px-6 py-3 font-medium">Score de Equidade</th>
                     <th className="px-6 py-3 font-medium">Gap de Representatividade</th>
                     <th className="px-6 py-3 font-medium">Status</th>
                     <th className="px-6 py-3 font-medium text-right">Ação</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                   {lowEquityJobs.map((job) => (
                     <tr key={job.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                       <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{job.title}</td>
                       <td className="px-6 py-4">
                         <div className="flex items-center gap-2">
                           <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                             <div className={`h-full rounded-full ${job.score < 50 ? 'bg-red-500' : 'bg-amber-500'}`} style={{width: `${job.score}%`}}></div>
                           </div>
                           <span className="text-xs font-bold">{job.score}/100</span>
                         </div>
                       </td>
                       <td className="px-6 py-4 text-red-500 font-medium">{job.gap}</td>
                       <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${job.status === 'Crítico' ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' : 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400'}`}>
                            {job.status}
                          </span>
                       </td>
                       <td className="px-6 py-4 text-right">
                         <button onClick={() => onSelectJob(job.id)} className="text-xs font-medium text-slate-500 hover:text-primary border border-slate-200 dark:border-slate-700 px-2 py-1 rounded bg-white dark:bg-slate-800 hover:bg-slate-50 transition-colors">
                            Investigar
                         </button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
         </div>

         {/* RECOMMENDATIONS LIST */}
         <div className="bg-indigo-900 dark:bg-slate-900 rounded-xl shadow-lg flex flex-col relative overflow-hidden text-white">
            {/* Decorative BG */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full filter blur-[60px] opacity-20 pointer-events-none"></div>
            
            <div className="p-6 border-b border-indigo-800/50">
               <h3 className="font-bold flex items-center gap-2">
                 <Lightbulb className="text-amber-400" size={18} />
                 Ações Recomendadas
               </h3>
               <p className="text-xs text-indigo-200 mt-1">Sugestões da IA para melhorar seu IGRE</p>
            </div>
            
            <div className="flex-1 p-6 space-y-4 overflow-y-auto">
              <div className="flex gap-3 items-start">
                 <div className="mt-0.5 bg-white/10 p-1 rounded text-indigo-200 shrink-0">
                    <CheckCircle2 size={14} />
                 </div>
                 <div>
                    <h4 className="text-sm font-bold text-white">Expandir Topo do Funil</h4>
                    <p className="text-xs text-indigo-200 mt-1 leading-relaxed opacity-80">
                      Aumentar alcance em escolas públicas para as vagas de Design. Candidatos deste pool performam 15% melhor em testes práticos.
                    </p>
                 </div>
              </div>
              
              <div className="w-full h-px bg-indigo-800/50"></div>

              <div className="flex gap-3 items-start">
                 <div className="mt-0.5 bg-white/10 p-1 rounded text-indigo-200 shrink-0">
                    <Filter size={14} />
                 </div>
                 <div>
                    <h4 className="text-sm font-bold text-white">Revisar Requisitos (Vaga #1)</h4>
                    <p className="text-xs text-indigo-200 mt-1 leading-relaxed opacity-80">
                      A exigência de "Inglês Fluente" está filtrando 60% dos candidatos negros qualificados tecnicamente. Considere mudar para "Técnico".
                    </p>
                 </div>
              </div>

               <div className="w-full h-px bg-indigo-800/50"></div>

               <div className="flex gap-3 items-start">
                 <div className="mt-0.5 bg-white/10 p-1 rounded text-indigo-200 shrink-0">
                    <Users size={14} />
                 </div>
                 <div>
                    <h4 className="text-sm font-bold text-white">Treinamento de Gestores</h4>
                    <p className="text-xs text-indigo-200 mt-1 leading-relaxed opacity-80">
                      Agendar workshop sobre viés inconsciente para a liderança de Engenharia.
                    </p>
                 </div>
              </div>
            </div>
         </div>

      </div>
    </div>
  );
};

// Extra import for recommendations check icon, kept consistent with rest of file logic if present or not
// Assuming CheckCircle2 is imported from Lucide at the top. Adding it if missing in original file scope but it's used in JSX.
// Re-checking imports: Yes, `CheckCircle2` was used in the original file but missed in my top import list reconstruction.
// I will add it now to be safe.
import { CheckCircle2 } from 'lucide-react';

export default DashboardScreen;