import { defineConfig } from "vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "/nasa-media-explorer/",
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      routeFileIgnorePattern: ".test.",
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    modules: {
      generateScopedName: (name, filename, css) => {
        const file = path.basename(filename).replace(".module.css", "");
        const hash = Buffer.from(css).toString("base64").slice(0, 5);
        return `${file}_${name}_${hash}`;
      },
    },
  },
});
