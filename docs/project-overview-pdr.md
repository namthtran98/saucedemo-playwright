# Project Overview And PDR

## Overview

Playwright Project Pack is a TypeScript Playwright framework for practicing and maintaining end-to-end UI tests, API tests, and visual regression tests. UI and visual tests target SauceDemo at `https://www.saucedemo.com`. API tests target the bundled local mock API in `mock-api/server.mjs`.

The project currently has 105 tests: 88 UI tests, 15 API tests, and 2 visual tests.

## Product Goals

- Provide a production-style Playwright starter with clear structure.
- Keep UI test code readable through Page Object Model classes.
- Keep test data centralized and reusable.
- Make API tests deterministic by using an offline mock server.
- Add lightweight visual regression coverage for stable SauceDemo UI elements.
- Support focused local test runs and full-suite validation.

## Users

- QA engineers learning or extending Playwright.
- Developers who need a small but realistic test framework template.
- Reviewers checking POM, data separation, and test maintainability.

## Functional Requirements

- Run all tests with `npm test`.
- Run only UI tests with `npm run test:ui`.
- Run only API tests with `npm run test:api`.
- Run visual regression tests with `npm run test:visual`.
- Start the mock API automatically through Playwright `webServer`.
- Use SauceDemo `data-test` attributes for stable UI locators.
- Keep UI locators and interactions in page objects.
- Keep business assertions in spec files.
- Store shared test data in `data/`.
- Store approved visual baselines in `data/visual-baselines/`.

## Non-Functional Requirements

- TypeScript `strict` mode must stay enabled.
- Tests should remain deterministic except for live SauceDemo availability.
- API tests must pass offline against the local mock API.
- Page objects should stay small and focused.
- Test reports, traces, screenshots, and generated artifacts should not be committed.
- Visual baseline PNGs are committed only after intentional review.

## Out Of Scope

- Owning or modifying the SauceDemo application.
- Building a real backend service.
- Replacing Playwright with another runner.
- Adding production deployment infrastructure for an app runtime.

## Success Criteria

- `npm test` passes.
- `npm run test:visual` passes after approved baselines exist.
- `npx tsc --noEmit` passes when type checking is needed.
- UI specs contain no raw Playwright locator construction.
- New test literals are added to `data/` instead of duplicated in specs.
- Page objects include readiness checks only, not business assertions.
