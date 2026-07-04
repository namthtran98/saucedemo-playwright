# Manual Test Cases

## Overview

This folder converts the current automated Playwright specs into manual test cases. Each test case maps back to one automated test in `tests/`.

## Coverage Map

| Area | Manual file | Automated source | Count |
| --- | --- | --- | --- |
| Login | `login-test-cases.md` | `tests/ui/login.spec.ts` | 13 |
| Menu | `menu-test-cases.md` | `tests/ui/menu.spec.ts` | 6 |
| Products | `products-test-cases.md` | `tests/ui/products.spec.ts` | 22 |
| Cart | `cart-test-cases.md` | `tests/ui/cart.spec.ts` | 23 |
| Checkout | `checkout-test-cases.md` | `tests/ui/checkout.spec.ts` | 27 |
| API | `api-test-cases.md` | `tests/api/*.spec.ts` | 32 |
| Total |  |  | 123 |

## Common UI Preconditions

- Browser is installed and can access `https://www.saucedemo.com`.
- Use SauceDemo credentials from `data/users.ts`.
- Default valid password is `secret_sauce`.
- Unless the case says otherwise, start from a clean browser context.

## Common API Preconditions

- Mock API is running locally through Playwright or `npm run mock-api`.
- Default base URL is `http://localhost:3100`.
- If `MOCK_API_PORT` is set, use that port instead.
