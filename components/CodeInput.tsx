
import React, { useState, useEffect } from 'react';
import type { Repository } from '../types';

interface CodeInputProps {
  onAnalyze: (code: string, type: 'snippet' | 'repo') => void;
  isLoading: boolean;
  selectedRepo: Repository;
  onBack: () => void;
  isGuest: boolean;
}

export const CodeInput: React.FC<CodeInputProps> = ({ onAnalyze, isLoading, selectedRepo, onBack, isGuest }) => {
  const [code, setCode] = useState('');
  const [inputType, setInputType] = useState<'snippet' | 'repo'>('snippet');
  const [repoUrl, setRepoUrl] = useState('');

  useEffect(() => {
    if (isGuest) {
        setInputType('snippet');
    }
  }, [isGuest]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputType === 'snippet' && code.trim()) {
      onAnalyze(code, 'snippet');
    } else if (inputType === 'repo' && repoUrl.trim()) {
      onAnalyze(`Simulando análisis para la PR: ${repoUrl}\n\n// El contenido real del PR se obtendría aquí.`, 'repo');
    }
  };

  return (
    <div className="bg-dark-card border border-dark-border rounded-lg shadow-lg shadow-black/20 p-6">
      <div className="flex items-center justify-between mb-4 border-b border-dark-border pb-4">
        <div>
          <button onClick={onBack} className="text-sm text-dark-text-secondary hover:text-dark-text flex items-center gap-1 mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            {isGuest ? 'Volver al Inicio' : 'Atrás a PRs'}
          </button>
          <p className="font-bold text-lg text-dark-text">{selectedRepo.name}</p>
        </div>
      </div>

      <div className="flex border-b border-dark-border mb-4">
        <button
          onClick={() => setInputType('snippet')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${inputType === 'snippet' ? 'border-b-2 border-brand-accent text-dark-text' : 'text-dark-text-secondary hover:text-dark-text'}`}
        >
          Fragmento de Código
        </button>
        {!isGuest && (
            <button
                onClick={() => setInputType('repo')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${inputType === 'repo' ? 'border-b-2 border-brand-accent text-dark-text' : 'text-dark-text-secondary hover:text-dark-text'}`}
                >
                Analizar PR
            </button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        {inputType === 'snippet' ? (
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Pega tu código aquí..."
            className="w-full h-64 p-3 bg-dark-bg border border-dark-border rounded-md font-mono text-sm focus:ring-2 focus:ring-brand-accent focus:outline-none resize-y"
            disabled={isLoading}
          />
        ) : (
          <input
            type="url"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="https://github.com/usuario/repo/pull/123"
            className="w-full p-3 bg-dark-bg border border-dark-border rounded-md text-sm focus:ring-2 focus:ring-brand-accent focus:outline-none"
            disabled={isLoading}
          />
        )}

        <button
          type="submit"
          disabled={isLoading || (inputType === 'snippet' && !code.trim()) || (inputType === 'repo' && !repoUrl.trim())}
          className="mt-4 w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-bold py-3 px-4 rounded-md transition-all duration-200 flex items-center justify-center disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analizando...
            </>
          ) : (
            'Analizar Código'
          )}
        </button>
      </form>
    </div>
  );
};