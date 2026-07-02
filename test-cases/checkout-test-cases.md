# Checkout Manual Test Cases

Automated source: `tests/ui/checkout.spec.ts`

## Common Preconditions

- Log in as `standard_user` with password `secret_sauce`.
- Unless stated otherwise, add `Sauce Labs Backpack` to cart and navigate to checkout step one.
- Default checkout data: first name `Ada`, last name `Lovelace`, postal code `12345`.

| ID | Title | Test Data | Manual Steps | Expected Result |
| --- | --- | --- | --- | --- |
| CHK-001 | Step one shows the first name field | Product: Backpack | 1. Add Backpack.<br>2. Open cart.<br>3. Click Checkout. | First Name field is visible. |
| CHK-002 | Step one shows the last name field | Product: Backpack | 1. Navigate to checkout step one. | Last Name field is visible. |
| CHK-003 | Step one shows the postal code field | Product: Backpack | 1. Navigate to checkout step one. | Postal Code field is visible. |
| CHK-004 | Continue with empty form shows First Name is required | Empty checkout form | 1. Navigate to checkout step one.<br>2. Leave all fields empty.<br>3. Click Continue. | Error message shows: `Error: First Name is required`. |
| CHK-005 | Continue with only first name shows Last Name is required | First name: `Ada` | 1. Enter first name only.<br>2. Click Continue. | Error message shows: `Error: Last Name is required`. |
| CHK-006 | Continue with first and last but no postal shows Postal Code is required | First: `Ada`<br>Last: `Lovelace` | 1. Enter first and last name.<br>2. Leave postal code empty.<br>3. Click Continue. | Error message shows: `Error: Postal Code is required`. |
| CHK-007 | Error can be dismissed with error button | Empty checkout form | 1. Trigger required field error.<br>2. Click error close button. | Error message disappears. |
| CHK-008 | Filling all three fields and continuing goes to overview | `Ada Lovelace`, `12345` | 1. Fill first name, last name, postal code.<br>2. Click Continue. | Checkout overview page loads. |
| CHK-009 | Cancel on step one returns to cart page | Product: Backpack | 1. Navigate to checkout step one.<br>2. Click Cancel. | Cart page loads and checkout button is visible. |
| CHK-010 | First name field accepts and keeps typed input | First name: `Grace` | 1. Navigate to checkout step one.<br>2. Enter `Grace` in first name. | First Name field value remains `Grace`. |
| CHK-011 | Overview lists the added item | Product: Backpack | 1. Complete checkout info.<br>2. Continue to overview. | Overview lists `Sauce Labs Backpack`. |
| CHK-012 | Overview shows item total label | Product: Backpack | 1. Continue to overview. | Item total label is visible and contains `Item total:`. |
| CHK-013 | Overview shows tax label | Product: Backpack | 1. Continue to overview. | Tax label is visible and contains `Tax:`. |
| CHK-014 | Overview shows total label | Product: Backpack | 1. Continue to overview. | Total label is visible and contains `Total:`. |
| CHK-015 | Finish navigates to complete page | Product: Backpack | 1. Continue to overview.<br>2. Click Finish. | Checkout complete page loads. |
| CHK-016 | Complete page shows Thank you for your order | Product: Backpack | 1. Complete checkout flow. | Complete header text is `Thank you for your order!`. |
| CHK-017 | Back home returns to inventory page | Product: Backpack | 1. Complete checkout flow.<br>2. Click Back Home. | Inventory page loads and Products title is visible. |
| CHK-018 | Cancel on overview returns to inventory page | Product: Backpack | 1. Continue to overview.<br>2. Click Cancel. | Inventory page loads and Products title is visible. |
| CHK-019 | Item total equals single item price | Product: Backpack | 1. Continue to overview.<br>2. Compare item total to Backpack price. | Item total equals `$29.99`. |
| CHK-020 | Tax is greater than zero for non-empty order | Product: Backpack | 1. Continue to overview.<br>2. Read tax value. | Tax value is greater than `0`. |
| CHK-021 | Total equals item total plus tax | Product: Backpack | 1. Continue to overview.<br>2. Read item total, tax, and total. | Total equals item total plus tax. |
| CHK-022 | Two items item total equals sum of two prices | Products: Backpack, Bike Light | 1. Add Backpack and Bike Light.<br>2. Continue to overview.<br>3. Read item total. | Item total equals `$39.98`. |
| CHK-023 | Two items overview shows two line items | Products: Backpack, Bike Light | 1. Add both products.<br>2. Continue to overview. | Overview shows 2 line items. |
| CHK-024 | Completing order clears cart badge back on inventory | Product: Backpack | 1. Complete checkout flow.<br>2. Click Back Home. | Inventory page loads and cart badge is not visible. |
| CHK-025 | Overview shows correct single line item count | Product: Backpack | 1. Continue to overview. | Overview shows 1 line item. |
| CHK-026 | Backpack price appears on overview | Product: Backpack | 1. Continue to overview.<br>2. Read Backpack line price. | Backpack price is `$29.99`. |
| CHK-027 | Complete page shows Back Home button | Product: Backpack | 1. Complete checkout flow. | Back Home button is visible. |
