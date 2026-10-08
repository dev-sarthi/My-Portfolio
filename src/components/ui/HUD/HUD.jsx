import { usePortfolioStore } from '../../../store/usePortfolioStore';
import { personalInfo } from '../../../data';

export function HUD() {
  const currentScene = usePortfolioStore((state) => state.currentScene);
  const navigationPath = usePortfolioStore((state) => state.navigationPath);
  const navigate = usePortfolioStore((state) => state.navigate);
  const navigateToCenter = usePortfolioStore((state) => state.navigateToCenter);
  const navigateBack = usePortfolioStore((state) => state.navigateBack);
  const setActiveOverlay = usePortfolioStore((state) => state.setActiveOverlay);

  const getBreadcrumb = () => {
    return navigationPath.map(scene => {
      if (scene === 'CENTER') return 'MIND';
      return scene.toUpperCase();
    }).join(' / ');
  };

  return (
    <header className="hud-container" aria-label="Main Portfolio Navigation">
      {/* TOP ROW */}
      <div className="hud-top-row">
        
        {/* TOP LEFT: Brand & Location */}
        <div style={{ pointerEvents: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h1 style={{ 
            fontSize: '1.2rem', 
            fontWeight: '600',
            letterSpacing: '3px', 
            color: '#ffffff',
            margin: 0
          }}>
            {personalInfo.name.toUpperCase()}
          </h1>
          <div style={{ 
            fontSize: '0.8rem', 
            letterSpacing: '2px', 
            color: 'var(--text-muted)',
            textTransform: 'uppercase'
          }}>
            INSIDE MY BRAIN
          </div>

          <div 
            aria-live="polite"
            style={{ 
              marginTop: '20px',
              fontSize: '0.75rem', 
              letterSpacing: '1px', 
              color: 'var(--accent-cyan)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <span>CURRENT LOCATION: {getBreadcrumb()}</span>
          </div>

          {/* Navigation Controls (Subtle) */}
          <nav aria-label="Breadcrumb Navigation" style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
            {navigationPath.length > 1 && (
              <button 
                onClick={() => navigateBack()}
                aria-label="Go back to previous region"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  letterSpacing: '1px',
                  padding: 0,
                  transition: 'color 0.2s ease'
                }}
                onMouseOver={e => e.currentTarget.style.color = '#ffffff'}
                onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                [ ← BACK ]
              </button>
            )}

            {currentScene !== 'CENTER' && (
              <button 
                onClick={() => navigateToCenter()}
                aria-label="Return to central mind view"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  letterSpacing: '1px',
                  padding: 0,
                  transition: 'color 0.2s ease'
                }}
                onMouseOver={e => e.currentTarget.style.color = '#ffffff'}
                onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                [ RETURN TO MIND ]
              </button>
            )}
          </nav>
        </div>

        {/* TOP RIGHT: Global Pages */}
        <nav aria-label="Global Overlays" className="hud-top-right">
          <OverlayButton label="ABOUT" onClick={() => setActiveOverlay('ABOUT')} />
          <OverlayButton label="RESUME" onClick={() => setActiveOverlay('RESUME')} />
          <OverlayButton label="CONTACT" onClick={() => setActiveOverlay('CONTACT')} />
        </nav>
      </div>

      {/* BOTTOM ROW: Major Regions Navigation */}
      <nav aria-label="Region Navigation" className="hud-bottom-row">
        <RegionButton id="BUILD" label="BUILD" onClick={() => navigate('BUILD')} active={navigationPath.includes('BUILD')} />
        <RegionButton id="LEARN" label="LEARN" onClick={() => navigate('LEARN')} active={navigationPath.includes('LEARN')} />
        <RegionButton id="LEAD" label="LEAD" onClick={() => navigate('LEAD')} active={navigationPath.includes('LEAD')} />
      </nav>
    </header>
  );
}

function OverlayButton({ label, onClick }) {
  return (
    <button 
      onClick={onClick}
      style={{
        background: 'transparent',
        border: 'none',
        color: 'var(--text-secondary)',
        fontSize: '0.75rem',
        letterSpacing: '2px',
        cursor: 'pointer',
        padding: 0,
        transition: 'color 0.3s ease'
      }}
      onMouseOver={e => e.currentTarget.style.color = '#ffffff'}
      onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}
    >
      {label}
    </button>
  );
}

function RegionButton({ id, label, onClick, active }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'transparent',
        border: 'none',
        color: active ? '#ffffff' : 'var(--text-muted)',
        fontSize: '0.85rem',
        letterSpacing: '3px',
        cursor: 'pointer',
        position: 'relative',
        padding: '5px 0',
        transition: 'color 0.3s ease'
      }}
      onMouseOver={e => { if (!active) e.currentTarget.style.color = 'var(--text-secondary)' }}
      onMouseOut={e => { if (!active) e.currentTarget.style.color = 'var(--text-muted)' }}
    >
      {label}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '1px',
        background: active ? 'var(--accent-cyan)' : 'transparent',
        transition: 'background 0.3s ease'
      }} />
    </button>
  );
}
