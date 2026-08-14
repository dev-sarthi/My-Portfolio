import { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useScrolled } from '../hooks';
import { navLinks } from '../data';

export default function Navbar({ theme, toggleTheme }) {
  const scrolled = useScrolled(30);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="container">
          <div className="navbar-inner">
            <a href="#" className="navbar-logo">
              parth<span className="accent">.</span>
            </a>

            <div className="navbar-links">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
              <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                className="theme-toggle mobile-theme-toggle"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                style={{ display: 'none' }}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                className="mobile-toggle"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        <button className="mobile-close" onClick={closeMobile} aria-label="Close menu">
          <X size={26} />
        </button>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={closeMobile}>
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
