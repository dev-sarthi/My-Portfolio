import { useState } from "react";
import { skills } from "./content";
import { SectionHeading } from "./shared";

export default function Skills() {
  const [active, setActive] = useState(1);
  return (
    <section
      id="skills"
      className="section-shell section-space"
      aria-labelledby="skills-title"
    >
      <SectionHeading
        number="03"
        eyebrow="THE TOOLKIT"
        title={<span id="skills-title">Different tools. One mindset.</span>}
      >
        Understand the problem. Choose the right tools. Keep learning.
      </SectionHeading>
      <div className="skills-layout">
        <div className="skills-orbit">
          <div className="orbit-grid" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div className="skill-core" aria-hidden="true">
            {skills[active].symbol}
          </div>
          <div className="skill-focus" aria-live="polite">
            <span className="eyebrow">CURRENT FOCUS</span>
            <h3>{skills[active].name}</h3>
            <p>{skills[active].description}</p>
          </div>
          <span className="orbit-note mono">EXPLORE A CATEGORY →</span>
        </div>
        <div className="skill-grid">
          {skills.map((skill, i) => (
            <button
              type="button"
              key={skill.name}
              className={`skill-category ${i === active ? "selected" : ""}`}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
            >
              <span className="skill-category-top">
                <span className="skill-symbol" aria-hidden="true">
                  {skill.symbol}
                </span>
                <span className="mono">0{i + 1}</span>
              </span>
              <span className="skill-name">{skill.name}</span>
              <span className="skill-list">{skill.items.join(" · ")}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
