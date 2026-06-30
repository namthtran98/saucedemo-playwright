import { type Page, type Locator, expect } from '@playwright/test'

export class SideMenu {
  readonly page: Page
  readonly openButton: Locator
  readonly allItemsLink: Locator
  readonly aboutLink: Locator
  readonly logoutLink: Locator
  readonly resetAppStateLink: Locator

  constructor(page: Page) {
    this.page = page
    this.openButton = page.getByRole('button', { name: 'Open Menu' })
    this.allItemsLink = page.getByTestId('inventory-sidebar-link')
    this.aboutLink = page.getByTestId('about-sidebar-link')
    this.logoutLink = page.getByTestId('logout-sidebar-link')
    this.resetAppStateLink = page.getByTestId('reset-sidebar-link')
  }

  async open() {
    await this.openButton.click()
  }

  async expectLinksVisible() {
    await expect(this.allItemsLink).toBeVisible()
    await expect(this.aboutLink).toBeVisible()
    await expect(this.logoutLink).toBeVisible()
    await expect(this.resetAppStateLink).toBeVisible()
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
