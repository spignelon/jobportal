export interface Suggestion {
  title: string;
  content: string;
  courses: {
    title: string;
    link: string;
  }[];
}

export interface Reasoning {
  title: string;
  content: string;
}

export interface AnalysisResult {
  score: number;
  suggestions: Suggestion[];
  reasoning: Reasoning[];
}

export interface Job {
  title: string;
  company: string;
  location: string;
  description: string;
  date_posted: number;
  job_url: string;
  site: string;
  company_logo?: string;
  is_remote?: boolean;
  job_type?: string;
}

export interface FormData {
  job: string;
  resume: File | null;
}