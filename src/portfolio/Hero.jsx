import { Component, lazy, Suspense, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, FileText, Pause, Play } from "lucide-react";
import { profile } from "./content";
import { SocialLinks } from "./shared";

const HeroScene = lazy(() => import("./HeroScene"));

class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFail?.();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function StaticCore() {
  return (
    <div className="static-core" aria-hidden="true">
      <div className="core-orbit orbit-one" />
      <div className="core-orbit orbit-two" />
      <div className="core-orbit orbit-three" />
      <div className="core-sphere" />
    </div>
  );
}

export default function Hero() {
  const container = useRef(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [paused, setPaused] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [lost, setLost] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduced(query.matches);
    query.addEventListener("change", change);
    // Keep the first mobile render light; visitors explicitly opt into the 3D bundle.
    const autoLoad =
      !window.matchMedia("(max-width: 760px)").matches &&
      !navigator.connection?.saveData;
    const timer = autoLoad ? setTimeout(() => setReady(true), 150) : null;
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    observer.observe(container.current);
    return () => {
      clearTimeout(timer);
      query.removeEventListener("change", change);
      observer.disconnect();
    };
  }, []);
  return (
    <section
      className="hero section-shell"
      id="home"
      aria-labelledby="hero-title"
    >
      <div className="hero-topline">
        <span className="availability">
          <i />
          Open to ideas & opportunities
        </span>
        <span className="mono">PORTFOLIO / 2026</span>
      </div>
      <div className="hero-layout">
        <div className="hero-copy">
          <p className="eyebrow">
            AI/ML <b>•</b> FULL-STACK <b>•</b> SYSTEM DESIGN
          </p>
          <h1 id="hero-title">
            Hi, I’m
            <br />
            <span>Parth Sarthi.</span>
          </h1>
          <p className="hero-statement">
            I build intelligent systems and
            <br className="desktop-break" /> thoughtful digital experiences.
          </p>
          <p className="hero-description">
            Computer Science (AI/ML) student building across frontend, backend,
            and applied AI.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#projects">
              Explore Projects <ArrowUpRight size={18} />
            </a>
            <a
              className="button secondary"
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resume <FileText size={17} />
            </a>
          </div>
          <SocialLinks />
        </div>
        <div className="hero-art" ref={container}>
          <div className="art-grid" aria-hidden="true" />
          <div className="art-label art-label-top">
            <span className="crosshair">+</span> THE INTERSECTION OF IDEAS
          </div>
          <div
            className={`core-fallback ${rendered && !lost ? "is-hidden" : ""}`}
          >
            <StaticCore />
          </div>
          {ready && !lost && (
            <SceneBoundary onFail={() => setLost(true)}>
              <Suspense fallback={null}>
                <HeroScene
                  animate={!paused && !reduced && visible}
                  onReady={() => setRendered(true)}
                  onLost={() => setLost(true)}
                />
              </Suspense>
            </SceneBoundary>
          )}
          <span className="art-tag tag-intelligence">01 / INTELLIGENCE</span>
          <span className="art-tag tag-engineering">02 / ENGINEERING</span>
          <span className="art-tag tag-experience">03 / EXPERIENCE</span>
          <div className="art-caption">
            <span>
              <i />
              {lost || !rendered
                ? "PROCEDURAL CORE / STATIC VIEW"
                : "PROCEDURAL CORE / LIVE 3D"}
            </span>
            {!ready && (
              <button
                className="motion-toggle"
                onClick={() => setReady(true)}
                aria-label="Enable interactive 3D"
              >
                <Play size={12} />
                EXPLORE IN 3D
              </button>
            )}
            {ready && !rendered && !lost && <span>LOADING 3D</span>}
            {rendered && !lost && !reduced && (
              <button
                className="motion-toggle"
                onClick={() => setPaused(!paused)}
                aria-label={paused ? "Play 3D animation" : "Pause 3D animation"}
              >
                {paused ? <Play size={12} /> : <Pause size={12} />}
                {paused ? "PLAY" : "PAUSE"}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="hero-bottom">
        <a href="#about">
          <ArrowDown size={15} /> SCROLL TO EXPLORE
        </a>
        <span>
          CURIOUS MIND. <span className="muted">BUILDER AT HEART.</span>
        </span>
      </div>
    </section>
  );
}
