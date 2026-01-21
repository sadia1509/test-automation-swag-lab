import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class CartPage extends BasePage {
    readonly cartItems: Locator;
    constructor(page: Page) {
        super(page);
        this.cartItems = page.locator('.cart_item');
    }

    async getCartItems(): Promise<string[]> {
        const items = await this.cartItems.allTextContents();
        console.log('Cart Items:', items);
        return items;
    }
} 