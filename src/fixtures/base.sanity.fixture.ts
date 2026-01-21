import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import fs from 'fs';
import { Env } from '../setup/env.setup';
import { ProductListPage } from '../pages/productList.page';

type MyFixtures = {
    loginPage: LoginPage;
    productListPage: ProductListPage;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto(Env.url);
        await use(loginPage);     // provide to test
        // cleanup happens automatically
    },
    productListPage: async ({ page }, use) => {
        await use(new ProductListPage(page));
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
            const renamedPath = `${testInfo.outputDir}/${testInfo.status}-${testInfo.title}-${testInfo.project.name}-tab-${pages.indexOf(p)}.webm`;
            await video.saveAs(renamedPath);
            // Delete Playwright auto video
            if (fs.existsSync(originalPath)) {
                fs.unlinkSync(originalPath);
            }
            await testInfo.attach(`failure-video-tab-${pages.indexOf(p)}`, {
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