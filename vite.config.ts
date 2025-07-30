import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { componentTagger } from "lovable-tagger"
 
// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(), 
    tailwindcss(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  server: {
    // This allows the dev server to accept connections from any host,
    // useful for development across networks or in containers.
    host: true,
    port: parseInt(process.env.VITE_APP_PORT || "5173"),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
