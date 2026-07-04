import { test, expect } from '../../fixtures/test-fixtures'
import { PRODUCTS } from '../../data/products'
import { InventoryPage } from '../../page-objects/InventoryPage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe('Login', async () => {
  let login: LoginPage

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page)
  })

  test('Login button should match the visual baseline', async ({ page }) => {
    await page.goto('/')
    await expect(login.loginButton).toHaveScreenshot('login-button.png')
  })
})

test.describe('Inventory', async () => {
  let inventory: InventoryPage

  test.beforeEach(async ({ loggedInPage }) => {
    inventory = loggedInPage
  })

  test('Inventory shopping cart badge should match the visual baseline', async () => {
    await inventory.addToCartByName(PRODUCTS.backpack.name)
    await expect(inventory.cartBadge).toHaveScreenshot('inventory-cart-badge.png', {
      maxDiffPixelRatio: 0.01,
    })
  })
})
