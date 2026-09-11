import { createContext, useContext, useState, useCallback } from 'react';

const NavigationContext = createContext(null);

export function NavigationProvider({ children }) {
  const [activeRegion, setActiveRegion] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigateTo = useCallback((regionId) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveRegion(regionId);
    // Transition duration matches camera animation
    setTimeout(() => setIsTransitioning(false), 1200);
  }, [isTransitioning]);

  const navigateHome = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveRegion(null);
    setTimeout(() => setIsTransitioning(false), 1200);
  }, [isTransitioning]);

  return (
    <NavigationContext.Provider
      value={{ activeRegion, isTransitioning, navigateTo, navigateHome }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNavigation must be used within NavigationProvider');
  return ctx;
}
