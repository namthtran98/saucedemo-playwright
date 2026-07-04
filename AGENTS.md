# Repository Guidelines

## Project Structure & Module Organization

This repository is a TypeScript Playwright framework. UI and visual tests target `https://www.saucedemo.com`; API tests target the bundled mock server.

- `tests/ui/`: UI specs for login, products, cart, and checkout. Specs own business assertions.
- `tests/api/`: API specs against the local mock API.
- `tests/visual/`: visual regression specs for stable SauceDemo UI snapshots.
- `page-objects/`: Page Object Model classes and components such as `LoginPage.ts` and `components/SideMenu.ts`.
- `fixtures/`: custom Playwright fixtures, including `loggedInPage` for authenticated UI tests.
- `data/`: shared UI/API test data, users, products, checkout values, and expected messages.
- `data/visual-baselines/`: ignored runtime visual baseline screenshots restored from CI artifacts or generated locally.
- `mock-api/server.mjs`: zero-dependency REST mock started by Playwright.
- `playwright.config.ts`: project definitions, reporters, retries, screenshots, visual snapshot paths, traces, and mock server setup.

## Build, Test, and Development Commands

- `npm install`: install dependencies.
- `npx playwright install --with-deps`: install browser binaries and required system dependencies.
- `npm test`: run all Playwright tests.
- `npm run test:ui`: run only UI tests.
- `npm run test:api`: run only API tests; the mock API starts automatically.
- `npm run test:visual`: run only visual regression tests.
- `npm run test:visual:update`: update visual baselines on the current OS.
- `npm run test:visual:update:linux`: update CI-compatible Linux visual baselines in Docker.
- `npm run test:headed`: run tests in a visible browser with one worker.
- `npm run test:debug`: run tests with `PWDEBUG=1`.
- `npm run mock-api`: start the mock API manually.
- `npm run report`: open the last Playwright HTML report.

## Coding Style & Naming Conventions

Use TypeScript with `strict` enabled. Follow the existing style: 2-space indentation, single quotes, no semicolons, and concise async helper methods. Keep Page Object classes in PascalCase filenames under `page-objects/`; keep reusable page components under `page-objects/components/`; keep test specs as lowercase domain files like `login.spec.ts`. Prefer Playwright locators such as `getByTestId` and `getByRole`; `data-test` is the configured test id attribute.

## Page Object Model Rules

Keep raw UI locators out of `tests/ui/*.spec.ts`. Define locator properties in page objects first, then expose concise interaction methods such as `login`, `addToCartByName`, `checkout`, and `finish`. Page objects may include readiness assertions such as `expectLoaded`, `expectStepOneLoaded`, or `expectCompleteLoaded` to verify the browser is on the expected page/state.

Do not move business assertions into POM. Assertions for product names, prices, counts, badge values, validation copy, totals, and API response data belong in spec files. Repeated business assertion helpers can live as local helpers inside the relevant spec.

Keep test literals in `data/` modules instead of hardcoding them in specs. Use the current shared modules for users, products, checkout data, checkout/login error messages, and API endpoints/payloads/status values.

## Visual Regression Rules

Keep visual regression tests under `tests/visual/*.spec.ts`. Prefer page object locator properties and fixtures the same way UI specs do. Visual specs should assert stable UI snapshots with `toHaveScreenshot`; keep business assertions in `tests/ui/*.spec.ts`.

Store screenshot baselines only through Playwright's configured snapshot path: `data/visual-baselines/{platform}{/projectName}/{testFilePath}/{arg}{ext}`. Do not commit baseline PNGs, failure diffs from `test-results/`, or generated reports from `playwright-report/`.

CI runs on Linux and restores visual baselines from the latest successful `main` workflow artifact named `visual-baselines`. If no artifact exists, CI generates missing baselines for that run and uploads them. Before reviewing intentional visual baseline changes locally, run `npm run test:visual:update:linux` so screenshots are generated in the same Playwright Docker image used to match the GitHub Actions runner. Do not approve macOS-generated baselines for CI.

Use masks and small diff thresholds only for known unstable regions. Do not hide meaningful UI regressions by broad masking.

There is no lint or format script in `package.json`; match nearby code when editing.

## Testing Guidelines

Playwright is the test framework. Add UI coverage under `tests/ui/*.spec.ts`, API coverage under `tests/api/*.spec.ts`, and visual coverage under `tests/visual/*.spec.ts`. Name tests by observable behavior, for example `locked_out_user is rejected`. Use `fixtures/test-fixtures.ts` for logged-in UI setup when a test starts from inventory. Before pushing, run `npm test`; for focused work, run `npm run test:ui`, `npm run test:api`, or `npm run test:visual`.

## Commit & Pull Request Guidelines

The repository history uses Conventional Commits, for example `feat: add playwright test framework`. Use short, imperative messages such as `fix: stabilize checkout test`.

Pull requests should include a clear summary, the tests run, linked issues when relevant, and screenshots or Playwright report notes for UI-facing changes. Do not commit secrets, local credentials, or generated report artifacts.
