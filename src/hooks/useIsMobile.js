import { useState, useEffect } from 'react';

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Initial check
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
    setIsMobile(mediaQuery.matches);

    // Event listener for subsequent changes
    const handler = (e) => setIsMobile(e.matches);
    
    // Modern API with fallback for older browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, [breakpoint]);

  return isMobile;
}
