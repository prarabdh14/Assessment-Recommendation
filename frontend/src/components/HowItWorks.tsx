import React from 'react';
import { FileText, Search, BarChart2, BookOpen } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <FileText className="h-10 w-10 text-white" />,
      title: 'Paste Job Description',
      description: 'Enter the full job description from the position you\'re applying for.'
    },
    {
      icon: <Search className="h-10 w-10 text-white" />,
      title: 'AI Analysis',
      description: 'Our AI analyzes the text to identify keywords, requirements, and industry-specific indicators.'
    },
    {
      icon: <BarChart2 className="h-10 w-10 text-white" />,
      title: 'Get Assessment Prediction',
      description: 'Receive a detailed prediction of which SHL assessments you\'re likely to encounter.'
    },
    {
      icon: <BookOpen className="h-10 w-10 text-white" />,
      title: 'Targeted Preparation',
      description: 'Use our tailored resources to prepare specifically for your predicted assessments.'
    }
  ];
  
  return (
    <section className="py-16 bg-neutral-50" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-800 mb-4">How It Works</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Our advanced AI predicts which SHL assessments you'll face based on job descriptions.
          </p>
        </div>
        
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-primary-200 -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-primary-500 flex items-center justify-center mb-6 shadow-lg">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2 text-center">{step.title}</h3>
                <p className="text-neutral-600 text-center">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <button className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors shadow-md">
            Try It Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;