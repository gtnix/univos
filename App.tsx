import React, { useState } from 'react';
import { Layout, Monitor, Users, FileText, ShieldCheck, BarChart3, Moon, Sun, Menu, Bell, Search, Settings, LogOut, ChevronRight } from 'lucide-react';
import HeroScreen from './components/HeroScreen';
import DashboardScreen from './components/DashboardScreen';
import QuestionnaireScreen from './components/QuestionnaireScreen';
import ProfileScreen from './components/ProfileScreen';
import XAIScreen from './components/XAIScreen';
import InsightsScreen from './components/InsightsScreen';
import JobDetailScreen from './components/JobDetailScreen';
import CandidatesPanel from './components/CandidatesPanel';
import CandidatesScreen from './components/CandidatesScreen';

export enum ScreenType {
  HERO = 'HERO',
  DASHBOARD = 'DASHBOARD',
  QUESTIONNAIRE = 'QUESTIONNAIRE',
  PROFILE = 'PROFILE',
  CANDIDATES_LIST = 'CANDIDATES_LIST',
  XAI = 'XAI',
  INSIGHTS = 'INSIGHTS',
  JOB_DETAIL = 'JOB_DETAIL'
}

// Re-exporting Mock Data for usage in children
export const MOCK_CANDIDATES = [
  { id: 1, name: 'Mariana Silva', role: 'Senior Frontend Dev', score: 89, rawScore: 75, boost: '+14%', source: 'LinkedIn', status: 'Entrevista', tags: ['Primeira Geração', 'Mãe Solo'], email: 'mariana.silva@exemplo.com', location: 'São Paulo, SP (Zona Leste)' },
  { id: 2, name: 'João Paulo Costa', role: 'Senior Frontend Dev', score: 87, rawScore: 69, boost: '+18%', source: 'Indicação', status: 'Triagem', tags: ['Periferia', 'Escola Pública'], email: 'joao.costa@exemplo.com', location: 'Osasco, SP' },
  { id: 3, name: 'Aline Santos', role: 'Senior Frontend Dev', score: 85, rawScore: 75, boost: '+10%', source: 'Gupy', status: 'Teste Técnico', tags: ['Mulher Tech', 'Transição Carreira'], email: 'aline.santos@exemplo.com', location: 'Recife, PE' },
  { id: 4, name: 'Carlos Mendes', role: 'Senior Frontend Dev', score: 82, rawScore: 77, boost: '+5%', source: 'LinkedIn', status: 'Triagem', tags: ['Pai Atípico'], email: 'carlos.m@exemplo.com', location: 'São Paulo, SP' },
  { id: 5, name: 'Beatriz Oliveira', role: 'UX Designer', score: 91, rawScore: 80, boost: '+11%', source: 'Indicação', status: 'Entrevista', tags: ['Mulher Negra', 'Liderança Comunitária'], email: 'bia.ux@exemplo.com', location: 'Salvador, BA' },
  { id: 6, name: 'Roberto Almeida', role: 'DevOps Engineer', score: 78, rawScore: 60, boost: '+18%', source: 'Site', status: 'Novo', tags: ['Reintegração', ' >50 Anos'], email: 'beto.alm@exemplo.com', location: 'Curitiba, PR' },
];

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>(ScreenType.HERO);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true); // Default to Dark for High-Tech feel
  
  const [isCandidatePanelOpen, setIsCandidatePanelOpen] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const handleCandidateClick = (id: number) => {
    setSelectedCandidateId(id);
    setCurrentScreen(ScreenType.PROFILE);
    setIsCandidatePanelOpen(false);
  };

  const handleJobClick = (jobId: string) => {
    setSelectedJobId(jobId);
    setCurrentScreen(ScreenType.JOB_DETAIL);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case ScreenType.HERO: return <HeroScreen onNext={() => setCurrentScreen(ScreenType.DASHBOARD)} isDarkMode={isDarkMode} />;
      case ScreenType.DASHBOARD: 
        return <DashboardScreen 
          isDarkMode={isDarkMode} 
          onOpenCandidates={() => setCurrentScreen(ScreenType.CANDIDATES_LIST)}
          onSelectCandidate={handleCandidateClick}
          onSelectJob={handleJobClick}
        />;
      case ScreenType.QUESTIONNAIRE: return <QuestionnaireScreen isDarkMode={isDarkMode} />;
      case ScreenType.CANDIDATES_LIST: 
          return <CandidatesScreen isDarkMode={isDarkMode} onSelectCandidate={handleCandidateClick} />;
      case ScreenType.PROFILE: 
        return <ProfileScreen 
          isDarkMode={isDarkMode} 
          candidateId={selectedCandidateId} 
          onBack={() => setCurrentScreen(ScreenType.CANDIDATES_LIST)} 
        />;
      case ScreenType.XAI: return <XAIScreen isDarkMode={isDarkMode} />;
      case ScreenType.INSIGHTS: return <InsightsScreen isDarkMode={isDarkMode} />;
      case ScreenType.JOB_DETAIL: 
        return <JobDetailScreen 
          isDarkMode={isDarkMode} 
          jobId={selectedJobId} 
          onBack={() => setCurrentScreen(ScreenType.DASHBOARD)}
          onViewCandidates={() => setCurrentScreen(ScreenType.CANDIDATES_LIST)}
        />;
      default: return <HeroScreen onNext={() => setCurrentScreen(ScreenType.DASHBOARD)} isDarkMode={isDarkMode} />;
    }
  };

  const navItems = [
    { id: ScreenType.HERO, label: 'Overview', icon: Layout },
    { id: ScreenType.DASHBOARD, label: 'Command Center', icon: Monitor },
    { id: ScreenType.QUESTIONNAIRE, label: 'Pipeline Input', icon: FileText },
    { id: ScreenType.CANDIDATES_LIST, label: 'Talent Pool', icon: Users },
    { id: ScreenType.XAI, label: 'AI Audit Log', icon: ShieldCheck },
    { id: ScreenType.INSIGHTS, label: 'Intelligence', icon: BarChart3 },
  ];

  // Hero is full screen landing page style
  if (currentScreen === ScreenType.HERO) {
    return (
       // We don't need the surrounding div for dark mode here, Hero handles it
       renderScreen()
    );
  }

  return (
    <div className={`${isDarkMode ? 'dark' : ''} flex h-screen bg-void font-sans overflow-hidden selection:bg-primary selection:text-void`}>
      
      {/* 1. TECH SIDEBAR */}
      <aside className="w-64 bg-surface border-r border-surface-highlight flex-shrink-0 hidden md:flex flex-col z-20">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-surface-highlight bg-surface/50 backdrop-blur-sm">
          <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary-dark rounded-sm flex items-center justify-center mr-3 shadow-[0_0_10px_rgba(56,189,248,0.3)]">
             <span className="font-mono font-bold text-white text-xs">UV</span>
          </div>
          <span className="font-bold text-slate-100 tracking-tight">UNIVOS<span className="text-primary">.AI</span></span>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          <div className="px-3 mb-3 text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-wider">System Modules</div>
          {navItems.map((item) => {
             const isActive = currentScreen === item.id || (currentScreen === ScreenType.PROFILE && item.id === ScreenType.CANDIDATES_LIST) || (currentScreen === ScreenType.JOB_DETAIL && item.id === ScreenType.DASHBOARD);
             const Icon = item.icon;
             return (
               <button
                 key={item.id}
                 onClick={() => setCurrentScreen(item.id)}
                 className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-200 group
                   ${isActive 
                     ? 'bg-primary/10 text-primary border border-primary/20 shadow-[inset_0_0_10px_rgba(56,189,248,0.1)]' 
                     : 'text-slate-400 hover:bg-surface-highlight hover:text-slate-200 border border-transparent'
                   }`}
               >
                 <div className="flex items-center">
                    <Icon size={18} className={`mr-3 ${isActive ? 'text-primary' : 'text-slate-500 group-hover:text-slate-300'}`} />
                    {item.label}
                 </div>
                 {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_5px_#38bdf8]"></div>}
               </button>
             );
          })}

          <div className="px-3 mt-8 mb-3 text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-wider">System Config</div>
          <button className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-slate-400 hover:bg-surface-highlight hover:text-slate-200 transition-colors">
             <Settings size={18} className="mr-3 text-slate-500" />
             Preferences
          </button>
        </nav>

        {/* Footer User */}
        <div className="p-4 border-t border-surface-highlight bg-surface-highlight/30">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 flex items-center justify-center font-mono font-bold text-xs text-slate-300">
                 JD
              </div>
              <div className="flex-1 overflow-hidden">
                 <p className="text-sm font-medium text-slate-200 truncate">Jane Doe</p>
                 <p className="text-[10px] font-mono text-slate-500 truncate">ADMIN_ACCESS</p>
              </div>
              <LogOut size={14} className="text-slate-500 cursor-pointer hover:text-slate-300" />
           </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-void text-slate-200 relative">
        {/* Background Grid for whole app */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>

        {/* Header */}
        <header className="h-16 bg-surface/80 backdrop-blur-md border-b border-surface-highlight flex items-center justify-between px-6 sticky top-0 z-10 flex-shrink-0">
            <div className="flex items-center md:hidden">
              <Menu size={24} className="text-slate-400 mr-4" />
              <span className="font-bold text-slate-100">UNIVOS</span>
            </div>
            
            {/* Search Bar High Tech */}
            <div className="hidden md:flex items-center max-w-md w-full">
               <div className="relative w-full group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-primary transition-colors" size={14} />
                  <input 
                    type="text" 
                    placeholder="Search database..." 
                    className="w-full pl-9 pr-4 py-1.5 text-sm bg-void border border-surface-highlight rounded-md focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-slate-600 text-white font-mono text-xs"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                      <span className="text-[10px] text-slate-600 border border-slate-700 px-1 rounded bg-surface-highlight">⌘K</span>
                  </div>
               </div>
            </div>

            <div className="flex items-center gap-4">
               <button 
                 onClick={() => setIsDarkMode(!isDarkMode)}
                 className="p-2 text-slate-500 hover:text-primary transition-colors"
               >
                  {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
               </button>
               <div className="h-4 w-px bg-surface-highlight"></div>
               <button className="relative p-2 text-slate-500 hover:text-primary transition-colors">
                  <Bell size={18} />
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_5px_#38bdf8]"></span>
               </button>
            </div>
        </header>

        {/* Main Scrollable */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 scroll-smooth relative z-0">
           <div className="max-w-[1600px] mx-auto w-full h-full">
              {renderScreen()}
           </div>
        </main>
      </div>

      {/* Overlay Panel */}
      <CandidatesPanel 
        isOpen={isCandidatePanelOpen} 
        onClose={() => setIsCandidatePanelOpen(false)} 
        onSelectCandidate={handleCandidateClick}
        candidates={MOCK_CANDIDATES}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default App;