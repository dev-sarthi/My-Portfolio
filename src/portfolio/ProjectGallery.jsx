import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Network,
  ShoppingBag,
  X,
  Zap,
} from "lucide-react";
import { additionalProjects, projects } from "./content";
import { ExternalLink, SectionHeading, Tags } from "./shared";

function ProjectArt({ kind }) {
  return (
    <div className={`project-art ${kind}`} aria-hidden="true">
      <span className="art-coordinate">
        {kind === "vigil"
          ? "SIGNAL / INTERPRET / ACT"
          : kind === "lifelens"
            ? "POSSIBILITIES, IN PERSPECTIVE"
            : "SMALL OBSERVATIONS. SHARED INSIGHT."}
      </span>
      {kind === "vigil" ? (
        <svg viewBox="0 0 600 300">
          <defs>
            <linearGradient id="signal">
              <stop stopColor="#405ff9" />
              <stop offset="1" stopColor="#78dfed" />
            </linearGradient>
          </defs>
          {[70, 110, 150, 190, 230].map((y) => (
            <path key={y} d={`M0 ${y} H600`} className="grid-path" />
          ))}
          <path
            d="M0 170 H70 L84 155 L96 184 L111 111 L130 216 L150 143 L168 170 H242 L270 134 L287 194 L312 68 L339 238 L367 123 L389 170 H456 L480 149 L504 188 L527 170 H600"
            stroke="url(#signal)"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="312" cy="68" r="7" fill="#84d9ff" />
          <circle
            cx="312"
            cy="68"
            r="19"
            stroke="#84d9ff"
            fill="none"
            opacity=".3"
          />
        </svg>
      ) : kind === "lifelens" ? (
        <div className="lens-composition">
          <i />
          <i />
          <i />
          <div className="lens-center">↗</div>
        </div>
      ) : (
        <svg viewBox="0 0 600 300">
          <g transform="translate(295 158) rotate(-30)">
            <path
              d="M0 104 C-160 15 -100 -98 0 -118 C105 -85 135 14 0 104Z"
              fill="#173c35"
              stroke="#77bba3"
              strokeWidth="1.2"
            />
            <path
              d="M0 125 V-94 M0 65 L-65 9 M0 24 L-67 -40 M0 -19 L-45 -73 M0 65 L63 9 M0 24 L66 -40 M0 -19 L44 -73"
              fill="none"
              stroke="#8fc6aa"
              strokeWidth="1"
            />
          </g>
          <circle
            cx="300"
            cy="150"
            r="130"
            fill="none"
            stroke="#457869"
            strokeDasharray="3 12"
          />
        </svg>
      )}
      <span className="art-caption-left">
        {kind === "vigil"
          ? "V / 01"
          : kind === "lifelens"
            ? "L / 02"
            : "P / 03"}
      </span>
      <span className="art-caption-right">
        {kind === "praniti" ? "CONCEPT EXPLORATION" : "SYSTEM EXPLORATION"}
      </span>
    </div>
  );
}

function ProjectDetail({ project, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    const node = dialog.current;
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    node.showModal();
    document.body.style.overflow = "hidden";
    const trapFocus = (event) => {
      if (event.key !== "Tab") return;
      const focusable = [
        ...node.querySelectorAll("a[href], button:not([disabled])"),
      ];
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    node.addEventListener("keydown", trapFocus);
    return () => {
      node.removeEventListener("keydown", trapFocus);
      node.close();
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="project-dialog"
      aria-labelledby="case-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const r = dialog.current.getBoundingClientRect();
          if (
            event.clientX < r.left ||
            event.clientX > r.right ||
            event.clientY < r.top ||
            event.clientY > r.bottom
          )
            onClose();
        }
      }}
    >
      <div className="dialog-top">
        <span className="eyebrow">PROJECT NOTES / {project.name}</span>
        <button
          autoFocus
          className="icon-button"
          onClick={onClose}
          aria-label="Close case study"
        >
          <X />
        </button>
      </div>
      <p className="project-status">{project.status}</p>
      <h2 id="case-title">
        {project.name}
        <span>{project.title}</span>
      </h2>
      <p className="case-contribution">
        <strong>My role</strong> {project.role}
      </p>
      <Tags items={project.technologies} />
      <ol className="architecture-flow" aria-label="Project workflow">
        {project.flow.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
      <div className="case-sections">
        {project.caseStudy.map(([title, copy], i) => (
          <section key={title}>
            <span className="mono">0{i + 1}</span>
            <div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          </section>
        ))}
      </div>
      <div className="project-links">
        {project.github && (
          <ExternalLink href={project.github}>Read the repository</ExternalLink>
        )}
        {project.demo && (
          <ExternalLink href={project.demo}>Explore live demo</ExternalLink>
        )}
        <button className="text-button" onClick={onClose}>
          Back to projects <ArrowRight size={16} />
        </button>
      </div>
    </dialog>
  );
}

function ProjectCard({ project, index, onSelect }) {
  return (
    <article className={`project-card project-${project.id}`}>
      <ProjectArt kind={project.id} />
      <div className="project-body">
        <div className="project-top">
          <span className="eyebrow">
            0{index + 1} / {project.category}
          </span>
          <ArrowUpRight size={23} aria-hidden="true" />
        </div>
        <h3>
          {project.name}
          <span>{project.title}</span>
        </h3>
        <p className="project-description">{project.description}</p>
        <p className="project-status">{project.status}</p>
        <Tags items={project.technologies} />
        <div className="project-role">
          <span>MY CONTRIBUTION</span>
          <p>{project.role}</p>
          <p className="contribution-detail">{project.contribution}</p>
        </div>
        {project.achievement && (
          <div className="project-achievement">
            <span>↗</span>
            {project.achievement}
          </div>
        )}
        <div className="project-links">
          <button
            className="text-button"
            onClick={() => onSelect(project)}
            aria-label={`View ${project.name} case study`}
          >
            View Case Study <ArrowRight size={16} />
          </button>
          {project.github && (
            <ExternalLink href={project.github}>GitHub</ExternalLink>
          )}
          {project.demo && (
            <ExternalLink href={project.demo}>Live demo</ExternalLink>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ProjectGallery() {
  const [selected, setSelected] = useState(null);
  return (
    <section
      id="projects"
      className="section-shell section-space"
      aria-labelledby="projects-title"
    >
      <SectionHeading
        number="02"
        eyebrow="SELECTED WORK"
        title={
          <span id="projects-title">
            Ideas, made tangible<span className="accent">.</span>
          </span>
        }
      >
        From intelligent infrastructure to everyday decisions. A closer look at
        what I’m building.
      </SectionHeading>
      <div className="project-grid">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onSelect={setSelected}
          />
        ))}
      </div>
      <div className="more-work-heading">
        <h3>More from the workbench</h3>
        <span className="mono">FULL-STACK EXPLORATIONS</span>
      </div>
      <div className="additional-grid">
        {additionalProjects.map((project) => {
          const Icon =
            project.icon === "cart"
              ? ShoppingBag
              : project.icon === "bolt"
                ? Zap
                : Network;
          return (
            <article className="additional-card" key={project.name}>
              <div className="additional-top">
                <Icon size={24} />
                <span className="mono">{project.number}</span>
              </div>
              <h4>{project.name}</h4>
              <p className="additional-title">{project.title}</p>
              <p>{project.description}</p>
              <Tags items={project.technologies} />
              <p className="additional-contribution">{project.contribution}</p>
              <ExternalLink href={project.github}>
                Explore repository
              </ExternalLink>
            </article>
          );
        })}
      </div>
      {selected && (
        <ProjectDetail project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
