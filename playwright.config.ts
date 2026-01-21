import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import { ENVS, TIMEOUTS } from './src/utils/Constants';

dotenv.config({ path: `.env.${ENVS.QA}` });  /* Load QA/STG/PROD env file as needed */

export default defineConfig({
  globalSetup: './src/setup/global.setup.ts',
  testDir: './src/tests',
  fullyParallel: false,
  // forbidOnly: !!process.env.CI,   /* Fail the build on CI if you accidentally left test.only in the source code. */
  retries: 2, // process.env.CI ? 2 : 0,
  workers: 1, // process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', { outputFolder: './playwright-report/allure-results', detail: true }],
  ],
  use: {
    viewport: null, /* controls video resolution */
    video: 'on',                           /* record for EVERY test */
    trace: 'on-first-retry', /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    headless: false, /* Run tests in headed mode */
    launchOptions: {
      args: ['--start-maximized', /* For maximized window */],
      // slowMo: TIMEOUTS.DEMO  /* delay after each action (ms) --> ONLY USE FOR DEBUGGING/DEMONSTRATION PURPOSES */
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'preparation',
      // use: { ...devices['Desktop Chrome'] },
      testMatch: ['preparation/**/*.spec.ts'], /* only preparation folder to prepare for TC execution */
    },
    {
      name: 'sanity',
      testMatch: ['sanity/**/*.spec.ts'], /* only sanity folder */
      timeout: TIMEOUTS.SANITY,                        /* broader flows allowed */
      testIgnore: [], /* exclude just the file(s) for example : 'sanity/someTest.spec.ts' */
    },
    {
      name: 'regression',
      testMatch: ['regression/**/*.spec.ts'], /* only regression folder */
      timeout: TIMEOUTS.REGRESSION,                         /* broader flows allowed */
      testIgnore: [], /* exclude just the file(s) for example : 'regression/someTest.spec.ts' */
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
