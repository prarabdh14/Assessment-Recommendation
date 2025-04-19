import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Assessment } from '../types';

const API_URL = 'http://localhost:5000/api';

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

  const searchAssessments = async () => {
    if (jobDescription.trim() === '') {
      setError('Please enter a job description');
      return;
    }
    
    console.log('Starting assessment search...');
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Making API request to:', `${API_URL}/recommend`);
      const response = await fetch(`${API_URL}/recommend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ job_description: jobDescription }),
      });

      console.log('API Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(
          `Failed to fetch recommendations: ${response.status} ${response.statusText}${
            errorText ? ` - ${errorText}` : ''
          }`
        );
      }

      const data = await response.json();
      console.log('API Response data:', data);
      
      if (!data.recommendations || !Array.isArray(data.recommendations)) {
        throw new Error('Invalid response format from server');
      }

      // Transform the backend response to match our Assessment type
      const transformedResults: Assessment[] = data.recommendations.map((rec: any) => {
        console.log('Processing recommendation:', rec);
        return {
          id: rec.id || String(Math.random()),
          title: rec.title || 'Unknown Assessment',
          description: rec.description || '',
          category: rec.category || 'General',
          duration: rec.duration || 'Not specified',
          skills: rec.skills || [],
          benefits: rec.benefits || [],
          suitableFor: rec.suitable_for || [],
          imageUrl: rec.image_url || '',
          jobLevel: rec.job_level || 'Not specified',
          remoteTestingAvailable: rec.remote_testing_available || false,
          relevanceScore: rec.similarity_score * 100, // Convert to percentage
        };
      });

      console.log('Transformed results:', transformedResults);
      setResults(transformedResults);
      setHasSearched(true);
      addToSearchHistory(jobDescription);
    } catch (err) {
      console.error('Search error:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'An unexpected error occurred while fetching recommendations. Please ensure the backend server is running.'
      );
      setResults([]);
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