export const learnNodes = [
  // High Prominence (3)
  {
    id: 'ai-ml',
    title: 'AI/ML',
    category: 'Core Interest',
    description: 'Studying AI algorithms, machine learning models, and intelligent systems. Exploring real-world applications of AI in modern web architectures.',
    prominence: 3,
    position: [0, 4.0, -1] // Above LEARN node
  },
  {
    id: 'react',
    title: 'React & Next.js',
    category: 'Frontend',
    description: 'Building interactive, user-centric interfaces using React and the Next.js ecosystem. Focusing on clean architecture and performance.',
    prominence: 3,
    position: [-1.2, 3.2, -1.5]
  },
  {
    id: 'backend',
    title: 'Backend Systems',
    category: 'Architecture',
    description: 'Designing scalable microservices, efficient database schemas, and robust server-side logic.',
    prominence: 3,
    position: [1.2, 3.2, -1.5]
  },

  // Medium Prominence (2)
  {
    id: 'node',
    title: 'Node.js',
    category: 'Backend',
    description: 'Developing high-performance, asynchronous server applications and RESTful APIs.',
    prominence: 2,
    position: [1.8, 2.5, -2]
  },
  {
    id: 'fastapi',
    title: 'FastAPI',
    category: 'Backend',
    description: 'Leveraging Python and FastAPI for rapid, type-safe API development, especially for AI/ML integration.',
    prominence: 2,
    position: [1.5, 3.8, -1.2]
  },
  {
    id: 'mongodb',
    title: 'MongoDB',
    category: 'Database',
    description: 'Working with NoSQL document structures for flexible and scalable data storage.',
    prominence: 2,
    position: [2.2, 3.2, -1.8]
  },
  
  // Low Prominence (1)
  {
    id: 'javascript',
    title: 'JavaScript / TS',
    category: 'Language',
    description: 'The foundation of the modern web stack. Focusing on ES6+ features and transitioning towards type safety.',
    prominence: 1,
    position: [-2.0, 3.5, -2]
  },
  {
    id: 'rest-apis',
    title: 'REST APIs',
    category: 'Architecture',
    description: 'Designing clean, predictable, and stateless HTTP APIs for frontend-backend communication.',
    prominence: 1,
    position: [2.5, 2.8, -1.2]
  },
  {
    id: 'firebase',
    title: 'Firebase',
    category: 'BaaS',
    description: 'Using Backend-as-a-Service for rapid prototyping, real-time databases, and authentication.',
    prominence: 1,
    position: [-1.5, 2.2, -2]
  },
  {
    id: 'supabase',
    title: 'Supabase',
    category: 'BaaS',
    description: 'Exploring open-source PostgreSQL-based alternatives to Firebase for relational data needs.',
    prominence: 1,
    position: [-0.8, 1.8, -2.2]
  },
  {
    id: 'git',
    title: 'Git/GitHub',
    category: 'DevOps',
    description: 'Version control, collaborative development, and CI/CD basics.',
    prominence: 1,
    position: [-2.2, 2.8, -1.5]
  }
];

// Keep original technicalSkills just in case other parts of the site need the flat categorized list
export const technicalSkills = [
  {
    category: 'Languages',
    items: ['C++', 'JavaScript', 'Python']
  },
  {
    category: 'Frontend',
    items: ['React', 'Next.js']
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'FastAPI']
  },
  {
    category: 'Databases & BaaS',
    items: ['MongoDB', 'Firebase', 'Supabase']
  },
  {
    category: 'DevOps & Tools',
    items: ['Git', 'GitHub', 'Vercel']
  }
];
