import React from 'react';
import type { AnalysisReportData } from '../types';
import { ReportCategory } from './ReportCategory';

interface AnalysisReportProps {
  report: AnalysisReportData | null;
}

export const AnalysisReport: React.FC<AnalysisReportProps> = ({ report }) => {
  if (!report) {
    // FIX: Removed hacky check for loading state. This is handled by the parent component (App.tsx).
    return (
      <div className="bg-dark-card/50 border-2 border-dashed border-dark-border rounded-lg p-8 h-full min-h-[500px] flex flex-col items-center justify-center text-center opacity-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-dark-border" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h2 className="mt-4 text-xl font-semibold text-dark-text">Esperando Análisis</h2>
        <p className="mt-1 text-dark-text-secondary">
          Introduce un fragmento de código o la URL de un repositorio y haz clic en "Analizar" para ver los resultados.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
        <ReportCategory categoryData={report.security} category="Seguridad" />
        <ReportCategory categoryData={report.performance} category="Rendimiento" />
        <ReportCategory categoryData={report.refactoring} category="Refactorización" />
        <ReportCategory categoryData={report.technicalDebt} category="Deuda Técnica" />
    </div>
  );
};
