import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import jotaiDebugLabel from "jotai/babel/plugin-debug-label";
import jotaiReactRefresh from "jotai/babel/plugin-react-refresh";
import path from "node:path";
import { VitePluginRadar } from "vite-plugin-radar";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  preview: {
    host: true,
    port: 3001,
  },
  plugins: [
    react({ babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] } }),
    VitePluginRadar({
      // Google Analytics tag injection
      analytics: {
        id: "G-CNC4QLWME6",
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
  optimizeDeps: {
    include: ["react/jsx-runtime"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
