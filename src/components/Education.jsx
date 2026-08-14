import { useRef, useEffect } from 'react';
import { GraduationCap, Calendar, Award } from 'lucide-react';
import { useReveal } from '../hooks';
import { education } from '../data';

export default function Education() {
  const ref = useRef(null);
  const { visible, observe } = useReveal();

  useEffect(() => { observe(ref.current); }, [observe]);

  const show = visible.has('education');

  return (
    <section className="section" id="education" ref={ref}>
      <div className="container">
        <div className={`section-header reveal${show ? ' visible' : ''}`}>
          <span className="section-label">Education</span>
          <h2 className="section-title">Academic Background</h2>
        </div>

        <div className={`card education-card reveal reveal-delay-2${show ? ' visible' : ''}`}>
          <div className="education-icon">
            <GraduationCap size={24} />
          </div>
          <div className="education-info">
            <p className="education-degree">{education.degree}</p>
            <h3>{education.institution}</h3>
            <div className="education-meta">
              <div className="education-meta-item">
                <Calendar size={15} />
                <span>{education.duration}</span>
              </div>
              <div className="education-meta-item">
                <Award size={15} />
                <span>CGPA: {education.cgpa}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
