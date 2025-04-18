import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const BackgroundElements: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Shapes with different colors from the theme
  const shapes = [
    { type: 'circle', color: 'bg-primary-100', size: 'w-24 h-24', animation: 'animate-float-slow', delay: 0 },
    { type: 'circle', color: 'bg-primary-200', size: 'w-16 h-16', animation: 'animate-float-medium', delay: 2 },
    { type: 'square', color: 'bg-primary-50', size: 'w-20 h-20', animation: 'animate-float-fast', delay: 1 },
    { type: 'square', color: 'bg-primary-100', size: 'w-12 h-12', animation: 'animate-float-medium', delay: 3 },
    { type: 'circle', color: 'bg-primary-50', size: 'w-32 h-32', animation: 'animate-float-slow', delay: 2.5 },
    { type: 'square', color: 'bg-primary-200', size: 'w-24 h-24', animation: 'animate-float-medium', delay: 1.5 },
  ];

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Position shapes randomly throughout the viewport
    const elements = container.children;
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement;
      const x = Math.random() * width * 0.8;
      const y = Math.random() * height * 0.8;
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
    }
  }, []);

  return (
    <div ref={containerRef} className="floating-bg">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full opacity-30 ${shape.size} ${shape.color} ${shape.animation}`}
          style={{
            borderRadius: shape.type === 'circle' ? '50%' : '15%',
            animationDelay: `${shape.delay}s`,
            filter: 'blur(1px)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2, delay: shape.delay / 2 }}
        />
      ))}
    </div>
  );
};

export default BackgroundElements;