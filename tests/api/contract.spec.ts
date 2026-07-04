import { test } from '@playwright/test'
import { API_ENDPOINTS, API_EXPECTED, API_PAYLOADS, HTTP_STATUS } from '../../data/api-test-data'
import { apiContractValidators, expectResponseContract } from '../../test-helpers/api-contract-validators'

test.describe('API contracts', () => {
  test('GET /health returns health status contract', async ({ request }) => {
    const response = await request.get(API_ENDPOINTS.health)

    await expectResponseContract(response, HTTP_STATUS.ok, apiContractValidators.health)
  })

  test('GET /products returns product list contract', async ({ request }) => {
    const response = await request.get(API_ENDPOINTS.products)

    await expectResponseContract(response, HTTP_STATUS.ok, apiContractValidators.productList)
  })

  test('GET /products/categories returns category list contract', async ({ request }) => {
    const response = await request.get(API_ENDPOINTS.productCategories)

    await expectResponseContract(response, HTTP_STATUS.ok, apiContractValidators.categories)
  })

  test('POST /products returns created product contract', async ({ request }) => {
    const response = await request.post(API_ENDPOINTS.products, {
      data: API_PAYLOADS.newProduct,
    })

    await expectResponseContract(response, HTTP_STATUS.created, apiContractValidators.createdProduct)
  })

  test('GET /products/:id returns product contract', async ({ request }) => {
    const response = await request.get(API_ENDPOINTS.productById(API_EXPECTED.existingProductId))

    await expectResponseContract(response, HTTP_STATUS.ok, apiContractValidators.product)
  })

  test('GET /products/:id returns error contract for missing product', async ({ request }) => {
    const response = await request.get(API_ENDPOINTS.productById(API_EXPECTED.missingProductId))

    await expectResponseContract(response, HTTP_STATUS.notFound, apiContractValidators.error)
  })

  test('GET /users returns user list contract', async ({ request }) => {
    const response = await request.get(API_ENDPOINTS.users)

    await expectResponseContract(response, HTTP_STATUS.ok, apiContractValidators.userList)
  })

  test('GET /users/:id returns user contract', async ({ request }) => {
    const response = await request.get(API_ENDPOINTS.userById(API_EXPECTED.existingUserId))

    await expectResponseContract(response, HTTP_STATUS.ok, apiContractValidators.user)
  })

  test('GET /users/:id returns error contract for missing user', async ({ request }) => {
    const response = await request.get(API_ENDPOINTS.userById(API_EXPECTED.missingUserId))

    await expectResponseContract(response, HTTP_STATUS.notFound, apiContractValidators.error)
  })

  test('POST /login returns token contract for valid credentials', async ({ request }) => {
    const response = await request.post(API_ENDPOINTS.login, {
      data: API_PAYLOADS.validLogin,
    })

    await expectResponseContract(response, HTTP_STATUS.ok, apiContractValidators.token)
  })

  test('POST /login returns error contract for missing credentials', async ({ request }) => {
    const response = await request.post(API_ENDPOINTS.login, {
      data: API_PAYLOADS.missingPasswordLogin,
    })

    await expectResponseContract(response, HTTP_STATUS.badRequest, apiContractValidators.error)
  })

  test('GET /posts returns post list contract', async ({ request }) => {
    const response = await request.get(API_ENDPOINTS.posts)

    await expectResponseContract(response, HTTP_STATUS.ok, apiContractValidators.postList)
  })

  test('POST /posts returns created post contract', async ({ request }) => {
    const response = await request.post(API_ENDPOINTS.posts, {
      data: API_PAYLOADS.newPost,
    })

    await expectResponseContract(response, HTTP_STATUS.created, apiContractValidators.post)
  })

  test('GET /posts/:id returns post contract', async ({ request }) => {
    const response = await request.get(API_ENDPOINTS.postById(API_EXPECTED.existingPostId))

    await expectResponseContract(response, HTTP_STATUS.ok, apiContractValidators.post)
  })

  test('PUT /posts/:id returns updated post contract', async ({ request }) => {
    const response = await request.put(API_ENDPOINTS.postById(API_EXPECTED.existingPostId), {
      data: API_PAYLOADS.updatedPost,
    })

    await expectResponseContract(response, HTTP_STATUS.ok, apiContractValidators.updatedPost)
  })

  test('DELETE /posts/:id returns empty object contract', async ({ request }) => {
    const response = await request.delete(API_ENDPOINTS.postById(API_EXPECTED.existingPostId))

    await expectResponseContract(response, HTTP_STATUS.ok, apiContractValidators.emptyObject)
  })

  test('GET /posts/:id returns error contract for missing post', async ({ request }) => {
    const response = await request.get(API_ENDPOINTS.postById(API_EXPECTED.missingPostId))

    await expectResponseContract(response, HTTP_STATUS.notFound, apiContractValidators.error)
  })
})
