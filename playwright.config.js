const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests', fullyParallel: false, workers: 1,
  use: { baseURL: 'http://127.0.0.1:3000', launchOptions: { executablePath: process.env.CI ? undefined : (process.env.CHROME_BIN || '/usr/bin/google-chrome-stable'), args: ['--no-sandbox'] } },
  webServer: { command: 'npm run start -- --hostname 127.0.0.1', url: 'http://127.0.0.1:3000', reuseExistingServer: !process.env.CI },
});
