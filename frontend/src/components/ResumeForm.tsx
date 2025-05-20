import React, { useState } from 'react';
import { Upload, FileText } from 'lucide-react';
import { FormData } from '../types';

interface ResumeFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<FormData>({
    job: '',
    resume: null,
  });
  const [fileName, setFileName] = useState<string>('');
  const [errors, setErrors] = useState<{ job?: string; resume?: string }>({});

  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, job: e.target.value });
    if (e.target.value) {
      setErrors({ ...errors, job: undefined });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (file.type !== 'application/pdf') {
        setErrors({ ...errors, resume: 'Please upload a PDF file' });
        return;
      }
      
      setFormData({ ...formData, resume: file });
      setFileName(file.name);
      setErrors({ ...errors, resume: undefined });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { job?: string; resume?: string } = {};
    if (!formData.job.trim()) {
      newErrors.job = 'Job description is required';
    }
    
    if (!formData.resume) {
      newErrors.resume = 'Resume PDF is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Upload Resume & Job Description</h2>
      
      <div className="mb-6">
        <label htmlFor="job-description" className="block text-sm font-medium text-gray-700 mb-1">
          Job Description
        </label>
        <textarea
          id="job-description"
          rows={6}
          value={formData.job}
          onChange={handleJobDescriptionChange}
          placeholder="Paste the job description here..."
          className={`w-full px-3 py-2 border ${
            errors.job ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
          disabled={isLoading}
        ></textarea>
        {errors.job && <p className="mt-1 text-sm text-red-600">{errors.job}</p>}
      </div>
      
      <div className="mb-6">
        <label htmlFor="resume-upload" className="block text-sm font-medium text-gray-700 mb-1">
          Resume (PDF)
        </label>
        <div className="relative">
          <div
            className={`flex items-center justify-center w-full border-2 border-dashed ${
              errors.resume ? 'border-red-300' : 'border-gray-300'
            } rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition-colors`}
          >
            <input
              type="file"
              id="resume-upload"
              accept=".pdf"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isLoading}
            />
            <div className="text-center">
              {fileName ? (
                <div className="flex items-center justify-center">
                  <FileText className="h-10 w-10 text-blue-500" />
                  <div className="ml-3 text-left">
                    <p className="text-sm font-medium text-gray-900">{fileName}</p>
                    <p className="text-xs text-gray-500">Click to change file</p>
                  </div>
                </div>
              ) : (
                <div>
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-1 text-sm text-gray-500">
                    Drag and drop your resume or click to browse
                  </p>
                  <p className="text-xs text-gray-400 mt-1">PDF files only</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {errors.resume && <p className="mt-1 text-sm text-red-600">{errors.resume}</p>}
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          isLoading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? 'Analyzing...' : 'Analyze Resume'}
      </button>
    </form>
  );
};

export default ResumeForm;