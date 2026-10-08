# Repository and content audit — 9 October 2026

## Existing application

- React 19, Vite 8, JavaScript/JSX, plain CSS, React Three Fiber / Three.js.
- No router, backend, TypeScript configuration, test runner, or Vercel-specific configuration file.
- Existing scripts: dev, build, lint (Oxlint), preview.
- Existing active UI was a full-viewport WebGL scene with store-driven overlays, camera navigation, intro sequence, and performance tiers. An older scroll-based component set also remained, importing data exports that no longer existed.
- Global CSS prevented document scrolling. Existing data included incorrect social/email addresses, generic education, and empty LifeLens/Praniti records.
- Audited source structure, scene/state transitions, reusable brand icons and motion hooks, dependencies, configuration, assets, import graph, and content. No repository AGENTS.md was found.
- Preserved the initial dirty files and untracked scene/store/data work. Only the previously clean entry point switches to the isolated redesigned feature directory.
- No dependency addition, upgrade, removal, migration, backend, or deployment-setting change was necessary. The unused animation/store libraries remain to preserve the prior work; they are tree-shaken from the new application.

## Evidence and content decisions

Primary local source: the supplied `Parth_Sarthi_Resume_Updated.pdf`, copied unchanged to `public/Parth-Sarthi-Resume.pdf`. Education, achievements, leadership, contact details, and flagship contribution wording were checked against its extracted text. Personal phone number was not added to the page. No unsupported internship or employment history was created.

Public sources:

- [GitHub profile](https://github.com/dev-sarthi) and public repository listing/API.
- [VIGIL README and code tree](https://github.com/hub-mayank/vigil-platform): confirms team roles, RailMind simulated sensor stream, and FastAPI/React pipeline. The root README calls OrbitMind upcoming, but [the module documentation](https://github.com/hub-mayank/vigil-platform/tree/main/orbitmind), app.py, agent implementation, review endpoints, tests, and React dashboard/stream provider show an implemented simulation prototype. The final case study follows that newer implementation evidence, without claiming operational spacecraft control or validation on real infrastructure. Both public dashboard modules are labeled active; the RailMind stream was offline during the browser visit.
- [LifeLens demo](https://l-ife-lens.vercel.app/): supplied directly by the owner; HTTP 200 and the rendered Life Lens AI Decision Advisor sign-in page verified. No account was created and authenticated workflows were not tested. No matching public repository was found. Case study is limited to resume/supplied contribution facts and product-design considerations, without inventing model/provider/evaluation details.
- Praniti: resume and owner-provided description; concept and invention disclosure draft only, not filed.
- [QuickKart / Blinkit-Clone](https://github.com/dev-sarthi/Blinkit-Clone): README, source tree, order controller.
- [Volt-Billing](https://github.com/dev-sarthi/volt-billing): README, source tree, billing service.
- [GigMatch](https://github.com/dev-sarthi/gigmatch): README, source tree, worker controller.

## Additional repository ranking

Qualitative ranking uses implementation depth/completeness, full-stack relevance, architecture/code organization, technical complexity, documentation, and verified demo availability. It is not a security or production-readiness certification.

| Rank | Candidate                                         | Assessment                                                                                                                                                                                                     | Decision |
| ---- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 1    | QuickKart / Blinkit-Clone                         | Broad commerce workflows, organized controllers/models, useful README, carts/orders/admin/stock checks; payments mocked, no verified live demo. Multi-item checkout is not a proven transaction-safe system.   | Include  |
| 2    | Volt-Billing                                      | Domain-specific tariff calculation and role-based meter/consumer/admin workflows; documented setup and dedicated billing service; no verified demo.                                                            | Include  |
| 3    | GigMatch                                          | Distinct customer/worker/admin workflows and documented server-rendered application; public controllers show real request handling, but no claim of exhaustive authorization hardening or verified deployment. | Include  |
| 4    | VehicleManagement                                 | Application in nested folder; thin documentation and less clear evidence than selected repositories.                                                                                                           | Omit     |
| 5    | e-com-full-stack                                  | React frontend plus an Express product-list endpoint; shallow root README and limited backend implementation despite listed deployment.                                                                        | Omit     |
| 6    | JS-Mini-Projects                                  | Calculator, GitHub finder, weather, todo and other focused exercises; little overview documentation.                                                                                                           | Omit     |
| 7    | Backend-Dev                                       | Date-organized EJS, middleware, and database learning exercises.                                                                                                                                               | Omit     |
| 8    | Data-Science                                      | Introductory notebooks, including NumPy; README only a title.                                                                                                                                                  | Omit     |
| 9    | Web-Dev / WEB / web-d_test / React-Lectures       | Primarily learning/layout exercises and coursework.                                                                                                                                                            | Omit     |
| —    | genai-rag-python                                  | Empty public repository at audit time.                                                                                                                                                                         | Omit     |
| —    | Zippy-Quick-Commerce                              | Referenced listing was unavailable in the current public API inventory.                                                                                                                                        | Omit     |
| —    | Forks, profile, DSA assignments, portfolio itself | Avoid duplicated projects or unsubstantiated original contributions.                                                                                                                                           | Omit     |

## Validation

- Production build passes. Initial JS is about 73 KB gzipped; the separate 3D chunk is about 237 KB gzipped and loads only on desktop auto-start or explicit mobile opt-in.
- Oxlint passes with 13 pre-existing warnings in untouched legacy files; redesigned files introduce no warnings.
- Browser checks cover real WebGL initialization, static fallback, mobile opt-in, reduced motion, keyboard interactions, dialogs, PDF and anchors, unknown paths, and responsive overflow.
- axe scans run on desktop, mobile, and an open case study. Initial decorative contrast issue and modal focus edge case were corrected.
- Layout reviewed from real Chrome desktop and mobile screenshots. All five tested widths are free of horizontal overflow.
- Lighthouse runs on the local production preview with simulated mobile throttling and headless Chrome; results are environment-dependent, not a deployed-site guarantee. Reports are written to `test-results/`.
- Final measured mobile run: **Performance 99, Accessibility 100, Best Practices 100, SEO 100**; LCP **1.8 s**, total blocking time **0 ms**, cumulative layout shift **0**. The first run exposed eager mobile WebGL startup and external fonts; explicit mobile 3D activation and local font files removed those startup costs.
- No commit, push, or deployment performed.
