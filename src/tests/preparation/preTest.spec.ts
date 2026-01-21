import test from "@playwright/test";

test.describe('Check list before running the automation', () => {

  test('Checking', async ({ }) => {
  });

  /* ---------------------------------- */
  test('example test', async ({ }) => {
    // example test body
  });

  test('Skip test using skip', async ({ page }) => {
    test.skip(true, 'Temporarily disabled for investigation');
    // test body remains, but will be skipped
  });

  test.fixme('Skip test using fixme', async ({ page }) => {
    // Blocked by BUG-123
  });
});