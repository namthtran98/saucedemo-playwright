import { expect, type Page, type Locator } from '@playwright/test'

export class LoginPage {
  readonly page: Page
  readonly username: Locator
  readonly password: Locator
  readonly loginButton: Locator
  readonly error: Locator
  readonly errorButton: Locator

  constructor(page: Page) {
    this.page = page
    this.username = page.getByTestId('username')
    this.password = page.getByTestId('password')
    this.loginButton = page.getByTestId('login-button')
    this.error = page.getByTestId('error')
    this.errorButton = page.getByTestId('error-button')
  }

  async goto() {
    await this.page.goto('/')
  }

  async expectLoaded() {
    await expect(this.username).toBeVisible()
    await expect(this.password).toBeVisible()
    await expect(this.loginButton).toBeVisible()
  }

  async login(user: string, pass: string) {
    await this.username.fill(user)
    await this.password.fill(pass)
    await this.loginButton.click()
  }

  async dismissError() {
    await this.errorButton.click()
  }
}
