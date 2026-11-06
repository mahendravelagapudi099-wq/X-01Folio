import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Github, Linkedin, Send, CheckCircle2, AlertCircle, Loader2, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const EMAIL = 'mahendravelagapudi099@gmail.com';
const GITHUB_URL = 'https://github.com/mahendravelagapudi099-wq';
const LINKEDIN_URL = 'https://www.linkedin.com/in/velagapudi-mahendra-543481353';
const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

type FormStatus = 'idle' | 'sending' | 'sent' | 'mailto' | 'error';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    company: '', // honeypot
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 10) newErrors.message = 'Minimum 10 characters required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildMailto = () => {
    const subject = `Portfolio contact from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`;
    return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.company) return; // honeypot tripped
    if (!validateForm()) return;

    setStatus('sending');

    if (CONTACT_ENDPOINT) {
      try {
        const response = await fetch(CONTACT_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
          }),
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        setFormData({ name: '', email: '', message: '', company: '' });
        setStatus('sent');
      } catch {
        setStatus('error');
      }
      return;
    }

    // Default mailto fallback
    window.location.href = buildMailto();
    setStatus('mailto');
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-28 pb-24 px-6 max-w-4xl mx-auto">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-8">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <span className="text-foreground">Contact &amp; Inquiries</span>
      </div>

      <div className="border-b border-border/60 pb-8 mb-10">
        <h1 className="text-4xl sm:text-5xl font-sans font-bold text-foreground mb-4">
          Contact &amp; Collaboration
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Open for academic research inquiries, MEXT/Honjo scholarship dialogues, data science engineering roles, and discussions on autonomous AI agent runtime safety.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
        {/* Direct Channels */}
        <div className="md:col-span-2 space-y-6">
          <div className="p-6 rounded border border-border bg-card">
            <h2 className="text-base font-sans font-bold text-foreground mb-4">
              Direct Communication Channels
            </h2>
            <div className="space-y-4 text-sm font-mono">
              <div>
                <span className="text-xs text-muted-foreground block mb-0.5">Primary Email:</span>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-foreground font-medium hover:text-primary transition-colors flex items-center gap-1.5 break-all"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  {EMAIL}
                </a>
              </div>

              <div>
                <span className="text-xs text-muted-foreground block mb-0.5">Source Repositories:</span>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground font-medium hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5 shrink-0" />
                  github.com/mahendravelagapudi099-wq
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

              <div>
                <span className="text-xs text-muted-foreground block mb-0.5">Professional Network:</span>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground font-medium hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <Linkedin className="w-3.5 h-3.5 shrink-0" />
                  linkedin.com/in/velagapudi-mahendra
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-border/50 bg-background/50 text-xs font-mono text-muted-foreground space-y-2">
            <span className="text-foreground font-semibold block">Response Guarantee</span>
            <p>
              I read and respond to all substantive technical and academic messages within 24&ndash;48 hours.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-3">
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-xl border border-border bg-card/60 space-y-5"
          >
            {/* Honeypot */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input
                id="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Your Name
              </label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
                placeholder="Jane Doe"
                className={`bg-background border-border text-foreground font-mono text-sm ${
                  errors.name ? 'border-destructive' : ''
                }`}
                disabled={status === 'sending'}
              />
              {errors.name && <p className="text-xs font-mono text-destructive mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Your Email
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                placeholder="jane@organization.org"
                className={`bg-background border-border text-foreground font-mono text-sm ${
                  errors.email ? 'border-destructive' : ''
                }`}
                disabled={status === 'sending'}
              />
              {errors.email && <p className="text-xs font-mono text-destructive mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Message / Proposal
              </label>
              <Textarea
                id="message"
                rows={5}
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                  if (errors.message) setErrors({ ...errors, message: '' });
                }}
                placeholder="Describe your research inquiry, fellowship opportunity, or collaboration idea..."
                className={`bg-background border-border text-foreground font-mono text-sm resize-none ${
                  errors.message ? 'border-destructive' : ''
                }`}
                disabled={status === 'sending'}
              />
              {errors.message && <p className="text-xs font-mono text-destructive mt-1">{errors.message}</p>}
            </div>

            {status === 'sent' && (
              <div className="p-3 rounded border border-neutral-700 bg-neutral-900 text-foreground text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-foreground" /> Message delivered successfully. I will get back to you shortly.
              </div>
            )}

            {status === 'mailto' && (
              <div className="p-3 rounded border border-border bg-background text-xs font-mono text-muted-foreground flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-foreground shrink-0" /> Drafted in your email client. Send the email directly to complete delivery.
              </div>
            )}

            {status === 'error' && (
              <div className="p-3 rounded-lg border border-destructive/30 bg-destructive/10 text-destructive text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" /> Transmission error. Please contact directly at {EMAIL}.
              </div>
            )}

            <Button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-foreground text-background font-mono text-xs uppercase tracking-wider font-semibold py-3 hover:opacity-90 transition-opacity"
            >
              {status === 'sending' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" /> Transmitting Message...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" /> Send Direct Message
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

