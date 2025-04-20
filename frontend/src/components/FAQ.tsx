import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, toggleOpen }) => {
  return (
    <div className="border-b border-neutral-200 last:border-b-0">
      <button
        className="flex justify-between items-center w-full py-4 text-left"
        onClick={toggleOpen}
      >
        <h3 className="text-lg font-medium text-neutral-800">{question}</h3>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-primary-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-primary-500" />
        )}
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 pb-4' : 'max-h-0'
        }`}
      >
        <p className="text-neutral-600">{answer}</p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs = [
    {
      question: 'How accurate are the assessment predictions?',
      answer: 'Our prediction algorithm has been trained on thousands of job descriptions and their corresponding SHL assessments. We typically achieve 85-90% accuracy in predicting the correct assessment type based on the job description provided.'
    },
    {
      question: 'What types of SHL assessments can you predict?',
      answer: 'We can predict all major SHL assessment types, including numerical reasoning, verbal reasoning, inductive reasoning, deductive reasoning, personality questionnaires, situational judgment tests, and more.'
    },
    {
      question: 'How long does it take to get results?',
      answer: 'Our AI analysis typically takes just 5-10 seconds to process your job description and generate accurate assessment predictions.'
    },
    {
      question: 'Do you offer preparation materials for SHL assessments?',
      answer: 'Yes! After receiving your prediction, you can access our comprehensive preparation guides, practice tests, and tips specifically tailored to the assessment types you\'re likely to encounter.'
    },
    {
      question: 'Is my job description data secure?',
      answer: 'Absolutely. We take data privacy seriously. Your job description is processed securely, never shared with third parties, and can be deleted from our systems upon request.'
    },
    {
      question: 'Can I use this for any industry or job level?',
      answer: 'Yes, our prediction system works for all industries and job levels, from entry-level positions to executive roles. The more detailed the job description, the more accurate our predictions will be.'
    }
  ];
  
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <section className="py-16 bg-white" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-800 mb-4">Frequently Asked Questions</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Get answers to common questions about our SHL assessment prediction service.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              toggleOpen={() => toggleFAQ(index)}
            />
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-neutral-600">
            Still have questions?{' '}
            <a href="#contact" className="text-primary-500 hover:text-primary-600 font-medium">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;