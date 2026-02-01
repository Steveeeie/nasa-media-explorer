import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";
import { playwright } from "@vitest/browser-playwright";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    bail: 1,
    testTimeout: 1000,
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: "chromium" }],
      screenshotFailures: false,
    },
    coverage: {
      exclude: ["**/src/components/moon/**"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: [
      "three",
      "@react-three/fiber",
      "@react-three/drei",
      "three/examples/jsm/Addons.js",
    ],
  },
});
