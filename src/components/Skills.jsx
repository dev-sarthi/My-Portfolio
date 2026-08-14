import { useRef, useEffect } from 'react';
import { Code2, Layout, Server, Database, GitBranch } from 'lucide-react';
import { useReveal } from '../hooks';
import { skills } from '../data';

const icons = { Code2, Layout, Server, Database, GitBranch };

export default function Skills() {
  const ref = useRef(null);
  const { visible, observe } = useReveal();

  useEffect(() => { observe(ref.current); }, [observe]);

  const show = visible.has('skills');

  return (
    <section className="section" id="skills" ref={ref}>
      <div className="container">
        <div className={`section-header reveal${show ? ' visible' : ''}`}>
          <span className="section-label">Skills</span>
          <h2 className="section-title">Technologies I Use</h2>
          <p className="section-description">
            The tools and frameworks I work with to build modern web applications.
          </p>
        </div>

        <div className="skills-grid">
          {skills.map((skill, i) => {
            const Icon = icons[skill.icon];
            return (
              <div
                key={skill.category}
                className={`card skill-card reveal reveal-delay-${i + 1}${show ? ' visible' : ''}`}
              >
                <div className="skill-card-header">
                  <div className="skill-icon">
                    {Icon && <Icon size={20} />}
                  </div>
                  <h3>{skill.category}</h3>
                </div>
                <div className="skill-tags">
                  {skill.items.map((item) => (
                    <span key={item} className="skill-tag">{item}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
