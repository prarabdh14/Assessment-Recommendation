import React from 'react';
import { 
  TrendingUp, 
  Award, 
  Clock, 
  Target, 
  User, 
  BookOpen
} from 'lucide-react';

const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: <TrendingUp className="h-10 w-10 text-primary-500" />,
      title: 'Personalized Recommendations',
      description: 'Get tailored assessment recommendations based on your specific job description and requirements.'
    },
    {
      icon: <Award className="h-10 w-10 text-primary-500" />,
      title: 'AI-Powered Analysis',
      description: 'Our advanced AI analyzes job descriptions to match you with the most relevant SHL assessments.'
    },
    {
      icon: <Clock className="h-10 w-10 text-primary-500" />,
      title: 'Focused Preparation',
      description: 'Save time by preparing only for the assessments you\'re most likely to encounter.'
    },
    {
      icon: <Target className="h-10 w-10 text-primary-500" />,
      title: 'Assessment Insights',
      description: 'Get detailed information about each recommended assessment and why it matches your job.'
    },
    {
      icon: <User className="h-10 w-10 text-primary-500" />,
      title: 'Success Strategy',
      description: 'Receive preparation tips and strategies specific to your recommended assessments.'
    },
    {
      icon: <BookOpen className="h-10 w-10 text-primary-500" />,
      title: 'Comprehensive Coverage',
      description: 'We analyze and recommend from the full range of SHL assessment types.'
    }
  ];
  
  return (
    <section className="py-16 bg-white" id="benefits">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-800 mb-4">Why Use AssessPredict?</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Get personalized SHL assessment recommendations and prepare effectively for your job application.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-neutral-100"
            >
              <div className="rounded-full bg-primary-50 w-16 h-16 flex items-center justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">{benefit.title}</h3>
              <p className="text-neutral-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;