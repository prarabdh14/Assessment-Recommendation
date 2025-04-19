import React from 'react';
import { motion } from 'framer-motion';
import { SearchIcon, RefreshCw, HistoryIcon } from 'lucide-react';
import { useAssessments } from '../context/AssessmentsContext';
import Results from './Results';

const Hero: React.FC = () => {
  const { 
    jobDescription, 
    setJobDescription, 
    searchHistory,
    searchAssessments, 
    isLoading,
    hasSearched,
    resetSearch,
    error
  } = useAssessments();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with job description:', jobDescription);
    
    if (jobDescription.trim() !== '') {
      try {
        await searchAssessments();
        console.log('Search completed successfully');
      } catch (err) {
        console.error('Error during search:', err);
      }
    }
  };

  const handleHistoryClick = async (query: string) => {
    console.log('History item clicked:', query);
    setJobDescription(query);
    try {
      await searchAssessments();
      console.log('History search completed successfully');
    } catch (err) {
      console.error('Error during history search:', err);
    }
  };

  return (
    <div className="min-h-screen w-full pt-20">
      {!hasSearched ? (
        <motion.div 
          className="container mx-auto px-4 py-16 md:py-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-3xl mx-auto text-center mb-12">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Find the <span className="text-primary-600">Perfect Assessment</span> for Your Job
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-secondary-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Enter your job description to discover the top 10 SHL assessments tailored to your hiring needs
            </motion.p>
            
            <motion.form 
              onSubmit={handleSubmit}
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="relative">
                <textarea
                  className="input min-h-36 p-5 text-base"
                  placeholder="Paste your job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  required
                ></textarea>
                
                <motion.button 
                  type="submit"
                  className="btn btn-primary absolute bottom-4 right-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isLoading || jobDescription.trim() === ''}
                >
                  {isLoading ? (
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <SearchIcon className="w-5 h-5 mr-2" />
                  )}
                  Find Assessments
                </motion.button>
              </div>
              
              {error && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                  {error}
                </div>
              )}
            </motion.form>
            
            {searchHistory.length > 0 && (
              <motion.div
                className="mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="flex items-center justify-center mb-3 text-sm text-secondary-500">
                  <HistoryIcon className="w-4 h-4 mr-2" />
                  <span>Recent Searches</span>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {searchHistory.map((query, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleHistoryClick(query)}
                      className="py-1 px-3 bg-secondary-100 hover:bg-secondary-200 rounded-full text-sm text-secondary-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {query.length > 30 ? query.substring(0, 30) + '...' : query}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
          
          <motion.div 
            className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {[
              {
                title: "Expert Assessments",
                description: "Access SHL's library of scientifically validated assessments trusted by Fortune 500 companies",
                icon: "🎯"
              },
              {
                title: "Tailored Matching",
                description: "Find the exact assessments that match your job requirements and skills needed",
                icon: "🔍"
              },
              {
                title: "Hire With Confidence",
                description: "Make data-driven hiring decisions with assessments proven to predict job performance",
                icon: "📊"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-secondary-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      ) : (
        <Results onNewSearch={() => resetSearch()} />
      )}
    </div>
  );
};

export default Hero;