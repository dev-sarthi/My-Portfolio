import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { usePortfolioStore } from '../../../store/usePortfolioStore';
import { leadershipNodes, achievements } from '../../../data';

export function LeadPanel() {
  const currentScene = usePortfolioStore((state) => state.currentScene);
  const navigateBack = usePortfolioStore((state) => state.navigateBack);

  // Find if current scene matches a leadership node or an achievement
  const node = leadershipNodes.find(n => n.id === currentScene) || achievements.find(a => a.id === currentScene);

  return (
    <AnimatePresence>
      {node && (
        <motion.div
          key="lead-panel"
          initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="side-panel"
        >
          <div style={{ marginBottom: '30px' }}>
            <span style={{ 
              color: 'var(--accent-amber)', 
              fontSize: '0.85rem', 
              letterSpacing: '2px', 
              textTransform: 'uppercase' 
            }}>
              {node.type || node.subtitle || 'Leadership'}
            </span>
            <h1 style={{ 
              fontSize: '2.2rem', 
              margin: '5px 0 10px 0', 
              color: '#ffffff'
            }}>
              {node.organization || node.title}
            </h1>
            
            {node.role && (
              <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                Role: <strong style={{ color: 'var(--accent-amber)' }}>{node.role}</strong>
              </div>
            )}
          </div>

          <p style={{ 
            color: 'var(--text-primary)', 
            fontSize: '1rem', 
            lineHeight: '1.6', 
            marginBottom: '30px' 
          }}>
            {node.description}
          </p>

          {node.highlights && (
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ 
                fontSize: '0.85rem', 
                color: 'var(--text-muted)', 
                letterSpacing: '1px', 
                marginBottom: '10px' 
              }}>
                HIGHLIGHTS
              </h3>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {node.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>
          )}

          {node.stats && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
              {node.stats.map((stat, i) => (
                <div key={i} style={{ 
                  background: 'var(--bg-glass)', 
                  padding: '15px', 
                  borderRadius: 'var(--radius-md)', 
                  border: '1px solid var(--border)' 
                }}>
                  <div style={{ fontSize: '1.5rem', color: 'var(--accent-amber)', fontWeight: 'bold' }}>{stat.value}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          <div style={{ flexGrow: 1 }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
            <button 
              onClick={() => navigateBack()}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px',
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                borderRadius: 'var(--radius-sm)',
                transition: 'var(--transition)'
              }}
            >
              <ArrowLeft size={16} />
              RETURN
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
