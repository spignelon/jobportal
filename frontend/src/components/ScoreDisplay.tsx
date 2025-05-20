import React from 'react';

interface ScoreDisplayProps {
  score: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  // Generate color based on score
  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getBgColor = (score: number): string => {
    if (score >= 80) return 'bg-green-600';
    if (score >= 60) return 'bg-blue-600';
    if (score >= 40) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  const getScoreText = (score: number): string => {
    if (score >= 80) return 'Excellent match!';
    if (score >= 60) return 'Good match';
    if (score >= 40) return 'Average match';
    return 'Needs improvement';
  };

  return (
    <div className="text-center mb-8">
      <div className="inline-block">
        <div className="relative w-36 h-36 rounded-full flex items-center justify-center bg-gray-100">
          <div 
            className={`absolute w-32 h-32 rounded-full ${getBgColor(score)} opacity-10`}
          ></div>
          <div className="text-center">
            <span className={`text-4xl font-bold ${getScoreColor(score)}`}>{score}</span>
            <span className="text-xl text-gray-500">/100</span>
            <p className={`text-sm font-medium mt-1 ${getScoreColor(score)}`}>
              {getScoreText(score)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreDisplay;