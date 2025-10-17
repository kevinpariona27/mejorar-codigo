import React from 'react';
import type { CostAnalysisData, CostReductionStrategy } from '../types';

const Icons: Record<string, React.ReactNode> = {
  'Análisis de Costo': <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 10v-1m0 0c-1.657 0-3-.895-3-2s1.343-2 3-2 3-.895 3-2-1.343-2-3-2m0 0c-1.11 0-2.08-.402-2.599-1M12 8V7m0 10v-1" /></svg>,
};

const ImpactColors: Record<CostReductionStrategy['impact'], string> = {
  Alto: 'bg-green-500/20 text-green-300 border-green-500/30',
  Medio: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  Bajo: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
};

const StrategyCard: React.FC<{ item: CostReductionStrategy }> = ({ item }) => (
  <div className="bg-[#090f20] p-4 rounded-lg border border-dark-border/50">
    <div className="flex items-center justify-between mb-2 gap-4">
      <h4 className="font-semibold text-dark-text">{item.strategy}</h4>
      <span className={`text-xs font-bold px-2 py-1 rounded-full border whitespace-nowrap ${ImpactColors[item.impact]}`}>Impacto {item.impact}</span>
    </div>
    <p className="text-sm text-dark-text-secondary">{item.description}</p>
  </div>
);


export const CostAnalysis: React.FC<{ costData: CostAnalysisData }> = ({ costData }) => {
  return (
    <div className="bg-dark-card border border-dark-border rounded-lg shadow-lg shadow-black/20 overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-dark-card to-[#0f172a]/50 border-b border-dark-border flex items-center gap-3">
            <span className="text-brand-accent">{Icons['Análisis de Costo']}</span>
            <h3 className="text-xl font-bold">Análisis de Costo</h3>
        </div>
        <div className="p-4">
            <div className="text-center mb-6 p-4 border border-dark-border rounded-lg bg-gradient-to-br from-brand-primary/10 via-dark-bg to-dark-bg">
                <p className="text-dark-text-secondary text-sm">Presupuesto Estimado de Remediación</p>
                <p className="text-3xl font-bold text-dark-text tracking-tight my-1 bg-clip-text text-transparent bg-gradient-to-r from-brand-secondary to-brand-accent">{costData.estimatedCost}</p>
                 <p className="text-dark-text-secondary/80 text-xs">{costData.summary}</p>
            </div>

            <h4 className="font-semibold text-dark-text mb-3">Estrategias de Reducción de Costos</h4>
            {costData.costReductionStrategies.length > 0 ? (
                <div className="space-y-4">
                    {costData.costReductionStrategies.map((item, index) => <StrategyCard key={index} item={item} />)}
                </div>
            ) : (
                <p className="text-center text-dark-text-secondary py-4 text-sm">No se identificaron estrategias específicas de reducción de costos.</p>
            )}
        </div>
    </div>
  );
};