import { test, expect } from '../../fixtures/test-fixtures'
import { InventoryPage } from '../../page-objects/InventoryPage'
import { ProductDetailPage } from '../../page-objects/ProductDetailPage'
import { CartPage } from '../../page-objects/CartPage'
import { CheckoutPage } from '../../page-objects/CheckoutPage'
import { PRODUCTS, PRODUCT_NAMES } from '../../data/products'

test.describe('Cart', () => {
  let inventory: InventoryPage
  let cart: CartPage

  test.beforeEach(async ({ loggedInPage }) => {
    inventory = loggedInPage
    cart = new CartPage(inventory.page)
  })

  async function expectCartBadgeCount(count: number) {
    if (count === 0) {
      await expect(cart.badge).toHaveCount(0)
    } else {
      await expect(cart.badge).toHaveText(String(count))
    }
  }

  // 1
  test('cart is empty right after login', async () => {
    await cart.goto()
    await expect(cart.items).toHaveCount(0)
  })

  // 2
  test('continue shopping returns to the inventory page', async () => {
    await cart.goto()
    await cart.continueShopping()
    await inventory.expectLoaded()
  })

  // 3
  test('checkout button is visible in the cart', async () => {
    await cart.goto()
    await cart.expectLoaded()
  })

  // 4
  test('add one item then the cart shows 1 item', async () => {
    await inventory.addToCartByName(PRODUCTS.backpack.name)
    await cart.goto()
    await expect(cart.items).toHaveCount(1)
  })

  // 5
  test('the cart item has the expected name', async () => {
    await inventory.addToCartByName(PRODUCTS.backpack.name)
    await cart.goto()
    await expect(cart.itemNameLabels).toHaveText(PRODUCTS.backpack.name)
  })

  // 6
  test('the cart item shows a price', async () => {
    await inventory.addToCartByName(PRODUCTS.backpack.name)
    await cart.goto()
    await expect(cart.itemPriceLabels).toBeVisible()
    await expect(cart.itemPriceLabels).toHaveText(/\$\d+\.\d{2}/)
  })

  // 7
  test('the cart item quantity is 1', async () => {
    await inventory.addToCartByName(PRODUCTS.backpack.name)
    await cart.goto()
    await expect(cart.itemQuantityLabels).toHaveText('1')
  })

  // 8
  test('add two items then the cart shows 2 items', async () => {
    await inventory.addToCartByName(PRODUCTS.backpack.name)
    await inventory.addToCartByName(PRODUCTS.bikeLight.name)
    await cart.goto()
    await expect(cart.items).toHaveCount(2)
  })

  // 9
  test('add all six items then the cart shows 6 items', async () => {
    for (const name of PRODUCT_NAMES) {
      await inventory.addToCartByName(name)
    }
    await cart.goto()
    await expect(cart.items).toHaveCount(PRODUCT_NAMES.length)
  })

  // 10
  test('remove the only item empties the cart', async () => {
    await inventory.addToCartByName(PRODUCTS.backpack.name)
    await cart.goto()
    await expect(cart.items).toHaveCount(1)
    await cart.removeByName(PRODUCTS.backpack.name)
    await expect(cart.items).toHaveCount(0)
  })

  // 11
  test('removing one of two items leaves one', async () => {
    await inventory.addToCartByName(PRODUCTS.backpack.name)
    await inventory.addToCartByName(PRODUCTS.bikeLight.name)
    await cart.goto()
    await expect(cart.items).toHaveCount(2)
    await cart.removeByName(PRODUCTS.backpack.name)
    await expect(cart.items).toHaveCount(1)
    await expect(cart.itemNameLabels).toHaveText(PRODUCTS.bikeLight.name)
  })

  // 12
  test('the cart badge equals the number of items added', async () => {
    await inventory.addToCartByName(PRODUCTS.backpack.name)
    await inventory.addToCartByName(PRODUCTS.bikeLight.name)
    await inventory.addToCartByName(PRODUCTS.boltTShirt.name)
    await cart.goto()
    await expectCartBadgeCount(3)
  })

  // 13
  test('checkout navigates to checkout step one', async () => {
    await inventory.addToCartByName(PRODUCTS.backpack.name)
    await cart.goto()
    await cart.checkout()
    const checkout = new CheckoutPage(cart.page)
    await checkout.expectStepOneLoaded()
  })

  // 14
  test('an added item persists after continue shopping and reopening the cart', async () => {
    await inventory.addToCartByName(PRODUCTS.backpack.name)
    await cart.goto()
    await cart.continueShopping()
    await inventory.expectLoaded()
    await cart.goto()
    await expect(cart.items).toHaveCount(1)
    await expect(cart.itemNameLabels).toHaveText(PRODUCTS.backpack.name)
  })

  // 15
  test('removing an item in the cart updates the badge', async () => {
    await inventory.addToCartByName(PRODUCTS.backpack.name)
    await inventory.addToCartByName(PRODUCTS.bikeLight.name)
    await cart.goto()
    await expectCartBadgeCount(2)
    await cart.removeByName(PRODUCTS.backpack.name)
    await expectCartBadgeCount(1)
  })

  // 16
  test('each distinct product appears exactly once in the cart', async () => {
    for (const name of PRODUCT_NAMES) {
      await inventory.addToCartByName(name)
    }
    await cart.goto()
    const names = await cart.itemNames()
    expect(names.sort()).toEqual([...PRODUCT_NAMES].sort())
    expect(new Set(names).size).toBe(names.length)
  })

  // 17
  test('the Backpack price in the cart is $29.99', async () => {
    await inventory.addToCartByName(PRODUCTS.backpack.name)
    await cart.goto()
    expect(await cart.itemPriceByName(PRODUCTS.backpack.name)).toBeCloseTo(PRODUCTS.backpack.price, 2)
  })

  // 18
  test('an empty cart has no remove buttons', async () => {
    await cart.goto()
    await expect(cart.items).toHaveCount(0)
    await expect(cart.removeButtons).toHaveCount(0)
  })

  // 19
  test('the cart link from inventory opens the cart page', async () => {
    await inventory.openCart()
    await cart.expectLoaded()
  })

  // 20
  test('the cart shows a quantity for each line', async () => {
    await inventory.addToCartByName(PRODUCTS.backpack.name)
    await inventory.addToCartByName(PRODUCTS.bikeLight.name)
    await cart.goto()
    await expect(cart.itemQuantityLabels).toHaveText(['1', '1'])
  })

  // 21
  test('adding from the product detail page then opening the cart shows the item', async () => {
    await inventory.openProductByName(PRODUCTS.backpack.name)
    const detail = new ProductDetailPage(inventory.page)
    await detail.addToCart()
    await cart.goto()
    await expect(cart.items).toHaveCount(1)
    await expect(cart.itemNameLabels).toHaveText(PRODUCTS.backpack.name)
  })

  // 22
  test('continue shopping keeps previously added items', async () => {
    await inventory.addToCartByName(PRODUCTS.backpack.name)
    await cart.goto()
    await cart.continueShopping()
    await inventory.expectLoaded()
    await inventory.addToCartByName(PRODUCTS.bikeLight.name)
    await cart.goto()
    await expect(cart.items).toHaveCount(2)
  })

  // 23
  test('removing all items makes the cart badge disappear', async () => {
    await inventory.addToCartByName(PRODUCTS.backpack.name)
    await inventory.addToCartByName(PRODUCTS.bikeLight.name)
    await cart.goto()
    await expectCartBadgeCount(2)
    await cart.removeByName(PRODUCTS.backpack.name)
    await cart.removeByName(PRODUCTS.bikeLight.name)
    await expect(cart.items).toHaveCount(0)
    await expectCartBadgeCount(0)
  })
})
