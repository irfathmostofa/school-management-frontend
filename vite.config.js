import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, root, "");
  const apiTarget = env.VITE_API_PROXY_TARGET || "http://localhost:5000";

  return {
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
          target: apiTarget,
          changeOrigin: true,
          secure: false,
        },
        "/docs": {
          target: apiTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
