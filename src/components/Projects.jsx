import { useRef, useEffect } from 'react';
import { Star, ExternalLink, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { useReveal } from '../hooks';
import { projects } from '../data';

export default function Projects() {
  const ref = useRef(null);
  const { visible, observe } = useReveal();

  useEffect(() => { observe(ref.current); }, [observe]);

  const show = visible.has('projects');

  return (
    <section className="section" id="projects" ref={ref}>
      <div className="container">
        <div className={`section-header reveal${show ? ' visible' : ''}`}>
          <span className="section-label">Projects</span>
          <h2 className="section-title">Featured Work</h2>
          <p className="section-description">
            Projects I've built that showcase my problem-solving and development skills.
          </p>
        </div>

        {projects.map((project) => (
          <div
            key={project.title}
            className={`card project-card reveal reveal-delay-2${show ? ' visible' : ''}`}
          >
            <div className="project-badge">
              <Star size={12} />
              Featured Project
            </div>

            <h3>{project.title}</h3>
            <p>{project.description}</p>

            {project.features && (
              <div className="project-features">
                {project.features.map((f) => (
                  <div key={f} className="project-feature">
                    <CheckCircle2 size={15} />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="project-tech">
              {project.techStack.map((t) => (
                <span key={t} className="project-tech-tag">{t}</span>
              ))}
            </div>

            <div className="project-links">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                >
                  <GithubIcon size={15} />
                  View on GitHub
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  <ExternalLink size={15} />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
