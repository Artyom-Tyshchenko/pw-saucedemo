import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

const VALID_USER = 'standard_user';
const VALID_PASSWORD = 'secret_sauce';
const PRODUCT_NAME = 'Sauce Labs Backpack';

// Логин перед каждым тестом этого файла — чтобы не дублировать код в самих тестах
test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(VALID_USER, VALID_PASSWORD);
});

test.describe('Корзина', () => {
  test('добавление товара в корзину', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.addProductToCart(PRODUCT_NAME);

    // Счётчик корзины должен показать 1 товар
    await expect(inventoryPage.cartBadge).toHaveText('1');

    // Проверяем, что товар реально лежит в корзине
    await inventoryPage.openCart();
    const cartPage = new CartPage(page);
    await expect(cartPage.itemByName(PRODUCT_NAME)).toBeVisible();
  });

  test('удаление товара из корзины', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    // Сначала добавляем товар, затем сразу убираем его
    await inventoryPage.addProductToCart(PRODUCT_NAME);
    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.removeProductFromCart(PRODUCT_NAME);

    // После удаления бейдж с количеством товаров исчезает
    await expect(inventoryPage.cartBadge).toHaveCount(0);
  });
});
