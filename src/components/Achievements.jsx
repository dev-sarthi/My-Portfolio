import { useRef, useEffect } from 'react';
import { Trophy } from 'lucide-react';
import { useReveal } from '../hooks';
import { achievements } from '../data';

export default function Achievements() {
  const ref = useRef(null);
  const { visible, observe } = useReveal();

  useEffect(() => { observe(ref.current); }, [observe]);

  const show = visible.has('achievements');

  return (
    <section className="section" id="achievements" ref={ref}>
      <div className="container">
        <div className={`section-header reveal${show ? ' visible' : ''}`}>
          <span className="section-label">Achievements</span>
          <h2 className="section-title">Recognition</h2>
        </div>

        {achievements.map((a) => (
          <div
            key={a.title}
            className={`card achievement-card reveal reveal-delay-2${show ? ' visible' : ''}`}
          >
            <div className="achievement-icon">
              <Trophy size={26} />
            </div>

            <h3>{a.title}</h3>
            <p className="achievement-subtitle">{a.subtitle}</p>
            <p className="achievement-description">{a.description}</p>

            <div className="achievement-stats">
              {a.stats.map((s) => (
                <div key={s.label} className="achievement-stat">
                  <span className="achievement-stat-value">{s.value}</span>
                  <span className="achievement-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
