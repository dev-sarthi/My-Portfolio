import {
  Star, ExternalLink, CheckCircle2,
  Code2, Layout, Server, Database, GitBranch,
} from 'lucide-react';
import { GithubIcon } from '../components/BrandIcons';
import { projects, skills, workWith } from '../data';

const icons = { Code2, Layout, Server, Database, GitBranch };

export default function BuildPanel() {
  return (
    <>
      {/* ─── Featured Projects ─── */}
      <div className="panel-section">
        <h3 className="panel-section-title">Featured Projects</h3>

        {projects.map((project) => (
          <div key={project.title} className="panel-card">
            {project.featured && (
              <div className="panel-achievement-badge" style={{ color: 'var(--accent-cyan)' }}>
                <Star size={14} />
                Featured
              </div>
            )}

            <h3>{project.title}</h3>
            <p>{project.description}</p>

            {project.features && (
              <div className="panel-features">
                {project.features.map((f) => (
                  <div key={f} className="panel-feature">
                    <CheckCircle2 size={14} />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="panel-tags">
              {project.techStack.map((t) => (
                <span key={t} className="panel-tag">{t}</span>
              ))}
            </div>

            <div className="panel-links">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="panel-btn panel-btn-secondary"
                >
                  <GithubIcon size={15} />
                  GitHub
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="panel-btn panel-btn-primary"
                >
                  <ExternalLink size={15} />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ─── Skills ─── */}
      <div className="panel-section">
        <h3 className="panel-section-title">Skills</h3>

        <div className="panel-skills-grid">
          {skills.map((skill) => {
            const Icon = icons[skill.icon];
            return (
              <div key={skill.category} className="panel-skill-card">
                <h4>
                  {Icon && <Icon size={16} className="panel-skill-icon" />}
                  {skill.category}
                </h4>
                <div className="panel-tags">
                  {skill.items.map((item) => (
                    <span key={item} className="panel-tag">{item}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Tech Stack ─── */}
      <div className="panel-section">
        <h3 className="panel-section-title">Toolkit</h3>

        <div className="panel-tags" style={{ gap: '8px' }}>
          {workWith.map((item) => (
            <span key={item.name} className="panel-tag" style={{ fontSize: '0.78rem', padding: '6px 14px' }}>
              {item.icon} {item.name}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
