/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { SparklesIcon, PlusIcon, ClapperboardIcon, UserIcon } from './icons';

interface PricingSectionProps {
  onBuyStarter: () => void;
  onBuyPro: () => void;
  onBuyInfluencer: () => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ onBuyStarter, onBuyPro, onBuyInfluencer }) => {
  return (
    <div id="pricing-section" className="w-full max-w-6xl mx-auto mt-12 mb-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Planos para Criadores</h2>
        <p className="text-gray-400">Comece viralizar hoje mesmo.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {/* Starter Pack */}
        <div className="bg-[#1f1f1f] border border-gray-700 rounded-2xl p-6 flex flex-col items-center hover:border-indigo-500 transition-colors shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 bg-gray-700 text-xs px-3 py-1 rounded-bl-lg text-gray-300">Iniciante</div>
          <div className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-900/30 transition-colors">
            <SparklesIcon className="w-7 h-7 text-indigo-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-1">Pacote Inicial</h3>
          <p className="text-gray-400 text-xs mb-4 text-center">Para seus primeiros testes.</p>
          
          <div className="text-3xl font-bold text-white mb-1">$4.99</div>
          <div className="text-gray-500 text-xs mb-4">Total por 5 vídeos</div>
          
          <div className="bg-gray-800/50 rounded-lg px-3 py-2 mb-6 text-center border border-gray-700 w-full">
             <p className="text-gray-300 text-xs">Sai a <span className="font-bold text-indigo-400">$0.99</span> / vídeo</p>
          </div>

          <button 
            onClick={onBuyStarter}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all text-sm flex items-center justify-center gap-2">
            <PlusIcon className="w-4 h-4" />
            Comprar (5)
          </button>
        </div>

        {/* Pro Pack */}
        <div className="bg-[#1f1f1f] border border-purple-500/30 rounded-2xl p-6 flex flex-col items-center hover:border-purple-500 transition-colors shadow-lg relative overflow-hidden">
          <div className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <ClapperboardIcon className="w-7 h-7 text-purple-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-1">Pacote Diretor</h3>
          <p className="text-gray-400 text-xs mb-4 text-center">Produção de conteúdo frequente.</p>
          
          <div className="text-3xl font-bold text-white mb-1">$11.99</div>
          <div className="text-gray-500 text-xs mb-4">Total por 15 vídeos</div>
          
           <div className="bg-gray-800/50 rounded-lg px-3 py-2 mb-6 text-center border border-gray-700 w-full relative">
             <p className="text-gray-300 text-xs">Sai a <span className="font-bold text-purple-400">$0.79</span> / vídeo</p>
          </div>

          <button 
            onClick={onBuyPro}
            className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all text-sm flex items-center justify-center gap-2">
            <PlusIcon className="w-4 h-4" />
            Comprar (15)
          </button>
        </div>

        {/* Influencer Pack - NEW */}
        <div className="bg-[#1f1f1f] border border-yellow-500/50 rounded-2xl p-6 flex flex-col items-center hover:border-yellow-400 transition-colors shadow-lg relative overflow-hidden transform md:-translate-y-2">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"></div>
          <div className="absolute top-0 right-0 bg-yellow-600 text-xs px-3 py-1 rounded-bl-lg text-white font-bold">Best Value</div>
          
          <div className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center mb-4 relative">
             <div className="absolute inset-0 bg-yellow-500/20 rounded-full animate-pulse"></div>
            <UserIcon className="w-7 h-7 text-yellow-400 relative z-10" />
            <SparklesIcon className="w-3 h-3 text-yellow-200 absolute top-2 right-2 z-10" />
          </div>
          <h3 className="text-xl font-bold text-white mb-1">Pacote Influencer</h3>
          <p className="text-gray-400 text-xs mb-4 text-center">Viralize todos os dias.</p>
          
          <div className="text-3xl font-bold text-yellow-400 mb-1">$21.00</div>
          <div className="text-gray-500 text-xs mb-4">Total por 30 vídeos</div>
          
           <div className="bg-yellow-900/20 rounded-lg px-3 py-2 mb-6 text-center border border-yellow-700/50 w-full">
             <p className="text-gray-300 text-xs">Sai a <span className="font-bold text-yellow-400">$0.70</span> / vídeo</p>
          </div>

          <button 
            onClick={onBuyInfluencer}
            className="w-full py-2.5 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-semibold rounded-lg transition-all text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20">
            <PlusIcon className="w-4 h-4" />
            Quero Viralizar (30)
          </button>
        </div>

      </div>
    </div>
  );
};

export default PricingSection;