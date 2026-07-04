import { expect, type Page, type Locator } from '@playwright/test'

export class SideMenu {
  readonly page: Page
  readonly openButton: Locator
  readonly closeButton: Locator
  readonly menuContainer: Locator
  readonly allItemsLink: Locator
  readonly aboutLink: Locator
  readonly logoutLink: Locator
  readonly resetAppStateLink: Locator

  constructor(page: Page) {
    this.page = page
    this.openButton = page.getByRole('button', { name: 'Open Menu' })
    this.closeButton = page.getByRole('button', { name: 'Close Menu' })
    this.menuContainer = page.locator('.bm-menu-wrap')
    this.allItemsLink = page.getByTestId('inventory-sidebar-link')
    this.aboutLink = page.getByTestId('about-sidebar-link')
    this.logoutLink = page.getByTestId('logout-sidebar-link')
    this.resetAppStateLink = page.getByTestId('reset-sidebar-link')
  }

  async open() {
    if (await this.menuContainer.getAttribute('aria-hidden') !== 'false') {
      await this.openButton.click()
    }
    await this.expectOpen()
  }

  async close() {
    await this.closeButton.click()
    await this.expectClosed()
  }

  async expectOpen() {
    await expect(this.menuContainer).toHaveAttribute('aria-hidden', 'false')
    await expect(this.allItemsLink).toBeInViewport()
    await expect(this.aboutLink).toBeInViewport()
    await expect(this.logoutLink).toBeInViewport()
    await expect(this.resetAppStateLink).toBeInViewport()
  }

  async expectClosed() {
    await expect(this.menuContainer).toHaveAttribute('aria-hidden', 'true')
  }

  async expectLoaded() {
    await this.expectOpen()
  }

  async goToAllItems() {
    await this.open()
    await this.allItemsLink.click()
  }

  async logout() {
    await this.open()
    await this.logoutLink.click()
  }

  async resetAppState() {
    await this.open()
    await this.resetAppStateLink.click()
  }
}
