import {
  ArrowUpRight,
  Code2,
  Cpu,
  GraduationCap,
  Layers,
  Server,
} from "lucide-react";
import { achievements, leadership, profile } from "./content";
import { SectionHeading, SocialLinks } from "./shared";

export function About() {
  return (
    <section
      id="about"
      className="section-shell section-space about-section"
      aria-labelledby="about-title"
    >
      <SectionHeading
        number="01"
        eyebrow="THE PERSON BEHIND THE CODE"
        title={
          <span id="about-title">
            Curiosity is the starting point.
            <br />
            <span className="muted">Building is how I learn.</span>
          </span>
        }
      />
      <div className="about-layout">
        <div className="about-note">
          <span className="mono">
            THINK IN SYSTEMS.
            <br />
            CARE ABOUT THE DETAILS.
          </span>
          <div className="about-monogram" aria-hidden="true">
            ps<span>↗</span>
          </div>
        </div>
        <div className="about-copy">
          <p>
            I’m Parth, a Computer Science student specializing in AI/ML. I’m
            interested in the space where intelligent systems meet useful,
            thoughtfully built products.
          </p>
          <p>
            I learn by making things: mapping out an idea, connecting the
            frontend to the backend, and figuring out why the pieces don’t quite
            fit yet. Hackathons and team projects have taught me to ask better
            questions, document decisions, and keep iterating.
          </p>
          <div className="disciplines">
            {[
              [Code2, "Frontend"],
              [Server, "Backend"],
              [Cpu, "AI/ML"],
              [Layers, "System Architecture"],
            ].map(([Icon, name]) => (
              <span key={name}>
                <Icon size={18} aria-hidden="true" />
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Achievements() {
  return (
    <section
      id="achievements"
      className="section-shell section-space"
      aria-labelledby="achievements-title"
    >
      <SectionHeading
        number="04"
        eyebrow="MILESTONES"
        title={<span id="achievements-title">Progress, with perspective.</span>}
      >
        A few moments from building, competing, and learning alongside others.
      </SectionHeading>
      <div className="achievement-list">
        {achievements.map((item) => (
          <article className="achievement-row" key={item.title}>
            <div className="achievement-mark">
              {item.mark}
              <span>{item.suffix}</span>
            </div>
            <div>
              <p className="eyebrow">{item.label}</p>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </div>
            <span className="mono achievement-year">{item.year}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Leadership() {
  return (
    <section
      id="experience"
      className="section-shell section-space"
      aria-labelledby="leadership-title"
    >
      <SectionHeading
        number="05"
        eyebrow="EXPERIENCE & LEADERSHIP"
        title={<span id="leadership-title">Good work is a team effort.</span>}
      >
        Campus leadership, community involvement, and teaching—experiences
        beyond the code.
      </SectionHeading>
      <div className="leadership-grid">
        {leadership.map((item, i) => (
          <article key={item.organization}>
            <div className="eyebrow">
              0{i + 1} / {item.label}
            </div>
            <h3>{item.organization}</h3>
            <p className="leadership-role">{item.role}</p>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
      <div className="education">
        <GraduationCap size={29} aria-hidden="true" />
        <div>
          <span className="eyebrow">EDUCATION</span>
          <h3>Hi-Tech Institute of Engineering and Technology</h3>
          <p>B.Tech in Computer Science & Engineering (AI/ML)</p>
        </div>
        <span className="mono">2025 — 2029</span>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section
      id="contact"
      className="contact-section"
      aria-labelledby="contact-title"
    >
      <div className="section-shell">
        <p className="eyebrow">06 / LET’S MAKE SOMETHING MEANINGFUL</p>
        <h2 id="contact-title">
          Have an idea
          <br />
          <span>worth building?</span>
        </h2>
        <div className="contact-bottom">
          <div>
            <p>
              I’m interested in thoughtful software projects, engineering
              collaborations, and opportunities to learn by building.
            </p>
            <SocialLinks />
          </div>
          <a className="contact-cta" href={`mailto:${profile.email}`}>
            <span>
              Email Me<small>{profile.email}</small>
            </span>
            <ArrowUpRight size={32} />
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="section-shell footer">
      <a className="brand-mark" href="#home" aria-label="Back to top">
        p<span>.</span>s
      </a>
      <span>© {new Date().getFullYear()} Parth Sarthi</span>
      <a href="#home">BACK TO TOP ↑</a>
    </footer>
  );
}
