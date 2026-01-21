import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class NavbarPage extends BasePage {
    readonly cartButton: Locator;
    constructor(page: Page) {
        super(page);
        this.cartButton = page.locator('.shopping_cart_link');
    }

    async goToCart(): Promise<void> {
        await this.cartButton.click();
    }
} 