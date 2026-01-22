import { test as base, chromium, Page, expect } from '@playwright/test';
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
    { scope: 'worker' },
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


export { expect };