# Repository Guidelines

## Project Structure & Module Organization

This repository is a TypeScript Playwright framework. UI tests target `https://www.saucedemo.com`; API tests target the bundled mock server.

- `tests/ui/`: UI specs for login, products, cart, and checkout.
- `tests/api/`: API specs against the local mock API.
- `page-objects/`: Page Object Model classes such as `LoginPage.ts`.
- `fixtures/`: custom Playwright fixtures.
- `data/`: shared test data, users, and products.
- `mock-api/server.mjs`: zero-dependency REST mock started by Playwright.
- `playwright.config.ts`: project definitions, reporters, retries, screenshots, traces, and mock server setup.

## Build, Test, and Development Commands

- `npm install`: install dependencies.
- `npx playwright install --with-deps`: install browser binaries and required system dependencies.
- `npm test`: run all Playwright tests.
- `npm run test:ui`: run only UI tests.
- `npm run test:api`: run only API tests; the mock API starts automatically.
- `npm run test:headed`: run tests in a visible browser with one worker.
- `npm run test:debug`: run tests with `PWDEBUG=1`.
- `npm run mock-api`: start the mock API manually.
- `npm run report`: open the last Playwright HTML report.

## Coding Style & Naming Conventions

Use TypeScript with `strict` enabled. Follow the existing style: 2-space indentation, single quotes, no semicolons, and concise async helper methods. Keep Page Object classes in PascalCase filenames under `page-objects/`; keep test specs as lowercase domain files like `login.spec.ts`. Prefer Playwright locators such as `getByTestId` and `getByRole`; `data-test` is the configured test id attribute.

There is no lint or format script in `package.json`; match nearby code when editing.

## Testing Guidelines

Playwright is the test framework. Add UI coverage under `tests/ui/*.spec.ts` and API coverage under `tests/api/*.spec.ts`. Name tests by observable behavior, for example `locked_out_user is rejected`. Before pushing, run `npm test`; for focused work, run `npm run test:ui` or `npm run test:api`.

## Commit & Pull Request Guidelines

The repository history uses Conventional Commits, for example `feat: add playwright test framework`. Use short, imperative messages such as `fix: stabilize checkout test`.

Pull requests should include a clear summary, the tests run, linked issues when relevant, and screenshots or Playwright report notes for UI-facing changes. Do not commit secrets, local credentials, or generated report artifacts.
