import React from 'react';
import { motion } from 'framer-motion';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin,
  TreePine
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <Facebook size={18} />, href: '#', label: 'Facebook' },
    { icon: <Twitter size={18} />, href: '#', label: 'Twitter' },
    { icon: <Linkedin size={18} />, href: '#', label: 'LinkedIn' },
    { icon: <Instagram size={18} />, href: '#', label: 'Instagram' },
  ];

  const footerLinks = [
    {
      title: 'Products',
      links: [
        { name: 'Cognitive Tests', href: '#' },
        { name: 'Personality Assessments', href: '#' },
        { name: 'Skills Tests', href: '#' },
        { name: 'Leadership Assessments', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', href: '#' },
        { name: 'Guides', href: '#' },
        { name: 'Case Studies', href: '#' },
        { name: 'Webinars', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Contact', href: '#' },
        { name: 'Privacy Policy', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <TreePine className="h-8 w-8 text-primary-600 mr-2" />
              <span className="text-xl font-bold text-primary-700">SHL Finder</span>
            </div>
            <p className="text-secondary-600 mb-6 max-w-md">
              Find the perfect SHL assessments for your hiring needs. Our tailored recommendations help you identify the best candidates and make data-driven decisions.
            </p>
            <div className="flex space-x-3 mb-6">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-600 hover:bg-primary-100 hover:text-primary-600 transition-colors"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
            <div className="space-y-3">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-primary-600 mt-0.5 mr-3" />
                <span className="text-secondary-600">contact@shlfinder.com</span>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-primary-600 mt-0.5 mr-3" />
                <span className="text-secondary-600">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary-600 mt-0.5 mr-3" />
                <span className="text-secondary-600">123 Assessment Street, San Francisco, CA 94103</span>
              </div>
            </div>
          </div>

          {footerLinks.map((column, columnIndex) => (
            <div key={columnIndex}>
              <h3 className="text-lg font-semibold mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <motion.a
                      href={link.href}
                      className="text-secondary-600 hover:text-primary-600 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-100 text-center text-secondary-500 text-sm">
          <p>© {currentYear} SHL Assessment Finder. All rights reserved. This is a demo site.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;