import React from 'react';

interface HighlightsReportProps {
  highlights: {
    positive: string[];
    negative: string[];
  };
}

export const HighlightsReport: React.FC<HighlightsReportProps> = ({ highlights }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-1">
      {/* Positive Highlights */}
      <div className="bg-dark-card border border-dark-border rounded-lg shadow-lg shadow-black/20 p-6">
        <div className="flex items-center gap-3 mb-4">
            <span className="text-green-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 18.331a1 1 0 01-.5-1.425V10a1 1 0 011-1h4V6a1 1 0 011-1h2a1 1 0 011 1v4z" /></svg>
            </span>
            <h3 className="text-xl font-bold">Aspectos Positivos</h3>
        </div>
        <ul className="space-y-2">
          {highlights.positive.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span className="text-dark-text-secondary">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Negative Highlights */}
      <div className="bg-dark-card border border-dark-border rounded-lg shadow-lg shadow-black/20 p-6">
        <div className="flex items-center gap-3 mb-4">
            <span className="text-red-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.738 3h4.017c.163 0 .326.02.485.06L17 5.669a1 1 0 01.5 1.425V14a1 1 0 01-1 1h-4v4a1 1 0 01-1 1h-2a1 1 0 01-1-1v-4z" /></svg>
            </span>
            <h3 className="text-xl font-bold">Áreas a Mejorar</h3>
        </div>
        <ul className="space-y-2">
          {highlights.negative.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                <span className="text-dark-text-secondary">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
