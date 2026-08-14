import { useRef, useEffect } from 'react';
import { useReveal } from '../hooks';
import { workWith } from '../data';

export default function WhatIWorkWith() {
  const ref = useRef(null);
  const { visible, observe } = useReveal();

  useEffect(() => { observe(ref.current); }, [observe]);

  const show = visible.has('work-with');

  return (
    <section className="section" id="work-with" ref={ref}>
      <div className="container">
        <div className={`section-header reveal${show ? ' visible' : ''}`}>
          <span className="section-label">Toolkit</span>
          <h2 className="section-title">What I Work With</h2>
          <p className="section-description">
            Technologies, tools, and platforms I use on a daily basis.
          </p>
        </div>

        <div className="work-with-grid">
          {workWith.map((item, i) => (
            <div
              key={item.name}
              className={`work-with-item reveal reveal-delay-${Math.min(i % 5 + 1, 5)}${show ? ' visible' : ''}`}
            >
              <span className="work-with-icon">{item.icon}</span>
              <span className="work-with-name">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
