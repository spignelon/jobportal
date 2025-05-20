import React, { useState } from 'react';
import Header from '../components/Header';
import JobSearchForm from '../components/JobSearchForm';
import JobCard from '../components/JobCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Job } from '../types';
import { searchJobs } from '../api/resumeApi';
import { Briefcase as BriefcaseBusiness } from 'lucide-react';

const JobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = async (query: string, location: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const jobResults = await searchJobs(query, location);
      setJobs(jobResults);
      setSearchPerformed(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setJobs([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activePage="jobs" />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Job Search</h1>
        <p className="text-gray-600 mb-6">
          Find job opportunities that match your skills and interests.
        </p>
        
        <JobSearchForm onSearch={handleSearch} isLoading={isLoading} />
        
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner size="large" text="Searching for jobs..." />
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 rounded-lg shadow-md p-6 border border-red-200">
            <h2 className="text-lg font-semibold text-red-700 mb-2">Error</h2>
            <p className="text-red-600">{error}</p>
          </div>
        )}
        
        {!isLoading && !error && searchPerformed && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Search Results
                <span className="ml-2 text-sm text-gray-500">({jobs.length} jobs found)</span>
              </h2>
            </div>
            
            {jobs.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <BriefcaseBusiness className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-500">
                  Try adjusting your search criteria or location to find more opportunities.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
                {jobs.map((job, index) => (
                  <JobCard key={index} job={job} />
                ))}
              </div>
            )}
          </>
        )}
        
        {!isLoading && !searchPerformed && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <BriefcaseBusiness className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Start your job search</h3>
            <p className="text-gray-500">
              Enter a job title and location above to find relevant job opportunities.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default JobsPage;