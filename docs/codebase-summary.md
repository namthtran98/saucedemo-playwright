# Codebase Summary

## Overview

This repository is a compact Playwright test framework. It combines UI automation against SauceDemo with API tests against a deterministic local mock API.

## Top-Level Structure

| Path | Purpose |
| --- | --- |
| `tests/ui/` | UI specs for login, products, cart, and checkout |
| `tests/api/` | API specs for products, users, login, and posts |
| `page-objects/` | Page Object Model classes for SauceDemo pages |
| `page-objects/components/` | Reusable page components such as `SideMenu` |
| `fixtures/` | Custom Playwright fixtures |
| `data/` | Shared test data, API endpoints, payloads, and expected values |
| `mock-api/` | Zero-dependency local REST API |
| `playwright.config.ts` | Playwright projects, reporters, retries, web server, and test id config |

## Test Suites

| Suite | File | Focus |
| --- | --- | --- |
| Login UI | `tests/ui/login.spec.ts` | Valid users, invalid users, required-field errors, logout |
| Products UI | `tests/ui/products.spec.ts` | Inventory listing, sorting, product detail, add/remove cart, menu, footer |
| Cart UI | `tests/ui/cart.spec.ts` | Cart persistence, quantities, removal, checkout navigation |
| Checkout UI | `tests/ui/checkout.spec.ts` | Checkout form validation, overview totals, completion flow |
| API | `tests/api/api.spec.ts` | Products, categories, users, login, posts CRUD-like behavior |

## Page Objects

| Class | Responsibility |
| --- | --- |
| `LoginPage` | Login form locators, login action, dismiss error, readiness check |
| `InventoryPage` | Inventory locators, add/remove product actions, sorting, product/cart navigation |
| `ProductDetailPage` | Product detail locators, add to cart, back navigation, readiness check |
| `CartPage` | Cart locators, item queries, removal, checkout, continue shopping |
| `CheckoutPage` | Checkout form, overview, completion actions, price parsing, readiness checks |
| `SideMenu` | Menu links, logout, reset app state, component readiness check |

## Data Modules

| File | Contents |
| --- | --- |
| `data/users.ts` | SauceDemo users, password, invalid credential values |
| `data/products.ts` | SauceDemo product names, prices, product count, inventory UI text |
| `data/checkout-test-data.ts` | Checkout form values and expected checkout labels |
| `data/checkout-error-messages.ts` | Login and checkout validation messages |
| `data/api-test-data.ts` | API endpoints, HTTP status codes, payloads, expected values |

## Runtime Behavior

`playwright.config.ts` defines two projects:

- `ui`: Desktop Chrome, SauceDemo base URL, `tests/ui/*.spec.ts`.
- `api`: local mock API base URL, `tests/api/*.spec.ts`.

The mock API starts automatically through Playwright `webServer` and exposes `/health` for readiness. The default port is `3100`, overridden by `MOCK_API_PORT`.
