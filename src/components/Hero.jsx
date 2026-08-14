import { FolderKanban, Send } from 'lucide-react';
import { personalInfo } from '../data';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Open to Internship Opportunities
          </div>

          <h1>{personalInfo.name}</h1>

          <p className="hero-role">
            <span className="accent">{personalInfo.role}</span> · {personalInfo.tagline}
          </p>

          <p className="hero-description">{personalInfo.heroDescription}</p>

          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">
              <FolderKanban size={17} />
              View Projects
            </a>
            <a href="#contact" className="btn btn-secondary">
              <Send size={17} />
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
