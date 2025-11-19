import React from 'react';
import { Shield, Database, Cpu, FileCheck, AlertTriangle, Check, ArrowRight } from 'lucide-react';

interface XAIScreenProps {
  isDarkMode?: boolean;
}

const XAIScreen: React.FC<XAIScreenProps> = ({ isDarkMode }) => {
  return (
    <div className="h-full bg-slate-50 dark:bg-slate-950 p-10 flex flex-col transition-colors duration-300">
      <div className="flex justify-between items-end mb-10">
        <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Auditoria & Explicabilidade (XAI)</h1>
            <p className="text-slate-500 dark:text-slate-400">Transparência total sobre como o Fator de Equidade é calculado.</p>
        </div>
        <button className="border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center transition-colors">
            <FileCheck size={16} className="mr-2 text-emerald-600 dark:text-emerald-400" />
            Gerar Relatório de Compliance (PDF)
        </button>
      </div>

      <div className="grid grid-cols-12 gap-8 flex-1">
        
        {/* Main Flow Diagram Area */}
        <div className="col-span-8 bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col transition-colors duration-300">
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-8">Fluxo de Decisão do Algoritmo</h3>
            
            <div className="flex-1 flex items-center justify-between px-4 relative">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-10 right-10 h-1 bg-slate-100 dark:bg-slate-800 -z-0"></div>

                {/* Step 1 */}
                <div className="z-10 flex flex-col items-center w-48 group">
                    <div className="w-16 h-16 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl flex items-center justify-center shadow-sm group-hover:border-primary group-hover:shadow-md transition-all">
                        <Database className="text-slate-400 dark:text-slate-500 group-hover:text-primary" size={24} />
                    </div>
                    <h4 className="font-bold text-slate-700 dark:text-slate-200 mt-4 text-center">1. Input de Dados</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2 px-2">
                        Dados anonimizados do CV + Respostas do Questionário de Contexto.
                    </p>
                </div>

                <ArrowRight className="text-slate-300 dark:text-slate-600" />

                {/* Step 2 */}
                <div className="z-10 flex flex-col items-center w-48 group">
                    <div className="w-16 h-16 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl flex items-center justify-center shadow-sm group-hover:border-primary group-hover:shadow-md transition-all">
                        <Shield className="text-slate-400 dark:text-slate-500 group-hover:text-primary" size={24} />
                    </div>
                    <h4 className="font-bold text-slate-700 dark:text-slate-200 mt-4 text-center">2. Filtro de Viés</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2 px-2">
                        Remoção de marcadores de gênero, raça e idade. Validação cruzada.
                    </p>
                </div>

                <ArrowRight className="text-slate-300 dark:text-slate-600" />

                {/* Step 3 */}
                <div className="z-10 flex flex-col items-center w-48 group">
                     <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg ring-4 ring-primary/10 dark:ring-primary/20">
                        <Cpu size={24} />
                    </div>
                    <h4 className="font-bold text-primary dark:text-primary-light mt-4 text-center">3. Cálculo CEE</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2 px-2">
                        Ponderação de <span className="font-medium text-primary dark:text-primary-light">Distância Percorrida</span> vs. Oportunidades Disponíveis.
                    </p>
                </div>

                <ArrowRight className="text-slate-300 dark:text-slate-600" />

                {/* Step 4 */}
                <div className="z-10 flex flex-col items-center w-48 group">
                     <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-center justify-center shadow-sm">
                        <Check className="text-emerald-600 dark:text-emerald-400" size={28} />
                    </div>
                    <h4 className="font-bold text-emerald-700 dark:text-emerald-400 mt-4 text-center">4. Score Final</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2 px-2">
                        Nota ajustada entregue ao RH com tag de explicabilidade.
                    </p>
                </div>
            </div>

            {/* Lower Info Box */}
            <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 flex gap-4">
                <div className="p-2 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 h-fit">
                    <AlertTriangle size={20} className="text-amber-500" />
                </div>
                <div>
                    <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200">Guardrails de Segurança Ativos</h5>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        O peso máximo do Fator de Equidade está travado em <strong>20%</strong> do score total para esta vaga, garantindo que a competência técnica continue sendo o critério primário.
                    </p>
                </div>
            </div>
        </div>

        {/* Sidebar: Variables */}
        <div className="col-span-4 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 transition-colors duration-300">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Variáveis de Contexto Ativas</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-50 dark:border-slate-800">
                        <span className="text-sm text-slate-600 dark:text-slate-400">Socioeconômico (IBGE Proxy)</span>
                        <span className="text-xs font-bold text-primary dark:text-primary-light bg-primary-pale dark:bg-primary/20 px-2 py-1 rounded">Peso Alto</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-slate-50 dark:border-slate-800">
                        <span className="text-sm text-slate-600 dark:text-slate-400">Histórico Educacional</span>
                        <span className="text-xs font-bold text-primary dark:text-primary-light bg-primary-pale dark:bg-primary/20 px-2 py-1 rounded">Peso Médio</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-slate-50 dark:border-slate-800">
                        <span className="text-sm text-slate-600 dark:text-slate-400">Gap de Carreira (Maternidade/Saúde)</span>
                        <span className="text-xs font-bold text-primary dark:text-primary-light bg-primary-pale dark:bg-primary/20 px-2 py-1 rounded">Peso Médio</span>
                    </div>
                </div>
            </div>

            <div className="bg-slate-900 dark:bg-black p-6 rounded-xl shadow-lg text-white relative overflow-hidden border border-slate-800 dark:border-slate-900">
                <div className="absolute -right-6 -top-6 bg-white/10 w-24 h-24 rounded-full"></div>
                <h3 className="font-bold text-white mb-2">Impacto ESG</h3>
                <div className="text-3xl font-bold text-emerald-400 mb-1">ISO 30415</div>
                <p className="text-slate-400 text-sm">Compliance com gestão de diversidade e inclusão humana.</p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default XAIScreen;