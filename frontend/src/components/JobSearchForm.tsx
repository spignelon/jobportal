import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface JobSearchFormProps {
  onSearch: (query: string, location: string) => void;
  isLoading: boolean;
}

const JobSearchForm: React.FC<JobSearchFormProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('India');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query, location);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Find Relevant Jobs</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="search-query" className="block text-sm font-medium text-gray-700 mb-1">
            Job Title or Keywords
          </label>
          <input
            type="text"
            id="search-query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Software Engineer, Designer, etc."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={isLoading}
          />
        </div>
        
        <div>
          <label htmlFor="search-location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            id="search-location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, State, or Country"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={isLoading}
          />
        </div>
      </div>
      
      <button
        type="submit"
        disabled={isLoading || !query.trim()}
        className={`w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          isLoading || !query.trim() ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        <Search className="w-4 h-4 mr-2" />
        {isLoading ? 'Searching...' : 'Search Jobs'}
      </button>
    </form>
  );
};

export default JobSearchForm;