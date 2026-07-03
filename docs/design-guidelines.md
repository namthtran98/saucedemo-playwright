# Test Design Guidelines

## Purpose

These guidelines define how tests should be designed in this Playwright framework. They focus on maintainability, readable scenarios, and clear ownership between specs, page objects, fixtures, and data.

## Scenario Design

- Name tests by observable behavior.
- Keep each test focused on one user-visible outcome.
- Use domain specs: login, products, cart, checkout, API, and visual.
- Prefer setup helpers when they describe user intent clearly.
- Avoid hidden setup that makes the assertion hard to understand.

## Page Object Design

- Page objects should model pages or reusable components.
- Locators should be readonly properties.
- Methods should represent user interactions or simple page queries.
- Readiness helpers can use `expect` to verify a page or component has loaded.
- Business expectations should remain in specs.

## Fixture Design

- Use `loggedInPage` when a test starts from the inventory page.
- Keep fixture setup generic and reusable.
- Do not hide scenario-specific product or checkout setup in global fixtures.

## Data Design

- Store repeated values in `data/`.
- Keep API constants in `data/api-test-data.ts`.
- Keep SauceDemo product data in `data/products.ts`.
- Keep user credentials and invalid credential values in `data/users.ts`.
- Keep validation messages in `data/checkout-error-messages.ts`.

## Assertion Design

- Assert business outcomes in specs.
- Use page object readiness helpers after navigation.
- Use local assertion helpers inside specs for repeated domain checks such as cart badge count.
- Avoid broad assertions when a specific behavior is under test.

## Visual Regression Design

- Keep visual tests in `tests/visual/*.spec.ts`.
- Use `toHaveScreenshot` for stable pages, components, or locator targets.
- Store approved baselines in `data/visual-baselines/` through Playwright config.
- Use page object locators and fixtures for setup, same as UI specs.
- Mask only known unstable regions; avoid broad masks that hide real layout regressions.
- Use small diff thresholds only when the target has acceptable rendering variance.

## Review Checklist

- Does the UI spec avoid raw locator construction?
- Are new literals placed in `data/` if reused or domain-specific?
- Does the page object avoid business assertions?
- Is the test name behavior-focused?
- If this is visual coverage, is the screenshot target stable and baseline committed?
- Can the test failure point to a specific user-facing behavior?
