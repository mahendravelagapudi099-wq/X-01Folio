import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, ExternalLink, Eye } from 'lucide-react';
import { CERTIFICATES, Certificate } from '@/data/credentialsData';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function CredentialsPage() {
  const [filter, setFilter] = useState<string>('all');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const categories = [
    { id: 'all', label: 'All Certifications' },
    { id: 'data', label: 'Data Science' },
    { id: 'ai', label: 'Generative AI' },
    { id: 'database', label: 'Databases' },
    { id: 'engineering', label: 'Engineering' }
  ];

  const filtered = CERTIFICATES.filter((c) => {
    if (filter === 'all') return true;
    return c.category === filter;
  });

  return (
    <div className="min-h-screen bg-background text-foreground pt-28 pb-24 px-6 max-w-5xl mx-auto font-sans">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-8">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <span className="text-foreground">Verified Credentials</span>
      </div>

      {/* Header (No Eyebrow, Direct Weight) */}
      <div className="flex flex-col gap-4 mb-10 border-b border-border pb-8">
        <h1 className="text-4xl sm:text-5xl font-sans font-bold text-foreground">
          Verified Credentials &amp; Certifications
        </h1>

        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
          Proctored academic certifications, technical competency verifications, and enterprise coursework. Every credential is cited with its unique issuer verification identifier and proctored examination details.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-3.5 py-1.5 rounded text-xs font-mono font-medium transition-colors ${
                filter === cat.id
                  ? 'bg-foreground text-background font-semibold'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Credentials Ledger */}
      <div className="divide-y divide-border border-y border-border">
        {filtered.map((cert) => (
          <div
            key={cert.id}
            className="py-8 flex flex-col md:flex-row md:items-start justify-between gap-6"
          >
            <div className="md:w-1/3 shrink-0 text-xs font-mono text-muted-foreground">
              <span className="font-semibold text-primary uppercase tracking-wider block mb-1">
                {cert.issuer}
              </span>
              <span className="block mb-2 tabular-nums">{cert.date}</span>
              {cert.credentialId && (
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="text-[11px] text-muted-foreground uppercase">ID:</span>
                  <code className="text-[11px] text-foreground font-semibold px-2 py-0.5 bg-muted rounded border border-border tabular-nums">
                    {cert.credentialId}
                  </code>
                </div>
              )}
            </div>

            <div className="md:w-1/2 flex flex-col gap-2">
              <h2 className="text-xl font-sans font-bold text-foreground leading-snug">
                {cert.title}
              </h2>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {cert.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-muted text-muted-foreground border border-border"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="md:w-1/6 shrink-0 flex md:flex-col md:items-end justify-between md:justify-start gap-3 pt-1 text-xs font-mono">
              {cert.image && (
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="inline-flex items-center gap-1.5 text-foreground hover:text-primary transition-colors font-medium"
                >
                  <Eye className="w-3.5 h-3.5" /> Certificate
                </button>
              )}
              {cert.verificationUrl && (
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
                >
                  Verify <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Certificate Preview Dialog */}
      <Dialog open={!!selectedCert} onOpenChange={(open) => !open && setSelectedCert(null)}>
        <DialogContent className="max-w-3xl bg-background border border-border p-6 sm:p-8 font-sans">
          <DialogHeader>
            <div className="text-xs font-mono text-primary uppercase tracking-wider mb-1">
              {selectedCert?.issuer} &bull; {selectedCert?.date}
            </div>
            <DialogTitle className="text-2xl font-sans font-bold text-foreground">
              {selectedCert?.title}
            </DialogTitle>
          </DialogHeader>

          {selectedCert?.image && (
            <div className="my-4 rounded overflow-hidden border border-border bg-card">
              <img
                src={selectedCert.image}
                alt={`Certificate for ${selectedCert.title}`}
                className="w-full h-auto max-h-[500px] object-contain"
              />
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-border text-xs font-mono text-muted-foreground">
            <span>Credential ID: {selectedCert?.credentialId || 'N/A'}</span>
            {selectedCert?.verificationUrl && (
              <a
                href={selectedCert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center gap-1 font-medium"
              >
                Official Verification Portal <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

