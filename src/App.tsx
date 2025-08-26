// App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Footer from "@/components/Footer";
import QuickConnect from "@/components/QuickConnect";

// Create a React Query client
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
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
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            {/* Footer and Quick Connect are rendered only once */}
            <Footer />
            <QuickConnect />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
