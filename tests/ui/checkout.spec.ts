import { test, expect } from '../../fixtures/test-fixtures'
import { InventoryPage } from '../../page-objects/InventoryPage'
import { CartPage } from '../../page-objects/CartPage'
import { CheckoutPage } from '../../page-objects/CheckoutPage'
import { PRODUCTS } from '../../data/products'
import {
  CHECKOUT_ACCOUNT,
  CHECKOUT_LABELS,
  CHECKOUT_TEST_VALUES,
} from '../../data/checkout-test-data'
import { CHECKOUT_ERROR_MESSAGES } from '../../data/checkout-error-messages'

test.describe('Checkout', () => {
  let inventory: InventoryPage
  let cart: CartPage
  let checkout: CheckoutPage

  test.beforeEach(async ({ loggedInPage }) => {
    inventory = loggedInPage
    cart = new CartPage(inventory.page)
    checkout = new CheckoutPage(inventory.page)
  })

  async function reachStepOne(...names: string[]) {
    const items = names.length ? names : [PRODUCTS.backpack.name]
    for (const name of items) {
      await inventory.addToCartByName(name)
    }
    await cart.goto()
    await cart.checkout()
    await checkout.expectStepOneLoaded()
  }

  async function reachOverview(...names: string[]) {
    await reachStepOne(...names)
    await checkout.fillInfo(
      CHECKOUT_ACCOUNT.firstName,
      CHECKOUT_ACCOUNT.lastName,
      CHECKOUT_ACCOUNT.postalCode
    )
    await checkout.continue()
    await checkout.expectOverviewLoaded()
  }

  async function expectInventoryCartCount(count: number) {
    if (count === 0) {
      await expect(inventory.cartBadge).toHaveCount(0)
    } else {
      await expect(inventory.cartBadge).toHaveText(String(count))
    }
  }

  // 1
  test('step one shows the first name field', async () => {
    await reachStepOne()
    await expect(checkout.firstName).toBeVisible()
  })

  // 2
  test('step one shows the last name field', async () => {
    await reachStepOne()
    await expect(checkout.lastName).toBeVisible()
  })

  // 3
  test('step one shows the postal code field', async () => {
    await reachStepOne()
    await expect(checkout.postalCode).toBeVisible()
  })

  // 4
  test('continue with an empty form shows First Name is required', async () => {
    await reachStepOne()
    await checkout.continue()
    await expect(checkout.errorMessage).toContainText(CHECKOUT_ERROR_MESSAGES.firstNameRequired)
  })

  // 5
  test('continue with only first name shows Last Name is required', async () => {
    await reachStepOne()
    await checkout.fillFirstName(CHECKOUT_ACCOUNT.firstName)
    await checkout.continue()
    await expect(checkout.errorMessage).toContainText(CHECKOUT_ERROR_MESSAGES.lastNameRequired)
  })

  // 6
  test('continue with first and last but no postal shows Postal Code is required', async () => {
    await reachStepOne()
    await checkout.fillFirstAndLast(CHECKOUT_ACCOUNT.firstName, CHECKOUT_ACCOUNT.lastName)
    await checkout.continue()
    await expect(checkout.errorMessage).toContainText(CHECKOUT_ERROR_MESSAGES.postalCodeRequired)
  })

  // 7
  test('the error can be dismissed with the error button', async () => {
    await reachStepOne()
    await checkout.continue()
    await expect(checkout.errorMessage).toBeVisible()
    await checkout.dismissError()
    await expect(checkout.errorMessage).toHaveCount(0)
  })

  // 8
  test('filling all three fields and continuing goes to the overview', async () => {
    await reachStepOne()
    await checkout.fillInfo(
      CHECKOUT_ACCOUNT.firstName,
      CHECKOUT_ACCOUNT.lastName,
      CHECKOUT_ACCOUNT.postalCode
    )
    await checkout.continue()
    await checkout.expectOverviewLoaded()
  })

  // 9
  test('cancel on step one returns to the cart page', async () => {
    await reachStepOne()
    await checkout.cancel()
    await cart.expectLoaded()
  })

  // 10
  test('the first name field accepts and keeps typed input', async () => {
    await reachStepOne()
    await checkout.fillFirstName(CHECKOUT_TEST_VALUES.editedFirstName)
    await expect(checkout.firstName).toHaveValue(CHECKOUT_TEST_VALUES.editedFirstName)
  })

  // 11
  test('overview lists the added item', async () => {
    await reachOverview()
    await expect(cart.itemNameLabels).toHaveText([PRODUCTS.backpack.name])
  })

  // 12
  test('overview shows the item total label', async () => {
    await reachOverview()
    await expect(checkout.itemTotalLabel).toBeVisible()
    await expect(checkout.itemTotalLabel).toContainText(CHECKOUT_LABELS.itemTotal)
  })

  // 13
  test('overview shows the tax label', async () => {
    await reachOverview()
    await expect(checkout.taxLabel).toBeVisible()
    await expect(checkout.taxLabel).toContainText(CHECKOUT_LABELS.tax)
  })

  // 14
  test('overview shows the total label', async () => {
    await reachOverview()
    await expect(checkout.totalLabel).toBeVisible()
    await expect(checkout.totalLabel).toContainText(CHECKOUT_LABELS.total)
  })

  // 15
  test('finish navigates to the complete page', async () => {
    await reachOverview()
    await checkout.finish()
    await checkout.expectCompleteLoaded()
  })

  // 16
  test('complete page shows Thank you for your order', async () => {
    await reachOverview()
    await checkout.finish()
    await checkout.expectCompleteLoaded()
    await expect(checkout.completeHeader).toHaveText(CHECKOUT_LABELS.completeHeader)
  })

  // 17
  test('back home returns to the inventory page', async () => {
    await reachOverview()
    await checkout.finish()
    await checkout.backHome()
    await inventory.expectLoaded()
  })

  // 18
  test('cancel on the overview returns to the inventory page', async () => {
    await reachOverview()
    await checkout.cancel()
    await inventory.expectLoaded()
  })

  // 19
  test('item total equals the single item price', async () => {
    await reachOverview()
    expect(await checkout.itemTotalValue()).toBeCloseTo(PRODUCTS.backpack.price, 2)
  })

  // 20
  test('tax is greater than zero for a non-empty order', async () => {
    await reachOverview()
    expect(await checkout.taxValue()).toBeGreaterThan(0)
  })

  // 21
  test('total equals item total plus tax', async () => {
    await reachOverview()
    const itemTotal = await checkout.itemTotalValue()
    const tax = await checkout.taxValue()
    const total = await checkout.totalValue()
    expect(total).toBeCloseTo(itemTotal + tax, 2)
  })

  // 22
  test('two items: item total equals the sum of the two prices', async () => {
    await reachOverview(PRODUCTS.backpack.name, PRODUCTS.bikeLight.name)
    expect(await checkout.itemTotalValue()).toBeCloseTo(
      PRODUCTS.backpack.price + PRODUCTS.bikeLight.price,
      2
    )
  })

  // 23
  test('two items: overview shows two line items', async () => {
    await reachOverview(PRODUCTS.backpack.name, PRODUCTS.bikeLight.name)
    await expect(cart.items).toHaveCount(2)
  })

  // 24
  test('completing the order clears the cart badge back on inventory', async () => {
    await reachOverview()
    await checkout.finish()
    await checkout.backHome()
    await inventory.expectLoaded()
    await expectInventoryCartCount(0)
  })

  // 25
  test('overview shows the correct single line item count', async () => {
    await reachOverview()
    await expect(cart.items).toHaveCount(1)
  })

  // 26
  test('backpack price appears on the overview', async () => {
    await reachOverview()
    expect(await cart.itemPriceByName(PRODUCTS.backpack.name)).toBeCloseTo(
      PRODUCTS.backpack.price,
      2
    )
  })

  // 27
  test('the complete page shows the back home button', async () => {
    await reachOverview()
    await checkout.finish()
    await checkout.expectCompleteLoaded()
  })
})
