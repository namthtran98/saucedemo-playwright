# Menu Manual Test Cases

Automated source: `tests/ui/menu.spec.ts`

## Common Preconditions

- Log in as `standard_user` with password `secret_sauce`.
- Start on the inventory page unless stated otherwise.

| ID | Title | Test Data | Manual Steps | Expected Result |
| --- | --- | --- | --- | --- |
| MNU-001 | Open menu shows links in viewport | None | 1. Open the side menu. | All Items, About, Logout, and Reset App State links are inside the viewport. |
| MNU-002 | Close menu hides menu state | None | 1. Open the side menu.<br>2. Click the menu close button. | The menu container is closed with `aria-hidden=true`. |
| MNU-003 | All Items returns from cart to inventory | None | 1. Open the cart page.<br>2. Open the side menu.<br>3. Click All Items. | Inventory page loads and shows Products. |
| MNU-004 | About link points to Sauce Labs | None | 1. Open the side menu.<br>2. Inspect the About link target. | About link has `href="https://saucelabs.com/"`. |
| MNU-005 | Logout returns to login page | None | 1. Open the side menu.<br>2. Click Logout. | Login page loads with username, password, and login button visible. |
| MNU-006 | Reset App State clears cart badge | Product: Backpack | 1. Add Backpack to cart.<br>2. Confirm cart badge shows `1`.<br>3. Open the side menu.<br>4. Click Reset App State. | Cart badge disappears. |
