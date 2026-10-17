import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, CheckCircle, AlertCircle, Loader2, Mail, Github, Linkedin } from 'lucide-react';

const EMAIL = 'mahendravelagapudi099@gmail.com';
const GITHUB_URL = 'https://github.com/mahendravelagapudi099-wq';
const LINKEDIN_URL = 'https://www.linkedin.com/in/velagapudi-mahendra-543481353';
/** Optional hosted form endpoint. When unset, the form falls back to a mailto: compose window. */
const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

type FormStatus = 'idle' | 'sending' | 'sent' | 'mailto' | 'error';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    /** Honeypot — real users never see it; bots fill it and get dropped silently. */
    company: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';

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
    if (formData.company) return; // honeypot tripped — drop the submission
    if (!validateForm()) return;

    setStatus('sending');

    if (CONTACT_ENDPOINT) {
      // Hosted form service: only trust a 2xx response — no premature "sent".
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

    // Static hosting (GitHub Pages): hand the visitor a prefilled email — never fake a send.
    try {
      window.location.href = buildMailto();
      setStatus('mailto');
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: Github, label: 'GitHub', value: 'mahendravelagapudi099-wq', href: GITHUB_URL },
    { icon: Linkedin, label: 'LinkedIn', value: 'velagapudi-mahendra', href: LINKEDIN_URL },
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full overflow-hidden">
      <div className="fade-in text-center mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
          Get In Touch
        </h2>
        <div className="w-20 sm:w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        <p className="text-muted-foreground mt-6 max-w-2xl mx-auto px-2">
          Have a project in mind or want to collaborate? I&rsquo;d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Contact Info */}
        <div className="fade-in delay-200 space-y-8">
          <h3 className="text-xl sm:text-2xl font-orbitron font-semibold">Let&rsquo;s Connect</h3>
          <div className="space-y-6">
            {contactInfo.map((info) => (
              <a
                key={info.label}
                href={info.href}
                target={info.href.startsWith('http') ? '_blank' : undefined}
                rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="glass-card p-5 sm:p-6 hover:glow-secondary transition-all duration-300 group flex items-center gap-4 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <div className="glass-card p-3 rounded-xl glow-accent group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  <info.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div className="overflow-hidden">
                  <h4 className="font-orbitron font-medium mb-1">{info.label}</h4>
                  <p className="text-muted-foreground break-words">{info.value}</p>
                </div>
              </a>
            ))}
          </div>
          <p className="text-sm text-muted-foreground/80">
            The form opens your email app with a prefilled message — nothing is sent until
            you press send there.
          </p>
        </div>

        {/* Contact Form */}
        <div className="fade-in delay-300">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Honeypot: invisible to users and screen readers; bots fill it and get dropped. */}
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <div>
              <Input
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                aria-label="Your name"
                aria-invalid={!!errors.name}
                autoComplete="name"
                className={`w-full glass-card bg-transparent border-glass-border/30 focus:border-primary transition-all duration-300 ${errors.name ? 'border-destructive' : ''}`}
              />
              {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <Input
                name="email"
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                aria-label="Your email address"
                aria-invalid={!!errors.email}
                autoComplete="email"
                className={`w-full glass-card bg-transparent border-glass-border/30 focus:border-primary transition-all duration-300 ${errors.email ? 'border-destructive' : ''}`}
              />
              {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <Textarea
                name="message"
                placeholder="Your Message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                aria-label="Your message"
                aria-invalid={!!errors.message}
                className={`w-full glass-card bg-transparent border-glass-border/30 focus:border-primary transition-all duration-300 resize-none ${errors.message ? 'border-destructive' : ''}`}
              />
              {errors.message && <p className="text-destructive text-sm mt-1">{errors.message}</p>}
            </div>

            <div aria-live="polite" className="text-sm min-h-[1.5rem]">
              {status === 'sent' && (
                <p className="flex items-center gap-2 text-accent">
                  <CheckCircle className="h-4 w-4" /> Message sent — I&rsquo;ll reply as soon as I can.
                </p>
              )}
              {status === 'mailto' && (
                <p className="text-muted-foreground">
                  Your email app should have opened with a prefilled message. If nothing
                  happened, write to me directly at {EMAIL}.
                </p>
              )}
              {status === 'error' && (
                <p className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  The message couldn&rsquo;t be sent. Please email me directly at {EMAIL}.
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={status === 'sending'}
              className={`w-full glass-card py-5 sm:py-6 text-base sm:text-lg font-medium transition-all duration-300 ${status === 'sent' ? 'glow-accent bg-green-500/20 border-green-500/50' : 'glow-primary hover:scale-[1.02]'}`}
            >
              {status === 'sending' ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending…
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" /> Send Message
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
