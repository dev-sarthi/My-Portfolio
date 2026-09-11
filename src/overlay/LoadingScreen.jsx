import { useState, useEffect } from 'react';
import '../styles/loading.css';

export default function LoadingScreen() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Give the 3D scene time to initialize
    const timer = setTimeout(() => setLoaded(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loading-screen${loaded ? ' loaded' : ''}`}>
      <div className="loading-brain">
        <div className="loading-ring" />
        <div className="loading-ring" />
        <div className="loading-ring" />
        <div className="loading-core" />
      </div>
      <div className="loading-text">
        Entering mind
        <span className="loading-dots">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </div>
    </div>
  );
}
