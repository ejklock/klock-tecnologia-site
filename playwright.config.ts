import { defineConfig } from "@playwright/test";

const PORT = 3100;
const BASE_URL = process.env.BG_BASE_URL ?? `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "tests/browser",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  use: {
    baseURL: BASE_URL,
    headless: true,
  },
  webServer: process.env.BG_BASE_URL
    ? undefined
    : {
        command: `npm run build && npm run start -- --port ${PORT}`,
        url: BASE_URL,
        timeout: 240_000,
        reuseExistingServer: !process.env.CI,
      },
});
