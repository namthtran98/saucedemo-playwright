import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { InventoryPage } from '../../page-objects/InventoryPage'
import { USERS, PASSWORD } from '../../data/users'
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
    await expect(login.username).toBeVisible()
    await expect(login.password).toBeVisible()
    await expect(login.loginButton).toBeVisible()
  })

  test('standard_user logs in successfully', async () => {
    await login.login(USERS.standard, PASSWORD)
    await login.expectLoggedIn()
  })

  test('problem_user logs in successfully', async () => {
    await login.login(USERS.problem, PASSWORD)
    await login.expectLoggedIn()
  })

  test('performance_glitch_user logs in successfully', async () => {
    await login.login(USERS.glitch, PASSWORD)
    await login.expectLoggedIn()
  })

  test('error_user logs in successfully', async () => {
    await login.login(USERS.error, PASSWORD)
    await login.expectLoggedIn()
  })

  test('visual_user logs in successfully', async () => {
    await login.login(USERS.visual, PASSWORD)
    await login.expectLoggedIn()
  })

  test('locked_out_user is rejected', async () => {
    await login.login(USERS.lockedOut, PASSWORD)
    await login.expectError(LOGIN_ERROR_MESSAGES.lockedOut)
  })

  test('wrong password is rejected', async () => {
    await login.login(USERS.standard, 'wrong_password')
    await login.expectError(LOGIN_ERROR_MESSAGES.invalidCredentials)
  })

  test('unknown user is rejected', async () => {
    await login.login('no_such_user', PASSWORD)
    await login.expectError(LOGIN_ERROR_MESSAGES.invalidCredentials)
  })

  test('empty username shows required error', async () => {
    await login.login('', PASSWORD)
    await login.expectError(LOGIN_ERROR_MESSAGES.usernameRequired)
  })

  test('empty password shows required error', async () => {
    await login.login(USERS.standard, '')
    await login.expectError(LOGIN_ERROR_MESSAGES.passwordRequired)
  })

  test('empty form shows username required error', async () => {
    await login.loginButton.click()
    await login.expectError(LOGIN_ERROR_MESSAGES.usernameRequired)
  })

  test('error message can be dismissed', async () => {
    await login.login(USERS.lockedOut, PASSWORD)
    await login.expectError(LOGIN_ERROR_MESSAGES.lockedOut)
    await login.dismissError()
    await expect(login.error).toHaveCount(0)
  })

  test('successful login then logout returns to login', async () => {
    await login.login(USERS.standard, PASSWORD)
    await login.expectLoggedIn()
    await inventory.sideMenu.logout()
    await expect(login.loginButton).toBeVisible()
  })
})
