import React from 'react';
import { ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800 mb-6 leading-tight">
              Find Your Perfect <span className="text-primary-500">SHL Assessment</span> Match
            </h1>
            
            <p className="text-lg text-neutral-600 mb-8 max-w-xl">
              Our AI analyzes job descriptions to predict which SHL assessments you should take, helping you prepare for the right tests and boost your chances of success.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#assessment-form" 
                className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors shadow-md flex items-center justify-center"
              >
                Find Your Assessment
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
              
              <a 
                href="#how-it-works" 
                className="px-6 py-3 bg-white text-primary-500 border border-primary-500 rounded-lg hover:bg-primary-50 transition-colors flex items-center justify-center"
              >
                Learn More
              </a>
            </div>
            
            <div className="mt-8 flex items-center space-x-4">
              <div className="flex -space-x-2">
                <img 
                  src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2" 
                  alt="User" 
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <img 
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2" 
                  alt="User" 
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <img 
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2" 
                  alt="User" 
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
              </div>
              <div className="text-sm text-neutral-600">
                Helping <span className="font-semibold">10,000+</span> candidates find their perfect assessment match
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 lg:pl-12">
            <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden border border-neutral-200">
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary-500"></div>
              <div className="p-6">
                <div className="flex space-x-2 absolute top-4 left-4">
                  <div className="w-3 h-3 rounded-full bg-neutral-300"></div>
                  <div className="w-3 h-3 rounded-full bg-neutral-300"></div>
                  <div className="w-3 h-3 rounded-full bg-neutral-300"></div>
                </div>
                
                <div className="pt-8 pb-4">
                  <h3 className="text-lg font-semibold text-neutral-800 mb-4">Assessment Recommendation</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-neutral-50 p-4 rounded-lg">
                      <p className="text-sm text-neutral-700">
                        <span className="font-semibold block mb-1">Job Description Analysis:</span>
                        Senior Financial Analyst position with focus on data analysis and reporting
                      </p>
                    </div>
                    
                    <div className="bg-neutral-50 p-4 rounded-lg">
                      <p className="text-sm text-neutral-700">
                        <span className="font-semibold block mb-1">Recommended Primary Assessment:</span>
                        <span className="text-primary-600">Numerical Reasoning (87% match)</span>
                      </p>
                      <div className="mt-2">
                        <div className="h-2 w-full bg-neutral-200 rounded-full overflow-hidden">
                          <div className="h-full bg-primary-500 rounded-full" style={{ width: '87%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
                      <p className="text-sm text-neutral-700">
                        <span className="font-semibold block mb-1">Additional Recommended Assessments:</span>
                        <span className="block text-neutral-600">Verbal Reasoning (54% match)</span>
                        <span className="block text-neutral-600">Inductive Reasoning (32% match)</span>
                        <span className="block text-neutral-600">Situational Judgement (19% match)</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary-100 rounded-full -mr-32 -mb-32 z-0"></div>
      <div className="absolute top-1/4 left-0 w-48 h-48 bg-primary-50 rounded-full -ml-24 z-0"></div>
    </section>
  );
};

export default Hero;