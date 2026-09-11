import { test, expect } from '@playwright/test';

test('Login สำเร็จ', async ({ page }) => {

  // Arrange

  await page.goto('https://www.saucedemo.com/');

  // Act

  await page.locator('#user-name').fill('standard_user');

  await page.locator('#password').fill('secret_sauce');

  await page.locator('#login-button').click();

  // Assert

  await expect(page).toHaveURL(/inventory\.html/);

  await expect(page.locator('.inventory_list')).toBeVisible();

});
