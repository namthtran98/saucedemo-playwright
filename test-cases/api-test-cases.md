# API Manual Test Cases

Automated source: `tests/api/api.spec.ts`

## Common Preconditions

- Start the mock API with Playwright or `npm run mock-api`.
- Use base URL `http://localhost:3100` unless `MOCK_API_PORT` overrides it.
- Use an API client such as curl, Postman, or Playwright request inspector.

| ID | Title | Request | Manual Steps | Expected Result |
| --- | --- | --- | --- | --- |
| API-001 | Products list returns OK and an array | `GET /products` | 1. Send GET request to `/products`.<br>2. Inspect status and body. | Status is `200`; response body is an array. |
| API-002 | Products list returns expected count | `GET /products` | 1. Send GET request to `/products`.<br>2. Count returned items. | Response contains 20 products. |
| API-003 | Known product returns expected id | `GET /products/1` | 1. Send GET request to `/products/1`.<br>2. Inspect `id`. | Response `id` is `1`. |
| API-004 | Known product has title and price | `GET /products/1` | 1. Send GET request to `/products/1`.<br>2. Inspect fields. | Response has `title`; `price` is a number. |
| API-005 | Missing product returns not found | `GET /products/9999` | 1. Send GET request to missing product id. | Status is `404`. |
| API-006 | Product categories include expected category | `GET /products/categories` | 1. Send GET request to `/products/categories`.<br>2. Inspect array. | Status is `200`; response includes `electronics`. |
| API-007 | Creating product returns created product data | `POST /products` with `{ "title": "New", "price": 9.99 }` | 1. Send POST request with payload.<br>2. Inspect response. | Status is `201`; response id is `21`; title is `New`. |
| API-008 | Users list returns OK and an array | `GET /users` | 1. Send GET request to `/users`.<br>2. Inspect status and body. | Status is `200`; response body is an array. |
| API-009 | Known user returns expected name | `GET /users/2` | 1. Send GET request to `/users/2`.<br>2. Inspect `name`. | Response name is `Bob`. |
| API-010 | Missing user returns not found | `GET /users/999` | 1. Send GET request to missing user id. | Status is `404`. |
| API-011 | Valid login returns a token | `POST /login` with `{ "email": "a@b.com", "password": "pw" }` | 1. Send login POST request with email and password.<br>2. Inspect response. | Status is `200`; response contains a truthy token. |
| API-012 | Login missing password returns bad request | `POST /login` with `{ "email": "a@b.com" }` | 1. Send login POST request without password. | Status is `400`. |
| API-013 | Posts list returns expected count | `GET /posts` | 1. Send GET request to `/posts`.<br>2. Count returned items. | Response contains 100 posts. |
| API-014 | Updating known post returns updated data | `PUT /posts/1` with `{ "title": "Updated" }` | 1. Send PUT request to `/posts/1`.<br>2. Inspect response title. | Status is `200`; response title is `Updated`. |
| API-015 | Deleting known post returns OK | `DELETE /posts/1` | 1. Send DELETE request to `/posts/1`. | Status is `200`. |
