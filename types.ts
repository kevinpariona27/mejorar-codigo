export type Severity = 'Crítica' | 'Alta' | 'Media' | 'Baja';
export type Impact = 'Alto' | 'Medio' | 'Bajo';

export interface ReportFinding {
  line: number;
  description: string;
  severity: Severity;
}

export interface CategoryData {
  score: number;
  summary: string;
  findings: ReportFinding[];
}

export interface CostReductionStrategy {
  strategy: string;
  description: string;
  impact: Impact;
}

export interface CostAnalysisData {
  estimatedCost: string;
  summary: string;
  costReductionStrategies: CostReductionStrategy[];
}

export interface HighlightsData {
  positive: string[];
  negative: string[];
}

export interface AnalysisReportData {
  healthScore: number;
  highlights: HighlightsData;
  security: CategoryData;
  performance: CategoryData;
  refactoring: CategoryData;
  technicalDebt: CategoryData;
  costAnalysis: CostAnalysisData;
}

export interface Repository {
  id: number;
  name: string;
  description: string | null;
  owner: string;
}

export interface PullRequest {
  id: number;
  number: number;
  title: string;
  author: string;
  url: string;
  state: 'open' | 'closed';
}