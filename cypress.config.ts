import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    viewportWidth: 414,
    viewportHeight: 736,
    supportFile: "cypress/support/e2e.ts",
    video: false
  }
});
