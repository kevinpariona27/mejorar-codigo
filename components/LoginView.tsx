
import React from 'react';

interface LoginViewProps {
  onLogin: () => void;
  onSkipLogin: () => void;
  isLoading: boolean;
}

const GithubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
);


export const LoginView: React.FC<LoginViewProps> = ({ onLogin, onSkipLogin, isLoading }) => {
    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-md text-center">
                <div className="mx-auto mb-6 text-brand-accent">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
                        <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16.1249 5.49414L7.8749 9.61914" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 12V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M22 7L12 12L2 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>

                <h1 className="text-4xl font-bold text-dark-text tracking-tight">Bienvenido a AuditFlow</h1>
                <p className="mt-3 text-lg text-dark-text-secondary">
                    Tu agente de IA para auditoría de código, seguridad y análisis de costos.
                </p>

                <div className="mt-10">
                    <button
                        onClick={onLogin}
                        disabled={isLoading}
                        className="w-full bg-dark-card hover:bg-dark-border text-dark-text font-bold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center border border-dark-border shadow-lg shadow-black/20 disabled:opacity-50"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Conectando...
                            </>
                        ) : (
                            <>
                                <GithubIcon />
                                <span className="ml-3">Conectar con GitHub</span>
                            </>
                        )}
                    </button>
                    <div className="mt-4">
                        <button 
                            onClick={onSkipLogin}
                            disabled={isLoading}
                            className="text-sm text-dark-text-secondary hover:text-dark-text transition-colors disabled:opacity-50"
                        >
                            O continuar sin cuenta
                        </button>
                    </div>
                </div>
                 <p className="mt-4 text-xs text-dark-text-secondary/50">
                    Se requiere acceso de solo lectura para listar tus repositorios.
                </p>
            </div>
        </div>
    );
};