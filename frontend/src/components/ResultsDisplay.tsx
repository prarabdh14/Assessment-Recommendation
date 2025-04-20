import React from 'react';
import { CheckCircle, Info, List, Clock, Globe, Link } from 'lucide-react';
import type { Assessment } from '../services/api';

interface ResultsDisplayProps {
  results: Assessment[] | null;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  if (!results || results.length === 0) return null;
  
  return (
    <div className="w-full max-w-2xl mx-auto mt-8 bg-white rounded-xl shadow-xl p-6 md:p-8 animate-fadeIn">
      <div className="mb-6 text-center">
        <div className="inline-flex items-center justify-center p-2 bg-primary-50 rounded-full mb-4">
          <CheckCircle className="h-8 w-8 text-primary-500" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-800">Assessment Recommendations</h2>
        <p className="text-neutral-600 mt-2">
          Based on the job description, here are the recommended SHL assessments:
        </p>
      </div>
      
      {results[0] && (
        <div className="bg-primary-50 border border-primary-100 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <div className="mr-3 mt-1">
              <Info className="h-5 w-5 text-primary-500" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-800">Top Recommended Assessment</h3>
              <p className="text-neutral-700">
                <span className="font-medium">{results[0].name}</span>
              </p>
              <div className="flex flex-wrap mt-2 text-sm text-neutral-600">
                {results[0].duration && (
                  <div className="flex items-center mr-4 mt-1">
                    <Clock className="h-4 w-4 mr-1 text-primary-500" />
                    <span>{results[0].duration}</span>
                  </div>
                )}
                <div className="flex items-center mt-1">
                  <Globe className="h-4 w-4 mr-1 text-primary-500" />
                  <span>Remote Testing: {results[0].remote_testing}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div>
        <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center">
          <List className="mr-2 h-5 w-5 text-primary-500" />
          All Recommended Assessments
        </h3>
        
        <div className="space-y-4">
          {results.map((assessment, index) => (
            <div 
              key={index} 
              className="p-4 border border-neutral-200 rounded-lg hover:border-primary-200 hover:bg-primary-50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-neutral-800">{assessment.name}</h4>
                <div className="bg-primary-100 text-primary-700 rounded-full h-6 w-6 flex items-center justify-center text-xs font-semibold">
                  {index + 1}
                </div>
              </div>
              
              <div className="flex flex-wrap mt-2 text-sm text-neutral-600">
                {assessment.duration && (
                  <div className="flex items-center mr-4 mt-1">
                    <Clock className="h-4 w-4 mr-1 text-primary-500" />
                    <span>{assessment.duration}</span>
                  </div>
                )}
                <div className="flex items-center mr-4 mt-1">
                  <Globe className="h-4 w-4 mr-1 text-primary-500" />
                  <span>Remote Testing: {assessment.remote_testing}</span>
                </div>
                {assessment.url && (
                  <div className="flex items-center mt-1">
                    <Link className="h-4 w-4 mr-1 text-primary-500" />
                    <a 
                      href={assessment.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline"
                    >
                      Assessment URL
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 pt-4 border-t border-neutral-200 flex justify-center">
        <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
          Get Detailed Preparation Guide
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;