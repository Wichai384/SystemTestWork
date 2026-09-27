import { test, expect } from '@playwright/test';

test('Sort Product เรียงราคาจากน้อยไปมากได้ถูกต้อง', async ({ page }) => {

  await page.goto('https://www.saucedemo.com');

  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  await expect(page).toHaveURL(/inventory\.html/);

  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

  const priceTexts = await page.locator('.inventory_item_price').allTextContents();
  const prices = priceTexts.map((p) => parseFloat(p.replace('$', '')));

  expect(prices.length).toBeGreaterThan(0);

  for (let i = 0; i < prices.length - 1; i++) {
    expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
  }
});

test(' Sort Product เรียงราคาจากมากไปน้อยได้ถูกต้อง', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  await expect(page).toHaveURL(/inventory\.html/);

  await page.locator('[data-test="product-sort-container"]').selectOption('hilo');

  const priceTexts = await page.locator('.inventory_item_price').allTextContents();
  const prices = priceTexts.map((p) => parseFloat(p.replace('$', '')));

  for (let i = 0; i < prices.length - 1; i++) {
    expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
  }
});