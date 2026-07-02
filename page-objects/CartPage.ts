import { expect, type Page, type Locator } from '@playwright/test'

export class CartPage {
  readonly page: Page
  readonly items: Locator
  readonly itemNameLabels: Locator
  readonly itemPriceLabels: Locator
  readonly itemQuantityLabels: Locator
  readonly removeButtons: Locator
  readonly checkoutButton: Locator
  readonly continueShoppingButton: Locator
  readonly badge: Locator

  constructor(page: Page) {
    this.page = page
    this.items = page.getByTestId('inventory-item')
    this.itemNameLabels = page.getByTestId('inventory-item-name')
    this.itemPriceLabels = page.getByTestId('inventory-item-price')
    this.itemQuantityLabels = page.getByTestId('item-quantity')
    this.removeButtons = page.getByRole('button', { name: /remove/i })
    this.checkoutButton = page.getByTestId('checkout')
    this.continueShoppingButton = page.getByTestId('continue-shopping')
    this.badge = page.getByTestId('shopping-cart-badge')
  }

  async goto() {
    await this.page.goto('/cart.html')
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/cart\.html/)
    await expect(this.checkoutButton).toBeVisible()
  }

  async itemNames(): Promise<string[]> {
    return this.itemNameLabels.allInnerTexts()
  }

  async itemPriceByName(name: string): Promise<number> {
    const names = await this.itemNameLabels.allInnerTexts()
    const index = names.indexOf(name)
    if (index === -1) {
      throw new Error(`Cart item not found: ${name}`)
    }
    const text = await this.itemPriceLabels.nth(index).innerText()
    return Number(text.replace(/^\$/, ''))
  }

  itemByName(name: string) {
    return this.items.filter({ hasText: name })
  }

  async removeByName(name: string) {
    const item = this.itemByName(name)
    await item.getByRole('button', { name: /remove/i }).click()
  }

  async checkout() {
    await this.checkoutButton.click()
  }

  async continueShopping() {
    await this.continueShoppingButton.click()
  }
}
