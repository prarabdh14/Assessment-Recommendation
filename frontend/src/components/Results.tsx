import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftIcon, RefreshCw, FilterIcon } from 'lucide-react';
import { useAssessments } from '../context/AssessmentsContext';
import AssessmentCard from './AssessmentCard';

interface ResultsProps {
  onNewSearch: () => void;
}

const Results: React.FC<ResultsProps> = ({ onNewSearch }) => {
  const { results, isLoading, jobDescription } = useAssessments();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  
  // Extract unique categories for filtering
  const categories = Array.from(new Set(results.map(assessment => assessment.category)));
  
  // Filter results based on selected category
  const filteredResults = activeFilter === 'all' 
    ? results 
    : results.filter(assessment => assessment.category === activeFilter);

  const handleToggleExpand = (id: string) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      className="container mx-auto px-4 py-10 md:py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div className="mb-4 md:mb-0">
            <motion.button
              onClick={onNewSearch}
              className="mb-4 flex items-center text-primary-600 hover:text-primary-700 font-medium"
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              New Search
            </motion.button>
            <h2 className="text-2xl md:text-3xl font-bold mb-1">Top Assessment Matches</h2>
            <p className="text-secondary-600">
              Based on: "{jobDescription.length > 60 ? jobDescription.substring(0, 60) + '...' : jobDescription}"
            </p>
          </div>
          
          <div className="relative">
            <div className="flex items-center flex-wrap border border-secondary-200 bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  activeFilter === 'all' 
                    ? 'bg-primary-600 text-white' 
                    : 'text-secondary-600 hover:bg-secondary-100'
                }`}
              >
                All
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                    activeFilter === category
                      ? 'bg-primary-600 text-white' 
                      : 'text-secondary-600 hover:bg-secondary-100'
                  }`}
                >
                  {category}
                </button>
              ))}
              <div className="md:hidden ml-auto">
                <FilterIcon className="w-5 h-5 text-secondary-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-16">
          <RefreshCw className="w-10 h-10 text-primary-500 animate-spin" />
          <span className="ml-3 text-lg text-secondary-600">Finding the best assessments for you...</span>
        </div>
      ) : (
        <AnimatePresence>
          {filteredResults.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredResults.map((assessment) => (
                <AssessmentCard 
                  key={assessment.id} 
                  assessment={assessment} 
                  isExpanded={expandedCardId === assessment.id}
                  onToggleExpand={() => handleToggleExpand(assessment.id)}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-lg text-secondary-600">No assessments found for this filter.</p>
              <button 
                onClick={() => setActiveFilter('all')}
                className="mt-4 btn btn-primary"
              >
                View All Assessments
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export default Results;