import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePortfolioStore } from '../../../store/usePortfolioStore';

const INTRO_STEPS = [
  { id: 'init', text: 'INITIALIZING...', delay: 0 },
  { id: 'neural', text: 'NEURAL NETWORK ........ ✓', delay: 800 },
  { id: 'memory', text: 'MEMORY MODULE ......... ✓', delay: 1400 },
  { id: 'build', text: 'BUILD MODULE .......... ✓', delay: 2000 },
  { id: 'learn', text: 'LEARN MODULE .......... ✓', delay: 2400 },
  { id: 'lead', text: 'LEAD MODULE ........... ✓', delay: 2800 },
  { id: 'welcome', text: 'WELCOME.', delay: 3600 },
  { id: 'entering', text: "ENTERING PARTH'S MIND...", delay: 4500 }
];

export function IntroSequence() {
  const isIntroComplete = usePortfolioStore((state) => state.isIntroComplete);
  const completeIntro = usePortfolioStore((state) => state.completeIntro);
  const [visibleSteps, setVisibleSteps] = useState([]);

  useEffect(() => {
    if (isIntroComplete) return;

    // We keep track of timeouts so we can clear them if the component unmounts or user skips
    const timeouts = [];

    INTRO_STEPS.forEach((step) => {
      const timeout = setTimeout(() => {
        setVisibleSteps((prev) => [...prev, step.id]);
      }, step.delay);
      timeouts.push(timeout);
    });

    // Auto complete after the last step is shown for a brief moment
    const completeTimeout = setTimeout(() => {
      completeIntro();
    }, 6000);
    timeouts.push(completeTimeout);

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [isIntroComplete, completeIntro]);

  if (isIntroComplete) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="intro-sequence"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, filter: 'blur(10px)' }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#020205',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'var(--accent-cyan)',
          fontFamily: 'monospace', // Terminal-like feel
          fontSize: '1.2rem',
          letterSpacing: '2px',
        }}
      >
        <div style={{ 
          width: '350px', 
          textAlign: 'left', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '15px',
          textShadow: '0 0 10px rgba(6, 182, 212, 0.5)'
        }}>
          {INTRO_STEPS.map((step) => (
            visibleSteps.includes(step.id) && (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  color: step.id === 'welcome' || step.id === 'entering' ? '#ffffff' : 'var(--accent-cyan)',
                  fontWeight: step.id === 'welcome' || step.id === 'entering' ? 'bold' : 'normal',
                  marginTop: step.id === 'welcome' ? '20px' : '0',
                  textShadow: step.id === 'welcome' || step.id === 'entering' ? '0 0 15px rgba(255, 255, 255, 0.8)' : '0 0 10px rgba(6, 182, 212, 0.5)'
                }}
              >
                {step.text}
              </motion.div>
            )
          ))}
        </div>

        {/* Skippable functionality */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          onClick={completeIntro}
          style={{
            position: 'absolute',
            bottom: '40px',
            background: 'transparent',
            border: '1px solid var(--text-muted)',
            color: 'var(--text-muted)',
            padding: '8px 20px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            letterSpacing: '3px',
            borderRadius: '4px',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.borderColor = '#ffffff'; }}
          onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--text-muted)'; }}
        >
          [ SKIP SEQUENCE ]
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}
