import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { InventoryPage } from '../../page-objects/InventoryPage'
import { EMPTY_CREDENTIAL, INVALID_PASSWORD, PASSWORD, UNKNOWN_USER, USERS } from '../../data/users'
import { LOGIN_ERROR_MESSAGES } from '../../data/checkout-error-messages'

test.describe('Login', () => {
  let login: LoginPage
  let inventory: InventoryPage

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page)
    inventory = new InventoryPage(page)
    await login.goto()
  })

  test('login form is visible', async () => {
    await login.expectLoaded()
  })

  test('standard_user logs in successfully', async () => {
    await login.login(USERS.standard, PASSWORD)
    await inventory.expectLoaded()
  })

  test('problem_user logs in successfully', async () => {
    await login.login(USERS.problem, PASSWORD)
    await inventory.expectLoaded()
  })

  test('performance_glitch_user logs in successfully', async () => {
    await login.login(USERS.glitch, PASSWORD)
    await inventory.expectLoaded()
  })

  test('error_user logs in successfully', async () => {
    await login.login(USERS.error, PASSWORD)
    await inventory.expectLoaded()
  })

  test('visual_user logs in successfully', async () => {
    await login.login(USERS.visual, PASSWORD)
    await inventory.expectLoaded()
  })

  test('locked_out_user is rejected', async () => {
    await login.login(USERS.lockedOut, PASSWORD)
    await expect(login.error).toContainText(LOGIN_ERROR_MESSAGES.lockedOut)
  })

  test('wrong password is rejected', async () => {
    await login.login(USERS.standard, INVALID_PASSWORD)
    await expect(login.error).toContainText(LOGIN_ERROR_MESSAGES.invalidCredentials)
  })

  test('unknown user is rejected', async () => {
    await login.login(UNKNOWN_USER, PASSWORD)
    await expect(login.error).toContainText(LOGIN_ERROR_MESSAGES.invalidCredentials)
  })

  test('empty username shows required error', async () => {
    await login.login(EMPTY_CREDENTIAL, PASSWORD)
    await expect(login.error).toContainText(LOGIN_ERROR_MESSAGES.usernameRequired)
  })

  test('empty password shows required error', async () => {
    await login.login(USERS.standard, EMPTY_CREDENTIAL)
    await expect(login.error).toContainText(LOGIN_ERROR_MESSAGES.passwordRequired)
  })

  test('empty form shows username required error', async () => {
    await login.loginButton.click()
    await expect(login.error).toContainText(LOGIN_ERROR_MESSAGES.usernameRequired)
  })

  test('error message can be dismissed', async () => {
    await login.login(USERS.lockedOut, PASSWORD)
    await expect(login.error).toContainText(LOGIN_ERROR_MESSAGES.lockedOut)
    await login.dismissError()
    await expect(login.error).toHaveCount(0)
  })

  test('successful login then logout returns to login', async () => {
    await login.login(USERS.standard, PASSWORD)
    await inventory.expectLoaded()
    await inventory.sideMenu.logout()
    await login.expectLoaded()
  })
})
