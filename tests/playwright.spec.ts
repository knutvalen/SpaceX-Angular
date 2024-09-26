import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://spacex.knutvalen.dev');

  await expect(page).toHaveTitle('SpaceX Launches');
});
