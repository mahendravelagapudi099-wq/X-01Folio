import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';

import Navbar from '@/components/Navbar';
import ErrorBoundary from '@/components/ErrorBoundary';
import Footer from '@/components/Footer';
import QuickConnect from '@/components/QuickConnect';
import BackToTop from '@/components/BackToTop';
import ScrollToTop from '@/components/ScrollToTop';

// Dynamic Routes (Lazy-loaded for optimal chunk splitting)
const Home = lazy(() => import('./pages/Home'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const ResearchPage = lazy(() => import('./pages/ResearchPage'));
const CredentialsPage = lazy(() => import('./pages/CredentialsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const BlogIndex = lazy(() => import('./pages/BlogIndex'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Query client for caching Supabase queries
const queryClient = new QueryClient();

const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          {children}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

const App: React.FC = () => {
  return (
    <AppProviders>
      <div className="flex flex-col min-h-screen bg-black text-foreground">
        <Navbar />

        <main className="flex-grow">
          <ErrorBoundary>
            <Suspense
              fallback={
                <div className="flex min-h-[60vh] items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
                </div>
              }
            >
              <Routes>
                {/* Top-Level Dynamic Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:slug" element={<ProjectDetail />} />
                <Route path="/research" element={<ResearchPage />} />
                <Route path="/credentials" element={<CredentialsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />

                {/* Technical Writing (Supabase + Muse AI) */}
                <Route path="/blog" element={<BlogIndex />} />
                <Route path="/blog/:slug" element={<BlogPost />} />

                {/* Fallback 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>

        <Footer />
        <QuickConnect />
        <BackToTop />
      </div>
    </AppProviders>
  );
};

export default App;

