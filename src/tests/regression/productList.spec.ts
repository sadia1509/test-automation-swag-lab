import { test } from '../../fixtures/base.regression.fixture';
import { SORT_OPTIONS } from '../../utils/Constants';

test.describe.serial('Dashboard', () => {
  let prices: string[], names: string[];

  test('Verify product prices are displayed correctly', async ({ productListPage }) => {
    await productListPage.getProductPrices();
  });

  test('Verify product names are displayed correctly', async ({ productListPage }) => {
    await productListPage.getProductNames();
  });

  test('Verify empty cart', async ({ navbarPage, cartPage }) => {
    await navbarPage.goToCart();
    await cartPage.getCartItems();
    await cartPage.goBack();
  });

  test('Verify sorted product prices in ascending order are displayed correctly', async ({ productListPage }) => {
    await productListPage.sortBy(SORT_OPTIONS.PRICE_ASC);
    prices = await productListPage.getProductPrices();
    await productListPage.verifyProductsBy(SORT_OPTIONS.PRICE_ASC, prices);
  });

  test('Verify sorted product prices in descending order are displayed correctly', async ({ productListPage }) => {
    await productListPage.sortBy(SORT_OPTIONS.PRICE_DESC);
    prices = await productListPage.getProductPrices();
    await productListPage.verifyProductsBy(SORT_OPTIONS.PRICE_DESC, prices);
  });

  test('Verify sorted product names in ascending order are displayed correctly', async ({ productListPage }) => {
    await productListPage.sortBy(SORT_OPTIONS.NAME_ASC);
    names = await productListPage.getProductNames();
    await productListPage.verifyProductsBy(SORT_OPTIONS.NAME_ASC, names);
  });

  test('Verify sorted product names in descending order are displayed correctly', async ({ productListPage }) => {
    await productListPage.sortBy(SORT_OPTIONS.NAME_DESC);
    names = await productListPage.getProductNames();
    await productListPage.verifyProductsBy(SORT_OPTIONS.NAME_DESC, names);
  });
});
