# Playwright Project Pack

A production-ready TypeScript Playwright framework with **103 tests (88 UI + 15 API)**.

The UI tests run against the public practice site saucedemo.com. The 15 API tests
run against a bundled, zero-dependency mock API that Playwright starts for you, so
they pass deterministically offline.

## Quick start

    npm install
    npx playwright install --with-deps
    npm test

## Useful commands

- `npm run test:ui` runs the 88 UI tests.
- `npm run test:api` runs the 15 API tests (the mock API auto-starts).
- `npm run test:headed` runs with a visible browser.
- `npm run report` opens the last HTML report.

## Layout

- `page-objects/` Page Object Model classes (getByTestId / getByRole).
- `tests/ui/` UI suites: login, products, cart, checkout.
- `tests/api/` API suite against the bundled mock.
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
