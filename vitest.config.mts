import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["apps/**/*.test.ts", "packages/**/*.test.ts"],
    coverage: {
      provider: "istanbul",
      reporter: ["text", "html", "lcov"],
    },
  },
});
