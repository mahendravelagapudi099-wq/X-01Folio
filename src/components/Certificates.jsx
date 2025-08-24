import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Award, Calendar, ExternalLink } from 'lucide-react';

const Certifications = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

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
      title: 'Machine Learning Specialization',
      issuer: 'Stanford University & DeepLearning.AI',
      date: '2023',
      description: 'Completed comprehensive machine learning curriculum covering supervised learning, unsupervised learning, and neural networks.',
      skills: ['Machine Learning', 'Python', 'TensorFlow', 'Neural Networks', 'Deep Learning'],
      credentialId: 'ML-SPEC-2023-456',
      verificationUrl: 'https://coursera.org/verify/specialization/abc456',
      image: '/placeholder.svg'
    },
    {
      id: '3',
      title: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: '2023',
      description: 'Foundational certification demonstrating cloud computing knowledge and AWS core services understanding.',
      skills: ['AWS', 'Cloud Computing', 'Cloud Architecture', 'Cloud Security'],
      credentialId: 'AWS-CCP-789',
      verificationUrl: 'https://aws.amazon.com/verification/xyz789',
      image: '/placeholder.svg'
    },
    {
      id: '4',
      title: 'Data Science Professional Certificate',
      issuer: 'IBM',
      date: '2023',
      description: 'Hands-on experience with data science tools and techniques including Python, SQL, machine learning, and data visualization.',
      skills: ['Data Science', 'Python', 'Pandas', 'Scikit-learn', 'Jupyter Notebooks'],
      credentialId: 'IBM-DS-101',
      verificationUrl: 'https://ibm.com/verify/certificate/def101',
      image: '/placeholder.svg'
    }
  ];

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
        {certificates.map((cert, index) => (
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
