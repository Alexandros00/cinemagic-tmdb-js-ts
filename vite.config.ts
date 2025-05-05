import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  server: {
    port: 3000
  },
  plugins: [visualizer()]
});
