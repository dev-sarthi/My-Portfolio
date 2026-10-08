import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { usePortfolioStore } from '../../../store/usePortfolioStore';
import { learnNodes } from '../../../data';

export function SkillPanel() {
  const currentScene = usePortfolioStore((state) => state.currentScene);
  const navigateBack = usePortfolioStore((state) => state.navigateBack);

  // Find if current scene matches a skill node
  const skill = learnNodes.find(s => s.id === currentScene);

  return (
    <AnimatePresence>
      {skill && (
        <motion.div
          key="skill-panel"
          initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="side-panel"
        >
          <div style={{ marginBottom: '30px' }}>
            <span style={{ 
              color: 'var(--accent-purple)', 
              fontSize: '0.85rem', 
              letterSpacing: '2px', 
              textTransform: 'uppercase' 
            }}>
              {skill.category}
            </span>
            <h1 style={{ 
              fontSize: '2.2rem', 
              margin: '5px 0 10px 0', 
              color: '#ffffff'
            }}>
              {skill.title}
            </h1>
          </div>

          <p style={{ 
            color: 'var(--text-primary)', 
            fontSize: '1rem', 
            lineHeight: '1.6', 
            marginBottom: '30px' 
          }}>
            {skill.description}
          </p>

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
