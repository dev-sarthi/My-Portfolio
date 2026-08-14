/**
 * Portfolio data — sourced exclusively from resume.
 */

export const personalInfo = {
  name: 'Parth Sarthi',
  role: 'Full-Stack Developer',
  tagline: 'CSE (AI/ML)',
  email: 'sarthiparth0@gmail.com',
  github: 'https://github.com/ParthSarthi1947',
  linkedin: 'https://linkedin.com/in/parth-sarthi-1947',
  heroDescription:
    'CSE (AI/ML) student and full-stack developer building intelligent, user-centric web applications with clean code and modern technologies.',
  about: [
    "I'm a Computer Science & Engineering student specializing in AI/ML, passionate about full-stack web development. I build real-world applications that solve meaningful problems — from AI-powered surveillance systems to modern web platforms.",
    "I focus on clean architecture, modern tooling, and intuitive user experiences. Every project I work on is built to be performant, accessible, and maintainable.",
  ],
};

export const skills = [
  {
    category: 'Languages',
    icon: 'Code2',
    items: ['C++', 'JavaScript', 'Python'],
  },
  {
    category: 'Frontend',
    icon: 'Layout',
    items: ['React', 'Next.js'],
  },
  {
    category: 'Backend',
    icon: 'Server',
    items: ['Node.js', 'Express', 'FastAPI'],
  },
  {
    category: 'Databases & BaaS',
    icon: 'Database',
    items: ['MongoDB', 'Firebase', 'Supabase'],
  },
  {
    category: 'DevOps & Tools',
    icon: 'GitBranch',
    items: ['Git', 'GitHub', 'Vercel'],
  },
];

export const projects = [
  {
    title: 'VIGIL',
    featured: true,
    description:
      'An intelligent surveillance and safety platform powered by AI for real-time monitoring, anomaly detection, and automated alerts. Built with a modern full-stack architecture designed for scalability.',
    techStack: [
      'Next.js',
      'React',
      'Node.js',
      'Express',
      'FastAPI',
      'MongoDB',
      'Firebase',
      'Supabase',
      'Python',
    ],
    features: [
      'Real-time AI anomaly detection',
      'Intelligent alert system',
      'Modern dashboard UI',
      'Scalable microservices architecture',
    ],
    github: 'https://github.com/ParthSarthi1947',
    live: null,
  },
];

export const achievements = [
  {
    title: 'USAII Global AI Hackathon 2026',
    subtitle: 'Finalist',
    description:
      'Competed in the USAII Global AI Hackathon and achieved a top ranking among 424 participating teams worldwide.',
    stats: [
      { value: '#43', label: 'Global Rank' },
      { value: '424', label: 'Total Teams' },
      { value: '91/100', label: 'Score' },
    ],
  },
];

export const education = {
  degree: 'B.Tech in Computer Science & Engineering (AI/ML)',
  institution: 'University',
  duration: '2025 – 2029',
  cgpa: '7.55',
};

export const workWith = [
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Express', icon: '🚀' },
  { name: 'FastAPI', icon: '⚡' },
  { name: 'Python', icon: '🐍' },
  { name: 'C++', icon: '💻' },
  { name: 'JavaScript', icon: '📜' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'Firebase', icon: '🔥' },
  { name: 'Supabase', icon: '💎' },
  { name: 'Git', icon: '🔀' },
  { name: 'GitHub', icon: '🐙' },
  { name: 'Vercel', icon: '▲' },
  { name: 'VS Code', icon: '💠' },
];

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];
