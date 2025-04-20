import React, { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Shape properties
    const shapes = Array.from({ length: 20 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 60 + 20,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.15 + 0.05,
      type: Math.floor(Math.random() * 3), // 0: circle, 1: square, 2: triangle
    }));
    
    // Animation
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update shapes
      shapes.forEach(shape => {
        // Update position
        shape.x += shape.speedX;
        shape.y += shape.speedY;
        
        // Bounce off edges
        if (shape.x < 0 || shape.x > canvas.width) shape.speedX *= -1;
        if (shape.y < 0 || shape.y > canvas.height) shape.speedY *= -1;
        
        // Draw shape
        ctx.fillStyle = `rgba(0, 167, 111, ${shape.opacity})`;
        ctx.beginPath();
        
        if (shape.type === 0) {
          // Circle
          ctx.arc(shape.x, shape.y, shape.size / 2, 0, Math.PI * 2);
        } else if (shape.type === 1) {
          // Square
          ctx.rect(shape.x - shape.size / 2, shape.y - shape.size / 2, shape.size, shape.size);
        } else {
          // Triangle
          const height = shape.size * Math.sqrt(3) / 2;
          ctx.moveTo(shape.x, shape.y - height / 2);
          ctx.lineTo(shape.x - shape.size / 2, shape.y + height / 2);
          ctx.lineTo(shape.x + shape.size / 2, shape.y + height / 2);
        }
        
        ctx.closePath();
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed top-0 left-0 w-full h-full -z-10 ${className}`} 
    />
  );
};

export default AnimatedBackground;