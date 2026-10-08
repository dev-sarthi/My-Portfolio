import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, GitBranch, ArrowLeft } from 'lucide-react';
import { usePortfolioStore } from '../../../store/usePortfolioStore';
import { projects } from '../../../data';

export function ProjectPanel() {
  const currentScene = usePortfolioStore((state) => state.currentScene);
  const navigateBack = usePortfolioStore((state) => state.navigateBack);

  // Find if current scene matches a project
  const project = projects.find(p => p.id === currentScene);

  return (
    <AnimatePresence>
      {project && (
        <motion.article
          key="project-panel"
          aria-labelledby="project-title"
          initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="side-panel"
        >
          <div style={{ marginBottom: '30px' }}>
            <span style={{ 
              color: 'var(--accent-cyan)', 
              fontSize: '0.85rem', 
              letterSpacing: '2px', 
              textTransform: 'uppercase' 
            }}>
              {project.category}
            </span>
            <h1 id="project-title" style={{ 
              fontSize: '2.5rem', 
              margin: '5px 0 10px 0', 
              background: 'var(--gradient-neural)', 
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {project.title}
            </h1>
            
            <div style={{ display: 'flex', gap: '15px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              {project.role && <span>ROLE: <strong style={{color: 'var(--text-secondary)'}}>{project.role}</strong></span>}
              {project.status && <span>STATUS: <strong style={{color: 'var(--text-secondary)'}}>{project.status}</strong></span>}
            </div>
            
            {project.achievement && (
              <div style={{ marginTop: '10px', color: 'var(--accent-amber)', fontSize: '0.9rem' }}>
                ★ {project.achievement}
              </div>
            )}
          </div>

          <p style={{ 
            color: 'var(--text-primary)', 
            fontSize: '1rem', 
            lineHeight: '1.6', 
            marginBottom: '30px' 
          }}>
            {project.detailedDescription || project.shortDescription}
          </p>

          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ 
              fontSize: '0.85rem', 
              color: 'var(--text-muted)', 
              letterSpacing: '1px', 
              marginBottom: '15px' 
            }}>
              TECHNOLOGIES
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {project.technologies.map(tech => (
                <span key={tech} style={{
                  padding: '4px 10px',
                  fontSize: '0.8rem',
                  background: 'var(--bg-glass)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-secondary)'
                }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Spacer to push buttons to the bottom or let them flow naturally */}
          <div style={{ flexGrow: 1 }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
            {project.liveDemoUrl && (
              <a 
                href={project.liveDemoUrl} 
                target="_blank" 
                rel="noreferrer"
                aria-label={`View live demo of ${project.title}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px',
                  background: 'rgba(6, 182, 212, 0.1)',
                  border: '1px solid var(--accent-cyan)',
                  color: 'var(--accent-cyan)',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: '600',
                  transition: 'var(--transition)'
                }}
              >
                <ExternalLink size={18} aria-hidden="true" />
                VIEW LIVE
              </a>
            )}
            
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noreferrer"
                aria-label={`View GitHub repository for ${project.title}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px',
                  background: 'var(--bg-glass)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  borderRadius: 'var(--radius-sm)',
                  transition: 'var(--transition)'
                }}
              >
                <GitBranch size={18} aria-hidden="true" />
                VIEW GITHUB
              </a>
            )}

            <button 
              onClick={() => navigateBack()}
              aria-label="Close project details and return to mind"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              <ArrowLeft size={16} aria-hidden="true" />
              BACK TO MIND
            </button>
          </div>
        </motion.article>
      )}
    </AnimatePresence>
  );
}
