'use client';
import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setWidth(Math.min(scrolled, 100));
    };

    window.addEventListener('scroll', handleScroll);
    // Initial calculation
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 h-3 z-[9999] bg-pastel-pink border-b-[3px] border-r-[3px] border-dashed border-black-coral/50 transition-all duration-150 shadow-[0_2px_4px_rgba(0,0,0,0.1)] opacity-90"
      style={{ 
        width: `${width}%`,
        clipPath: 'polygon(0 0, 100% 10%, 98% 100%, 0 100%)' // Tape jagged edge
      }}
    />
  );
}
