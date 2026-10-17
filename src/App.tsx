// App.tsx - Build Triggered: 2026-05-11
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import Index from "./pages/Index";

// Non-landing routes are lazy-loaded so the home page doesn't ship blog/404 code.
const BlogIndex = lazy(() => import("./pages/BlogIndex"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const NotFound = lazy(() => import("./pages/NotFound"));
import Navbar from "@/components/Navbar";
import ErrorBoundary from "@/components/ErrorBoundary";
import Footer from "@/components/Footer";
import QuickConnect from "@/components/QuickConnect";
import BackToTop from "@/components/BackToTop";

// Create a React Query client
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          {/* Global Toaster / Notifications */}
          <Toaster />
          <Sonner />

          {/* Routing */}
          <BrowserRouter>
            {/* Layout wrapper */}
            <div className="flex flex-col min-h-screen">
              <Navbar />

              {/* Main content area */}
              <div className="flex-grow">
                <ErrorBoundary>
                  <Suspense
                    fallback={
                      <div className="flex min-h-screen items-center justify-center">
                        <div className="h-12 w-12 animate-spin rounded-full border-primary border-t-2 border-b-2" />
                      </div>
                    }
                  >
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/blog" element={<BlogIndex />} />
                      <Route path="/blog/:slug" element={<BlogPost />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </ErrorBoundary>
              </div>

              {/* Footer and Quick Connect are rendered only once */}
              <Footer />
              <QuickConnect />
              <BackToTop />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
