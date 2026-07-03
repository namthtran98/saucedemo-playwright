# Deployment Guide

## Overview

This project does not deploy an application. The deployable artifact is the test framework itself, normally run locally or in CI.

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Install Playwright browsers and system dependencies:

   ```bash
   npx playwright install --with-deps
   ```

3. Run the full suite:

   ```bash
   npm test
   ```

## Test Commands

| Command | Purpose |
| --- | --- |
| `npm test` | Run all configured Playwright projects |
| `npm run test:ui` | Run only UI tests |
| `npm run test:api` | Run only API tests |
| `npx playwright test --project=visual` | Run only visual regression tests |
| `npx playwright test --project=visual --update-snapshots` | Update approved visual baselines |
| `npm run test:headed` | Run headed browser tests with one worker |
| `npm run test:debug` | Run tests with `PWDEBUG=1` and one worker |
| `npm run mock-api` | Start the mock API manually |
| `npm run report` | Open the latest Playwright HTML report |

## Environment Variables

| Variable | Default | Purpose |
| --- | --- | --- |
| `MOCK_API_PORT` | `3100` | Port for `mock-api/server.mjs` and API project base URL |
| `CI` | unset locally | Enables forbid-only, GitHub reporter, and one retry |

## CI Guidance

A minimal CI job should:

1. Check out the repository.
2. Set up Node.js.
3. Run `npm ci`.
4. Run `npx playwright install --with-deps`.
5. Run `npm test`.
6. Upload `playwright-report/` and `test-results/` only as artifacts, not committed files.

## Generated Artifacts

Do not commit:

- `playwright-report/`
- `test-results/`
- `playwright/.cache/`
- `node_modules/`

These paths are ignored by `.gitignore`.

Do commit approved visual baseline PNGs under `data/visual-baselines/`.

## Troubleshooting

| Symptom | Likely Cause | Action |
| --- | --- | --- |
| `listen EPERM 0.0.0.0:3100` | Sandbox blocks local server binding | Run outside restricted sandbox or use an approved test command |
| Port conflict on `3100` | Another process uses the mock API port | Set `MOCK_API_PORT` to another port |
| Browser executable missing | Playwright browsers not installed | Run `npx playwright install --with-deps` |
| UI tests fail but API tests pass | SauceDemo changed or unavailable | Re-run, inspect HTML report, update POM if markup changed |
| Visual tests fail with screenshot diffs | UI changed or baseline is stale | Review `test-results/`; update snapshots only for intentional changes |
