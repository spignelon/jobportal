import React from 'react';
import { FileText, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  activePage: 'analyzer' | 'jobs';
}

const Header: React.FC<HeaderProps> = ({ activePage }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-xl font-bold text-blue-600">Resume Analyzer</h1>
          </div>
          <nav className="flex items-center space-x-4">
            <Link
              to="/"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                activePage === 'analyzer'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <FileText className="mr-1.5 h-5 w-5" />
              Analyzer
            </Link>
            <Link
              to="/jobs"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                activePage === 'jobs'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Briefcase className="mr-1.5 h-5 w-5" />
              Jobs
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;