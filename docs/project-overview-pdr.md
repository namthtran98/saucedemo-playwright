# Project Overview And PDR

## Overview

Playwright Project Pack is a TypeScript Playwright framework for practicing and maintaining end-to-end UI tests, API tests, visual regression tests, and accessibility checks. UI, visual, and accessibility tests target SauceDemo at `https://www.saucedemo.com`. API tests target the bundled local mock API in `mock-api/server.mjs`.

The project currently has 128 tests: 91 UI tests, 32 API tests, 2 visual tests, and 3 accessibility tests.

## Product Goals

- Provide a production-style Playwright starter with clear structure.
- Keep UI test code readable through Page Object Model classes.
- Keep test data centralized and reusable.
- Make API tests deterministic by using an offline mock server.
- Add lightweight visual regression coverage for stable SauceDemo UI elements.
- Add lightweight axe accessibility coverage for selected SauceDemo flows.
- Support focused local test runs and full-suite validation.

## Users

- QA engineers learning or extending Playwright.
- Developers who need a small but realistic test framework template.
- Reviewers checking POM, data separation, and test maintainability.

## Functional Requirements

- Run UI and API tests with `npm test` without requiring visual baselines.
- Run UI, API, visual, and accessibility tests with `npm run test:all` after visual baselines exist.
- Run only UI tests with `npm run test:ui`.
- Run only API tests with `npm run test:api`.
- Run visual regression tests with `npm run test:visual`.
- Run accessibility tests with `npm run test:accessibility`.
- Start the mock API automatically through Playwright `webServer`.
- Use SauceDemo `data-test` attributes for stable UI locators.
- Keep UI locators and interactions in page objects.
- Keep business assertions in spec files.
- Store shared test data in `data/`.
- Restore or generate visual baselines under ignored `data/visual-baselines/`.

## Non-Functional Requirements

- TypeScript `strict` mode must stay enabled.
- Tests should remain deterministic except for live SauceDemo availability.
- API tests must pass offline against the local mock API.
- Page objects should stay small and focused.
- Test reports, traces, screenshots, and generated artifacts should not be committed.
- Visual baseline PNGs are not committed; CI stores them as workflow artifacts.

## Out Of Scope

- Owning or modifying the SauceDemo application.
- Building a real backend service.
- Replacing Playwright with another runner.
- Adding production deployment infrastructure for an app runtime.

## Success Criteria

- `npm test` passes for UI and API coverage.
- `npm run test:visual` passes after approved baselines exist.
- `npm run test:accessibility` passes for selected accessibility checks.
- `npx tsc --noEmit` passes when type checking is needed.
- UI specs contain no raw Playwright locator construction.
- New test literals are added to `data/` instead of duplicated in specs.
- Page objects include readiness checks only, not business assertions.
