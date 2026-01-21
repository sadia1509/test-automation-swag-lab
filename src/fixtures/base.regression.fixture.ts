import { test as base, chromium, Browser, BrowserContext, Page, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { Env } from '../setup/env.setup';
import fs from 'fs';
import { ProductListPage } from '../pages/productList.page';
import { CartPage } from '../pages/cart.page';
import { NavbarPage } from '../pages/navbar.page';

type TestFixtures = {
  navbarPage: NavbarPage;
  loginPage: LoginPage;
  productListPage: ProductListPage;
  cartPage: CartPage;
};

type WorkerFixtures = {
  sharedPage: Page;
};

export const test = base.extend<TestFixtures, WorkerFixtures>({
  sharedPage: [
    async ({ }, use) => {
      const browser = await chromium.launch({ headless: false });
      const context = await browser.newContext({
        recordVideo: { dir: 'test-results/videos' },
      });

      const page = await context.newPage();

      const loginPage = new LoginPage(page);
      await loginPage.goto(Env.url);
      await loginPage.login(Env.standardUser, Env.password);

      await use(page);

      await context.close();
      await browser.close();
    },
    { scope: 'worker' }, // ✅ CORRECT
  ],

  productListPage: async ({ sharedPage }, use) => {
    await use(new ProductListPage(sharedPage));
  },

  cartPage: async ({ sharedPage }, use) => {
    await use(new CartPage(sharedPage));
  },

  navbarPage: async ({ sharedPage }, use) => {
    await use(new NavbarPage(sharedPage));
  },
});



test.afterEach(async ({ page }, testInfo) => {
  /* -------- Capture screenshot and video on failure -------- */
  if (testInfo.status !== testInfo.expectedStatus) {
    const screenshotPath = `${testInfo.outputDir}/FAIL-${testInfo.title}.png`;
    await page.screenshot({ path: screenshotPath });
    await testInfo.attach('failure-screenshot', {
      path: screenshotPath,
      contentType: 'image/png',
    });
  }
  /* -------- Capture video for all pages and for all statuses -------- */
  const pages = page.context().pages();
  for (const p of pages) {
    const video = p.video();
    if (!video) continue;
    // Make sure page is closed so video is finalized
    if (!p.isClosed()) {
      await p.close();
    }
    try {
      const originalPath = await video.path();
      const renamedPath = `${testInfo.outputDir}/${testInfo.status}-${testInfo.title}-${testInfo.project.name}-page-${pages.indexOf(p)}.webm`;
      await video.saveAs(renamedPath);
      // Delete Playwright auto video
      if (fs.existsSync(originalPath)) {
        fs.unlinkSync(originalPath);
      }
      await testInfo.attach(`failure-video-page-${pages.indexOf(p)}`, {
        path: renamedPath,
        contentType: 'video/webm',
      });
    } catch (error: any) {
      // Ignore videos that never produced any frames; this is expected
      // for very short-lived pages and should not fail the test.
      if (!error?.message?.includes('did not produce any video frames')) {
        throw error;
      }
    }
  }
  console.log(`Finished test: ${testInfo.title} with status -> ${testInfo.status}`);
});

export { expect };