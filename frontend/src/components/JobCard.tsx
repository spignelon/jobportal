import React from 'react';
import { ExternalLink, MapPin, Calendar, Briefcase } from 'lucide-react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  // Format date string from timestamp
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  // Truncate long descriptions
  const truncateDescription = (text: string, maxLength: number = 200): string => {
    if (!text) return '';
    return text.length > maxLength
      ? text.substring(0, maxLength) + '...'
      : text;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
            <p className="text-base text-gray-700">{job.company}</p>
          </div>
          
          {job.company_logo && (
            <img 
              src={job.company_logo} 
              alt={`${job.company} logo`} 
              className="w-12 h-12 object-contain"
            />
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-1" />
            {job.location}
            {job.is_remote && (
              <span className="ml-1 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                Remote
              </span>
            )}
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(job.date_posted)}
          </div>
          
          {job.job_type && (
            <div className="flex items-center text-sm text-gray-500">
              <Briefcase className="w-4 h-4 mr-1" />
              {job.job_type}
            </div>
          )}
        </div>
        
        {job.description && (
          <div className="mt-4 text-sm text-gray-600">
            {truncateDescription(job.description)}
          </div>
        )}
        
        <div className="mt-4 flex justify-end">
          <a
            href={job.job_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View Job
            <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default JobCard;