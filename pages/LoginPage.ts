import { type Page, type Locator } from '@playwright/test';

// Page Object для страницы логина (https://www.saucedemo.com/)
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    // Локаторы задаём через data-test — самый устойчивый способ (не зависит от текста/стилей)
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // Открыть страницу логина
  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  // Ввести логин и пароль и нажать кнопку входа
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
