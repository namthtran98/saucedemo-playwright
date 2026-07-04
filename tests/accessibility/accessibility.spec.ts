import { test, expect } from '../../fixtures/test-fixtures'
import type { Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { LoginPage } from '../../page-objects/LoginPage'
import { InventoryPage } from '../../page-objects/InventoryPage'
import { CartPage } from '../../page-objects/CartPage'
import { CheckoutPage } from '../../page-objects/CheckoutPage'
import { PRODUCTS } from '../../data/products'

const ACCESSIBILITY_TAGS = ['wcag2a', 'wcag2aa']

async function expectNoSeriousAccessibilityViolations(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(ACCESSIBILITY_TAGS).analyze()
  const blocking = results.violations.filter((violation) => (
    violation.impact === 'critical' || violation.impact === 'serious'
  ))
  expect(blocking).toEqual([])
}

test.describe('Login', () => {
  let loginPage: LoginPage
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.expectLoaded()
  })

  test('Login page has no serious accessibility violations', async ({ page }) => {
    await expectNoSeriousAccessibilityViolations(page)
  })
})

test.describe('Inventory', () => {
  test.beforeEach(async ({ loggedInPage }) => {
    await loggedInPage.expectLoaded()
  })

  test('Inventory page has no serious accessibility violations', async ({ page }) => {
    await expectNoSeriousAccessibilityViolations(page)
  })
})

test.describe('Checkout', () => {
  let inventoryPage: InventoryPage
  let cartPage: CartPage
  let checkoutPage: CheckoutPage

  test.beforeEach(async ({ loggedInPage }) => {
    inventoryPage = loggedInPage
    cartPage = new CartPage(inventoryPage.page)
    checkoutPage = new CheckoutPage(inventoryPage.page)

    await inventoryPage.addToCartByName(PRODUCTS.backpack.name)
    await cartPage.goto()
    await cartPage.checkout()
    await checkoutPage.expectStepOneLoaded()
  })

  test('Checkout page has no serious accessibility violations', async ({ page }) => {
    await expectNoSeriousAccessibilityViolations(page)
  })
})
