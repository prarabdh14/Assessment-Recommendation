import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Assessment } from '../types';

interface AssessmentCardProps {
  assessment: Assessment;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const AssessmentCard: React.FC<AssessmentCardProps> = ({ 
  assessment, 
  isExpanded,
  onToggleExpand
}) => {
  const {
    title,
    description,
    category,
    duration,
    skills,
    benefits,
    suitableFor,
    imageUrl
  } = assessment;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
      }
    }
  };

  const expandVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: { height: 'auto', opacity: 1 }
  };

  return (
    <motion.div 
      className="card overflow-hidden"
      variants={cardVariants}
      whileHover={{ y: -5 }}
      layout
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 bg-white/80 backdrop-blur-sm text-primary-700 text-sm font-medium rounded-full shadow-sm">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center text-secondary-500 text-sm mb-3">
          <Clock className="h-4 w-4 mr-1" />
          <span>{duration}</span>
        </div>
        
        <h3 className="text-xl font-semibold mb-2 text-secondary-900">{title}</h3>
        <p className="text-secondary-600 mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.slice(0, 3).map((skill, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded"
            >
              {skill}
            </span>
          ))}
          {skills.length > 3 && (
            <span className="px-2 py-1 bg-secondary-100 text-secondary-600 text-xs font-medium rounded">
              +{skills.length - 3} more
            </span>
          )}
        </div>
        
        <motion.div
          variants={expandVariants}
          initial="collapsed"
          animate={isExpanded ? "expanded" : "collapsed"}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="pt-4 border-t border-gray-100">
            <h4 className="font-medium text-secondary-800 mb-2">Benefits:</h4>
            <ul className="space-y-2 mb-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-primary-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-sm text-secondary-600">{benefit}</span>
                </li>
              ))}
            </ul>
            
            <h4 className="font-medium text-secondary-800 mb-2">Suitable For:</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {suitableFor.map((role, index) => (
                <span 
                  key={index} 
                  className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded"
                >
                  {role}
                </span>
              ))}
            </div>
            
            <button className="btn btn-primary w-full mt-2">
              Learn More
            </button>
          </div>
        </motion.div>
        
        <button 
          onClick={onToggleExpand}
          className="w-full text-center mt-4 text-primary-600 hover:text-primary-700 flex items-center justify-center"
        >
          <span className="text-sm font-medium mr-1">
            {isExpanded ? 'Show Less' : 'Show More'}
          </span>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default AssessmentCard;