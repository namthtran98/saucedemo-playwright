import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { InventoryPage } from '../../page-objects/InventoryPage'
import { ProductDetailPage } from '../../page-objects/ProductDetailPage'
import { CartPage } from '../../page-objects/CartPage'
import { USERS, PASSWORD } from '../../data/users'
import { ALL_PRODUCTS, PRODUCTS } from '../../data/products'

const ALL_PRODUCT_NAMES = ALL_PRODUCTS.map((product) => product.name)

test.describe('Cart', () => {
  let inventory: InventoryPage
  let cart: CartPage

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page)
    await login.goto()
    await login.login(USERS.standard, PASSWORD)
    inventory = new InventoryPage(page)
    await inventory.expectLoaded()
    cart = new CartPage(page)
  })

  // 1
  test('cart is empty right after login', async () => {
    await cart.goto()
    await cart.expectItemCount(0)
  })

  // 2
  test('continue shopping returns to the inventory page', async ({ page }) => {
    await cart.goto()
    await cart.continueShopping()
    await expect(page).toHaveURL(/inventory\.html/)
    await expect(inventory.title).toBeVisible()
  })

  // 3
  test('checkout button is visible in the cart', async () => {
    await cart.goto()
    await expect(cart.checkoutButton).toBeVisible()
  })

  // 4
  test('add one item then the cart shows 1 item', async () => {
    await inventory.addToCartByName(PRODUCTS.backpack.name)
    await cart.goto()
    await cart.expectItemCount(1)
  })

  // 5
  test('the cart item has the expected name', async () => {
    await inventory.addToCartByName(PRODUCTS.backpack.name)
    await cart.goto()
    await cart.expectItemName(PRODUCTS.backpack.name)
  })

  // 6
  test('the cart item shows a price', async () => {
    await inventory.addToCartByName(PRODUCTS.backpack.name)
    await cart.goto()
    await cart.expectItemPriceVisible()
    await cart.expectItemPriceFormat()
  })

  // 7
  test('the cart item quantity is 1', async () => {
    await inventory.addToCartByName(PRODUCTS.backpack.name)
    await cart.goto()
    await cart.expectItemQuantity('1')
  })

  // 8
  test('add two items then the cart shows 2 items', async () => {
    await inventory.addToCartByName(PRODUCTS.backpack.name)
    await inventory.addToCartByName(PRODUCTS.bikeLight.name)
    await cart.goto()
    await cart.expectItemCount(2)
  })

  // 9
  test('add all six items then the cart shows 6 items', async () => {
    for (const name of ALL_PRODUCT_NAMES) {
      await inventory.addToCartByName(name)
    }
    await cart.goto()
    await cart.expectItemCount(ALL_PRODUCT_NAMES.length)
  })

  // 10
  test('remove the only item empties the cart', async () => {
    await inventory.addToCartByName(PRODUCTS.backpack.name)
    await cart.goto()
    await cart.expectItemCount(1)
    await cart.removeByName(PRODUCTS.backpack.name)
    await cart.expectItemCount(0)
  })

  // 11
  test('removing one of two items leaves one', async () => {
    await inventory.addToCartByName(PRODUCTS.backpack.name)
    await inventory.addToCartByName(PRODUCTS.bikeLight.name)
    await cart.goto()
    await cart.expectItemCount(2)
    await cart.removeByName(PRODUCTS.backpack.name)
    await cart.expectItemCount(1)
    await cart.expectItemName(PRODUCTS.bikeLight.name)
  })

  // 12
  test('the cart badge equals the number of items added', async () => {
    await inventory.addToCartByName(PRODUCTS.backpack.name)
    await inventory.addToCartByName(PRODUCTS.bikeLight.name)
    await inventory.addToCartByName(PRODUCTS.boltTShirt.name)
    await cart.goto()
    await expect(cart.badge).toHaveText('3')
  })

  // 13
  test('checkout navigates to checkout step one', async ({ page }) => {
    await inventory.addToCartByName(PRODUCTS.backpack.name)
    await cart.goto()
    await cart.checkout()
    await expect(page).toHaveURL(/checkout-step-one\.html/)
  })

  // 14
  test('an added item persists after continue shopping and reopening the cart', async () => {
    await inventory.addToCartByName(PRODUCTS.backpack.name)
    await cart.goto()
    await cart.continueShopping()
    await inventory.expectLoaded()
    await cart.goto()
    await cart.expectItemCount(1)
    await cart.expectItemName(PRODUCTS.backpack.name)
  })

  // 15
  test('removing an item in the cart updates the badge', async () => {
    await inventory.addToCartByName(PRODUCTS.backpack.name)
    await inventory.addToCartByName(PRODUCTS.bikeLight.name)
    await cart.goto()
    await expect(cart.badge).toHaveText('2')
    await cart.removeByName(PRODUCTS.backpack.name)
    await expect(cart.badge).toHaveText('1')
  })

  // 16
  test('each distinct product appears exactly once in the cart', async () => {
    for (const name of ALL_PRODUCT_NAMES) {
      await inventory.addToCartByName(name)
    }
    await cart.goto()
    const names = await cart.itemNames()
    expect(names.sort()).toEqual([...ALL_PRODUCT_NAMES].sort())
    expect(new Set(names).size).toBe(names.length)
  })

  // 17
  test('the Backpack price in the cart is $29.99', async () => {
    await inventory.addToCartByName(PRODUCTS.backpack.name)
    await cart.goto()
    await cart.expectItemPrice(PRODUCTS.backpack.name, PRODUCTS.backpack.price)
  })

  // 18
  test('an empty cart has no remove buttons', async () => {
    await cart.goto()
    await cart.expectItemCount(0)
    await cart.expectNoRemoveButtons()
  })

  // 19
  test('the cart link from inventory opens the cart page', async ({ page }) => {
    await inventory.cartLink.click()
    await expect(page).toHaveURL(/cart\.html/)
    await expect(cart.checkoutButton).toBeVisible()
  })

  // 20
  test('the cart shows a quantity for each line', async () => {
    await inventory.addToCartByName(PRODUCTS.backpack.name)
    await inventory.addToCartByName(PRODUCTS.bikeLight.name)
    await cart.goto()
    await cart.expectItemQuantities(['1', '1'])
  })

  // 21
  test('adding from the product detail page then opening the cart shows the item', async ({ page }) => {
    await inventory.openProductByName(PRODUCTS.backpack.name)
    const detail = new ProductDetailPage(page)
    await detail.addToCart()
    await cart.goto()
    await cart.expectItemCount(1)
    await cart.expectItemName(PRODUCTS.backpack.name)
  })

  // 22
  test('continue shopping keeps previously added items', async () => {
    await inventory.addToCartByName(PRODUCTS.backpack.name)
    await cart.goto()
    await cart.continueShopping()
    await inventory.expectLoaded()
    await inventory.addToCartByName(PRODUCTS.bikeLight.name)
    await cart.goto()
    await cart.expectItemCount(2)
  })

  // 23
  test('removing all items makes the cart badge disappear', async () => {
    await inventory.addToCartByName(PRODUCTS.backpack.name)
    await inventory.addToCartByName(PRODUCTS.bikeLight.name)
    await cart.goto()
    await expect(cart.badge).toHaveText('2')
    await cart.removeByName(PRODUCTS.backpack.name)
    await cart.removeByName(PRODUCTS.bikeLight.name)
    await cart.expectItemCount(0)
    await expect(cart.badge).toHaveCount(0)
  })
})
