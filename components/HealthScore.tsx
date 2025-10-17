import React from 'react';

interface HealthScoreProps {
  score: number;
}

const getScoreColor = (score: number) => {
  if (score >= 85) return 'text-green-400';
  if (score >= 60) return 'text-yellow-400';
  return 'text-red-400';
};

export const HealthScore: React.FC<HealthScoreProps> = ({ score }) => {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  const colorClass = getScoreColor(score);

  return (
    <div className="bg-dark-card border border-dark-border rounded-lg shadow-lg shadow-black/20 p-6 flex flex-col items-center justify-center text-center">
      <h3 className="text-xl font-bold mb-4">Puntuación General de Salud</h3>
      <div className="relative w-40 h-40">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            className="text-dark-border"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
          {/* Progress circle */}
          <circle
            className={colorClass}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          />
        </svg>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold ${colorClass}`}>{score}</span>
          <span className="text-sm text-dark-text-secondary">/ 100</span>
        </div>
      </div>
    </div>
  );
};
