import { test, expect } from '../../fixtures/test-fixtures'
import { CartPage } from '../../page-objects/CartPage'
import { InventoryPage } from '../../page-objects/InventoryPage'
import { LoginPage } from '../../page-objects/LoginPage'
import { PRODUCTS } from '../../data/products'

test.describe('Menu', () => {
  let inventory: InventoryPage

  test.beforeEach(async ({ loggedInPage }) => {
    inventory = loggedInPage
  })

  async function expectCartCount(count: number) {
    if (count === 0) {
      await expect(inventory.cartBadge).toHaveCount(0)
    } else {
      await expect(inventory.cartBadge).toHaveText(String(count))
    }
  }

  test('open menu shows links in viewport', async () => {
    await inventory.sideMenu.open()
    await inventory.sideMenu.expectOpen()
  })

  test('close menu hides menu state', async () => {
    await inventory.sideMenu.open()
    await inventory.sideMenu.close()
    await inventory.sideMenu.expectClosed()
  })

  test('All Items returns from cart to inventory', async () => {
    await inventory.openCart()
    const cart = new CartPage(inventory.page)
    await cart.expectLoaded()

    await inventory.sideMenu.goToAllItems()
    await inventory.expectLoaded()
  })

  test('About link points to Sauce Labs', async () => {
    await inventory.sideMenu.open()
    await expect(inventory.sideMenu.aboutLink).toHaveAttribute('href', 'https://saucelabs.com/')
  })

  test('Logout returns to login page', async () => {
    await inventory.sideMenu.logout()
    const login = new LoginPage(inventory.page)
    await login.expectLoaded()
  })

  test('Reset App State clears cart badge', async () => {
    await inventory.addToCartByName(PRODUCTS.backpack.name)
    await expectCartCount(1)

    await inventory.sideMenu.resetAppState()
    await expectCartCount(0)
  })
})
