import { useEffect } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Blog from '@/components/Blog';
import Resume from '@/components/Resume';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Certificates from "@/components/Certificates";
import QuickConnect from "@/components/QuickConnect";



const Index = () => {
  useEffect(() => {
    // Smooth scroll behavior for navigation links
    const handleNavClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    document.addEventListener('click', handleNavClick);
    return () => document.removeEventListener('click', handleNavClick);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <About />
      <Projects />
      <Certificates />
      <Blog />
      <Resume />
      <Contact />
      <Footer />
       <QuickConnect />
    </div>
  );
};

export default Index;
