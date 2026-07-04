# Project Roadmap

## Current State

The framework is usable and validated with 105 tests:

- 88 UI tests across login, products, cart, and checkout.
- 15 API tests against the bundled mock API.
- 2 visual regression tests for login and inventory UI snapshots.
- POM structure is in place.
- Shared data modules cover UI and API constants.
- Visual baselines are configured under ignored `data/visual-baselines/` and stored through CI artifacts.
- `AGENTS.md` documents repo conventions.

## Near-Term Priorities

| Priority | Status | Work |
| --- | --- | --- |
| P0 | Complete | Keep UI locators in POM and business assertions in specs |
| P0 | Complete | Centralize reusable UI/API test data under `data/` |
| P0 | Complete | Add project documentation under `docs/` |
| P1 | In Progress | Expand visual regression coverage for checkout and cart flows |
| P1 | Planned | Add a lightweight typecheck script such as `npm run typecheck` |
| P1 | Planned | Add lint or format tooling if the repo needs stricter style enforcement |
| P1 | Planned | Add CI workflow to run `npm test` on pull requests |
| P2 | Planned | Add API negative cases for malformed JSON and unsupported methods |
| P2 | Planned | Add README troubleshooting for browser install and port conflicts |

## Maintenance Principles

- Prefer small, focused specs by domain.
- Keep POM classes focused on page interaction.
- Keep new constants in `data/`.
- Keep visual baseline PNGs out of git; use CI artifacts or local ignored files.
- Run the narrowest relevant suite during iteration, then `npm test` before pushing.
- Update docs when framework structure, commands, or conventions change.

## Risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| SauceDemo changes markup or behavior | UI tests fail | Prefer stable `data-test` locators and update POM centrally |
| Local port `3100` is unavailable | API and UI webServer startup fail | Set `MOCK_API_PORT` to another value |
| Business assertions drift into POM | Tests become harder to review | Keep assertion boundary documented and enforced in reviews |
| Shared data becomes stale | Tests assert obsolete values | Update `data/` with the related spec change |
| Visual baselines become stale | Visual tests fail on intentional UI changes | Review diffs and update snapshots only after approval |

## Definition Of Done For Framework Changes

- Relevant tests pass.
- TypeScript compiles when code shape changes.
- No raw UI locator construction is added to UI specs.
- Visual baseline PNGs are not committed.
- Docs are updated for any new structure, command, or convention.
