import React from 'react';
import { BookOpen, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-primary-500" />
          <span className="text-xl font-semibold text-primary-500">AssessPredict</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="#how-it-works" className="text-neutral-700 hover:text-primary-500 transition-colors">
            How It Works
          </a>
          <a href="#benefits" className="text-neutral-700 hover:text-primary-500 transition-colors">
            Benefits
          </a>
          <a href="#faq" className="text-neutral-700 hover:text-primary-500 transition-colors">
            FAQ
          </a>
          <a href="#contact" className="text-neutral-700 hover:text-primary-500 transition-colors">
            Contact
          </a>
        </nav>
        
        <div className="hidden md:block">
          <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
            Sign In
          </button>
        </div>
        
        {/* Mobile Menu Button */}
        <button className="md:hidden text-neutral-700" onClick={toggleMenu}>
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a 
              href="#how-it-works" 
              className="text-neutral-700 py-2" 
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#benefits" 
              className="text-neutral-700 py-2" 
              onClick={() => setIsMenuOpen(false)}
            >
              Benefits
            </a>
            <a 
              href="#faq" 
              className="text-neutral-700 py-2" 
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </a>
            <a 
              href="#contact" 
              className="text-neutral-700 py-2" 
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            <button className="mt-2 w-full px-4 py-2 bg-primary-500 text-white rounded-md">
              Sign In
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;