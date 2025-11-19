import React, { useState } from 'react';
import { Layout, Monitor, Users, FileText, ShieldCheck, BarChart3, Moon, Sun, Menu, Bell, Search, Settings, LogOut } from 'lucide-react';
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
  CANDIDATES_LIST = 'CANDIDATES_LIST', // New Screen Type
  XAI = 'XAI',
  INSIGHTS = 'INSIGHTS',
  JOB_DETAIL = 'JOB_DETAIL'
}

// Mock Data Shared Across Components
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
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  
  // Advanced Navigation State
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
      case ScreenType.CANDIDATES_LIST: // New Route Case
          return <CandidatesScreen isDarkMode={isDarkMode} onSelectCandidate={handleCandidateClick} />;
      case ScreenType.PROFILE: 
        return <ProfileScreen 
          isDarkMode={isDarkMode} 
          candidateId={selectedCandidateId} 
          onBack={() => setCurrentScreen(ScreenType.CANDIDATES_LIST)} // Back goes to list now
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
    { id: ScreenType.HERO, label: 'Visão Geral', icon: Layout },
    { id: ScreenType.DASHBOARD, label: 'Dashboard', icon: Monitor },
    { id: ScreenType.QUESTIONNAIRE, label: 'Fluxo de Vaga', icon: FileText },
    { id: ScreenType.CANDIDATES_LIST, label: 'Candidatos', icon: Users }, // Updated ID
    { id: ScreenType.XAI, label: 'Auditoria IA', icon: ShieldCheck },
    { id: ScreenType.INSIGHTS, label: 'Relatórios', icon: BarChart3 },
  ];

  // If Hero Screen, render full width without shell
  if (currentScreen === ScreenType.HERO) {
    return (
      <div className={`${isDarkMode ? 'dark' : ''}`}>
        {renderScreen()}
      </div>
    );
  }

  return (
    <div className={`${isDarkMode ? 'dark' : ''} flex h-screen bg-slate-50 dark:bg-slate-950 font-inter transition-colors duration-300`}>
      
      {/* 1. ENTERPRISE SIDEBAR (Fixed Left) */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-shrink-0 hidden md:flex flex-col z-20 transition-colors duration-300">
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-slate-100 dark:border-slate-800">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3 shadow-sm">
             <span className="text-white font-bold text-sm">UV</span>
          </div>
          <span className="font-bold text-slate-800 dark:text-slate-100 tracking-tight">UNIVOS</span>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          <div className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Menu Principal</div>
          {navItems.map((item) => {
             // Active logic handles the "Profile" being a child of "Candidates List" visually
             const isActive = currentScreen === item.id || (currentScreen === ScreenType.PROFILE && item.id === ScreenType.CANDIDATES_LIST) || (currentScreen === ScreenType.JOB_DETAIL && item.id === ScreenType.DASHBOARD);
             const Icon = item.icon;
             return (
               <button
                 key={item.id}
                 onClick={() => setCurrentScreen(item.id)}
                 className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 group
                   ${isActive 
                     ? 'bg-primary/10 text-primary dark:text-primary-light' 
                     : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                   }`}
               >
                 <Icon size={18} className={`mr-3 ${isActive ? 'text-primary dark:text-primary-light' : 'text-slate-400 group-hover:text-slate-600'}`} />
                 {item.label}
               </button>
             );
          })}

          <div className="px-3 mt-8 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Configurações</div>
          <button className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
             <Settings size={18} className="mr-3 text-slate-400" />
             Preferências
          </button>
        </nav>

        {/* User & Theme Toggle Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
           <div className="flex items-center justify-between mb-4">
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors w-full flex items-center justify-center text-xs font-medium"
              >
                {isDarkMode ? <><Sun size={14} className="mr-2" /> Light Mode</> : <><Moon size={14} className="mr-2" /> Dark Mode</>}
              </button>
           </div>
           <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                 JD
              </div>
              <div className="flex-1 overflow-hidden">
                 <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">Jane Doe</p>
                 <p className="text-xs text-slate-400 truncate">Head of People</p>
              </div>
              <LogOut size={16} className="text-slate-400 cursor-pointer hover:text-slate-600" />
           </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA (Shell) */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        
        {/* Global Topbar (Mobile Menu + Context) */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 md:px-8 sticky top-0 z-10 flex-shrink-0">
            <div className="flex items-center md:hidden">
              <Menu size={24} className="text-slate-600 dark:text-slate-300 mr-4" />
              <span className="font-bold text-slate-800 dark:text-slate-100">UNIVOS</span>
            </div>
            
            {/* Context Breadcrumb or Search */}
            <div className="hidden md:flex items-center max-w-md w-full">
               <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Pesquisar candidato, vaga ou skill..." 
                    className="w-full pl-10 pr-4 py-1.5 text-sm bg-slate-100 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-900 border focus:border-primary rounded-md focus:ring-0 transition-all placeholder:text-slate-400 text-slate-900 dark:text-white"
                  />
               </div>
            </div>

            <div className="flex items-center gap-4">
               <button className="relative p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                  <Bell size={20} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
               </button>
            </div>
        </header>

        {/* 3. UNIFIED SCROLLABLE CONTAINER */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 scroll-smooth">
           {/* This is the MAGIC CONTAINER that unifies all screens */}
           <div className="max-w-[1440px] mx-auto w-full">
              {renderScreen()}
           </div>
        </main>
      </div>

      {/* Side Panel Overlay for Candidates (Optional Quick View) */}
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