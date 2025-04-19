import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftIcon, RefreshCw, ArrowUpDown, ExternalLink } from 'lucide-react';
import { useAssessments } from '../context/AssessmentsContext';

interface ResultsProps {
  onNewSearch: () => void;
}

type SortField = 'relevanceScore' | 'title' | 'category' | 'duration' | 'jobLevel';
type SortDirection = 'asc' | 'desc';

const Results: React.FC<ResultsProps> = ({ onNewSearch }) => {
  const { results, isLoading, jobDescription } = useAssessments();
  const [sortField, setSortField] = useState<SortField>('relevanceScore');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedResults = [...results].sort((a, b) => {
    const multiplier = sortDirection === 'asc' ? 1 : -1;
    const fieldA = a[sortField];
    const fieldB = b[sortField];

    if (typeof fieldA === 'number' && typeof fieldB === 'number') {
      return (fieldA - fieldB) * multiplier;
    }
    return String(fieldA).localeCompare(String(fieldB)) * multiplier;
  });

  const SortButton: React.FC<{ field: SortField; label: string }> = ({ field, label }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center space-x-1 font-semibold hover:text-primary-600"
    >
      <span>{label}</span>
      <ArrowUpDown className={`w-4 h-4 ${sortField === field ? 'text-primary-600' : 'text-gray-400'}`} />
    </button>
  );

  return (
    <motion.div 
      className="container mx-auto px-4 py-10 md:py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="mb-8">
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

      {isLoading ? (
        <div className="flex justify-center items-center py-16">
          <RefreshCw className="w-10 h-10 text-primary-500 animate-spin" />
          <span className="ml-3 text-lg text-secondary-600">Finding the best assessments for you...</span>
        </div>
      ) : (
        <AnimatePresence>
          {sortedResults.length > 0 ? (
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <SortButton field="relevanceScore" label="Match %" />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <SortButton field="title" label="Assessment" />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <SortButton field="category" label="Category" />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <SortButton field="duration" label="Duration" />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <SortButton field="jobLevel" label="Job Level" />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Skills
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Remote
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedResults.slice(0, 10).map((assessment, index) => (
                    <tr 
                      key={assessment.id}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {assessment.relevanceScore.toFixed(1)}%
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">
                            {assessment.title}
                          </div>
                          {assessment.description && (
                            <div className="ml-2 text-sm text-gray-500">
                              <ExternalLink className="w-4 h-4 cursor-pointer hover:text-primary-600" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                          {assessment.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {assessment.duration}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {assessment.jobLevel}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {assessment.skills.slice(0, 3).map((skill, i) => (
                            <span key={i} className="px-2 py-1 text-xs rounded bg-secondary-100 text-secondary-800">
                              {skill}
                            </span>
                          ))}
                          {assessment.skills.length > 3 && (
                            <span className="px-2 py-1 text-xs rounded bg-secondary-100 text-secondary-800">
                              +{assessment.skills.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {assessment.remoteTestingAvailable ? 'Yes' : 'No'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-lg text-secondary-600">No assessments found.</p>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export default Results;