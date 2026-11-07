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

/** The 6 strong credentials shown on the main Credentials page. */
export const CERTIFICATES: Certificate[] = [
  {
    id: '1',
    title: 'Data Analytics with Python',
    issuer: 'NPTEL / IIT Roorkee',
    category: 'data',
    date: 'Jan–Apr 2025',
    description:
      'Comprehensive 12-week proctored academic program on Python-based statistical analytics, exploratory data analysis, and mathematical modeling.',
    skills: ['Python', 'Pandas', 'NumPy', 'Data Visualization', 'Statistical Analysis'],
    credentialId: 'NPTEL25CS17S1147000547',
    verificationUrl: 'https://nptel.ac.in/noc/E_Certificate/linkedin/noc25-cs17/NPTEL25CS17S1147000547.jpg',
  },
  {
    id: '2',
    title: 'Introduction to Generative AI',
    issuer: 'Google Cloud / Simplilearn',
    category: 'ai',
    date: 'December 2025',
    description:
      'Foundational certification covering generative model architectures, LLMs, prompt engineering, and responsible AI practices.',
    skills: ['Generative AI', 'LLMs', 'Prompt Engineering', 'Machine Learning'],
    credentialId: '9550963',
    verificationUrl: 'https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIxOTkzIiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvdGh1bWJcLzk1NTA5NjMucG5nIiwidXNlcm5hbWUiOiJWZWxhZ2FwdWRpIE1haGVuZHJhIn0',
  },
  {
    id: '3',
    title: 'Data Modeling Intro',
    issuer: 'MongoDB',
    category: 'database',
    date: 'December 2025',
    description:
      'Document database architecture, high-performance schema design patterns, indexing principles, and aggregation query optimization.',
    skills: ['MongoDB', 'Data Modeling', 'NoSQL', 'Schema Design'],
    credentialId: 'MDBeiehqbzv9n',
    verificationUrl: 'https://learn.mongodb.com/c/MDBeiehqbzv9n',
  },
  {
    id: '4',
    title: 'MongoDB and the Document Model',
    issuer: 'MongoDB',
    category: 'database',
    date: 'December 2025',
    description:
      'Document structure, atomicity, nested documents vs referencing trade-offs, and distributed database scaling concepts.',
    skills: ['MongoDB', 'Document Model', 'NoSQL', 'Database Design'],
    credentialId: 'MDB3dllkpvir8',
    verificationUrl: 'https://learn.mongodb.com/c/MDB3dllkpvir8',
  },
  {
    id: '5',
    title: 'SQL and Relational Databases 101',
    issuer: 'IBM / Coursera',
    category: 'database',
    date: 'December 2025',
    description:
      'SQL querying, relational schema constraints, multi-table joins, subqueries, and window functions.',
    skills: ['SQL', 'Relational Databases', 'Query Optimization', 'Data Manipulation'],
    credentialId: '8U6EXKNT873D',
    verificationUrl: 'https://www.coursera.org/account/accomplishments/verify/8U6EXKNT873D',
  },
  {
    id: '6',
    title: 'API Fundamentals Student Expert',
    issuer: 'Postman Learning',
    category: 'engineering',
    date: 'December 2025',
    description:
      'REST API architecture, HTTP request lifecycles, automated testing collections, environments, and mock servers.',
    skills: ['REST APIs', 'Postman', 'API Testing', 'HTTP Protocol', 'Automation'],
    credentialId: 'C01963E6FFFB1F0',
    verificationUrl: 'https://badgr.com/public/assertions/C01963E6FFFB1F0',
  },
];

/**
 * Also held — not featured on the main credentials page.
 * Data Analytics and Visualization Job Simulation (Forage, Aug 2025),
 * Data Analytics Job Simulation (Deloitte, Aug 2025),
 * SQL Bootcamp (Let's Upgrade, Aug 2025),
 * Data Science Program (Micro IT, Aug 2025),
 * Project Management Fundamentals (IBM / Coursera, Dec 2025, ID TQD0O6B4R0BO).
 */
export const ALSO_COMPLETED = [
  'Data Analytics and Visualization Job Simulation — Forage, Aug 2025',
  'Data Analytics Job Simulation — Deloitte, Aug 2025',
  'SQL Bootcamp — Let\'s Upgrade, Aug 2025',
  'Data Science Program — Micro IT, Aug 2025',
  'Project Management Fundamentals — IBM / Coursera, Dec 2025 (ID TQD0O6B4R0BO)',
];
