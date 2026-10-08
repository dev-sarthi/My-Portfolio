import { useEffect } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import ProjectGallery from "./ProjectGallery";
import Skills from "./Skills";
import { About, Achievements, Contact, Footer, Leadership } from "./Sections";

export default function Portfolio() {
  const isHome =
    window.location.pathname === "/" ||
    window.location.pathname === "/index.html";
  useEffect(() => {
    if (!isHome || !window.location.hash) return;
    // The initial document may load before React creates the anchor target.
    const frame = requestAnimationFrame(() => {
      document
        .getElementById(window.location.hash.slice(1))
        ?.scrollIntoView({ behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, [isHome]);
  useEffect(() => {
    if (
      !isHome ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    )
      return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          // Animate visible content without ever hiding it behind a JS-dependent class.
          if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches)
            entry.target.animate?.(
              [
                { transform: "translateY(20px)", opacity: 0.72 },
                { transform: "translateY(0)", opacity: 1 },
              ],
              { duration: 650, easing: "cubic-bezier(.2,.7,.2,1)" },
            );
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1 },
    );
    document
      .querySelectorAll(
        ".section-heading, .project-card, .additional-card, .achievement-row, .leadership-grid",
      )
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [isHome]);
  if (!isHome)
    return (
      <main className="not-found">
        <a className="brand-mark" href="/">
          p<span>.</span>s
        </a>
        <p className="eyebrow">404 / A LITTLE OFF THE MAP</p>
        <h1>This path is still unexplored.</h1>
        <p>Let’s get you back to the work.</p>
        <a href="/" className="button primary">
          Back to portfolio ↗
        </a>
      </main>
    );
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <ProjectGallery />
        <Skills />
        <Achievements />
        <Leadership />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
