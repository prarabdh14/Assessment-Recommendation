import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Assessment } from '../types';
import { mockAssessments } from '../data/mockAssessments';

interface AssessmentsContextType {
  jobDescription: string;
  setJobDescription: (value: string) => void;
  searchHistory: string[];
  addToSearchHistory: (query: string) => void;
  results: Assessment[];
  isLoading: boolean;
  hasSearched: boolean;
  searchAssessments: () => void;
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

  const addToSearchHistory = (query: string) => {
    if (query.trim() !== '' && !searchHistory.includes(query)) {
      setSearchHistory([query, ...searchHistory].slice(0, 5));
    }
  };

  const searchAssessments = () => {
    if (jobDescription.trim() === '') return;
    
    setIsLoading(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      // Simple algorithm to filter assessments based on job description keywords
      const keywords = jobDescription.toLowerCase().split(/\s+/);
      
      const scoredAssessments = mockAssessments.map(assessment => {
        // Calculate a relevance score based on keyword matches
        const titleMatches = keywords.filter(keyword => 
          assessment.title.toLowerCase().includes(keyword)
        ).length;
        
        const descriptionMatches = keywords.filter(keyword => 
          assessment.description.toLowerCase().includes(keyword)
        ).length;
        
        const categoryMatches = keywords.filter(keyword => 
          assessment.category.toLowerCase().includes(keyword)
        ).length;
        
        const skillMatches = assessment.skills.filter(skill => 
          keywords.some(keyword => skill.toLowerCase().includes(keyword))
        ).length;
        
        // Weight the different types of matches
        const score = 
          titleMatches * 3 + 
          descriptionMatches * 2 + 
          categoryMatches * 2 + 
          skillMatches * 1.5;
          
        return { ...assessment, relevanceScore: score };
      });
      
      // Sort by relevance score and take top 10
      const topResults = scoredAssessments
        .sort((a, b) => b.relevanceScore - a.relevanceScore)
        .slice(0, 10);
      
      setResults(topResults);
      setIsLoading(false);
      setHasSearched(true);
      addToSearchHistory(jobDescription);
    }, 1500);
  };

  const resetSearch = () => {
    setHasSearched(false);
    setResults([]);
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
        searchAssessments,
        resetSearch
      }}
    >
      {children}
    </AssessmentsContext.Provider>
  );
};