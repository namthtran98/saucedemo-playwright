import { type Page, type Locator, expect } from '@playwright/test'

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

  async expectItemNames(names: string[]) {
    await expect(this.itemNameLabels).toHaveText(names)
  }

  async expectItemName(name: string) {
    await expect(this.itemNameLabels).toHaveText(name)
  }

  async expectItemPrice(name: string, price: number) {
    expect(await this.itemPriceByName(name)).toBeCloseTo(price, 2)
  }

  async expectItemPriceVisible() {
    await expect(this.itemPriceLabels).toBeVisible()
  }

  async expectItemPriceFormat() {
    await expect(this.itemPriceLabels).toHaveText(/\$\d+\.\d{2}/)
  }

  async expectItemQuantity(quantity: string) {
    await expect(this.itemQuantityLabels).toHaveText(quantity)
  }

  async expectItemQuantities(quantities: string[]) {
    await expect(this.itemQuantityLabels).toHaveText(quantities)
  }

  async expectNoRemoveButtons() {
    await expect(this.removeButtons).toHaveCount(0)
  }

  async removeByName(name: string) {
    const item = this.items.filter({ hasText: name })
    await item.getByRole('button', { name: /remove/i }).click()
  }

  async expectItemCount(n: number) {
    await expect(this.items).toHaveCount(n)
  }

  async checkout() {
    await this.checkoutButton.click()
  }

  async continueShopping() {
    await this.continueShoppingButton.click()
  }
}
