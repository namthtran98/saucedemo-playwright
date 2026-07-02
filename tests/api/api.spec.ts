import { test, expect } from '@playwright/test'
import { API_ENDPOINTS, API_EXPECTED, API_PAYLOADS, HTTP_STATUS } from '../../data/api-test-data'

test.describe('API', () => {
  test('products list returns ok and an array', async ({ request }) => {
    const res = await request.get(API_ENDPOINTS.products)
    expect(res.status()).toBe(HTTP_STATUS.ok)
    expect(Array.isArray(await res.json())).toBe(true)
  })

  test('products list returns the expected count', async ({ request }) => {
    const products = await (await request.get(API_ENDPOINTS.products)).json()
    expect(products).toHaveLength(API_EXPECTED.productCount)
  })

  test('known product returns its expected id', async ({ request }) => {
    const product = await (
      await request.get(API_ENDPOINTS.productById(API_EXPECTED.existingProductId))
    ).json()
    expect(product.id).toBe(API_EXPECTED.existingProductId)
  })

  test('known product has title and price', async ({ request }) => {
    const product = await (
      await request.get(API_ENDPOINTS.productById(API_EXPECTED.existingProductId))
    ).json()
    expect(product).toHaveProperty('title')
    expect(typeof product.price).toBe('number')
  })

  test('missing product returns not found', async ({ request }) => {
    const res = await request.get(API_ENDPOINTS.productById(API_EXPECTED.missingProductId))
    expect(res.status()).toBe(HTTP_STATUS.notFound)
  })

  test('product categories include the expected category', async ({ request }) => {
    const res = await request.get(API_ENDPOINTS.productCategories)
    expect(res.status()).toBe(HTTP_STATUS.ok)
    expect(await res.json()).toContain(API_EXPECTED.category)
  })

  test('creating a product returns created product data', async ({ request }) => {
    const res = await request.post(API_ENDPOINTS.products, { data: API_PAYLOADS.newProduct })
    expect(res.status()).toBe(HTTP_STATUS.created)
    const body = await res.json()
    expect(body.id).toBe(API_EXPECTED.createdProductId)
    expect(body.title).toBe(API_PAYLOADS.newProduct.title)
  })

  test('users list returns ok and an array', async ({ request }) => {
    const res = await request.get(API_ENDPOINTS.users)
    expect(res.status()).toBe(HTTP_STATUS.ok)
    expect(Array.isArray(await res.json())).toBe(true)
  })

  test('known user returns expected name', async ({ request }) => {
    const user = await (await request.get(API_ENDPOINTS.userById(API_EXPECTED.existingUserId))).json()
    expect(user.name).toBe(API_EXPECTED.userName)
  })

  test('missing user returns not found', async ({ request }) => {
    const res = await request.get(API_ENDPOINTS.userById(API_EXPECTED.missingUserId))
    expect(res.status()).toBe(HTTP_STATUS.notFound)
  })

  test('valid login returns a token', async ({ request }) => {
    const res = await request.post(API_ENDPOINTS.login, { data: API_PAYLOADS.validLogin })
    expect(res.status()).toBe(HTTP_STATUS.ok)
    expect((await res.json()).token).toBeTruthy()
  })

  test('login missing password returns bad request', async ({ request }) => {
    const res = await request.post(API_ENDPOINTS.login, { data: API_PAYLOADS.missingPasswordLogin })
    expect(res.status()).toBe(HTTP_STATUS.badRequest)
  })

  test('posts list returns the expected count', async ({ request }) => {
    const posts = await (await request.get(API_ENDPOINTS.posts)).json()
    expect(posts).toHaveLength(API_EXPECTED.postCount)
  })

  test('updating a known post returns updated data', async ({ request }) => {
    const res = await request.put(API_ENDPOINTS.postById(API_EXPECTED.existingPostId), {
      data: API_PAYLOADS.updatedPost,
    })
    expect(res.status()).toBe(HTTP_STATUS.ok)
    expect((await res.json()).title).toBe(API_PAYLOADS.updatedPost.title)
  })

  test('deleting a known post returns ok', async ({ request }) => {
    const res = await request.delete(API_ENDPOINTS.postById(API_EXPECTED.existingPostId))
    expect(res.status()).toBe(HTTP_STATUS.ok)
  })
})
