import React, { useState, useMemo } from 'react';
import type { Repository } from '../types';

interface RepoListViewProps {
  repos: Repository[];
  onSelectRepo: (repo: Repository) => void;
}

const RepoCard: React.FC<{ repo: Repository; onSelect: () => void }> = ({ repo, onSelect }) => (
  <button 
    onClick={onSelect}
    className="w-full text-left p-4 bg-dark-card border border-dark-border rounded-lg hover:bg-dark-border/50 hover:border-brand-secondary/50 transition-all duration-200 shadow-lg shadow-black/20"
  >
    <div className="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-dark-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
        <div>
            <h3 className="font-bold text-dark-text">{repo.owner} / <span className="text-brand-secondary">{repo.name}</span></h3>
        </div>
    </div>
    <p className="mt-2 text-sm text-dark-text-secondary">{repo.description || 'Sin descripción.'}</p>
  </button>
);

export const RepoListView: React.FC<RepoListViewProps> = ({ repos, onSelectRepo }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRepos = useMemo(() => {
    if (!searchTerm) return repos;
    return repos.filter(repo => 
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        repo.owner.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [repos, searchTerm]);

  return (
    <div className="min-h-screen">
       <div className="bg-dark-card/50 backdrop-blur-sm border-b border-dark-border sticky top-0 z-10">
            <div className="container mx-auto px-4 md:px-6 py-4">
                 <h1 className="text-2xl font-bold text-dark-text tracking-tight">Selecciona un Repositorio</h1>
                 <p className="text-dark-text-secondary mt-1">Elige un proyecto para comenzar la auditoría de código.</p>
                 <div className="mt-4 relative">
                    <input
                        type="text"
                        placeholder="Buscar repositorio..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 pl-10 bg-dark-bg border border-dark-border rounded-md text-sm focus:ring-2 focus:ring-brand-accent focus:outline-none"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute top-1/2 left-3 -translate-y-1/2 text-dark-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                 </div>
            </div>
       </div>
       <main className="container mx-auto p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredRepos.map(repo => (
                    <RepoCard key={repo.id} repo={repo} onSelect={() => onSelectRepo(repo)} />
                ))}
            </div>
            {filteredRepos.length === 0 && (
                <div className="text-center py-16">
                    <p className="text-dark-text-secondary">No se encontraron repositorios.</p>
                </div>
            )}
       </main>
    </div>
  );
};