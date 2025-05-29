import React, { createContext, useState, useEffect } from 'react';

export const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('courseProgress');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('courseProgress', JSON.stringify(progress));
  }, [progress]);

  const calculateCourseProgress = (courseSlug) => {
    const courseKeys = Object.keys(progress).filter(key => key.startsWith(courseSlug));
    if (courseKeys.length === 0) return 0;
    
    const completed = courseKeys.filter(key => progress[key]).length;
    return Math.round((completed / courseKeys.length) * 100);
  };

  return (
    <ProgressContext.Provider value={{ progress, setProgress, calculateCourseProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}
