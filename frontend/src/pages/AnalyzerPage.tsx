import React, { useState } from 'react';
import Header from '../components/Header';
import ResumeForm from '../components/ResumeForm';
import ScoreDisplay from '../components/ScoreDisplay';
import SuggestionCard from '../components/SuggestionCard';
import ReasoningCard from '../components/ReasoningCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { FormData, AnalysisResult } from '../types';
import { analyzeResume } from '../api/resumeApi';

const AnalyzerPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (data: FormData) => {
    if (!data.resume) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const analysisResult = await analyzeResume(data.job, data.resume);
      setResult(analysisResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activePage="analyzer" />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Resume Analyzer</h1>
          <p className="text-gray-600 mb-6">
            Upload your resume and job description to get personalized feedback and improvement suggestions.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <ResumeForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </div>
            
            <div className="lg:col-span-2">
              {isLoading && (
                <div className="flex justify-center items-center h-64 bg-white rounded-lg shadow-md">
                  <LoadingSpinner size="large" text="Analyzing your resume..." />
                </div>
              )}
              
              {error && (
                <div className="bg-red-50 rounded-lg shadow-md p-6 border border-red-200">
                  <h2 className="text-lg font-semibold text-red-700 mb-2">Error</h2>
                  <p className="text-red-600">{error}</p>
                </div>
              )}
              
              {!isLoading && !error && result && (
                <div className="bg-white rounded-lg shadow-md p-6 animate-fadeIn">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Analysis Results</h2>
                  
                  <ScoreDisplay score={result.score} />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Suggestions</h3>
                      {result.suggestions.map((suggestion, index) => (
                        <SuggestionCard 
                          key={index} 
                          suggestion={suggestion} 
                          index={index}
                        />
                      ))}
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Resume Analysis</h3>
                      {result.reasoning.map((reasoning, index) => (
                        <ReasoningCard key={index} reasoning={reasoning} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalyzerPage;