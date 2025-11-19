import React from 'react';
import { CheckCircle2, Lock, HelpCircle, ArrowLeft, ArrowRight } from 'lucide-react';

interface QuestionnaireScreenProps {
  isDarkMode?: boolean;
}

const QuestionnaireScreen: React.FC<QuestionnaireScreenProps> = ({ isDarkMode = false }) => {
  return (
    <div className="h-full bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-8 transition-colors duration-300">
      
      <div className="max-w-3xl w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden flex flex-col border border-slate-200 dark:border-slate-800">
        {/* Header & Progress */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 p-8 transition-colors duration-300">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold">T</div>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">Candidatura: Senior Frontend Dev</span>
                </div>
                <div className="flex items-center text-xs font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                    <Lock size={12} className="mr-1" />
                    Ambiente Seguro & Anonimizado
                </div>
            </div>

            {/* Stepper */}
            <div className="relative flex items-center justify-between w-full max-w-md mx-auto">
                <div className="absolute left-0 top-1/2 w-full h-0.5 bg-slate-200 dark:bg-slate-700 -z-0"></div>
                <div className="z-10 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                        <CheckCircle2 size={16} />
                    </div>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-2">Dados</span>
                </div>
                <div className="z-10 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white border-4 border-white dark:border-slate-900 shadow-sm">
                        2
                    </div>
                    <span className="text-xs text-primary dark:text-primary-light font-bold mt-2">Contexto</span>
                </div>
                <div className="z-10 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center text-slate-400">
                        3
                    </div>
                    <span className="text-xs text-slate-400 mt-2">Revisão</span>
                </div>
            </div>
        </div>

        {/* Form Body */}
        <div className="p-10 flex-1 overflow-y-auto bg-white dark:bg-slate-900 transition-colors duration-300">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Sua Jornada</h2>
                <p className="text-slate-500 dark:text-slate-400">
                    Estas perguntas opcionais ajudam nosso <span className="font-semibold text-primary dark:text-primary-light">Motor de Equidade Contextual</span> a entender melhor suas conquistas em relação às oportunidades que você teve.
                </p>
            </div>

            <div className="space-y-6">
                {/* Question Card 1 */}
                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:border-primary/30 dark:hover:border-primary/30 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <label className="font-semibold text-slate-800 dark:text-slate-200 text-lg">
                            Histórico Educacional Familiar
                        </label>
                        <div className="group relative">
                             <HelpCircle size={18} className="text-slate-400 cursor-help" />
                             <div className="absolute right-0 w-64 p-3 bg-slate-800 dark:bg-slate-700 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                                Usado para calcular métricas de mobilidade social. Seus dados não são vistos diretamente pelos recrutadores.
                             </div>
                        </div>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Qual das opções abaixo melhor descreve sua situação educacional em relação à sua família imediata?</p>
                    
                    <div className="space-y-3">
                        <label className="flex items-center p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg cursor-pointer hover:bg-primary-pale/50 dark:hover:bg-primary/20 transition-colors">
                            <input type="radio" name="q1" className="w-5 h-5 text-primary border-slate-300 dark:border-slate-500 focus:ring-primary dark:bg-slate-700" />
                            <span className="ml-3 text-slate-700 dark:text-slate-200 text-sm">Sou a primeira pessoa da minha família a frequentar a universidade.</span>
                        </label>
                        <label className="flex items-center p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg cursor-pointer hover:bg-primary-pale/50 dark:hover:bg-primary/20 transition-colors">
                            <input type="radio" name="q1" className="w-5 h-5 text-primary border-slate-300 dark:border-slate-500 focus:ring-primary dark:bg-slate-700" defaultChecked />
                            <span className="ml-3 text-slate-700 dark:text-slate-200 text-sm">Meus pais frequentaram a universidade, mas precisei trabalhar para pagar meus estudos.</span>
                        </label>
                        <label className="flex items-center p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg cursor-pointer hover:bg-primary-pale/50 dark:hover:bg-primary/20 transition-colors">
                            <input type="radio" name="q1" className="w-5 h-5 text-primary border-slate-300 dark:border-slate-500 focus:ring-primary dark:bg-slate-700" />
                            <span className="ml-3 text-slate-700 dark:text-slate-200 text-sm">Meus pais financiaram minha educação integralmente.</span>
                        </label>
                    </div>
                </div>

                 {/* Question Card 2 */}
                 <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6 opacity-60">
                     <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-600 rounded mb-4"></div>
                     <div className="h-3 w-2/3 bg-slate-200 dark:bg-slate-600 rounded mb-6"></div>
                     <div className="space-y-3">
                         <div className="h-10 w-full bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-600"></div>
                         <div className="h-10 w-full bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-600"></div>
                     </div>
                 </div>
            </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center transition-colors duration-300">
            <button className="flex items-center text-slate-500 dark:text-slate-400 font-medium hover:text-slate-800 dark:hover:text-slate-200">
                <ArrowLeft size={18} className="mr-2" />
                Voltar
            </button>
            <button className="flex items-center bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-light shadow-lg shadow-primary/20">
                Próximo Passo
                <ArrowRight size={18} className="ml-2" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireScreen;