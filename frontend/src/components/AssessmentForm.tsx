import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface AssessmentFormProps {
  onSubmit: (jobDescription: string) => void;
  isLoading: boolean;
}

const AssessmentForm: React.FC<AssessmentFormProps> = ({ onSubmit, isLoading }) => {
  const [jobDescription, setJobDescription] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (jobDescription.trim() && !isLoading) {
      onSubmit(jobDescription);
    }
  };
  
  return (
    <form 
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-xl p-6 md:p-8 transform transition-transform duration-300 hover:scale-[1.01]"
    >
      <h2 className="text-2xl font-bold text-neutral-800 mb-6 text-center">
        Find Your Best-Match SHL Assessments
      </h2>
      
      <div className="mb-6">
        <label 
          htmlFor="jobDescription" 
          className="block text-sm font-medium text-neutral-700 mb-2"
        >
          Enter Job Description
        </label>
        <textarea
          id="jobDescription"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here to get personalized assessment recommendations..."
          className="w-full h-40 p-4 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow"
          required
        />
        <p className="mt-2 text-xs text-neutral-500">
          For best results, include the full job description, including skills, responsibilities, and requirements.
        </p>
      </div>
      
      <button
        type="submit"
        disabled={isLoading || !jobDescription.trim()}
        className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 ${
          isLoading || !jobDescription.trim()
            ? 'bg-neutral-400 cursor-not-allowed'
            : 'bg-primary-500 hover:bg-primary-600 shadow-lg hover:shadow-xl'
        }`}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin mr-2 h-5 w-5" />
            Analyzing Description...
          </>
        ) : (
          <>
            <Search className="mr-2 h-5 w-5" />
            Get Assessment Recommendations
          </>
        )}
      </button>
      
      <p className="mt-4 text-sm text-neutral-500 text-center">
        Our AI will analyze your job description and recommend the most suitable SHL assessments for your application.
      </p>
    </form>
  );
};

export default AssessmentForm;