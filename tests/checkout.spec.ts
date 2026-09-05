import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

const VALID_USER = 'standard_user';
const VALID_PASSWORD = 'secret_sauce';
const PRODUCT_NAME = 'Sauce Labs Backpack';

test('полное оформление заказа от логина до подтверждения', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // 1. Логин
  await loginPage.goto();
  await loginPage.login(VALID_USER, VALID_PASSWORD);

  // 2. Добавляем товар и переходим в корзину
  await inventoryPage.addProductToCart(PRODUCT_NAME);
  await inventoryPage.openCart();
  await expect(cartPage.itemByName(PRODUCT_NAME)).toBeVisible();

  // 3. Переходим к оформлению и заполняем данные покупателя
  await cartPage.proceedToCheckout();
  await checkoutPage.fillCustomerInfo('Артём', 'Тыщенко', '140080');

  // 4. Завершаем заказ
  await checkoutPage.finishOrder();

  // 5. Проверяем финальное сообщение об успешном заказе
  await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
});
