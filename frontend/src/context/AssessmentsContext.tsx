import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';
import { Assessment } from '../types';

const API_URL = 'http://127.0.0.1:5000/api';

interface AssessmentsContextType {
  jobDescription: string;
  setJobDescription: (value: string) => void;
  searchHistory: string[];
  addToSearchHistory: (query: string) => void;
  results: Assessment[];
  isLoading: boolean;
  hasSearched: boolean;
  error: string | null;
  searchAssessments: () => Promise<void>;
  resetSearch: () => void;
}

const AssessmentsContext = createContext<AssessmentsContextType | undefined>(undefined);

export const useAssessments = () => {
  const context = useContext(AssessmentsContext);
  if (context === undefined) {
    throw new Error('useAssessments must be used within an AssessmentsProvider');
  }
  return context;
};

export const AssessmentsProvider = ({ children }: { children: ReactNode }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [results, setResults] = useState<Assessment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addToSearchHistory = (query: string) => {
    if (query.trim() !== '' && !searchHistory.includes(query)) {
      setSearchHistory([query, ...searchHistory].slice(0, 5));
    }
  };

  interface ApiResponse {
    success: boolean;
    recommendations: any[];
  }
  
  const searchAssessments = async () => {
    if (jobDescription.trim() === '') {
      setError('Please enter a job description');
      return;
    }
  
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await axios.post<ApiResponse>(`${API_URL}/recommend`, {
        job_description: jobDescription,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
  
      const data = response.data;
      console.log("API response:", data);
  
      if (!data.success) {
        throw new Error('Server returned failure');
      }
  
      if (!Array.isArray(data.recommendations)) {
        throw new Error('Invalid or missing recommendations from server');
      }
  
      const transformedResults: Assessment[] = data.recommendations.map((rec: any) => ({
        id: rec.id || String(Math.random()),
        title: rec.title || 'Unknown Assessment',
        description: rec.description || '',
        category: rec.category || 'Assessment',
        duration: typeof rec.duration === 'string' ? rec.duration : 'Not specified',
        skills: Array.isArray(rec.skills) ? rec.skills : [],
        benefits: Array.isArray(rec.benefits) ? rec.benefits : [],
        suitableFor: Array.isArray(rec.suitableFor)
          ? rec.suitableFor
          : (Array.isArray(rec.suitable_for) ? rec.suitable_for : []),
        imageUrl: rec.imageUrl || rec.image_url || '',
        jobLevel: typeof rec.jobLevel === 'string' ? rec.jobLevel : 'Not specified',
        remoteTestingAvailable: Boolean(rec.remoteTestingAvailable),
        relevanceScore: typeof rec.similarity_score === 'number' ? rec.similarity_score * 100 : 0,
      }));
  
      console.log("Transformed results:", transformedResults);
  
      setResults(transformedResults);
      setHasSearched(true);
      addToSearchHistory(jobDescription);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'An unexpected error occurred.';
      setError(errorMessage);
      setResults([]);
      console.error("Error during search:", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetSearch = () => {
    setHasSearched(false);
    setResults([]);
    setError(null);
  };

  return (
    <AssessmentsContext.Provider 
      value={{
        jobDescription,
        setJobDescription,
        searchHistory,
        addToSearchHistory,
        results,
        isLoading,
        hasSearched,
        error,
        searchAssessments,
        resetSearch
      }}
    >
      {children}
    </AssessmentsContext.Provider>
  );
};
