# System Architecture

## Overview

The project is a Playwright test framework with three execution paths: live UI tests against SauceDemo, visual regression tests against SauceDemo, and local API tests against an in-memory mock REST API.

## Architecture Diagram

```mermaid
flowchart LR
  Config[playwright.config.ts]
  UIProject[UI project]
  APIProject[API project]
  VisualProject[Visual project]
  SpecsUI[tests/ui/*.spec.ts]
  SpecsAPI[tests/api/api.spec.ts]
  SpecsVisual[tests/visual/*.spec.ts]
  Fixtures[fixtures/test-fixtures.ts]
  POM[page-objects/*]
  Data[data/*]
  Baselines[data/visual-baselines/* ignored]
  Artifacts[GitHub Actions visual-baselines artifact]
  SauceDemo[SauceDemo]
  MockAPI[mock-api/server.mjs]

  Config --> UIProject
  Config --> APIProject
  Config --> VisualProject
  Config --> MockAPI
  Artifacts --> Baselines
  UIProject --> SpecsUI
  APIProject --> SpecsAPI
  VisualProject --> SpecsVisual
  SpecsUI --> Fixtures
  SpecsVisual --> Fixtures
  Fixtures --> POM
  SpecsUI --> POM
  SpecsVisual --> POM
  SpecsUI --> Data
  SpecsAPI --> Data
  SpecsVisual --> Baselines
  SpecsUI --> SauceDemo
  SpecsVisual --> SauceDemo
  SpecsAPI --> MockAPI
```

## Playwright Configuration

`playwright.config.ts` is the central runtime contract:

- `testDir` is `./tests`.
- Tests run fully parallel.
- CI retries once; local retries are disabled.
- HTML report is generated without auto-open.
- GitHub reporter is used on CI.
- Traces are collected on first retry.
- Screenshots are collected only on failure.
- `data-test` is the configured test id attribute.
- `expect.toHaveScreenshot.pathTemplate` stores runtime visual baselines under ignored `data/visual-baselines/`, split by platform.

## UI Test Flow

1. A UI spec imports either `@playwright/test` or `fixtures/test-fixtures.ts`.
2. Logged-in suites use `loggedInPage`.
3. Page objects expose locators and interactions.
4. Specs perform business assertions.
5. Browser traffic goes to `https://www.saucedemo.com`.

## API Test Flow

1. Playwright starts `mock-api/server.mjs`.
2. The `api` project uses `http://localhost:${MOCK_API_PORT}` as `baseURL`.
3. Specs call endpoints through Playwright `request`.
4. Assertions compare responses with constants from `data/api-test-data.ts`.

## Visual Test Flow

1. The `visual` project runs `tests/visual/*.spec.ts` against SauceDemo.
2. Visual specs reuse fixtures and page object locators for setup and stable targets.
3. Assertions call `toHaveScreenshot` on pages or locators.
4. CI restores baselines from the latest successful `main` workflow artifact, or generates missing baselines when no artifact exists.
5. Playwright compares screenshots with baselines in ignored `data/visual-baselines/`.
6. Intentional CI visual changes are published through the manual `Playwright Tests` workflow with `visual_baseline_update` set to `changed` or `all`.

## Mock API

The mock API uses Node `http` only. It keeps products, categories, users, and posts in memory. It supports:

- `GET /health`
- `GET /products`
- `GET /products/categories`
- `POST /products`
- `GET /products/:id`
- `GET /users`
- `GET /users/:id`
- `POST /login`
- `GET /posts`
- `POST /posts`
- `GET|PUT|DELETE /posts/:id`

## Key Boundaries

- Page objects own UI locators, interactions, and readiness checks.
- Specs own scenario setup and business assertions.
- `data/` owns shared literals and expected values.
- `data/visual-baselines/` holds ignored runtime screenshot baselines.
- `mock-api/` owns deterministic API behavior.
- `playwright.config.ts` owns execution projects and server startup.
