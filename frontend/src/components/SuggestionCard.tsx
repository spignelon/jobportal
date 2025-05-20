import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Suggestion } from '../types';

interface SuggestionCardProps {
  suggestion: Suggestion;
  index: number;
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({ suggestion, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden mb-4 border-l-4 border-blue-500 transition-all duration-200"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div 
        className="p-4 cursor-pointer flex justify-between items-center"
        onClick={toggleExpand}
      >
        <h3 className="font-semibold text-gray-800">{suggestion.title}</h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleExpand();
          }}
          className="text-gray-500 hover:text-gray-700"
        >
          {isExpanded ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4 pt-1 border-t border-gray-100 animate-fadeIn">
          <p className="text-gray-600 mb-4">{suggestion.content}</p>
          
          {suggestion.courses.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Recommended Courses</h4>
              <ul className="space-y-2">
                {suggestion.courses.map((course, idx) => (
                  <li key={idx} className="flex items-start">
                    <a
                      href={course.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center"
                    >
                      {course.title}
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SuggestionCard;