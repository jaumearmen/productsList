import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"
import { componentTagger } from "lovable-tagger"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      react(),
      tailwindcss(),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    define: {
      __APP_ENV__: JSON.stringify(env),
    },
    server: {
      // This allows the dev server to accept connections from any host,
      // useful for development across networks or in containers.
      host: true,
      port: parseInt(env.VITE_APP_PORT ? env.VITE_APP_PORT : "5173"),
      allowedHosts: [".dev.timbal.ai"],
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
});
