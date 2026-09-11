import { test, expect } from '@playwright/test';

test('เพิ่มสินค้าเข้า Cart', async ({ page }) => {

  // Arrange

  await page.goto('https://www.saucedemo.com/');

  await page.locator('#user-name').fill('standard_user');

  await page.locator('#password').fill('secret_sauce');

  await page.locator('#login-button').click();

  await expect(page.locator('.inventory_list')).toBeVisible();

  // Act

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  // Assert

  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

});
