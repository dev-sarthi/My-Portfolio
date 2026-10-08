export const profile = {
  name: "Parth Sarthi",
  email: "sarthiparth2006@gmail.com",
  github: "https://github.com/dev-sarthi",
  linkedin: "https://www.linkedin.com/in/parth-sarthi-49830435a",
  resume: "/Parth-Sarthi-Resume.pdf",
};

export const navigation = [
  ["home", "Home"],
  ["about", "About"],
  ["projects", "Projects"],
  ["skills", "Skills"],
  ["achievements", "Achievements"],
  ["experience", "Experience & Leadership"],
  ["contact", "Contact"],
];

export const projects = [
  {
    id: "vigil",
    name: "VIGIL",
    category: "Intelligent infrastructure",
    title: "AI Infrastructure Monitoring Platform",
    description:
      "Making complex infrastructure signals easier to understand, one agent at a time.",
    status: "Team project · Hackathon prototype",
    technologies: [
      "React",
      "FastAPI",
      "Python",
      "AI Agents",
      "Machine Learning",
    ],
    role: "System design, architecture & documentation",
    contribution:
      "Shaped architecture and documentation within a four-person team, with AI-assisted debugging, merge-conflict resolution, and implementation iteration.",
    achievement: "Far Away 2026 · Round 2",
    github: "https://github.com/hub-mayank/vigil-platform",
    demo: "https://vigil-platform-six.vercel.app/",
    flow: ["Simulated sensors", "Detection & agents", "Operator dashboard"],
    caseStudy: [
      [
        "Problem",
        "Infrastructure operators need a clear way to interpret anomalies and decide what deserves attention. VIGIL explores that problem through railway sensor monitoring and simulated aerospace collision scenarios.",
      ],
      [
        "Approach",
        "Separate monitoring, anomaly classification, and suggested actions into focused agents. My role centered on system design, architecture, and documentation, with Claude-assisted debugging, merge-conflict resolution, and iteration across the ML and agent layers.",
      ],
      [
        "Architecture",
        "React dashboards consume separate FastAPI event streams. RailMind combines ML anomaly classification with AI recommendations. OrbitMind uses deterministic closest-approach calculations, an explanation agent, and a human-review workflow.",
      ],
      [
        "Implementation",
        "RailMind uses backend-generated test data. OrbitMind now has telemetry generation, agent processing, review endpoints, tests, and dashboard components in the repository. Its module documentation and code supersede the root README’s older upcoming label. Both are prototypes, not validated real-world monitoring systems.",
      ],
      [
        "Challenges",
        "The key design concern is separating domain-specific sensors from reusable orchestration. Simulated inputs also mean the demo cannot establish reliability on real infrastructure.",
      ],
      [
        "Outcome",
        "The team advanced to Round 2 of Far Away 2026. The repository contains railway and aerospace prototype implementations; deployment to real infrastructure remains outside the demonstrated scope. The public dashboard loads, although its sensor stream was offline when checked.",
      ],
    ],
  },
  {
    id: "lifelens",
    name: "LifeLens",
    category: "Applied artificial intelligence",
    title: "AI Career & Education Decision Support",
    description:
      "Bringing structure and perspective to the decisions that shape a future.",
    status: "Team project · Hackathon finalist",
    technologies: [
      "React",
      "Node.js",
      "AI API Integration",
      "Prompt Engineering",
    ],
    role: "AI workflows, prompt architecture & final-round pitch",
    contribution:
      "Designed the AI-assisted comparison workflow and led the team’s final-round pitch and presentation.",
    achievement: "USAII 2026 · Finalist · #43 / 424",
    demo: "https://l-ife-lens.vercel.app/",
    flow: [
      "Education & career paths",
      "Structured comparison",
      "Informed decisions",
    ],
    caseStudy: [
      [
        "Problem",
        "Education and career choices involve competing priorities. LifeLens helps users compare pathways through a structured AI-assisted decision workflow.",
      ],
      [
        "Approach",
        "Organize the comparison around a consistent framework instead of leaving users with disconnected AI responses. My contribution covered AI workflow design, prompt architecture, and the comparison framework.",
      ],
      [
        "Architecture",
        "The project combines a React interface, Node.js, and AI API integration. The workflow links pathway inputs with prompted comparisons and a decision-support experience.",
      ],
      [
        "Implementation",
        "Within the team, my work focused on how the AI workflow frames and compares options. I designed the prompt architecture and comparison framework, then led the final-round pitch and presentation.",
      ],
      [
        "Challenges",
        "The central product challenge is making a complex personal decision easier to reason about while keeping AI output in a supporting role. The comparison framework brings structure to that exploration rather than promising a single objectively correct path.",
      ],
      [
        "Outcome",
        "Official finalist in the USAII Global AI Hackathon 2026, ranked #43 among 424 undergraduate teams—approximately the top 10%. The deployed application opens at a sign-in screen; an account is required to explore the advisor.",
      ],
    ],
  },
  {
    id: "praniti",
    name: "Praniti",
    category: "Citizen science · Research concept",
    title: "AI Citizen Science & Air Quality",
    description:
      "Exploring what the leaves around us could tell us about the air we share.",
    status: "Concept · Invention disclosure draft · Not filed",
    technologies: ["AI/ML Concept", "Leaf Imagery", "System Design"],
    role: "Workflow & system design",
    contribution:
      "Explored a citizen-participation workflow for hyperlocal air-quality estimation using leaf imagery.",
    flow: ["Leaf imagery", "Proposed estimation", "Community insights"],
    caseStudy: [
      [
        "Problem",
        "Hyperlocal air-quality information can be difficult to access. Praniti explores whether citizen-contributed leaf imagery could support more local observations.",
      ],
      [
        "Approach",
        "Define a workflow that connects image contribution, proposed analysis, and community participation. My contribution is workflow and system design.",
      ],
      [
        "Architecture",
        "Conceptual flow: leaf image collection → proposed AI-assisted estimation → local insights. This describes an intended system, not an implemented pipeline.",
      ],
      [
        "Implementation",
        "Concept and invention disclosure draft only. The disclosure has not been filed, and there is no production application or validated model to present.",
      ],
      [
        "Challenges",
        "The concept would need suitable labeled data, controlled image capture, and validation against reliable measurements before making air-quality claims. These are open research questions.",
      ],
      [
        "Outcome",
        "A documented concept for further investigation. No accuracy, deployment, patent, or production-readiness claim is made.",
      ],
    ],
  },
];

export const additionalProjects = [
  {
    name: "QuickKart",
    number: "04",
    icon: "cart",
    title: "Commerce, end to end.",
    description:
      "Server-rendered commerce with persistent carts, order history, stock checks, and an admin catalog. Payments are mocked.",
    technologies: ["Node.js", "Express", "MongoDB", "EJS"],
    github: "https://github.com/dev-sarthi/Blinkit-Clone",
    contribution:
      "Public project · Application code spans controllers, models, and server-rendered views.",
  },
  {
    name: "Volt-Billing",
    number: "05",
    icon: "bolt",
    title: "From meter to bill.",
    description:
      "Utility billing with configurable tariff slabs and separate workflows for admins, meter readers, and consumers.",
    technologies: ["Node.js", "Express", "MongoDB", "EJS"],
    github: "https://github.com/dev-sarthi/volt-billing",
    contribution:
      "Public project · Billing service, role-based workflows, and utility data models.",
  },
  {
    name: "GigMatch",
    number: "06",
    icon: "network",
    title: "Local skills. Connected.",
    description:
      "A local services marketplace with worker discovery, availability, service requests, and role-specific dashboards.",
    technologies: ["Node.js", "Express", "MongoDB", "JWT"],
    github: "https://github.com/dev-sarthi/gigmatch",
    contribution:
      "Public project · Customer, worker, and admin flows using server-rendered forms.",
  },
];

export const skills = [
  {
    name: "Languages",
    symbol: "{ }",
    items: ["C++", "JavaScript", "Python", "HTML", "CSS"],
    description: "The foundations for turning ideas into working software.",
  },
  {
    name: "Frontend",
    symbol: "</>",
    items: ["React.js", "Responsive Web Development"],
    description:
      "Interfaces that make complex capabilities feel clear and approachable.",
  },
  {
    name: "Backend",
    symbol: "↔",
    items: ["Node.js", "Express.js", "FastAPI", "REST APIs"],
    description:
      "The services and contracts connecting a product’s moving parts.",
  },
  {
    name: "Data & Cloud",
    symbol: "▤",
    items: ["MongoDB", "Firebase / Firestore", "Supabase"],
    description: "Organizing application data and connecting managed services.",
  },
  {
    name: "AI/ML",
    symbol: "✳",
    items: ["AI Agents", "AI/ML Applications", "AI-Assisted Development"],
    description:
      "Exploring how intelligent workflows can solve practical problems.",
  },
  {
    name: "Developer Tools",
    symbol: "⌘",
    items: ["Git", "GitHub", "VS Code", "Vercel"],
    description: "A practical toolkit for building, iterating, and shipping.",
  },
];

export const achievements = [
  {
    label: "Official finalist",
    title: "USAII Global AI Hackathon",
    detail: "Rank #43 of 424 undergraduate teams · Approximately top 10%",
    year: "2026",
    mark: "43",
    suffix: "/ 424",
  },
  {
    label: "Advanced to Round 2",
    title: "Far Away",
    detail: "VIGIL · AI infrastructure monitoring platform",
    year: "2026",
    mark: "02",
    suffix: "ROUND",
  },
  {
    label: "Participant",
    title: "Smart India Hackathon",
    detail: "Learning through collaborative problem solving.",
    year: "2026",
    mark: "SIH",
    suffix: "2026",
  },
];

export const leadership = [
  {
    organization: "The खेल Society",
    role: "Core Member & Treasurer",
    detail:
      "Organizing sports events, coordinating finances, and managing logistics across college activities.",
    label: "Campus leadership",
  },
  {
    organization: "Entrepreneurship Cell",
    role: "Former Member",
    detail:
      "Supported workshops and student events, working with peers to bring ideas and people together.",
    label: "Community",
  },
  {
    organization: "Teaching & Mentoring",
    role: "Student Tutor",
    detail:
      "Tutoring students and breaking down concepts into clear explanations. Teaching is another way I keep learning.",
    label: "Knowledge sharing",
  },
];
