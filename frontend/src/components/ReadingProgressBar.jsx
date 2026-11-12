import React, { useState, useEffect } from 'react';

export const ReadingProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scrolled = (totalScroll / windowHeight) * 100;
        setScrollProgress(scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent">
      <div
        className="h-full bg-electric transition-all duration-75 ease-out shadow-sm relative"
        style={{ width: `${scrollProgress}%` }}
      >
        <div className="absolute right-0 top-0 bottom-0 w-2 bg-pulse shadow-[0_0_8px_#D7FF64]" />
      </div>
    </div>
  );
};
