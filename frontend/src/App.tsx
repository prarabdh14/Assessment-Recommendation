import React from 'react';
import { Helmet } from 'react-helmet';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import BackgroundElements from './components/BackgroundElements';
import { AnimatePresence } from 'framer-motion';
import { AssessmentsProvider } from './context/AssessmentsContext';

function App() {
  return (
    <AssessmentsProvider>
      <div className="flex flex-col min-h-screen">
        <Helmet>
          <title>SHL Assessment Finder | Find the Perfect Assessment for Your Job</title>
          <meta name="description" content="Find the top 10 related SHL assessments for your job description to help you hire the best candidates." />
        </Helmet>
        <BackgroundElements />
        <Header />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Hero />
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </AssessmentsProvider>
  );
}

export default App;