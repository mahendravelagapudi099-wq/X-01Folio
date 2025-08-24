import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  return {
    server: {
      host: "::",   // allows local access
      port: 8080,
    },
    base: "/",      // ✅ Netlify needs root base path
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
      outDir: "dist",   // Netlify expects build in "dist"
      sourcemap: false, // optional, can enable if debugging
    },
  };
});
