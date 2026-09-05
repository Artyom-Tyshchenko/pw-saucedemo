import { type Page, type Locator } from '@playwright/test';

// Page Object для двух шагов оформления заказа: ввод данных (step-one) и обзор заказа (step-two)
export class CheckoutPage {
  readonly page: Page;

  // Шаг 1 — данные покупателя
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;

  // Шаг 2 — обзор заказа
  readonly finishButton: Locator;

  // Финальная страница
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('.complete-header');
  }

  // Заполнить форму на первом шаге и продолжить
  async fillCustomerInfo(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  // Завершить оформление заказа на втором шаге
  async finishOrder() {
    await this.finishButton.click();
  }
}
