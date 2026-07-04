# Login Manual Test Cases

Automated source: `tests/ui/login.spec.ts`

## Common Preconditions

- Open `https://www.saucedemo.com`.
- Unless stated otherwise, use password `secret_sauce`.

| ID | Title | Test Data | Manual Steps | Expected Result |
| --- | --- | --- | --- | --- |
| LGN-001 | Login form is visible | None | 1. Open SauceDemo login page. | Username field, password field, and login button are visible. |
| LGN-002 | `standard_user` logs in successfully | Username: `standard_user` | 1. Enter username.<br>2. Enter password.<br>3. Click Login. | Inventory page loads and shows Products. |
| LGN-003 | `problem_user` logs in successfully | Username: `problem_user` | 1. Enter username.<br>2. Enter password.<br>3. Click Login. | Inventory page loads and shows Products. |
| LGN-004 | `performance_glitch_user` logs in successfully | Username: `performance_glitch_user` | 1. Enter username.<br>2. Enter password.<br>3. Click Login. | Inventory page loads and shows Products. |
| LGN-005 | `error_user` logs in successfully | Username: `error_user` | 1. Enter username.<br>2. Enter password.<br>3. Click Login. | Inventory page loads and shows Products. |
| LGN-006 | `visual_user` logs in successfully | Username: `visual_user` | 1. Enter username.<br>2. Enter password.<br>3. Click Login. | Inventory page loads and shows Products. |
| LGN-007 | Locked out user is rejected | Username: `locked_out_user` | 1. Enter username.<br>2. Enter password.<br>3. Click Login. | Error message shows: `Epic sadface: Sorry, this user has been locked out.` |
| LGN-008 | Wrong password is rejected | Username: `standard_user`<br>Password: `wrong_password` | 1. Enter username.<br>2. Enter wrong password.<br>3. Click Login. | Error message shows: `Epic sadface: Username and password do not match any user in this service`. |
| LGN-009 | Unknown user is rejected | Username: `no_such_user` | 1. Enter unknown username.<br>2. Enter password.<br>3. Click Login. | Error message shows: `Epic sadface: Username and password do not match any user in this service`. |
| LGN-010 | Empty username shows required error | Username: empty<br>Password: `secret_sauce` | 1. Leave username empty.<br>2. Enter password.<br>3. Click Login. | Error message shows: `Epic sadface: Username is required`. |
| LGN-011 | Empty password shows required error | Username: `standard_user`<br>Password: empty | 1. Enter username.<br>2. Leave password empty.<br>3. Click Login. | Error message shows: `Epic sadface: Password is required`. |
| LGN-012 | Empty form shows username required error | Username: empty<br>Password: empty | 1. Leave both fields empty.<br>2. Click Login. | Error message shows: `Epic sadface: Username is required`. |
| LGN-013 | Error message can be dismissed | Username: `locked_out_user` | 1. Trigger locked-out login error.<br>2. Click the error close button. | Error message disappears. |
