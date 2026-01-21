import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { SORT_OPTIONS } from "../utils/Constants";

export class ProductListPage extends BasePage {
    readonly productPrice: Locator;
    readonly productName: Locator;
    readonly sortDropdown: Locator;

    constructor(page: Page) {
        super(page);
        this.productPrice = page.locator('.inventory_item_price');
        this.productName = page.locator('.inventory_item_name');
        this.sortDropdown = page.locator("//select[@data-test='product-sort-container']");
    }

    async getProductPrices(): Promise<string[]> {
        const prices = await this.productPrice.allTextContents();
        console.log('Product Prices:', prices);
        return prices;
    }

    async getProductNames(): Promise<string[]> {
        const names = await this.productName.allTextContents();
        console.log('Product Names:', names);
        return names;
    }

    async sortBy(option: string): Promise<void> {
        await this.sortDropdown.selectOption({ label: option });
    }

    async verifyProductsBy(option: string, items: string[]): Promise<void> {
        console.log(`Verifying products sorted by ${option}:`, items);
        switch (option) {
            case SORT_OPTIONS.PRICE_ASC:
                const priceValues: number[] = items.map(price => parseFloat(price.replace('$', '')));
                await expect(priceValues).toEqual([...priceValues].sort((a, b) => a - b));
                break;
            case SORT_OPTIONS.PRICE_DESC:
                const priceValuesDesc: number[] = items.map(price => parseFloat(price.replace('$', '')));
                await expect(priceValuesDesc).toEqual([...priceValuesDesc].sort((a, b) => b - a));
                break;
            case SORT_OPTIONS.NAME_ASC:
                const nameValuesAsc: string[] = items;
                await expect(nameValuesAsc).toEqual([...nameValuesAsc].sort());
                break;
            case SORT_OPTIONS.NAME_DESC:
                const nameValuesDesc: string[] = items;
                await expect(nameValuesDesc).toEqual([...nameValuesDesc].sort().reverse());
                break;
        }
    }

}