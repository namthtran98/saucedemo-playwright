# Playwright Project Pack

A production-ready TypeScript Playwright framework with **125 tests (88 UI + 32 API + 2 visual + 3 accessibility)**.

The UI tests run against the public practice site saucedemo.com. The 32 API tests
run against a bundled, zero-dependency mock API that Playwright starts for you, so
they pass deterministically offline. API coverage includes behavioral tests and
JSON-schema contract tests for the mock API response shapes.
Visual tests run against SauceDemo through a dedicated Playwright project and
compare screenshots against baselines restored into `data/visual-baselines/`.
Accessibility tests use axe against selected SauceDemo flows and run through a
dedicated Playwright project.

## Quick start

    npm install
    npx playwright install --with-deps
    npm test

## Useful commands

- `npm test` runs the 88 UI tests and 32 API tests.
- `npm run test:all` runs UI, API, visual, and accessibility tests after visual baselines exist.
- `npm run test:ui` runs the 88 UI tests.
- `npm run test:api` runs the 32 API tests (the mock API auto-starts).
- `npm run test:visual` runs the visual regression tests.
- `npm run test:accessibility` runs the 3 accessibility checks.
- `npm run generate:api-contract-types` regenerates API contract TypeScript declarations from JSON schemas.
- `npm run test:visual:update` updates visual baselines on the current OS.
- `npm run test:visual:update:linux` updates Linux visual baselines for CI.
- `npm run test:headed` runs with a visible browser.
- `npm run report` opens the last HTML report.

## Visual baselines

CI runs on Linux. The `data/visual-baselines/` directory is ignored by git, so
baseline PNGs are not committed. CI restores visual baselines from the latest
successful `main` workflow artifact named `visual-baselines`; if none exists, it
generates missing baselines for that run and uploads them as an artifact.
When a visual change is intentional, manually run the `Playwright Tests`
workflow with `visual_baseline_update` set to `changed` or `all` to publish a
replacement baseline artifact.

For local review, generate Linux-compatible baselines in the matching Playwright
container:

    npm run test:visual:update:linux

Do not commit generated baseline PNGs. Rendering can differ enough between macOS
and Linux to make the GitHub Actions visual project fail.

## Layout

- `page-objects/` Page Object Model classes (getByTestId / getByRole).
- `tests/ui/` UI suites: login, products, cart, checkout.
- `tests/api/` API suite against the bundled mock.
- `tests/visual/` visual regression specs for stable UI snapshots.
- `tests/accessibility/` axe accessibility checks for selected SauceDemo flows.
- `test-helpers/` reusable Playwright assertion and validation helpers.
- `data/visual-baselines/` ignored runtime screenshot baselines for visual tests.
- `mock-api/server.mjs` the bundled mock REST API.
- `data/` external test data.
- `fixtures/` custom Playwright fixtures.

## Documentation

- `docs/project-overview-pdr.md` explains the project purpose and requirements.
- `docs/codebase-summary.md` maps the current modules and test coverage.
- `docs/code-standards.md` records POM, data, and assertion conventions.
- `docs/system-architecture.md` describes the UI/API test architecture.
- `docs/project-roadmap.md` tracks practical next steps.
- `docs/deployment-guide.md` covers local setup and CI usage.
- `docs/design-guidelines.md` documents test design principles.
