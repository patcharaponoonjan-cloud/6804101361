import { test, expect } from '@playwright/test';

test('เรียงราคาจากต่ำไปสูง', async ({ page }) => {

  // Arrange

  await page.goto('https://www.saucedemo.com/');

  await page.locator('#user-name').fill('standard_user');

  await page.locator('#password').fill('secret_sauce');

  await page.locator('#login-button').click();

  await expect(page.locator('.inventory_list')).toBeVisible();

  // Act

  const sort = page.locator('[data-test="product-sort-container"]');

  await sort.selectOption('lohi');

  await expect(sort).toHaveValue('lohi');

  const priceText = await page.locator('.inventory_item_price').allTextContents();

  const prices = priceText.map(text => Number(text.replace('$', '')));

  // Assert

  const sortedPrices = [...prices].sort((a, b) => a - b);

  expect(prices).toEqual(sortedPrices);

});
