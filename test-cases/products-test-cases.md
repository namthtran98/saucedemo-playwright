# Products Manual Test Cases

Automated source: `tests/ui/products.spec.ts`

## Common Preconditions

- Log in as `standard_user` with password `secret_sauce`.
- Start on the inventory page unless stated otherwise.

| ID | Title | Test Data | Manual Steps | Expected Result |
| --- | --- | --- | --- | --- |
| PRD-001 | Inventory page shows the Products title | None | 1. Log in and observe the inventory page. | Page URL is inventory and `Products` title is visible. |
| PRD-002 | Exactly 6 products are listed | Expected count: `6` | 1. Count all inventory items on the page. | Exactly 6 product cards are displayed. |
| PRD-003 | Every product has a visible name | Expected count: `6` | 1. Check each product card.<br>2. Verify the product name area. | All 6 product names are visible. |
| PRD-004 | Every product has a visible price | Expected count: `6` | 1. Check each product card.<br>2. Verify the price area. | All 6 product prices are visible. |
| PRD-005 | Every product has an Add to cart button | Expected count: `6` | 1. Check each product card.<br>2. Verify Add to cart button. | Each product has a visible Add to cart button. |
| PRD-006 | Sort by Name A to Z orders names ascending | Sort option: Name A to Z | 1. Select Name A to Z in sort dropdown.<br>2. Read product names from top to bottom. | Product names are sorted ascending alphabetically. |
| PRD-007 | Sort by Name Z to A orders names descending | Sort option: Name Z to A | 1. Select Name Z to A in sort dropdown.<br>2. Read product names from top to bottom. | Product names are sorted descending alphabetically. |
| PRD-008 | Sort by Price low to high orders prices ascending | Sort option: Price low to high | 1. Select Price low to high.<br>2. Read prices from top to bottom. | Prices are sorted ascending. |
| PRD-009 | Sort by Price high to low orders prices descending | Sort option: Price high to low | 1. Select Price high to low.<br>2. Read prices from top to bottom. | Prices are sorted descending. |
| PRD-010 | Add Sauce Labs Backpack updates cart badge to 1 | Product: `Sauce Labs Backpack` | 1. Click Add to cart for Backpack. | Cart badge shows `1`. |
| PRD-011 | Add two products updates cart badge to 2 | Products: Backpack, Bike Light | 1. Add Backpack.<br>2. Add Bike Light. | Cart badge shows `2`. |
| PRD-012 | Add then the button becomes Remove | Product: Backpack | 1. Click Add to cart for Backpack. | Backpack button changes to Remove. |
| PRD-013 | Remove a product updates the badge back to empty | Product: Backpack | 1. Add Backpack.<br>2. Verify badge is `1`.<br>3. Click Remove for Backpack. | Cart badge disappears. |
| PRD-014 | Add all six products shows badge 6 | All products | 1. Add all six listed products. | Cart badge shows `6`. |
| PRD-015 | Cart link navigates to the cart page | None | 1. Click the cart icon/link. | Cart page loads and checkout button is visible. |
| PRD-016 | Open a product opens its detail page | Product: Backpack | 1. Click Backpack product name. | Product detail page loads. |
| PRD-017 | Product detail shows the correct name | Product: Backpack | 1. Open Backpack detail page.<br>2. Read detail product name. | Detail name is `Sauce Labs Backpack`. |
| PRD-018 | Product detail shows a price | Product: Backpack | 1. Open Backpack detail page.<br>2. Read displayed price. | Price is visible and follows dollar currency format. |
| PRD-019 | Back button returns to the inventory page | Product: Backpack | 1. Open Backpack detail page.<br>2. Click Back to products. | Inventory page loads and Products title is visible. |
| PRD-020 | Add to cart from the detail page updates the badge | Product: Backpack | 1. Open Backpack detail page.<br>2. Click Add to cart. | Cart badge shows `1`. |
| PRD-021 | Cart badge persists from inventory to detail page | Product: Backpack | 1. Add Backpack from inventory.<br>2. Open Backpack detail page. | Cart badge still shows `1`. |
| PRD-022 | Open menu shows All Items, About, Logout, Reset links | None | 1. Open side menu. | All Items, About, Logout, and Reset App State links are visible. |
| PRD-023 | Reset app state clears the cart badge after adding an item | Product: Backpack | 1. Add Backpack.<br>2. Open side menu.<br>3. Click Reset App State. | Cart badge disappears. |
| PRD-024 | Footer shows copyright and three social links | Footer text: `Sauce Labs` | 1. Scroll to footer if needed.<br>2. Check footer copy and social links. | Footer contains Sauce Labs copy and Twitter, Facebook, LinkedIn links are visible. |
