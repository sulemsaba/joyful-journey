import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    {
      // Return a clean 404 JSON for any /api/* route that isn't handled by the
      // proxy above. Without this, Vite's SPA fallback serves index.html (200)
      // for unknown /api/* routes, which makes axios parse HTML as JSON and crash.
      // Pre-hook (no return) so it runs AFTER the proxy but BEFORE Vite's SPA fallback.
      name: "api-404-fallback",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url?.startsWith("/api/")) {
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 404;
            res.end(JSON.stringify({ error: "Not found", path: req.url }));
            return;
          }
          next();
        });
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3001,
    host: true,
    allowedHosts: true,
    proxy: {
      "/api/v1": {
        target: "http://127.0.0.1:3032",
        changeOrigin: true,
      },
    },
    watch: {
      ignored: [
        "**/skills/**",
        "**/dist/**",
        "**/download/**",
        "**/upload/**",
        "**/db/**",
        "**/agent-ctx/**",
        "**/.zscripts/**",
        "**/mini-services/**",
        "**/examples/**",
      ],
    },
    fs: {
      allow: [
        path.resolve(__dirname),
        path.resolve(__dirname, "./src"),
        path.resolve(__dirname, "./public"),
        path.resolve(__dirname, "./node_modules"),
      ],
    },
  },
  optimizeDeps: {
    exclude: ["skills"],
    entries: [path.resolve(__dirname, "./src/main.tsx")],
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        // Vite 8 / rolldown requires manualChunks to be a function
        manualChunks(id) {
          // Split Framer Motion into its own chunk — it's ~130KB
          // and only needed by JobApplyModal + StackSection.
          if (id.includes("node_modules/framer-motion/")) {
            return "vendor-framer-motion";
          }
        },
      },
    },
  },
});
