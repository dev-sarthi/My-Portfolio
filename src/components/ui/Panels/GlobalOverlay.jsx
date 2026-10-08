import { AnimatePresence, motion } from 'framer-motion';
import { X, ExternalLink, GitBranch, Globe, Mail, FileText, Calendar, GraduationCap } from 'lucide-react';
import { usePortfolioStore } from '../../../store/usePortfolioStore';
import { personalInfo, contactInfo, socialLinks, resume, education } from '../../../data';

export function GlobalOverlay() {
  const activeOverlay = usePortfolioStore((state) => state.activeOverlay);
  const setActiveOverlay = usePortfolioStore((state) => state.setActiveOverlay);

  const closeOverlay = () => setActiveOverlay(null);

  const renderContent = () => {
    switch (activeOverlay) {
      case 'ABOUT':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '1rem', color: 'var(--accent-cyan)', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Who is {personalInfo.name.split(' ')[0]}?
            </h2>
            <h1 id="overlay-title-ABOUT" style={{ fontSize: '2rem', marginBottom: '10px', color: '#ffffff' }}>
              WHO IS {personalInfo.name.toUpperCase()}?
            </h1>
            <p style={{ color: 'var(--accent-cyan)', letterSpacing: '2px', marginBottom: '30px' }}>
              {personalInfo.tagline}
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {personalInfo.about.map((paragraph, index) => (
                <p key={index} style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Education Section */}
            <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <h2 style={{ fontSize: '1.2rem', marginBottom: '20px', color: 'var(--text-primary)', letterSpacing: '2px' }}>
                EDUCATION
              </h2>
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.03)', 
                padding: '20px', 
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--accent-cyan)', marginBottom: '5px' }}>
                  {education.degree}
                </h3>
                <div style={{ color: 'var(--text-primary)', fontWeight: '600', marginBottom: '10px' }}>
                  {education.institution}
                </div>
                <div style={{ display: 'flex', gap: '20px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Calendar size={14} /> {education.duration}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <GraduationCap size={14} /> CGPA: {education.cgpa}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'RESUME':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-start' }}>
            <h2 style={{ fontSize: '1rem', color: 'var(--accent-purple)', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Curriculum Vitae
            </h2>
            <h3 style={{ fontSize: '2rem', color: '#ffffff', margin: '10px 0' }}>
              Professional Experience
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.8', marginBottom: '20px' }}>
              Review my full academic background, technical skills, and detailed work history.
            </p>
            
            {resume.url ? (
              <a 
                href={resume.url} 
                target="_blank" 
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px 24px',
                  background: 'rgba(139, 92, 246, 0.1)',
                  border: '1px solid var(--accent-purple)',
                  color: 'var(--accent-purple)',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'var(--transition)'
                }}
              >
                <FileText size={20} />
                OPEN/DOWNLOAD RESUME
              </a>
            ) : (
              <div style={{
                padding: '20px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px dashed var(--border)',
                color: 'var(--text-secondary)',
                borderRadius: 'var(--radius-sm)'
              }}>
                Resume document is currently not attached in the repository data.
              </div>
            )}
          </div>
        );

      case 'CONTACT':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '1rem', color: 'var(--accent-amber)', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Get In Touch
            </h2>
            <h3 style={{ fontSize: '2rem', color: '#ffffff', margin: '10px 0' }}>
              Let's Connect
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.8', marginBottom: '20px' }}>
              Feel free to reach out for collaborations, opportunities, or just to say hello.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {contactInfo.email && (
                <a href={`mailto:${contactInfo.email}`} style={contactLinkStyle}>
                  <Mail size={20} color="var(--accent-amber)" />
                  <span style={{ color: '#ffffff' }}>{contactInfo.email}</span>
                </a>
              )}
              
              {socialLinks.github && (
                <a href={socialLinks.github} target="_blank" rel="noreferrer" style={contactLinkStyle}>
                  <GitBranch size={20} color="var(--accent-amber)" />
                  <span style={{ color: '#ffffff' }}>GitHub Profile</span>
                  <ExternalLink size={14} color="var(--text-muted)" style={{ marginLeft: 'auto' }} />
                </a>
              )}

              {socialLinks.linkedin && (
                <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" style={contactLinkStyle}>
                  <Globe size={20} color="var(--accent-amber)" />
                  <span style={{ color: '#ffffff' }}>LinkedIn Network</span>
                  <ExternalLink size={14} color="var(--text-muted)" style={{ marginLeft: 'auto' }} />
                </a>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const contactLinkStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px 20px',
    background: 'var(--bg-glass)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    textDecoration: 'none',
    transition: 'background 0.3s ease'
  };

  return (
    <AnimatePresence>
      {activeOverlay && (
        <motion.div
          key="global-overlay-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(2, 2, 5, 0.7)',
            backdropFilter: 'blur(8px)',
            zIndex: 100,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onClick={closeOverlay} // Close when clicking outside the panel
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`overlay-title-${activeOverlay}`}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()} // Prevent bubbling to the backdrop
            className="global-overlay-box"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveOverlay(null)}
              aria-label={`Close ${activeOverlay} overlay`}
              style={{
                position: 'absolute',
                top: '25px',
                right: '25px',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'color 0.2s ease',
                zIndex: 10
              }}
              onMouseOver={e => e.currentTarget.style.color = '#ffffff'}
              onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <X size={24} aria-hidden="true" />
            </button>

            {/* Dynamic Content */}
            {renderContent()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
