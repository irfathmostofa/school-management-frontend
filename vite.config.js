import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(root, "src"),
    },
  },
  server: {
    host: true,
    port: 5173,
    allowedHosts: [".monkeycode-ai.live"],
    proxy: {
      "/server": {
        target: process.env.API_PROXY_TARGET || "https://5000-d62eb68515f2925a.monkeycode-ai.live",
        changeOrigin: true,
        secure: false,
      },
      "/docs": {
        target: process.env.API_PROXY_TARGET || "https://5000-d62eb68515f2925a.monkeycode-ai.live",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
