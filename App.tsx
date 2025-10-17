
import React, { useState } from 'react';
import { Header } from './components/Header';
import { CodeInput } from './components/CodeInput';
import { AnalysisReport } from './components/AnalysisReport';
import { Loader } from './components/Loader';
import { HealthScore } from './components/HealthScore';
import { HighlightsReport } from './components/HighlightsReport';
import { CostAnalysis } from './components/CostAnalysis';
import { LoginView } from './components/LoginView';
import { RepoListView } from './components/RepoListView';
import { PRListView } from './components/PRListView';
import { analyzeCode } from './services/geminiService';
import type { AnalysisReportData, Repository, PullRequest } from './types';

// Mock data for repositories
const MOCK_REPOS: Repository[] = [
  { id: 1, name: 'auditor-ai-frontend', owner: 'dev-team', description: 'Interfaz para el agente de auditoría de código con IA.' },
  { id: 2, name: 'ecommerce-platform-api', owner: 'dev-team', description: 'API backend para la plataforma de comercio electrónico.' },
  { id: 3, name: 'data-processing-pipeline', owner: 'data-eng', description: 'ETL para procesar datos de ventas.' },
  { id: 4, name: 'mobile-banking-app', owner: 'mobile-devs', description: 'Aplicación de banca móvil para iOS y Android.' },
  { id: 5, name: 'cloud-infra-terraform', owner: 'ops-team', description: 'Infraestructura como código para los servicios en la nube.' },
];

const MOCK_PULL_REQUESTS: Record<number, PullRequest[]> = {
  1: [
    { id: 101, number: 42, title: 'Feat: Añadir tema oscuro a la UI', author: 'Ana', url: 'https://github.com/dev-team/auditor-ai-frontend/pull/42', state: 'open' },
    { id: 102, number: 41, title: 'Fix: Corregir error de renderizado en el gráfico', author: 'Carlos', url: 'https://github.com/dev-team/auditor-ai-frontend/pull/41', state: 'open' },
  ],
  2: [
    { id: 201, number: 153, title: 'Feat: Integración con nueva pasarela de pago', author: 'Luisa', url: 'https://github.com/dev-team/ecommerce-platform-api/pull/153', state: 'open' },
    { id: 202, number: 152, title: 'Refactor: Optimizar consulta de productos', author: 'Pedro', url: 'https://github.com/dev-team/ecommerce-platform-api/pull/152', state: 'open' },
    { id: 203, number: 150, title: 'Docs: Actualizar documentación de la API de usuarios', author: 'Ana', url: 'https://github.com/dev-team/ecommerce-platform-api/pull/150', state: 'open' },
  ],
  3: [
     { id: 301, number: 7, title: 'Fix: Manejar correctamente los datos nulos de la fuente', author: 'Juan', url: 'https://github.com/data-eng/data-processing-pipeline/pull/7', state: 'open' },
  ],
  5: [
    { id: 501, number: 88, title: 'Feat: Añadir balanceador de carga para el servicio web', author: 'Maria', url: 'https://github.com/ops-team/cloud-infra-terraform/pull/88', state: 'open' },
    { id: 502, number: 85, title: 'Chore: Actualizar versión del proveedor de AWS', author: 'Admin', url: 'https://github.com/ops-team/cloud-infra-terraform/pull/85', state: 'open' },
  ],
};

const GUEST_REPO: Repository = { id: -1, name: 'Análisis de Fragmento', owner: 'Invitado', description: 'Pega código para un análisis rápido.' };


const App: React.FC = () => {
  const [report, setReport] = useState<AnalysisReportData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [isPRListLoading, setIsPRListLoading] = useState(false);

  const handleLogin = () => {
    setIsAuthLoading(true);
    setTimeout(() => {
      setRepositories(MOCK_REPOS);
      setIsAuthenticated(true);
      setIsAuthLoading(false);
    }, 1000);
  };

  const handleSkipLogin = () => {
    setIsAuthenticated(true);
    setSelectedRepo(GUEST_REPO);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setSelectedRepo(null);
    setReport(null);
    setError(null);
    setRepositories([]);
    setPullRequests([]);
  };

  const handleSelectRepo = (repo: Repository) => {
    setSelectedRepo(repo);
    setIsPRListLoading(true);
    // Simulate API call to fetch PRs
    setTimeout(() => {
        setPullRequests(MOCK_PULL_REQUESTS[repo.id] || []);
        setIsPRListLoading(false);
    }, 800);
    setReport(null);
    setError(null);
  };

  const handleBackToRepos = () => {
    setSelectedRepo(null);
    setPullRequests([]);
    setReport(null);
    setError(null);
  };

  const handleBackToPRList = () => {
    setReport(null);
    setError(null);
  };

  const handleAnalyze = async (code: string, context?: string) => {
    setIsLoading(true);
    setReport(null);
    setError(null);
    try {
      const result: AnalysisReportData = await analyzeCode(code, context);
      setReport(result);
    // FIX: Added curly braces to the catch block to fix syntax error.
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error inesperado.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzePR = (pr: PullRequest) => {
    if (!selectedRepo) return;
    const prContext = `Análisis del Pull Request #${pr.number}: "${pr.title}" para el repositorio: ${selectedRepo.name}`;
    const mockCode = `
// Este es un código de ejemplo simulado para el PR #${pr.number}
// URL: ${pr.url}

// Simulación de un cambio potencialmente costoso en la nube
const userPreferences = db.query('SELECT * FROM user_settings WHERE user_id = ?', userId); // Sin índice en user_id?

// Simulación de una vulnerabilidad de seguridad
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  // VULNERABILIDAD: Inyección de SQL
  db.query(\`SELECT * FROM users WHERE id = '\${userId}'\`, (err, results) => {
    res.send(results);
  });
});

// Simulación de código que necesita refactorización
function processOrder(order) {
  // Lógica de 200 líneas...
  // ... falta de modularización
}
    `;
    handleAnalyze(mockCode, prContext);
  };

  if (!isAuthenticated) {
    return <LoginView onLogin={handleLogin} onSkipLogin={handleSkipLogin} isLoading={isAuthLoading} />;
  }

  if (!selectedRepo) {
    return <RepoListView repos={repositories} onSelectRepo={handleSelectRepo} />;
  }
  
  const isGuestMode = selectedRepo.id === -1;
  const showPrList = !isGuestMode && !isLoading && !report && !error;

  if (showPrList) {
    return <PRListView 
      repo={selectedRepo} 
      pullRequests={pullRequests}
      onSelectPR={handleAnalyzePR}
      onBack={handleBackToRepos}
      isLoading={isPRListLoading}
    />
  }

  // Show the main analysis view
  return (
    <div className="bg-dark-bg min-h-screen text-dark-text font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-6">
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          
          <div className="lg:col-span-1 flex flex-col gap-6 lg:sticky lg:top-24">
            <CodeInput 
              onAnalyze={(code, type) => handleAnalyze(code, type === 'repo' ? `Análisis de PR para el repositorio: ${selectedRepo.name}` : undefined)} 
              isLoading={isLoading}
              selectedRepo={selectedRepo}
              onBack={isGuestMode ? handleLogout : handleBackToPRList}
              isGuest={isGuestMode}
            />
            {report && (
              <>
                <HealthScore score={report.healthScore} />
                <HighlightsReport highlights={report.highlights} />
                <CostAnalysis costData={report.costAnalysis} />
              </>
            )}
          </div>
          
          <div className="lg:col-span-2">
            {isLoading && (
              <div className="bg-dark-card/50 border-2 border-dashed border-dark-border rounded-lg p-8 h-full min-h-[500px] flex flex-col items-center justify-center">
                <Loader />
                <h2 className="mt-4 text-xl font-semibold text-dark-text">Analizando tu Pull Request...</h2>
                <p className="mt-1 text-dark-text-secondary text-center">
                  Esto puede tardar unos segundos. <br />
                  Estamos revisando la seguridad, el rendimiento y mucho más.
                </p>
              </div>
            )}
            {error && (
               <div className="bg-red-900/50 border border-red-500/50 text-red-300 rounded-lg p-6 h-full min-h-[500px] flex flex-col items-center justify-center text-center">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                 <h2 className="mt-4 text-xl font-bold">Error</h2>
                 <p className="mt-2 text-red-300/80">{error}</p>
                 <button onClick={() => { setError(null); handleBackToPRList(); }} className="mt-6 bg-red-500/50 hover:bg-red-500/70 text-white font-bold py-2 px-4 rounded-md transition-colors">
                   Volver a la Lista de PRs
                 </button>
               </div>
            )}
            {!isLoading && !error && (
              <AnalysisReport report={report} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;