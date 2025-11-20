import React, { useEffect, useState } from 'react';
import { ArrowRight, Play, CheckCircle2, TrendingUp, ShieldCheck, Users, ChevronDown, Search, Cpu, BarChart3, Zap } from 'lucide-react';
import { ContextualPulse, NeuralLattice } from './HeroVisual';

interface HeroScreenProps {
  onNext: () => void;
  isDarkMode?: boolean;
}

// Micro-component for the "Live HR Data" animation - Now in Portuguese
const ProcessingBadge = () => {
    const messages = [
        "ANALISANDO CONTEXTO...",
        "NORMALIZANDO DADOS...",
        "DETECTANDO POTENCIAL...",
        "VALIDANDO SOFT SKILLS...",
        "REDUZINDO VIÉS..."
    ];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % messages.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
            <div className="relative w-2 h-2">
                <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
                <div className="relative w-2 h-2 bg-emerald-500 rounded-full"></div>
            </div>
            <span className="text-[10px] font-mono font-medium text-slate-300 tracking-widest w-[180px] text-left">
                {messages[index]}
            </span>
        </div>
    );
};

const HeroScreen: React.FC<HeroScreenProps> = ({ onNext }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#020203] text-slate-300 font-sans selection:bg-primary/30 selection:text-white relative overflow-x-hidden">
      
      {/* AMBIENT LIGHTING - "Aurora" Effect to kill the black void */}
      <div className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-indigo-900/20 blur-[120px] rounded-full pointer-events-none z-0 opacity-60 mix-blend-screen"></div>
      <div className="fixed top-[20%] left-[10%] w-[600px] h-[600px] bg-primary/5 blur-[100px] rounded-full pointer-events-none z-0 opacity-40"></div>
      
      {/* 1. CINEMATIC NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${scrolled ? 'bg-[#020203]/90 backdrop-blur-md border-white/5 py-3 shadow-lg' : 'bg-transparent border-transparent py-6'}`}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center">
           <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-8 h-8 bg-gradient-to-br from-slate-800 to-black border border-white/10 flex items-center justify-center rounded-lg shadow-sm group-hover:border-primary/50 transition-colors">
                 <div className="w-3 h-3 bg-primary rounded-sm"></div>
              </div>
              <span className="font-sans font-bold text-lg text-white tracking-tight group-hover:text-slate-200 transition-colors">UNIVOS<span className="text-primary">.AI</span></span>
           </div>

           <div className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-400">
              <a href="#platform" className="hover:text-white transition-colors">Plataforma</a>
              <a href="#solutions" className="hover:text-white transition-colors">Soluções</a>
              <a href="#impact" className="hover:text-white transition-colors">Impacto</a>
              <a href="#pricing" className="hover:text-white transition-colors">Empresas</a>
           </div>

           <div className="flex items-center gap-4">
               <button className="hidden md:block text-xs font-bold text-white uppercase tracking-wider hover:text-primary transition-colors">
                   Login
               </button>
               <button 
                 onClick={onNext}
                 className="px-5 py-2.5 bg-white text-[#020203] hover:bg-slate-200 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
               >
                 Acessar Console
               </button>
           </div>
        </div>
      </nav>

      {/* 2. HERO SECTION: Emotional & Immediate */}
      <section className="relative min-h-screen flex flex-col justify-center pt-24 md:pt-32 z-10">
         
         <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: The Pitch (Human & Emotional) */}
            <div className="lg:col-span-7 relative z-20 flex flex-col justify-center">
                
                {/* Dynamic Badge - Immediately Visible */}
                <div className="mb-8 animate-fade-in">
                    <ProcessingBadge />
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-white leading-[1.1] tracking-tight mb-6">
                   Tecnologia que reconhece <br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-slate-400">
                     o potencial humano.
                   </span>
                </h1>

                <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mb-10">
                   A UNIVOS aplica inteligência artificial ética para revelar talentos que antes eram invisíveis. Transforme seus processos de recrutamento com dados que respeitam a <strong className="text-white font-medium">Distância Percorrida</strong> e a história real de cada candidato.
                </p>

                <div className="flex flex-wrap gap-4">
                   <button onClick={onNext} className="flex items-center px-8 py-4 bg-primary hover:bg-primary-light text-white rounded-lg text-sm font-bold tracking-wide transition-all shadow-[0_0_30px_rgba(56,189,248,0.2)] hover:shadow-[0_0_40px_rgba(56,189,248,0.4)] transform hover:-translate-y-0.5">
                      Agendar Demonstração <ArrowRight size={16} className="ml-2" />
                   </button>
                   
                   <button className="flex items-center px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg text-sm font-bold tracking-wide transition-all">
                      <Play size={16} className="mr-2 fill-current" />
                      Ver Como Funciona
                   </button>
                </div>

                {/* Trust Indicators */}
                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col gap-4">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">CONFIADO POR EQUIPES DE RH INOVADORAS</span>
                    <div className="flex gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Logo placeholders - cleaner */}
                        <div className="h-6 w-20 bg-white/20 rounded mix-blend-overlay"></div>
                        <div className="h-6 w-24 bg-white/20 rounded mix-blend-overlay"></div>
                        <div className="h-6 w-16 bg-white/20 rounded mix-blend-overlay"></div>
                        <div className="h-6 w-20 bg-white/20 rounded mix-blend-overlay"></div>
                    </div>
                </div>
            </div>

            {/* Right: The Visual (Contextual Pulse) */}
            <div className="lg:col-span-5 relative h-[600px] flex items-center justify-center">
                <ContextualPulse />
                
                {/* Floating Metric Card - "Apple-like" glassmorphism */}
                <div className="absolute bottom-8 -left-8 bg-slate-900/80 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl animate-float-custom max-w-[240px]">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                            <Zap size={18} strokeWidth={2.5} />
                        </div>
                        <div>
                            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">MATCH CONTEXTUAL</div>
                            <div className="text-lg font-bold text-white">Alta Precisão</div>
                        </div>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        O algoritmo identificou resiliência acima da média neste perfil.
                    </p>
                </div>
            </div>
         </div>

         {/* Scroll Hint */}
         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 animate-bounce opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
            <span className="text-[9px] font-mono tracking-widest">EXPLORE O MOTOR</span>
            <ChevronDown size={16} />
         </div>
      </section>

      {/* 3. PROBLEM: The Opportunity Gap */}
      <section id="platform" className="py-32 relative border-t border-white/5 bg-[#050508]">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
              <div className="text-center max-w-3xl mx-auto mb-20">
                  <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight">
                      O currículo conta apenas <br/> <span className="text-slate-500">metade da história.</span>
                  </h2>
                  <p className="text-lg text-slate-400 leading-relaxed">
                      Filtros tradicionais de ATS descartam talentos de alto potencial simplesmente porque eles não se encaixam no "padrão". A UNIVOS adiciona a camada de contexto que faltava.
                  </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Card 1 */}
                  <div className="p-8 rounded-2xl bg-[#0f1014] border border-white/5 hover:border-primary/20 transition-colors group">
                      <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-6 text-slate-400 group-hover:text-primary group-hover:scale-110 transition-all shadow-inner">
                          <Search size={24} />
                      </div>
                      <h3 className="text-xl font-medium text-white mb-3">Análise Contextual Profunda</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                          Enriquecemos os dados do CV com marcadores socioeconômicos para entender a *dificuldade* das conquistas, não apenas o resultado final.
                      </p>
                  </div>

                  {/* Card 2 - Highlighted */}
                  <div className="p-8 rounded-2xl bg-gradient-to-b from-[#13141a] to-[#0f1014] border border-white/10 hover:border-primary/40 transition-colors group relative overflow-hidden shadow-2xl">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150"></div>
                      <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-6 text-slate-400 group-hover:text-primary group-hover:scale-110 transition-all relative z-10 shadow-inner">
                          <ShieldCheck size={24} />
                      </div>
                      <h3 className="text-xl font-medium text-white mb-3 relative z-10">Redução de Viés Estrutural</h3>
                      <p className="text-sm text-slate-400 leading-relaxed relative z-10">
                          Nossa IA bloqueia identificadores demográficos enquanto destaca a "Distância Percorrida"—um preditor comprovado de grit e adaptabilidade.
                      </p>
                  </div>

                  {/* Card 3 */}
                  <div className="p-8 rounded-2xl bg-[#0f1014] border border-white/5 hover:border-primary/20 transition-colors group">
                      <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-6 text-slate-400 group-hover:text-primary group-hover:scale-110 transition-all shadow-inner">
                          <Users size={24} />
                      </div>
                      <h3 className="text-xl font-medium text-white mb-3">Meritocracia Real</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                          Compare um candidato de escola pública que trabalhou dois turnos com um graduado de elite em um campo de jogo verdadeiramente nivelado.
                      </p>
                  </div>
              </div>
          </div>
      </section>

      {/* 4. THE ENGINE: Solution & Methodology */}
      <section id="solutions" className="py-32 bg-[#020203] border-t border-white/5 relative overflow-hidden">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              
              {/* Visual */}
              <div className="h-[500px] w-full relative bg-[#0f1014] rounded-2xl border border-white/5 overflow-hidden flex flex-col shadow-2xl">
                  <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                      <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Motor UNIVOS v2.4</div>
                      <div className="flex gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                          <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                      </div>
                  </div>
                  <div className="flex-1 relative">
                       <NeuralLattice />
                       {/* Overlay Data */}
                       <div className="absolute bottom-8 left-8 right-8 bg-slate-900/90 backdrop-blur-md border border-white/10 p-5 rounded-xl flex justify-between items-center shadow-lg">
                           <div>
                               <div className="text-xs text-slate-400 mb-1">Output: Score de Mérito</div>
                               <div className="text-2xl font-mono font-bold text-white tracking-tight">98/100</div>
                           </div>
                           <div className="text-right">
                               <div className="text-xs text-slate-400 mb-1">Confiabilidade</div>
                               <div className="text-emerald-400 font-mono text-sm font-bold bg-emerald-500/10 px-2 py-1 rounded">ALTA</div>
                           </div>
                       </div>
                  </div>
              </div>

              {/* Text */}
              <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-wider mb-6">
                     <Cpu size={12} /> Tecnologia Proprietária
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
                      Como calculamos a <br/>
                      <span className="text-primary">Distância Percorrida.</span>
                  </h2>
                  <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                      Nosso motor ingere dados brutos e os cruza com índices socioeconômicos anonimizados. Calculamos a "fricção" que um candidato superou—transformando adversidade em uma métrica mensurável de resiliência.
                  </p>
                  
                  <div className="space-y-8">
                      <div className="flex gap-5 items-start group">
                          <div className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-white font-bold text-sm group-hover:border-primary/50 group-hover:text-primary transition-colors">1</div>
                          <div>
                              <h4 className="text-white font-bold text-lg">Ingestão Cega (Blind Ingestion)</h4>
                              <p className="text-sm text-slate-500 mt-2 leading-relaxed">Dados PII são removidos imediatamente. Fotos, nomes e endereços são ocultados para focar na competência.</p>
                          </div>
                      </div>
                      <div className="flex gap-5 items-start group">
                          <div className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-white font-bold text-sm group-hover:border-primary/50 group-hover:text-primary transition-colors">2</div>
                          <div>
                              <h4 className="text-white font-bold text-lg">Camadas de Contexto</h4>
                              <p className="text-sm text-slate-500 mt-2 leading-relaxed">Cruzamos CEPs e dados escolares com índices econômicos históricos para entender o ponto de partida.</p>
                          </div>
                      </div>
                      <div className="flex gap-5 items-start group">
                          <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-[0_0_15px_rgba(56,189,248,0.3)]">3</div>
                          <div>
                              <h4 className="text-white font-bold text-lg">Score de Equidade</h4>
                              <p className="text-sm text-slate-500 mt-2 leading-relaxed">Uma pontuação ajustada é produzida, iluminando high-performers que eram invisíveis aos filtros comuns.</p>
                          </div>
                      </div>
                  </div>
              </div>

          </div>
      </section>

      {/* 5. METRICS: The Business Case */}
      <section id="impact" className="py-32 bg-[#050508] border-t border-white/5">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                  <div className="lg:col-span-4">
                      <h2 className="text-4xl font-serif text-white mb-6">Impacto em números.</h2>
                      <p className="text-slate-400 mb-8 leading-relaxed">
                          Justiça social não é apenas ética; é uma vantagem competitiva. Empresas que usam UNIVOS veem melhorias imediatas em retenção e performance de equipe.
                      </p>
                      <button className="text-primary text-sm font-bold uppercase tracking-wider flex items-center hover:text-white transition-colors group">
                          Ler Relatório de ROI <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                  </div>

                  <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="p-8 bg-[#0f1014] border border-white/5 rounded-2xl hover:border-emerald-500/20 transition-all">
                          <BarChart3 size={32} className="text-emerald-500 mb-6" />
                          <div className="text-5xl font-bold text-white mb-2 tracking-tight">2.5x</div>
                          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Taxa de Promoção</div>
                          <p className="text-sm text-slate-400 mt-4">Candidatos com alta "distância percorrida" avançam mais rápido na carreira.</p>
                      </div>
                      <div className="p-8 bg-[#0f1014] border border-white/5 rounded-2xl hover:border-blue-500/20 transition-all">
                          <Users size={32} className="text-blue-500 mb-6" />
                          <div className="text-5xl font-bold text-white mb-2 tracking-tight">84%</div>
                          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Retenção (24 meses)</div>
                          <p className="text-sm text-slate-400 mt-4">Redução drástica nos custos de turnover e onboardings repetidos.</p>
                      </div>
                      <div className="p-8 bg-[#0f1014] border border-white/5 rounded-2xl hover:border-purple-500/20 transition-all">
                          <CheckCircle2 size={32} className="text-purple-500 mb-6" />
                          <div className="text-5xl font-bold text-white mb-2 tracking-tight">40%</div>
                          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Aumento de Diversidade</div>
                          <p className="text-sm text-slate-400 mt-4">Crescimento orgânico e sustentável, sem baixar a barra técnica.</p>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* 6. FOOTER CTA */}
      <footer className="py-32 bg-[#020203] relative overflow-hidden border-t border-white/5">
           {/* Decorative Glow in Footer */}
           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-primary/10 rounded-full blur-[150px] pointer-events-none"></div>
           
           <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
               <h2 className="text-5xl md:text-6xl font-serif text-white mb-8 tracking-tight leading-tight">
                   Pronto para ver o que você <br/> estava perdendo?
               </h2>
               <p className="text-slate-400 mb-12 text-lg max-w-2xl mx-auto">
                   Integre a UNIVOS ao seu ATS atual em menos de 48 horas. 
                   Rode uma auditoria retroativa em suas últimas 100 contratações gratuitamente.
               </p>
               
               <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
                   <button onClick={onNext} className="w-full sm:w-auto px-12 py-5 bg-white text-black rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-slate-200 transition-colors shadow-xl">
                       Acessar Dashboard
                   </button>
                   <button className="w-full sm:w-auto px-12 py-5 border border-white/10 bg-white/5 text-white rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-white/10 transition-colors backdrop-blur-sm">
                       Agendar Demo
                   </button>
               </div>
               
               <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono uppercase tracking-widest text-slate-600 gap-4">
                   <div>© 2024 UNIVOS SYSTEMS. TODOS OS DIREITOS RESERVADOS.</div>
                   <div className="flex gap-8">
                       <a href="#" className="hover:text-white transition-colors">Privacidade</a>
                       <a href="#" className="hover:text-white transition-colors">Segurança</a>
                       <a href="#" className="hover:text-white transition-colors">ISO 30415</a>
                   </div>
               </div>
           </div>
      </footer>

    </div>
  );
};

export default HeroScreen;