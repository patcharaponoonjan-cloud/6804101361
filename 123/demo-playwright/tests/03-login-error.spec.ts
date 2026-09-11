import { test, expect } from '@playwright/test';

test('Locked user ไม่สามารถ Login ได้', async ({ page }) => {

  // Arrange

  await page.goto('https://www.saucedemo.com/');

  // Act

  await page.locator('#user-name').fill('locked_out_user');

  await page.locator('#password').fill('secret_sauce');

  await page.locator('#login-button').click();

  // Assert

  await expect(page.locator('.error-message-container'))

    .toContainText('Sorry, this user has been locked out');

});
