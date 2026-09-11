import { useEffect } from 'react';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/BrandIcons';
import { useNavigation } from '../hooks/useNavigation';
import { personalInfo, regions } from '../data';
import '../styles/hud.css';

export default function HUD() {
  const { activeRegion, navigateTo, navigateHome, isTransitioning } = useNavigation();

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeRegion) {
        navigateHome();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeRegion, navigateHome]);

  const activeRegionData = regions.find(r => r.id === activeRegion);

  return (
    <div className="hud">
      {/* Top bar — show nav when no region is active, back button when one is */}
      {activeRegion ? (
        <button
          className="hud-back"
          onClick={navigateHome}
          disabled={isTransitioning}
        >
          ← Back
        </button>
      ) : (
        <div className="hud-top">
          <div className="hud-logo">
            PARTH<span className="accent">.</span>
          </div>
          <div className="hud-nav">
            {regions.map((region) => (
              <button
                key={region.id}
                className={`hud-nav-btn${activeRegion === region.id ? ' active' : ''}`}
                onClick={() => navigateTo(region.id)}
                disabled={isTransitioning}
              >
                {region.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Center intro — only when no region is active */}
      <div className={`hud-intro${activeRegion ? ' hidden' : ''}`}>
        <h1 className="hud-intro-title">
          Inside My <span className="gradient-text">Brain</span>
        </h1>
        <p className="hud-intro-subtitle">{personalInfo.role} · {personalInfo.tagline}</p>
        <p className="hud-intro-hint">Click a node to explore</p>
      </div>

      {/* Region indicator — shown when a region is active */}
      {activeRegionData && (
        <div className={`hud-region-indicator${activeRegion ? ' visible' : ''}`}>
          <span
            className="hud-region-dot"
            style={{ background: activeRegionData.color }}
          />
          <span className="hud-region-label">{activeRegionData.label}</span>
        </div>
      )}

      {/* Social links — always visible */}
      <div className="hud-contact">
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hud-contact-link"
          aria-label="GitHub"
        >
          <GithubIcon size={18} />
        </a>
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hud-contact-link"
          aria-label="LinkedIn"
        >
          <LinkedinIcon size={18} />
        </a>
        <a
          href={`mailto:${personalInfo.email}`}
          className="hud-contact-link"
          aria-label="Email"
        >
          <Mail size={18} />
        </a>
      </div>
    </div>
  );
}
