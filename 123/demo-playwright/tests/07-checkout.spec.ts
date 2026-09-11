import { test, expect } from '@playwright/test';

test('Checkout สินค้าสำเร็จ', async ({ page }) => {

  // Arrange

  await page.goto('https://www.saucedemo.com/');

  await page.locator('#user-name').fill('standard_user');

  await page.locator('#password').fill('secret_sauce');

  await page.locator('#login-button').click();

  await expect(page.locator('.inventory_list')).toBeVisible();

  // Act

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  await page.locator('.shopping_cart_link').click();

  await expect(page.locator('.cart_item .inventory_item_name')).toHaveText('Sauce Labs Backpack');
  
  await page.locator('[data-test="checkout"]').click();

  await page.locator('#first-name').fill('John');

  await page.locator('#last-name').fill('Doe');

  await page.locator('#postal-code').fill('12345');

  await page.locator('[data-test="continue"]').click();

  await expect(page.locator('.summary_info')).toBeVisible();

  await page.locator('[data-test="finish"]').click();

  // Assert

  await expect(page.locator('.complete-header'))

    .toHaveText('Thank you for your order!');

});
