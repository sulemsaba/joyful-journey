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
      "/api/v1/track": "http://127.0.0.1:3031",
      "/api/v1/consultations": "http://127.0.0.1:3031",
      "/api/v1/privacy/consent": "http://127.0.0.1:3031",
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
  },
});
