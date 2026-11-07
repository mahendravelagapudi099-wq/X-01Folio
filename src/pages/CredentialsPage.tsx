import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ExternalLink } from 'lucide-react';
import { CERTIFICATES, ALSO_COMPLETED } from '@/data/credentialsData';

export default function CredentialsPage() {
  const [filter, setFilter] = useState<string>('all');

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
      <Helmet>
        <title>Verified Credentials | Velagapudi Mahendra</title>
        <meta
          name="description"
          content="Verified academic certifications and credentials of Velagapudi Mahendra."
        />
        <link rel="canonical" href="https://mahendraa.dev/credentials" />
      </Helmet>
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-8">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <span className="text-foreground">Verified Credentials</span>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-4 mb-10 border-b border-border pb-8">
        <h1 className="text-4xl sm:text-5xl font-sans font-bold text-foreground">
          Verified Credentials &amp; Certifications
        </h1>

        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
          6 featured proctored academic certifications and technical competency verifications. Each credential includes its verified issuer, date, and credential ID.
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

      {/* Also Completed Section */}
      <section className="mt-14 pt-8 border-t border-border">
        <h2 className="text-lg font-sans font-bold text-foreground mb-3">
          Also Completed
        </h2>
        <ul className="space-y-2 text-xs font-mono text-muted-foreground">
          {ALSO_COMPLETED.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-foreground/40">&bull;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
