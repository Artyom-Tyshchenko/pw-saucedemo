import { type Page, type Locator } from '@playwright/test';

// Page Object для страницы каталога товаров (inventory.html)
export class InventoryPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly cartIcon: Locator;
  readonly cartBadge: Locator;
  readonly inventoryItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.inventoryItems = page.locator('.inventory_item');
  }

  // Кнопка "Add to cart" для товара по его точному названию
  addToCartButtonByName(productName: string): Locator {
    return this.page
      .locator('.inventory_item')
      .filter({ hasText: productName })
      .getByRole('button', { name: /add to cart/i });
  }

  // Кнопка "Remove" для товара по его точному названию (доступна после добавления в корзину)
  removeButtonByName(productName: string): Locator {
    return this.page
      .locator('.inventory_item')
      .filter({ hasText: productName })
      .getByRole('button', { name: /remove/i });
  }

  // Добавить товар в корзину по названию
  async addProductToCart(productName: string) {
    await this.addToCartButtonByName(productName).click();
  }

  // Удалить товар из корзины прямо со страницы каталога
  async removeProductFromCart(productName: string) {
    await this.removeButtonByName(productName).click();
  }

  // Перейти в корзину
  async openCart() {
    await this.cartIcon.click();
  }
}
