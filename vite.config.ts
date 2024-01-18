import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact({ include: "**/*.tsx" })],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      assets: resolve(__dirname, "src/assets"),
      bridge: resolve(__dirname, "src/bridge"),
      components: resolve(__dirname, "src/components"),
      helpers: resolve(__dirname, "src/helpers"),
      hooks: resolve(__dirname, "src/hooks"),
      managers: resolve(__dirname, "src/managers"),
      mockup: resolve(__dirname, "src/mockup"),
      screens: resolve(__dirname, "src/screens"),
      themes: resolve(__dirname, "src/themes"),
      types: resolve(__dirname, "src/types"),
    },
  },
});
