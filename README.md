# Автотесты Playwright для saucedemo.com

Page Object Model: `pages/` — классы страниц, `tests/` — сами тесты.

📋 [Тест-план и чек-листы](./TEST_PLAN.md)

## Установка (Windows / PowerShell)

```powershell
npm install
npx playwright install
```

## Запуск

```powershell
npm test              # прогон всех тестов в headless-режиме
npm run test:headed   # прогон с открытым браузером (видно, что происходит)
npm run report        # открыть HTML-отчёт после прогона
```

## Структура

- `pages/LoginPage.ts` — страница логина
- `pages/InventoryPage.ts` — каталог товаров (добавление/удаление из корзины прямо со страницы)
- `pages/CartPage.ts` — корзина
- `pages/CheckoutPage.ts` — оформление заказа (2 шага)
- `tests/login.spec.ts` — успешный вход + вход с неверным паролем
- `tests/cart.spec.ts` — добавление и удаление товара из корзины
- `tests/checkout.spec.ts` — полный флоу: логин → добавление товара → оформление → подтверждение

## Данные для входа

Логин: `standard_user`, пароль: `secret_sauce` (стандартный тестовый пользователь saucedemo.com).
