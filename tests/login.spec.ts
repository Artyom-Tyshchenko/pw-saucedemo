import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

// Стандартные учётные данные сайта saucedemo.com
const VALID_USER = 'standard_user';
const VALID_PASSWORD = 'secret_sauce';

test.describe('Логин', () => {
  test('успешный вход с валидными данными', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(VALID_USER, VALID_PASSWORD);

    // После успешного логина должны попасть на страницу каталога товаров
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.pageTitle).toHaveText('Products');
  });

  test('вход с неверным паролем показывает ошибку', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(VALID_USER, 'wrong_password');

    // Проверяем, что появилось сообщение об ошибке и URL не изменился
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Username and password do not match');
    await expect(page).not.toHaveURL(/inventory\.html/);
  });
});
