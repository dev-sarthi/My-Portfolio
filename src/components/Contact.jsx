import { useRef, useEffect } from 'react';
import { Mail, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { useReveal } from '../hooks';
import { personalInfo } from '../data';

export default function Contact() {
  const ref = useRef(null);
  const { visible, observe } = useReveal();

  useEffect(() => { observe(ref.current); }, [observe]);

  const show = visible.has('contact');

  return (
    <section className="section" id="contact" ref={ref}>
      <div className="container">
        <div className={`section-header reveal${show ? ' visible' : ''}`} style={{ textAlign: 'center' }}>
          <span className="section-label">Contact</span>
          <h2 className="section-title">Get in Touch</h2>
        </div>

        <div className={`contact-content reveal reveal-delay-2${show ? ' visible' : ''}`}>
          <p>
            I'm actively looking for internship opportunities in software development,
            full-stack, or frontend roles. Feel free to reach out!
          </p>

          <div className="contact-links">
            <a href={`mailto:${personalInfo.email}`} className="contact-link">
              <Mail size={18} />
              {personalInfo.email}
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <GithubIcon size={18} />
              GitHub
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <LinkedinIcon size={18} />
              LinkedIn
            </a>
          </div>

          <a href={`mailto:${personalInfo.email}`} className="btn btn-primary">
            <Send size={17} />
            Send Me a Message
          </a>
        </div>
      </div>
    </section>
  );
}
