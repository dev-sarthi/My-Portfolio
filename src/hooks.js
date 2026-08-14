import { useState, useEffect, useCallback } from 'react';

/**
 * Theme hook with localStorage persistence.
 * Returns [theme, toggleTheme] where theme is 'dark' | 'light'.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // localStorage not available
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return [theme, toggleTheme];
}

/**
 * Scroll state hook for navbar.
 */
export function useScrolled(offset = 30) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);

  return scrolled;
}

/**
 * IntersectionObserver-based reveal hook.
 * Call observe(ref) and check visibleSections.has(id).
 */
export function useReveal(threshold = 0.12) {
  const [visible, setVisible] = useState(new Set());

  const observe = useCallback(
    (el) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible((prev) => new Set([...prev, entry.target.id]));
            observer.unobserve(entry.target);
          }
        },
        { threshold }
      );
      observer.observe(el);
      return () => observer.disconnect();
    },
    [threshold]
  );

  return { visible, observe };
}
