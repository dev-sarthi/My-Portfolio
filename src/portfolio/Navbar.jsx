import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "./content";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const toggle = useRef(null);
  const header = useRef(null);
  useEffect(() => {
    const update = () => {
      const threshold = window.innerHeight * 0.35;
      const current = navigation.reduce((result, [id]) => {
        const element = document.getElementById(id);
        return element && element.getBoundingClientRect().top <= threshold
          ? id
          : result;
      }, "home");
      setActive(current);
    };
    let queued = false;
    const onScroll = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(() => {
          update();
          queued = false;
        });
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (event) => {
      if (!header.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);
  return (
    <header
      className="site-header"
      ref={header}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <div className="nav-shell">
        <a
          className="brand"
          href="#home"
          aria-label="Parth Sarthi, home"
          onClick={() => setOpen(false)}
        >
          <span className="brand-mark">
            p<span>.</span>s
          </span>
          <span className="brand-name">PARTH SARTHI</span>
        </a>
        <button
          className="menu-toggle icon-button"
          ref={toggle}
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          id="main-navigation"
          className={open ? "navigation is-open" : "navigation"}
          aria-label="Main navigation"
        >
          {navigation.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="nav-contact">
          Let’s talk <ArrowUpRight size={16} />
        </a>
      </div>
    </header>
  );
}
