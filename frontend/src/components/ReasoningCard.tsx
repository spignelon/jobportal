import React from 'react';
import { Reasoning } from '../types';

interface ReasoningCardProps {
  reasoning: Reasoning;
}

const ReasoningCard: React.FC<ReasoningCardProps> = ({ reasoning }) => {
  // Set color based on title
  const getBgColor = (title: string): string => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('strength')) return 'bg-green-50 border-green-500';
    if (lowerTitle.includes('weak')) return 'bg-red-50 border-red-500';
    if (lowerTitle.includes('gap')) return 'bg-yellow-50 border-yellow-500';
    return 'bg-blue-50 border-blue-500';
  };

  const getTextColor = (title: string): string => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('strength')) return 'text-green-700';
    if (lowerTitle.includes('weak')) return 'text-red-700';
    if (lowerTitle.includes('gap')) return 'text-yellow-700';
    return 'text-blue-700';
  };

  const cardClasses = `${getBgColor(reasoning.title)} p-4 rounded-lg mb-4 border-l-4`;
  const titleClasses = `font-semibold mb-2 ${getTextColor(reasoning.title)}`;

  return (
    <div className={cardClasses}>
      <h3 className={titleClasses}>{reasoning.title}</h3>
      <p className="text-gray-700 text-sm">{reasoning.content}</p>
    </div>
  );
};

export default ReasoningCard;