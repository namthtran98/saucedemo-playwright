# Cart Manual Test Cases

Automated source: `tests/ui/cart.spec.ts`

## Common Preconditions

- Log in as `standard_user` with password `secret_sauce`.
- Start on the inventory page unless stated otherwise.

| ID | Title | Test Data | Manual Steps | Expected Result |
| --- | --- | --- | --- | --- |
| CRT-001 | Cart is empty right after login | None | 1. Log in.<br>2. Open `/cart.html` or click cart icon. | Cart contains 0 items. |
| CRT-002 | Continue shopping returns to the inventory page | None | 1. Open cart page.<br>2. Click Continue Shopping. | Inventory page loads and Products title is visible. |
| CRT-003 | Checkout button is visible in the cart | None | 1. Open cart page. | Checkout button is visible. |
| CRT-004 | Add one item then the cart shows 1 item | Product: Backpack | 1. Add Backpack from inventory.<br>2. Open cart. | Cart contains 1 item. |
| CRT-005 | Cart item has the expected name | Product: Backpack | 1. Add Backpack.<br>2. Open cart.<br>3. Read item name. | Item name is `Sauce Labs Backpack`. |
| CRT-006 | Cart item shows a price | Product: Backpack | 1. Add Backpack.<br>2. Open cart.<br>3. Read item price. | Price is visible and follows dollar currency format. |
| CRT-007 | Cart item quantity is 1 | Product: Backpack | 1. Add Backpack.<br>2. Open cart.<br>3. Read item quantity. | Quantity shows `1`. |
| CRT-008 | Add two items then the cart shows 2 items | Products: Backpack, Bike Light | 1. Add Backpack.<br>2. Add Bike Light.<br>3. Open cart. | Cart contains 2 items. |
| CRT-009 | Add all six items then the cart shows 6 items | All products | 1. Add all six products.<br>2. Open cart. | Cart contains 6 items. |
| CRT-010 | Remove the only item empties the cart | Product: Backpack | 1. Add Backpack.<br>2. Open cart.<br>3. Click Remove. | Cart contains 0 items. |
| CRT-011 | Removing one of two items leaves one | Products: Backpack, Bike Light | 1. Add Backpack and Bike Light.<br>2. Open cart.<br>3. Remove Backpack. | Cart contains 1 item and remaining item is Bike Light. |
| CRT-012 | Cart badge equals the number of items added | Products: Backpack, Bike Light, Bolt T-Shirt | 1. Add all three products.<br>2. Open cart. | Cart badge shows `3`. |
| CRT-013 | Checkout navigates to checkout step one | Product: Backpack | 1. Add Backpack.<br>2. Open cart.<br>3. Click Checkout. | Checkout step one page loads with customer information fields. |
| CRT-014 | Added item persists after continue shopping and reopening cart | Product: Backpack | 1. Add Backpack.<br>2. Open cart.<br>3. Click Continue Shopping.<br>4. Open cart again. | Cart still contains 1 Backpack item. |
| CRT-015 | Removing an item in cart updates badge | Products: Backpack, Bike Light | 1. Add both products.<br>2. Open cart.<br>3. Remove Backpack. | Cart badge changes from `2` to `1`. |
| CRT-016 | Each distinct product appears exactly once in cart | All products | 1. Add all six products.<br>2. Open cart.<br>3. Review item names. | Each expected product appears once, no duplicates. |
| CRT-017 | Backpack price in cart is 29.99 | Product: Backpack | 1. Add Backpack.<br>2. Open cart.<br>3. Read Backpack price. | Backpack price is `$29.99`. |
| CRT-018 | Empty cart has no remove buttons | None | 1. Open cart immediately after login. | Cart has no items and no Remove buttons. |
| CRT-019 | Cart link from inventory opens cart page | None | 1. From inventory, click cart link. | Cart page loads and checkout button is visible. |
| CRT-020 | Cart shows a quantity for each line | Products: Backpack, Bike Light | 1. Add both products.<br>2. Open cart.<br>3. Read line quantities. | Each line quantity is `1`. |
| CRT-021 | Adding from product detail then opening cart shows item | Product: Backpack | 1. Open Backpack detail page.<br>2. Click Add to cart.<br>3. Open cart. | Cart contains 1 Backpack item. |
| CRT-022 | Continue shopping keeps previously added items | Products: Backpack, Bike Light | 1. Add Backpack.<br>2. Open cart.<br>3. Click Continue Shopping.<br>4. Add Bike Light.<br>5. Open cart. | Cart contains 2 items. |
| CRT-023 | Removing all items makes cart badge disappear | Products: Backpack, Bike Light | 1. Add both products.<br>2. Open cart.<br>3. Remove both products. | Cart contains 0 items and cart badge disappears. |
