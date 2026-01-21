import { test, Page, Locator, Browser } from '@playwright/test';
import { setBrowser } from '../utils/Helpers';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(url: string): Promise<void> {
        await test.step(`Navigate to URL: ${url}`, async () => {
            await this.page.goto(url);
        });
    }

    async goBack(): Promise<void> {
        await this.page.goBack();
    }

    async elementExists(locator: Locator): Promise<boolean> {
        return (await locator.count()) > 0;
    }

    async pressEsc(): Promise<void> {
        await this.page.keyboard.press('Escape');
    }

    async openNewBrowser(): Promise<{ browser: Browser; page: Page }> {
        const { browser, context } = await setBrowser('Chrome');
        const page = await context.newPage();
        return { browser, page };
    }

    async isChecked(locator: Locator): Promise<boolean> {
        const checked = await locator.isChecked().then(value => String(value));
        return checked === 'true';
    }
}