import React, { useState } from 'react';
import type { CategoryData, ReportFinding } from '../types';

interface ReportCategoryProps {
  categoryData: CategoryData;
  category: string;
}

const SeverityColors: Record<ReportFinding['severity'], string> = {
  'Crítica': 'bg-red-500/20 text-red-300 border-red-500/30',
  'Alta': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  'Media': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  'Baja': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
};

const getScoreColor = (score: number) => {
  if (score >= 85) return 'text-green-400';
  if (score >= 60) return 'text-yellow-400';
  return 'text-red-400';
};

const Icons: Record<string, React.ReactNode> = {
    'Seguridad': <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
    'Rendimiento': <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    'Refactorización': <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
    'Deuda Técnica': <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
};


export const ReportCategory: React.FC<ReportCategoryProps> = ({ categoryData, category }) => {
    const [isExpanded, setIsExpanded] = useState(true);

  if (!categoryData) {
    return null;
  }

  return (
    <div className="bg-dark-card border border-dark-border rounded-lg shadow-lg shadow-black/20 overflow-hidden">
      <button
        className="w-full p-4 bg-gradient-to-r from-dark-card to-[#0f172a]/50 border-b border-dark-border flex items-center justify-between cursor-pointer hover:bg-[#0f172a]"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <span className="text-brand-accent">{Icons[category]}</span>
          <h3 className="text-xl font-bold">{category}</h3>
        </div>
        <div className="flex items-center gap-4">
            <div className="flex items-baseline gap-1">
                 <span className={`text-3xl font-bold ${getScoreColor(categoryData.score)}`}>{categoryData.score}</span>
                 <span className="text-sm text-dark-text-secondary">/ 100</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
        </div>
      </button>

      {isExpanded && (
        <div className="p-4">
          <p className="text-dark-text-secondary mb-4 italic">"{categoryData.summary}"</p>
          {categoryData.findings.length > 0 ? (
            <div className="space-y-3">
              {categoryData.findings.map((finding, index) => (
                <div key={index} className="bg-[#090f20] p-3 rounded-md border border-dark-border/50">
                    <div className="flex items-start justify-between gap-4">
                        <p className="text-sm text-dark-text-secondary flex-grow">
                            <span className="font-mono bg-dark-bg px-2 py-1 rounded-md text-brand-secondary mr-2">L{finding.line}</span>
                            {finding.description}
                        </p>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full border whitespace-nowrap ${SeverityColors[finding.severity]}`}>{finding.severity}</span>
                    </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-dark-text-secondary py-4 text-sm">No se encontraron problemas en esta categoría.</p>
          )}
        </div>
      )}
    </div>
  );
};
