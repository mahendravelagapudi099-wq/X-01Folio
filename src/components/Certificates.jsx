import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Award, Calendar, ExternalLink } from 'lucide-react';

const Certifications = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const certificates = [
    {
      id: '1',
      title: 'Google Data Analytics Professional Certificate',
      issuer: 'Google Career Certificates',
      date: '2024',
      description: 'Comprehensive program covering data analysis fundamentals, data cleaning, visualization, and statistical analysis using R, SQL, and Tableau.',
      skills: ['Data Analysis', 'R Programming', 'SQL', 'Tableau', 'Data Visualization'],
      credentialId: 'GDA-2024-001',
      verificationUrl: 'https://coursera.org/verify/professional-cert/xyz123',
      image: '/placeholder.svg'
    },
    {
      id: '2',
      title: 'Introduction to Generative AI',
      issuer: 'Google Cloud / Simplilearn',
      date: '12th December 2025',
      description: 'This professional has demonstrated initiative and a commitment to deepening their skills and advancing their career in generative AI.',
      skills: ['Generative AI', 'Machine Learning', 'AI Models', 'Deep Learning', 'Python', 'Prompt Engineering'],
      credentialId: '9550963',
      verificationUrl: '',
      image: '/placeholder.svg'
    },
    {
      id: '3',
      title: 'MongoDB Data Modeling Intro',
      issuer: 'MongoDB',
      date: '18th December 2025',
      description: 'Completed an introductory course on MongoDB data modeling, covering schema design, indexing, and database best practices.',
      skills: ['MongoDB', 'Data Modeling', 'Database Design', 'Indexing', 'NoSQL'],
      credentialId: 'MDBeiehqbzv9n',
      verificationUrl: '',
      image: '/placeholder.svg'
    },
    {
      id: '4',
      title: 'Data Analyst 101',
      issuer: 'Microsoft / Simplilearn',
      date: '4th December 2025',
      description: 'Completed an introductory data analysis course covering data cleaning, visualization, and basic statistical analysis.',
      skills: ['Data Analysis', 'Data Cleaning', 'Data Visualization', 'Excel', 'SQL', 'Python'],
      credentialId: '9528126',
      verificationUrl: '',
      image: '/placeholder.svg'
    },
    {
      id: '5',
      title: 'MongoDB and the Document Model',
      issuer: 'MongoDB, Inc.',
      date: '20th December 2025',
      description: 'Completed a course on MongoDB document modeling, covering schema design, collections, and best practices for document databases.',
      skills: ['MongoDB', 'Document Model', 'NoSQL', 'Database Design', 'Data Modeling'],
      credentialId: 'MDB3dllkpvir8',
      verificationUrl: '',
      image: '/placeholder.svg'
    },
    {
      id: '6',
      title: 'Gemini Certified Student',
      issuer: 'Google for Education / University',
      date: '7th December 2025',
      description: 'Demonstrated knowledge, skills, and basic competencies needed to use Google AI.',
      skills: ['Artificial Intelligence', 'Machine Learning', 'Google AI', 'AI Fundamentals'],
      credentialId: '',
      verificationUrl: '',
      image: '/placeholder.svg'
    },
    {
      id: '7',
      title: 'Data Analytics and Visualization Job Simulation',
      issuer: 'Accenture / Forage',
      date: '27th February 2025',
      description: 'Completed practical tasks in project understanding, data cleaning & modeling, data visualization & storytelling, and client presentation.',
      skills: ['Data Analysis', 'Data Cleaning', 'Data Modeling', 'Data Visualization', 'Storytelling', 'Project Management'],
      credentialId: 'TtuRuZiFOz6MBpjAJ',
      verificationUrl: '',
      image: '/placeholder.svg'
    },
    {
      id: '8',
      title: 'Data Analytics Job Simulation',
      issuer: 'Deloitte / Forage',
      date: '26th February 2025',
      description: 'Completed practical tasks in data analysis and forensic technology, demonstrating applied analytics skills in a professional simulation environment.',
      skills: ['Data Analysis', 'Forensic Technology', 'Data Modeling', 'Reporting'],
      credentialId: '',
      verificationUrl: '',
      image: '/placeholder.svg'
    },
    {
      id: '9',
      title: 'Software Engineering Job Simulation',
      issuer: 'Skyscanner / Forage',
      date: '13th February 2025',
      description: 'Completed practical tasks including creating a Backpack React web app, building microservices, developing a mobile flight itinerary, and creating a user-friendly platform.',
      skills: ['React', 'Microservices', 'Mobile Development', 'Web Development', 'UI/UX'],
      credentialId: 'pHebmieZOnoP64ZJ5',
      verificationUrl: '',
      image: '/placeholder.svg'
    },
    {
      id: '10',
      title: 'SQL Bootcamp',
      issuer: 'LetsUpgrade / NSDC / GDG MAD',
      date: '10th August 2024',
      description: 'Completed a 5-day SQL Bootcamp covering database querying, data manipulation, and SQL fundamentals.',
      skills: ['SQL', 'Database Queries', 'Data Manipulation', 'Database Management'],
      credentialId: 'LUESQLAUG124491',
      verificationUrl: 'https://www.letsupgrade.in/verify',
      image: '/placeholder.svg'
    },
    {
      id: '11',
      title: 'Data Analytics with Python',
      issuer: 'NPTEL / IIT Roorkee',
      date: 'Jan-Apr 2025',
      description: 'Successfully completed a 12-week course on data analytics using Python, including online assignments and a proctored exam.',
      skills: ['Python', 'Data Analysis', 'Pandas', 'NumPy', 'Data Visualization', 'Statistics'],
      credentialId: 'NPTEL25CS17S1147000547',
      verificationUrl: '',
      image: '/placeholder.svg'
    },
    {
      id: '12',
      title: 'Introduction to Generative AI',
      issuer: 'Google Cloud / Simplilearn',
      date: '12th December 2025',
      description: 'Completed an online course on Generative AI, demonstrating initiative and commitment to learning AI fundamentals.',
      skills: ['Generative AI', 'Machine Learning', 'AI Models', 'Deep Learning', 'Python', 'Prompt Engineering'],
      credentialId: '9550963',
      verificationUrl: '',
      image: '/placeholder.svg'
    },
    {
      id: '13',
      title: 'DevOps Webinar Participation',
      issuer: 'Google Developer Groups / Malla Reddy Engineering College',
      date: '30th September 2025',
      description: 'Successfully participated in a DevOps webinar covering collaboration, CI/CD concepts, and cloud development practices.',
      skills: ['DevOps', 'CI/CD', 'Cloud Development', 'Collaboration', 'Webinar Participation'],
      credentialId: '',
      verificationUrl: '',
      image: '/placeholder.svg'
    },
    {
      id: '14',
      title: 'Hands-on Workshop on DevOps — Git, GitHub & Docker',
      issuer: 'GeeksforGeeks / Malla Reddy Engineering College',
      date: '16th October 2025',
      description: 'Participated in a hands-on DevOps workshop focused on Git, GitHub, Docker, and automation practices.',
      skills: ['DevOps', 'Git', 'GitHub', 'Docker', 'Automation'],
      credentialId: 'MREMGFG041',
      verificationUrl: '',
      image: '/placeholder.svg'
    }
  ];

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, certificates.length));
  };

  const visibleCertificates = certificates.slice(0, visibleCount);
  const hasMore = visibleCount < certificates.length;

  return (
    <section id="certifications" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="fade-in text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
          Certifications
        </h2>
        <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
          Professional certifications that validate my expertise in data science and technology.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleCertificates.map((cert, index) => (
          <Dialog key={cert.id}>
            <DialogTrigger asChild>
              <div
                onClick={() => setSelectedCertificate(cert)}
                className={`glass-card p-6 hover:glow-primary transition-all duration-300 cursor-pointer group fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="glass-card p-3 rounded-xl glow-accent group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-orbitron font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-primary font-medium mb-1">{cert.issuer}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {cert.date}
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {cert.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {cert.skills.slice(0, 3).map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="glass-card bg-primary/10 text-primary border-primary/20 text-xs"
                    >
                      {skill}
                    </Badge>
                  ))}
                  {cert.skills.length > 3 && (
                    <Badge
                      variant="secondary"
                      className="glass-card bg-accent/10 text-accent border-accent/20 text-xs"
                    >
                      +{cert.skills.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="mt-4 text-primary text-sm font-medium group-hover:text-accent transition-colors">
                  Click to view details →
                </div>
              </div>
            </DialogTrigger>

            <DialogContent className="glass-card border-glass-border/50 bg-background/95 backdrop-blur-xl max-w-2xl">
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="glass-card p-3 rounded-xl glow-accent">
                      <Award className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <DialogTitle className="font-orbitron text-xl mb-2">
                        {cert.title}
                      </DialogTitle>
                      <p className="text-primary font-medium">{cert.issuer}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Calendar className="h-4 w-4" />
                        Earned in {cert.date}
                      </div>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                <div>
                  <h4 className="font-orbitron font-semibold mb-3">Description</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-orbitron font-semibold mb-3">Skills Covered</h4>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="glass-card bg-primary/10 text-primary border-primary/20"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {cert.credentialId && (
                  <div>
                    <h4 className="font-orbitron font-semibold mb-2">Credential Information</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      <span className="font-medium">Credential ID:</span> {cert.credentialId}
                    </p>
                    {cert.verificationUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="glass-card bg-transparent border-primary/30 hover:bg-primary/10 text-primary"
                        onClick={() => window.open(cert.verificationUrl, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Verify Certificate
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-12 fade-in">
          <Button
            onClick={handleLoadMore}
            className="glass-card bg-primary/20 hover:bg-primary/30 border-primary/30 text-primary px-8 py-6 text-lg font-orbitron glow-primary"
          >
            Load More Certifications
          </Button>
        </div>
      )}

      <div className="text-center mt-12 fade-in delay-500">
        <div className="glass-card p-6 glow-purple inline-block">
          <h3 className="font-orbitron font-semibold mb-2">Continuous Learning</h3>
          <p className="text-muted-foreground text-sm">
            Currently pursuing additional certifications in Advanced Machine Learning and Cloud Architecture
          </p>
        </div>
      </div>
    </section>
  );
};

export default Certifications;