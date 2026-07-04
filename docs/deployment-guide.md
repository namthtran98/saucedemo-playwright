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

3. Run UI and API tests:

   ```bash
   npm test
   ```

## Test Commands

| Command | Purpose |
| --- | --- |
| `npm test` | Run UI and API tests without requiring visual baselines |
| `npm run test:all` | Run UI, API, visual, and accessibility tests after visual baselines exist |
| `npm run test:ui` | Run only UI tests |
| `npm run test:api` | Run only API tests |
| `npm run test:visual` | Run only visual regression tests |
| `npm run test:accessibility` | Run only accessibility checks |
| `npm run generate:api-contract-types` | Regenerate API contract declarations from schemas |
| `npm run test:visual:update` | Update visual baselines on the current OS |
| `npm run test:visual:update:linux` | Update CI-compatible Linux visual baselines in Docker |
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
5. Restore or generate visual baselines.
6. Run `npm test`.
7. Run `npm run test:visual`.
8. Upload `playwright-report/`, `test-results/`, and baseline artifacts, not committed files.

Accessibility checks are available through `npm run test:accessibility` and
`npm run test:all`, but they are not part of the default CI gate yet.

## Generated Artifacts

Do not commit:

- `playwright-report/`
- `test-results/`
- `playwright/.cache/`
- `node_modules/`

These paths are ignored by `.gitignore`.

Do not commit visual baseline PNGs under `data/visual-baselines/`; that path is
ignored by git. CI restores baselines from the latest successful `main` workflow
artifact named `visual-baselines`. If no artifact exists, CI generates missing
baselines for that run and uploads them as a new artifact.

For intentional visual changes, manually run the `Playwright Tests` workflow and
set `visual_baseline_update` to `changed` or `all`. That controlled path updates
the artifact without committing PNGs to the repository.

Because CI runs on Linux, local baseline review should use:

```bash
npm run test:visual:update:linux
```

Do not use macOS-generated baseline updates for CI approval.

## Troubleshooting

| Symptom | Likely Cause | Action |
| --- | --- | --- |
| `listen EPERM 0.0.0.0:3100` | Sandbox blocks local server binding | Run outside restricted sandbox or use an approved test command |
| Port conflict on `3100` | Another process uses the mock API port | Set `MOCK_API_PORT` to another port |
| Browser executable missing | Playwright browsers not installed | Run `npx playwright install --with-deps` |
| UI tests fail but API tests pass | SauceDemo changed or unavailable | Re-run, inspect HTML report, update POM if markup changed |
| Visual tests fail with screenshot diffs | UI changed or baseline is stale | Review `test-results/`; update snapshots only for intentional changes |
