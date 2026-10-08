# Parth Sarthi — Portfolio

A responsive React portfolio with a procedural Three.js hero, project case studies, categorized skills, and a downloadable resume. Built with the existing React 19 / Vite 8 application; no backend or runtime dependencies were added.

## Run locally

Use Node.js 22.12+ or Node.js 24 LTS (validated here with 24.19.0).

```sh
npm ci
npm run dev
```

Open the local URL Vite prints (normally `http://localhost:5173`).

```sh
npm run build
npm run preview
npm run lint
```

The production output is `dist/`. There is no TypeScript configuration or existing unit-test command. Oxlint currently reports 13 pre-existing warnings in the preserved legacy implementation; the new portfolio passes lint without warnings.

## Active architecture

`src/main.jsx` loads `src/portfolio/Portfolio.jsx` and `src/portfolio/portfolio.css`.

- `content.js`: personal links, resume path, projects, case studies, skill categories, achievements, leadership.
- `Navbar.jsx`: anchored navigation, section tracking, mobile disclosure and Escape handling.
- `Hero.jsx` / `HeroScene.jsx`: lazy-loaded procedural geometry, static fallback, pause/play, reduced motion, offscreen/background suspension.
- `ProjectGallery.jsx`: project illustrations, cards, accessible native dialog case studies with focus containment and restoration.
- `Skills.jsx`: keyboard-accessible category selection with a visual focus panel.
- `Sections.jsx` / `shared.jsx`: reusable editorial sections, links, and badges.

The workspace already contained substantial uncommitted work in `src/App.jsx`, `src/index.css`, `src/data/`, scene components, hooks, the store, and the package files. Those files were preserved. They are not imported by the redesigned entry point. Existing brand SVG components are reused. GSAP, Motion, Drei, postprocessing, and Zustand remain installed for the preserved work, but the new experience does not import them.

## Content and assets

- Update `src/portfolio/content.js` to change content and verified links.
- Replace `public/Parth-Sarthi-Resume.pdf` when the resume changes. It is the supplied PDF, copied unchanged.
- The LifeLens demo is supplied by the owner. No public repository was verified, so its card intentionally has no GitHub link.
- Praniti is explicitly a concept / invention disclosure draft, not filed.
- VIGIL is a team prototype: RailMind uses simulated test data; OrbitMind has an implemented simulated aerospace pipeline, review endpoints, and dashboard. The module code/documentation supersede the root README’s older “upcoming” label. Neither is claimed as a validated real-world system. The dashboard opens, but the sensor stream was offline during verification.
- Additional repository descriptions summarize public implementation, without claiming exclusive authorship, production readiness, or unverified deployments.
- Abstract project illustrations are custom SVG/CSS artwork, not application screenshots.
- DM Sans and Space Grotesk are locally served WOFF2 fonts. Their SIL OFL licenses are in `public/fonts/`.
- Metadata lives in `index.html`; sharing artwork, favicon, sitemap, robots, and static 404 live in `public/`.

## Performance and accessibility

Desktop loads the 3D scene separately from the initial page. On mobile or when data saving is enabled, the static core is shown first; **Explore in 3D** opts into the Three.js bundle. The scene uses limited procedural geometry, capped pixel density, no postprocessing or downloaded models, and no separate animation library. It pauses offscreen/in background tabs and respects reduced motion. A failure to load or initialize WebGL leaves the illustration and all content available.

All project and contact content is HTML. Native anchors, visible focus indicators, a skip link, keyboard-operable navigation, dialog focus management, and reduced-motion CSS support accessibility. Reveal effects animate already-visible content. No contact form or fake submission flow is present.

## Browser checks (optional isolated tools)

The test tools are deliberately outside the application dependency manifest:

```sh
npm install --prefix .tools/ui --no-package-lock playwright @axe-core/playwright lighthouse
npm run dev
node scripts/validate-portfolio.mjs
```

Tests use an installed Chrome browser. To target a production preview in PowerShell:

```powershell
$env:PORTFOLIO_URL = 'http://127.0.0.1:4173'
node scripts/validate-portfolio.mjs
```

The checks cover WebGL initialization, explicit mobile opt-in, pause/play, anchored navigation, mobile menu, all three case studies, dialog keyboard focus and restoration, skill selection, PDF response, anchor validity, no horizontal overflow at 320/390/768/1024/1440 pixels, reduced motion, unknown routes, WebGL failure, and axe accessibility. Screenshots and reports go to ignored `test-results/`.

To regenerate the static Open Graph artwork with the isolated browser tools:

```sh
node scripts/create-social-card.mjs
```

## Vercel deployment

Keep the existing Vercel project and use these settings:

| Setting               | Value           |
| --------------------- | --------------- |
| Framework preset      | Vite            |
| Root directory        | Repository root |
| Install command       | `npm ci`        |
| Build command         | `npm run build` |
| Output directory      | `dist`          |
| Node.js version       | 24.x            |
| Environment variables | None required   |

No deployment, commit, or push was performed. When ready, commit the intended changes and deploy through the existing Vercel Git integration, or use `vercel` for a preview and `vercel --prod` for production. Review the pre-existing uncommitted files before creating your commit. If the domain changes, update the canonical/Open Graph URLs in `index.html` and URLs in `public/robots.txt` and `public/sitemap.xml`.

See [AUDIT.md](AUDIT.md) for source evidence, project selection, and validation notes.
