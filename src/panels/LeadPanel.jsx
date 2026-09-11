import { Trophy } from 'lucide-react';
import { achievements, personalInfo } from '../data';

export default function LeadPanel() {
  return (
    <>
      {/* ─── About ─── */}
      <div className="panel-section">
        <h3 className="panel-section-title">About Me</h3>

        <div className="panel-about-text">
          {personalInfo.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      {/* ─── Achievements ─── */}
      <div className="panel-section">
        <h3 className="panel-section-title">Achievements</h3>

        {achievements.map((a) => (
          <div key={a.title} className="panel-card">
            <div
              className="panel-achievement-badge"
              style={{ color: 'var(--accent-amber)' }}
            >
              <Trophy size={16} />
              {a.subtitle}
            </div>

            <h3>{a.title}</h3>
            <p>{a.description}</p>

            <div className="panel-stats">
              {a.stats.map((s) => (
                <div key={s.label} className="panel-stat">
                  <span
                    className="panel-stat-value"
                    style={{ color: 'var(--accent-amber)' }}
                  >
                    {s.value}
                  </span>
                  <span className="panel-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
