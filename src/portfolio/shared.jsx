import { ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../components/BrandIcons";
import { profile } from "./content";

export function ExternalLink({ href, children, className = "", ...props }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...props}
    >
      {children}
      <ArrowUpRight size={16} aria-hidden="true" />
    </a>
  );
}

export function SocialLinks() {
  return (
    <div className="social-links">
      <ExternalLink href={profile.github}>
        <GithubIcon size={17} aria-hidden="true" />
        GitHub
      </ExternalLink>
      <ExternalLink href={profile.linkedin}>
        <LinkedinIcon size={16} aria-hidden="true" />
        LinkedIn
      </ExternalLink>
      <a href={`mailto:${profile.email}`}>
        <Mail size={17} aria-hidden="true" />
        Email
        <ArrowUpRight size={16} aria-hidden="true" />
      </a>
    </div>
  );
}

export function SectionHeading({ number, eyebrow, title, children }) {
  return (
    <div className="section-heading">
      <div className="eyebrow">
        <span>{number} /</span> {eyebrow}
      </div>
      <div className="heading-row">
        <h2>{title}</h2>
        {children && <p>{children}</p>}
      </div>
    </div>
  );
}

export function Tags({ items }) {
  return (
    <ul className="tags" aria-label="Technologies">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
