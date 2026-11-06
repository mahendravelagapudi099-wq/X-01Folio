export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  category: 'data' | 'ai' | 'database' | 'engineering';
  date: string;
  description: string;
  skills: string[];
  credentialId?: string;
  verificationUrl?: string;
  image?: string;
}

export const CERTIFICATES: Certificate[] = [
  {
    id: '1',
    title: 'Data Analytics with Python',
    issuer: 'NPTEL / IIT Roorkee',
    category: 'data',
    date: 'Jan - Apr 2025',
    description:
      'Comprehensive 12-week academic program on Python-based statistical analytics, exploratory data analysis, and mathematical modeling with a proctored examination.',
    skills: ['Python', 'Pandas', 'NumPy', 'Data Visualization', 'Statistical Analysis'],
    credentialId: 'NPTEL25CS17S1147000547',
    verificationUrl: 'https://nptel.ac.in/',
    image: '/certificates/certificate1.jpg'
  },
  {
    id: '2',
    title: 'Introduction to Generative AI',
    issuer: 'Google Cloud / Simplilearn',
    category: 'ai',
    date: 'December 2025',
    description:
      'Foundational certification covering generative model architectures, LLMs, prompt engineering paradigms, and responsible AI practices.',
    skills: ['Generative AI', 'LLMs', 'Prompt Engineering', 'Machine Learning', 'Python'],
    credentialId: '9550963',
    verificationUrl: 'https://www.simplilearn.com/',
    image: '/certificates/certificate2.jpg'
  },
  {
    id: '3',
    title: 'MongoDB Data Modeling Intro',
    issuer: 'MongoDB, Inc.',
    category: 'database',
    date: 'December 2025',
    description:
      'Coursework on document database architecture, high-performance schema design patterns, indexing principles, and aggregation query optimization.',
    skills: ['MongoDB', 'Data Modeling', 'NoSQL', 'Indexing', 'Schema Optimization'],
    credentialId: 'MDBeiehqbzv9n',
    verificationUrl: 'https://learn.mongodb.com/',
    image: '/certificates/certificate3.jpg'
  },
  {
    id: '4',
    title: 'MongoDB and the Document Model',
    issuer: 'MongoDB, Inc.',
    category: 'database',
    date: 'December 2025',
    description:
      'Deep dive into document structure, atomicity, nested documents vs referencing tradeoffs, and distributed database scaling concepts.',
    skills: ['MongoDB', 'Document Model', 'NoSQL', 'Database Design'],
    credentialId: 'MDB3dllkpvir8',
    verificationUrl: 'https://learn.mongodb.com/'
  },
  {
    id: '5',
    title: 'SQL Bootcamp Certification',
    issuer: 'LetsUpgrade / NSDC / GDG MAD',
    category: 'database',
    date: 'August 2024',
    description:
      'Intensive practical program focused on SQL querying, relational schema constraints, multi-table joins, subqueries, and window functions.',
    skills: ['SQL', 'Relational Databases', 'Query Optimization', 'Data Manipulation'],
    credentialId: 'LUESQLAUG124491',
    verificationUrl: 'https://www.letsupgrade.in/verify'
  },
  {
    id: '6',
    title: 'API Fundamentals Student Expert',
    issuer: 'Postman',
    category: 'engineering',
    date: '2024',
    description:
      'Certified proficiency in REST API architecture, HTTP request lifecycles, automated testing collections, environments, and mock servers.',
    skills: ['REST APIs', 'Postman', 'API Testing', 'HTTP Protocol', 'Automation'],
    credentialId: 'POSTMAN-EXPERT-2024',
    verificationUrl: 'https://badgr.com/'
  }
];

