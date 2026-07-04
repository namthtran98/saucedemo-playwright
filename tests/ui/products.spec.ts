import { test, expect } from '../../fixtures/test-fixtures'
import { CartPage } from '../../page-objects/CartPage'
import { InventoryPage } from '../../page-objects/InventoryPage'
import { ProductDetailPage } from '../../page-objects/ProductDetailPage'
import { INVENTORY_UI_TEXT, PRODUCTS, PRODUCT_COUNT, PRODUCT_NAMES } from '../../data/products'

test.describe('Products', () => {
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

  // 1
  test('inventory page shows the Products title', async () => {
    await inventory.expectLoaded()
  })

  // 2
  test('exactly 6 products are listed', async () => {
    await expect(inventory.items).toHaveCount(PRODUCT_COUNT)
  })

  // 3
  test('every product has a visible name', async () => {
    await expect(inventory.itemNameLabels).toHaveCount(PRODUCT_COUNT)
    for (let index = 0; index < PRODUCT_COUNT; index++) {
      await expect(inventory.itemNameLabels.nth(index)).toBeVisible()
    }
  })

  // 4
  test('every product has a visible price', async () => {
    await expect(inventory.itemPriceLabels).toHaveCount(PRODUCT_COUNT)
    for (let index = 0; index < PRODUCT_COUNT; index++) {
      await expect(inventory.itemPriceLabels.nth(index)).toBeVisible()
    }
  })

  // 5
  test('every product has an Add to cart button', async () => {
    for (let index = 0; index < PRODUCT_COUNT; index++) {
      await expect(inventory.addToCartButtonAt(index)).toBeVisible()
    }
  })

  // 6
  test('sort by Name A to Z orders names ascending', async () => {
    await inventory.sortBy('az')
    const names = await inventory.productNames()
    const sorted = [...names].sort((a, b) => a.localeCompare(b))
    expect(names).toEqual(sorted)
  })

  // 7
  test('sort by Name Z to A orders names descending', async () => {
    await inventory.sortBy('za')
    const names = await inventory.productNames()
    const sorted = [...names].sort((a, b) => b.localeCompare(a))
    expect(names).toEqual(sorted)
  })

  // 8
  test('sort by Price low to high orders prices ascending', async () => {
    await inventory.sortBy('lohi')
    const prices = await inventory.productPrices()
    const sorted = [...prices].sort((a, b) => a - b)
    expect(prices).toEqual(sorted)
  })

  // 9
  test('sort by Price high to low orders prices descending', async () => {
    await inventory.sortBy('hilo')
    const prices = await inventory.productPrices()
    const sorted = [...prices].sort((a, b) => b - a)
    expect(prices).toEqual(sorted)
  })

  // 10
  test('add Sauce Labs Backpack updates cart badge to 1', async () => {
    await inventory.addToCartByName(PRODUCTS.backpack.name)
    await expectCartCount(1)
  })

  // 11
  test('add two products updates cart badge to 2', async () => {
    await inventory.addToCartByName(PRODUCTS.backpack.name)
    await inventory.addToCartByName(PRODUCTS.bikeLight.name)
    await expectCartCount(2)
  })

  // 12
  test('add then the button becomes Remove', async () => {
    await inventory.addToCartByName(PRODUCTS.backpack.name)
    await expect(inventory.removeButtonByName(PRODUCTS.backpack.name)).toBeVisible()
  })

  // 13
  test('remove a product updates the badge back to empty', async () => {
    await inventory.addToCartByName(PRODUCTS.backpack.name)
    await expectCartCount(1)
    await inventory.removeFromCartByName(PRODUCTS.backpack.name)
    await expectCartCount(0)
  })

  // 14
  test('add all six products shows badge 6', async () => {
    for (const name of PRODUCT_NAMES) {
      await inventory.addToCartByName(name)
    }
    await expectCartCount(PRODUCT_COUNT)
  })

  // 15
  test('cart link navigates to the cart page', async () => {
    await inventory.openCart()
    const cart = new CartPage(inventory.page)
    await cart.expectLoaded()
  })

  // 16
  test('open a product opens its detail page', async () => {
    await inventory.openProductByName(PRODUCTS.backpack.name)
    const detail = new ProductDetailPage(inventory.page)
    await detail.expectLoaded()
  })

  // 17
  test('product detail shows the correct name', async () => {
    await inventory.openProductByName(PRODUCTS.backpack.name)
    const detail = new ProductDetailPage(inventory.page)
    await detail.expectLoaded()
    await expect(detail.name).toHaveText(PRODUCTS.backpack.name)
  })

  // 18
  test('product detail shows a price', async () => {
    await inventory.openProductByName(PRODUCTS.backpack.name)
    const detail = new ProductDetailPage(inventory.page)
    await detail.expectLoaded()
    await expect(detail.price).toBeVisible()
    await expect(detail.price).toHaveText(/\$\d+\.\d{2}/)
  })

  // 19
  test('back button returns to the inventory page', async () => {
    await inventory.openProductByName(PRODUCTS.backpack.name)
    const detail = new ProductDetailPage(inventory.page)
    await detail.goBack()
    await inventory.expectLoaded()
  })

  // 20
  test('add to cart from the detail page updates the badge', async () => {
    await inventory.openProductByName(PRODUCTS.backpack.name)
    const detail = new ProductDetailPage(inventory.page)
    await detail.addToCart()
    await expectCartCount(1)
  })

  // 21
  test('cart badge persists from inventory to detail page', async () => {
    await inventory.addToCartByName(PRODUCTS.backpack.name)
    await expectCartCount(1)
    await inventory.openProductByName(PRODUCTS.backpack.name)
    const detail = new ProductDetailPage(inventory.page)
    await detail.expectLoaded()
    await expectCartCount(1)
  })

  // 22
  test('footer shows the Sauce Labs copyright and three social links', async () => {
    await expect(inventory.footerCopy).toContainText(INVENTORY_UI_TEXT.footerCopy)
    await expect(inventory.twitterLink).toBeVisible()
    await expect(inventory.facebookLink).toBeVisible()
    await expect(inventory.linkedInLink).toBeVisible()
  })
})
