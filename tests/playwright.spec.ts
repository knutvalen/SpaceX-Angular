import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://stellarapex.knutvalen.dev');

  await expect(page).toHaveTitle('StellarApex');
});
