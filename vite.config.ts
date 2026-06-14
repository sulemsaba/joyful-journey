import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    host: true,
    allowedHosts: true,
    proxy: {
      "/api/v1/track": {
        target: "http://127.0.0.1:3031",
        changeOrigin: true,
      },
      "/api/v1/consultations": {
        target: "http://127.0.0.1:3031",
        changeOrigin: true,
      },
      "/api/v1/privacy/consent": {
        target: "http://127.0.0.1:3031",
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
