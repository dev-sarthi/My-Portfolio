import { GraduationCap, Calendar, Award } from 'lucide-react';
import { education } from '../data';

export default function LearnPanel() {
  return (
    <>
      {/* ─── Education ─── */}
      <div className="panel-section">
        <h3 className="panel-section-title">Education</h3>

        <div className="panel-card">
          <div className="panel-education">
            <div className="panel-edu-icon">
              <GraduationCap size={22} />
            </div>
            <div className="panel-edu-info">
              <p className="panel-edu-degree">{education.degree}</p>
              <h3>{education.institution}</h3>
              <div className="panel-edu-meta">
                <div className="panel-edu-meta-item">
                  <Calendar size={14} />
                  <span>{education.duration}</span>
                </div>
                <div className="panel-edu-meta-item">
                  <Award size={14} />
                  <span>CGPA: {education.cgpa}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Learning Philosophy ─── */}
      <div className="panel-section">
        <h3 className="panel-section-title">Focus Areas</h3>

        <div className="panel-skills-grid">
          <div className="panel-skill-card">
            <h4>🤖 Artificial Intelligence</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
              Specializing in AI/ML as part of my core curriculum, with hands-on experience building intelligent systems.
            </p>
          </div>
          <div className="panel-skill-card">
            <h4>🌐 Full-Stack Development</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
              Building production-grade web applications from frontend to backend using modern frameworks.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
