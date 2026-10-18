import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  return {
    server: {
      host: "::",   // allows local access
      port: 8081,
    },
    base: "/",      // root base path — GitHub Pages with the mahendraa.dev custom domain
    plugins: [
      react(),
      mode === "development" && componentTagger(), // only in dev
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: "dist",   // uploaded by .github/workflows/deploy.yml
      sourcemap: false, // optional, can enable if debugging
      chunkSizeWarningLimit: 900,
      rollupOptions: {
        output: {
          // Otherwise everything lands in one 1.5MB JS chunk.
          manualChunks(id) {
            if (!id.includes("node_modules")) return;
            if (id.includes("framer-motion")) return "framer";
            if (id.includes("swiper")) return "swiper";
            if (id.includes("radix-ui")) return "radix";
            if (id.includes("syntax-highlighter")) return "highlighter";
            if (id.includes("@supabase")) return "supabase";
            if (id.includes("@tanstack")) return "query";
            if (id.includes("lucide-react")) return "icons";
            return "vendor";
          },
        },
      },
    },
  };
});
