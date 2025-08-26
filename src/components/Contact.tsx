import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string>('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Give instant feedback
    setIsSubmitting(true);
    setIsSubmitted(true);  // show "Message Sent" immediately
    setServerError('');

    const formCopy = { ...formData };  // preserve values for background send
    setFormData({ name: '', email: '', message: '' }); // clear form instantly

    try {
      const response = await fetch('http://localhost:8080/send-mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formCopy),
      });
      const result = await response.json();

      if (!result.success) {
        // If error, show message
        setServerError('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setServerError('Error sending message. Please try again later.');
    }

    // Reset submission state after 3 seconds
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'mahendravelagapudi099@gmail.com', href: 'mailto:mahendravelagapudi099@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
    { icon: MapPin, label: 'Location', value: 'San Francisco, CA', href: 'https://www.google.com/maps/place/The+White+House/@38.8976763,-77.0365298,17z' },
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full overflow-hidden">
      <div className="fade-in text-center mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
          Get In Touch
        </h2>
        <div className="w-20 sm:w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        <p className="text-muted-foreground mt-6 max-w-2xl mx-auto px-2">
          Have a project in mind or want to collaborate? I'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Contact Info */}
        <div className="fade-in delay-200 space-y-8">
          <h3 className="text-xl sm:text-2xl font-orbitron font-semibold">Let's Connect</h3>
          <div className="space-y-6">
            {contactInfo.map((info) => (
              <a key={info.label} href={info.href} className="glass-card p-5 sm:p-6 hover:glow-secondary transition-all duration-300 group flex items-center gap-4">
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
        </div>

        {/* Contact Form */}
        <div className="fade-in delay-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className={`w-full glass-card bg-transparent border-glass-border/30 focus:border-primary transition-all duration-300 ${errors.name ? 'border-destructive' : ''}`} />
            {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}

            <Input name="email" type="email" placeholder="Your Email" value={formData.email} onChange={handleChange} className={`w-full glass-card bg-transparent border-glass-border/30 focus:border-primary transition-all duration-300 ${errors.email ? 'border-destructive' : ''}`} />
            {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}

            <Textarea name="message" placeholder="Your Message" rows={6} value={formData.message} onChange={handleChange} className={`w-full glass-card bg-transparent border-glass-border/30 focus:border-primary transition-all duration-300 resize-none ${errors.message ? 'border-destructive' : ''}`} />
            {errors.message && <p className="text-destructive text-sm mt-1">{errors.message}</p>}

            {serverError && <p className="text-destructive text-sm">{serverError}</p>}

            <Button type="submit" disabled={isSubmitting} className={`w-full glass-card py-5 sm:py-6 text-base sm:text-lg font-medium transition-all duration-300 ${isSubmitted ? 'glow-accent bg-green-500/20 border-green-500/50' : 'glow-primary hover:scale-[1.02]'}`}>
              {isSubmitted ? (
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  Message Sent!
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Send Message
                </div>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
