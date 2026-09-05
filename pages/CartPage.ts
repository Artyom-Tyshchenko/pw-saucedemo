import { type Page, type Locator } from '@playwright/test';

// Page Object для страницы корзины (cart.html)
export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  // Локатор конкретного товара в корзине по названию
  itemByName(productName: string): Locator {
    return this.cartItems.filter({ hasText: productName });
  }

  // Перейти к оформлению заказа
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
