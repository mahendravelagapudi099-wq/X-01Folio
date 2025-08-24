import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after success animation
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'mahendravelagapudi099@gmail.com',
      href: 'mailto:alex.chen@email.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 98765 43210',
      href: 'tel:+919876543210'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'San Francisco, CA',
        href: 'https://www.google.com/maps/place/The+White+House/@38.8976763,-77.0365298,17z'
    }
  ];

  return (
    <section id="contact" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="fade-in text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
          Get In Touch
        </h2>
        <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? I'd love to hear from you.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Contact Info */}
        <div className="fade-in delay-200">
          <h3 className="text-2xl font-orbitron font-semibold mb-8">Let's Connect</h3>
          
          <div className="space-y-6 mb-8">
            {contactInfo.map((info) => (
              <a
                key={info.label}
                href={info.href}
                className="glass-card p-6 hover:glow-secondary transition-all duration-300 group flex items-center gap-4 block"
              >
                <div className="glass-card p-3 rounded-xl glow-accent group-hover:scale-110 transition-transform duration-300">
                  <info.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-orbitron font-medium mb-1">{info.label}</h4>
                  <p className="text-muted-foreground">{info.value}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="glass-card p-6 glow-purple">
            <h4 className="font-orbitron font-semibold mb-4">Response Time</h4>
            <p className="text-muted-foreground mb-2">
              I typically respond to messages within 24 hours during business days.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400">Usually online</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="fade-in delay-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className={`glass-card bg-transparent border-glass-border/30 focus:border-primary transition-all duration-300 ${
                  errors.name ? 'border-destructive' : ''
                }`}
              />
              {errors.name && (
                <p className="text-destructive text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <Input
                name="email"
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className={`glass-card bg-transparent border-glass-border/30 focus:border-primary transition-all duration-300 ${
                  errors.email ? 'border-destructive' : ''
                }`}
              />
              {errors.email && (
                <p className="text-destructive text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Textarea
                name="message"
                placeholder="Your Message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className={`glass-card bg-transparent border-glass-border/30 focus:border-primary transition-all duration-300 resize-none ${
                  errors.message ? 'border-destructive' : ''
                }`}
              />
              {errors.message && (
                <p className="text-destructive text-sm mt-1">{errors.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || isSubmitted}
              className={`w-full glass-card py-6 text-lg font-medium transition-all duration-300 ${
                isSubmitted 
                  ? 'glow-accent bg-green-500/20 border-green-500/50' 
                  : 'glow-primary hover:scale-[1.02]'
              }`}
            >
              {isSubmitted ? (
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  Message Sent!
                </div>
              ) : isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  Sending...
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