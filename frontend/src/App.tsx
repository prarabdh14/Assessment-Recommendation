import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AnimatedBackground from './components/AnimatedBackground';
import AssessmentForm from './components/AssessmentForm';
import ResultsDisplay from './components/ResultsDisplay';
import HowItWorks from './components/HowItWorks';
import Benefits from './components/Benefits';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { predictAssessment } from './services/api';
import type { Assessment } from './services/api';
import { Analytics } from "@vercel/analytics/react"


function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Assessment[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmitJobDescription = async (jobDescription: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const assessmentResults = await predictAssessment(jobDescription);
      setResults(assessmentResults);
    } catch (err) {
      console.error('Error fetching assessment prediction:', err);
      setError('Failed to get assessment recommendations. Please try again later.');
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AnimatedBackground />
      <Header />
      
      <main className="flex-grow">
        <Hero />
        
        <section id="assessment-form" className="py-16 bg-neutral-50 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-neutral-800 mb-4">Get Your Assessment Prediction</h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                Enter your job description below and our AI will analyze it to predict the SHL assessments you're likely to face.
              </p>
            </div>
            
            <AssessmentForm 
              onSubmit={handleSubmitJobDescription}
              isLoading={isLoading}
            />
            
            {error && (
              <div className="w-full max-w-2xl mx-auto mt-8 bg-red-50 text-red-700 p-4 rounded-lg border border-red-200">
                <p>{error}</p>
              </div>
            )}
            
            <ResultsDisplay results={results} />
          </div>
        </section>
        
        <HowItWorks />
        <Benefits />
        <FAQ />
      </main>
      
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;