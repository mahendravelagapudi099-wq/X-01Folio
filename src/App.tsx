// App.tsx - Build Triggered: 2026-05-11
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import Index from "./pages/Index";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import Footer from "@/components/Footer";
import QuickConnect from "@/components/QuickConnect";

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
              {/* Main content area */}
              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>

              {/* Footer and Quick Connect are rendered only once */}
              <Footer />
              <QuickConnect />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
