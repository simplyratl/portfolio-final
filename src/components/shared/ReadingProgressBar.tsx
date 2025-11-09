'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      // Get the total scrollable height
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      // Calculate the current scroll progress
      const scrolled = window.scrollY;
      const progress = (scrolled / scrollHeight) * 100;

      setProgress(progress);
    };

    // Update on scroll
    window.addEventListener('scroll', updateProgress);

    // Initial calculation
    updateProgress();

    // Cleanup
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className='fixed top-0 left-0 z-50 h-[2px] w-full bg-transparent'>
      <div
        className='from-primary/40 to-primary h-full bg-gradient-to-r transition-all duration-150 ease-out'
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
