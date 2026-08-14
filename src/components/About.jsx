import { useRef, useEffect } from 'react';
import { useReveal } from '../hooks';
import { personalInfo } from '../data';

export default function About() {
  const ref = useRef(null);
  const { visible, observe } = useReveal();

  useEffect(() => { observe(ref.current); }, [observe]);

  const show = visible.has('about');

  return (
    <section className="section" id="about" ref={ref}>
      <div className="container">
        <div className={`section-header reveal${show ? ' visible' : ''}`}>
          <span className="section-label">About</span>
          <h2 className="section-title">About Me</h2>
        </div>

        <div className="about-grid">
          <div className={`about-text reveal reveal-delay-1${show ? ' visible' : ''}`}>
            {personalInfo.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className={`about-highlights reveal reveal-delay-2${show ? ' visible' : ''}`}>
            <div className="card about-highlight">
              <span className="about-highlight-value">AI/ML</span>
              <span className="about-highlight-label">Specialization</span>
            </div>
            <div className="card about-highlight">
              <span className="about-highlight-value">Full-Stack</span>
              <span className="about-highlight-label">Development</span>
            </div>
            <div className="card about-highlight">
              <span className="about-highlight-value">#43</span>
              <span className="about-highlight-label">Global Rank</span>
            </div>
            <div className="card about-highlight">
              <span className="about-highlight-value">7.55</span>
              <span className="about-highlight-label">CGPA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
