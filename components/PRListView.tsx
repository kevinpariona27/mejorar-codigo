import React from 'react';
import type { Repository, PullRequest } from '../types';

interface PRListViewProps {
  repo: Repository;
  pullRequests: PullRequest[];
  onSelectPR: (pr: PullRequest) => void;
  onBack: () => void;
  isLoading: boolean;
}

const PRCard: React.FC<{ pr: PullRequest; onSelect: () => void }> = ({ pr, onSelect }) => (
  <button
    onClick={onSelect}
    className="w-full text-left p-4 bg-dark-card border border-dark-border rounded-lg hover:bg-dark-border/50 hover:border-brand-secondary/50 transition-all duration-200 shadow-lg shadow-black/20"
  >
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-bold text-dark-text">
          <span className="text-dark-text-secondary">#{pr.number}</span> {pr.title}
        </h3>
        <p className="mt-1 text-xs text-dark-text-secondary">
          Abierto por <span className="font-semibold text-dark-text-secondary/80">{pr.author}</span>
        </p>
      </div>
      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/30 whitespace-nowrap">
        {pr.state === 'open' ? 'Abierto' : 'Cerrado'}
      </span>
    </div>
  </button>
);

export const PRListView: React.FC<PRListViewProps> = ({ repo, pullRequests, onSelectPR, onBack, isLoading }) => {
  return (
    <div className="min-h-screen">
      <div className="bg-dark-card/50 backdrop-blur-sm border-b border-dark-border sticky top-0 z-10">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <button onClick={onBack} className="text-sm text-dark-text-secondary hover:text-dark-text flex items-center gap-1 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            Todos los Repositorios
          </button>
          <h1 className="text-2xl font-bold text-dark-text tracking-tight">
            Pull Requests en <span className="text-brand-secondary">{repo.name}</span>
          </h1>
          <p className="text-dark-text-secondary mt-1">Elige un PR para iniciar el análisis automático.</p>
        </div>
      </div>
      <main className="container mx-auto p-4 md:p-6">
        {isLoading ? (
          <div className="text-center py-16">
            <svg className="animate-spin mx-auto h-8 w-8 text-brand-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-4 text-dark-text-secondary">Cargando Pull Requests...</p>
          </div>
        ) : (
          <>
            {pullRequests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pullRequests.map(pr => (
                  <PRCard key={pr.id} pr={pr} onSelect={() => onSelectPR(pr)} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-dark-text-secondary">No se encontraron Pull Requests abiertos para este repositorio.</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};