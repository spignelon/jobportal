import { AnalysisResult, Job } from '../types';

const API_URL = 'http://127.0.0.1:3001';

export const checkApiHealth = async (): Promise<{ status: string; service: string }> => {
  try {
    const response = await fetch(`${API_URL}/api/health`);
    if (!response.ok) {
      throw new Error('API health check failed');
    }
    return await response.json();
  } catch (error) {
    console.error('Health check error:', error);
    throw error;
  }
};

export const analyzeResume = async (
  job: string,
  resume: File
): Promise<AnalysisResult> => {
  try {
    const formData = new FormData();
    formData.append('job', job);
    formData.append('resume', resume);

    const response = await fetch(`${API_URL}/get-score`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to analyze resume');
    }

    return await response.json();
  } catch (error) {
    console.error('Resume analysis error:', error);
    throw error;
  }
};

export const searchJobs = async (
  query: string,
  location: string = 'India'
): Promise<Job[]> => {
  try {
    const response = await fetch(
      `${API_URL}/search-jobs?query=${encodeURIComponent(
        query
      )}&location=${encodeURIComponent(location)}`
    );

    if (!response.ok) {
      throw new Error('Failed to search jobs');
    }

    return await response.json();
  } catch (error) {
    console.error('Job search error:', error);
    throw error;
  }
};