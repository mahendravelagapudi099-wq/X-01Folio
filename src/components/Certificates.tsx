import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Award, Calendar, ExternalLink, CheckCircle2, ShieldCheck, FileCheck } from 'lucide-react';

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

const Certifications = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [filter, setFilter] = useState<'all' | 'data' | 'ai' | 'database'>('all');

  const certificates: Certificate[] = [
    {
      id: '1',
      title: 'Data Analytics with Python',
      issuer: 'NPTEL / IIT Roorkee',
      category: 'data',
      date: 'Jan - Apr 2025',
      description: 'Comprehensive 12-week academic program on Python-based statistical analytics, exploratory data analysis, and mathematical modeling with a proctored examination.',
      skills: ['Python', 'Pandas', 'NumPy', 'Data Visualization', 'Statistical Analysis'],
      credentialId: 'NPTEL25CS17S1147000547',
      verificationUrl: 'https://nptel.ac.in/',
      image: '/certificates/certificate1.jpg',
    },
    {
      id: '2',
      title: 'Introduction to Generative AI',
      issuer: 'Google Cloud / Simplilearn',
      category: 'ai',
      date: 'December 2025',
      description: 'Foundational certification covering generative model architectures, LLMs, prompt engineering paradigms, and responsible AI practices.',
      skills: ['Generative AI', 'LLMs', 'Prompt Engineering', 'Machine Learning', 'Python'],
      credentialId: '9550963',
      verificationUrl: 'https://www.simplilearn.com/',
      image: '/certificates/certificate2.jpg',
    },
    {
      id: '3',
      title: 'MongoDB Data Modeling Intro',
      issuer: 'MongoDB, Inc.',
      category: 'database',
      date: 'December 2025',
      description: 'Coursework on document database architecture, high-performance schema design patterns, indexing principles, and aggregation query optimization.',
      skills: ['MongoDB', 'Data Modeling', 'NoSQL', 'Indexing', 'Schema Optimization'],
      credentialId: 'MDBeiehqbzv9n',
      verificationUrl: 'https://learn.mongodb.com/',
      image: '/certificates/certificate3.jpg',
    },
    {
      id: '4',
      title: 'MongoDB and the Document Model',
      issuer: 'MongoDB, Inc.',
      category: 'database',
      date: 'December 2025',
      description: 'Deep dive into document structure, atomicity, nested documents vs referencing tradeoffs, and distributed database scaling concepts.',
      skills: ['MongoDB', 'Document Model', 'NoSQL', 'Database Design'],
      credentialId: 'MDB3dllkpvir8',
      verificationUrl: 'https://learn.mongodb.com/',
    },
    {
      id: '5',
      title: 'SQL Bootcamp Certification',
      issuer: 'LetsUpgrade / NSDC / GDG MAD',
      category: 'database',
      date: 'August 2024',
      description: 'Intensive practical program focused on SQL querying, relational schema constraints, multi-table joins, subqueries, and window functions.',
      skills: ['SQL', 'Relational Databases', 'Query Optimization', 'Data Manipulation'],
      credentialId: 'LUESQLAUG124491',
      verificationUrl: 'https://www.letsupgrade.in/verify',
    },
    {
      id: '6',
      title: 'Data Analytics & Visualization Job Simulation',
      issuer: 'Accenture / Forage',
      category: 'data',
      date: 'February 2025',
      description: 'Industry simulation completing real-world analytics workflows: client dataset audit, data sanitization, visualization narrative, and executive presentations.',
      skills: ['Data Cleaning', 'Data Modeling', 'Tableau', 'Executive Storytelling'],
      credentialId: 'TtuRuZiFOz6MBpjAJ',
      verificationUrl: 'https://www.theforage.com/verify',
    },
    {
      id: '7',
      title: 'Software Engineering Job Simulation',
      issuer: 'Skyscanner / Forage',
      category: 'engineering',
      date: 'February 2025',
      description: 'Completed engineering assignments creating microservices, architecting React frontend modules, and implementing mobile flight itinerary flows.',
      skills: ['React', 'Microservices', 'API Contracts', 'Web Engineering'],
      credentialId: 'pHebmieZOnoP64ZJ5',
      verificationUrl: 'https://www.theforage.com/verify',
    },
    {
      id: '8',
      title: 'Data Analyst 101',
      issuer: 'Microsoft / Simplilearn',
      category: 'data',
      date: 'December 2025',
      description: 'Foundational analytical methodology course covering spreadsheet data processing, relational querying, and business dashboard presentation.',
      skills: ['Data Analysis', 'Excel Analytics', 'SQL Queries', 'Reporting'],
      credentialId: '9528126',
      verificationUrl: 'https://www.simplilearn.com/',
    },
    {
      id: '9',
      title: 'Hands-on DevOps: Git, GitHub & Docker',
      issuer: 'GeeksforGeeks / MREM',
      category: 'engineering',
      date: 'October 2025',
      description: 'Practical workshop on version control branching workflows, CI/CD automated test pipelines, and containerization with Docker.',
      skills: ['Git', 'GitHub Actions', 'Docker', 'CI/CD Pipelines'],
      credentialId: 'MREMGFG041',
    },
  ];

  const filteredCertificates = filter === 'all'
    ? certificates
    : certificates.filter(c => c.category === filter);

  return (
    <section id="certifications" className="py-24 px-6 max-w-7xl mx-auto" aria-labelledby="cert-heading">
      <div className="mb-16 text-center">
        <h2 id="cert-heading" className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight text-foreground mb-4">
          Credentials & Certifications
        </h2>
        <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-4" />
        <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
          VERIFIED ACADEMIC & INDUSTRY QUALIFICATIONS
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {[
            { id: 'all', label: 'All Credentials' },
            { id: 'data', label: 'Data & Analytics' },
            { id: 'ai', label: 'AI & Machine Learning' },
            { id: 'database', label: 'Databases & Systems' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as typeof filter)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-150 ${
                filter === tab.id
                  ? 'bg-primary text-slate-950 font-semibold shadow-md shadow-primary/20'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCertificates.map((cert) => (
          <div
            key={cert.id}
            onClick={() => setSelectedCertificate(cert)}
            className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between hover:border-primary/40 hover:-translate-y-1 transition-all duration-200 shadow-lg"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between font-mono text-[11px] mb-3 text-slate-400">
                <span className="flex items-center gap-1.5 text-primary font-medium">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {cert.issuer}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {cert.date}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-sans font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {cert.title}
              </h3>

              <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                {cert.description}
              </p>

              {/* Credential ID badge */}
              {cert.credentialId && (
                <div className="mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-950/80 border border-slate-800 font-mono text-[11px] text-slate-300">
                  <FileCheck className="h-3 w-3 text-emerald-400" />
                  <span>ID: {cert.credentialId}</span>
                </div>
              )}
            </div>

            <div>
              {/* Skills tags */}
              <div className="flex flex-wrap gap-1.5 mb-4 pt-3 border-t border-slate-800/60">
                {cert.skills.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-800/60 text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
                {cert.skills.length > 3 && (
                  <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-800/30 text-slate-400">
                    +{cert.skills.length - 3}
                  </span>
                )}
              </div>

              {/* Action Link */}
              <div className="flex items-center justify-between text-xs font-mono text-primary group-hover:underline">
                <span>View Details</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Certificate Modal Dialog */}
      <Dialog open={!!selectedCertificate} onOpenChange={(open) => !open && setSelectedCertificate(null)}>
        {selectedCertificate && (
          <DialogContent className="max-w-xl border-slate-800 bg-slate-900/95 backdrop-blur-2xl text-foreground">
            <DialogHeader>
              <div className="flex items-center gap-2 text-xs font-mono text-primary mb-1">
                <ShieldCheck className="h-4 w-4" />
                <span>{selectedCertificate.issuer}</span> &bull; <span>{selectedCertificate.date}</span>
              </div>
              <DialogTitle className="font-sans text-2xl font-bold text-foreground">
                {selectedCertificate.title}
              </DialogTitle>
            </DialogHeader>

            {/* If authentic image exists, show preview */}
            {selectedCertificate.image && (
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 my-2 max-h-60 flex items-center justify-center">
                <img
                  src={selectedCertificate.image}
                  alt={selectedCertificate.title}
                  className="w-full h-full object-contain"
                />
              </div>
            )}

            <p className="text-sm text-slate-300 leading-relaxed mt-2">
              {selectedCertificate.description}
            </p>

            <div className="space-y-3 pt-3 border-t border-slate-800 font-mono text-xs">
              {selectedCertificate.credentialId && (
                <div className="flex items-center justify-between py-1 border-b border-slate-800/40">
                  <span className="text-slate-400">Credential Verification ID:</span>
                  <span className="text-emerald-400 font-medium">{selectedCertificate.credentialId}</span>
                </div>
              )}

              <div>
                <span className="text-slate-400 block mb-2">Verified Competencies:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCertificate.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700/60 text-slate-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              {selectedCertificate.verificationUrl && (
                <Button
                  className="font-mono text-xs bg-primary hover:bg-sky-400 text-slate-950 font-semibold"
                  onClick={() => window.open(selectedCertificate.verificationUrl, '_blank')}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Official Issuer Portal
                </Button>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
};

export default Certifications;
