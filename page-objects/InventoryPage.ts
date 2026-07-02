import { expect, type Page, type Locator } from '@playwright/test'
import { SideMenu } from './components/SideMenu'

export class InventoryPage {
  readonly page: Page
  readonly title: Locator
  readonly cartLink: Locator
  readonly cartBadge: Locator
  readonly items: Locator
  readonly itemNameLabels: Locator
  readonly itemPriceLabels: Locator
  readonly sortDropdown: Locator
  readonly footerCopy: Locator
  readonly twitterLink: Locator
  readonly facebookLink: Locator
  readonly linkedInLink: Locator
  readonly sideMenu: SideMenu

  constructor(page: Page) {
    this.page = page
    this.title = page.getByText('Products', { exact: true })
    this.cartLink = page.getByTestId('shopping-cart-link')
    this.cartBadge = page.getByTestId('shopping-cart-badge')
    this.items = page.getByTestId('inventory-item')
    this.itemNameLabels = page.getByTestId('inventory-item-name')
    this.itemPriceLabels = page.getByTestId('inventory-item-price')
    this.sortDropdown = page.getByTestId('product-sort-container')
    this.footerCopy = page.getByTestId('footer-copy')
    this.twitterLink = page.getByTestId('social-twitter')
    this.facebookLink = page.getByTestId('social-facebook')
    this.linkedInLink = page.getByTestId('social-linkedin')
    this.sideMenu = new SideMenu(page)
  }

  itemByName(name: string) {
    return this.items.filter({ hasText: name })
  }

  addToCartButtonAt(index: number) {
    return this.items.nth(index).getByRole('button', { name: /add to cart/i })
  }

  removeButtonByName(name: string) {
    return this.itemByName(name).getByRole('button', { name: /remove/i })
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/inventory\.html/)
    await expect(this.title).toBeVisible()
  }

  async addToCartByName(name: string) {
    const item = this.itemByName(name)
    await item.getByRole('button', { name: /add to cart/i }).click()
  }

  async removeFromCartByName(name: string) {
    const item = this.itemByName(name)
    await item.getByRole('button', { name: /remove/i }).click()
  }

  async sortBy(value: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(value)
  }

  async productNames(): Promise<string[]> {
    return this.itemNameLabels.allInnerTexts()
  }

  async productPrices(): Promise<number[]> {
    const texts = await this.itemPriceLabels.allInnerTexts()
    return texts.map((t) => Number(t.replace(/^\$/, '')))
  }

  async openProductByName(name: string) {
    await this.itemNameLabels.filter({ hasText: name }).click()
  }

  async openCart() {
    await this.cartLink.click()
  }

  itemCount() {
    return this.items.count()
  }
}
