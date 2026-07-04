import { expect, type APIResponse } from '@playwright/test'
import Ajv, { type ValidateFunction } from 'ajv'
import apiContractSchemas from '../data/api-contract-schemas.json'
import type {
  ApiError,
  Categories,
  CreatedProduct,
  EmptyObject,
  Health,
  Post,
  PostList,
  Product,
  ProductList,
  Token,
  UpdatedPost,
  User,
  UserList,
} from '../data/api-contract-types'

const ajv = new Ajv()

export const apiContractValidators = {
  health: ajv.compile<Health>(apiContractSchemas.health),
  product: ajv.compile<Product>(apiContractSchemas.product),
  createdProduct: ajv.compile<CreatedProduct>(apiContractSchemas.createdProduct),
  productList: ajv.compile<ProductList>(apiContractSchemas.productList),
  categories: ajv.compile<Categories>(apiContractSchemas.categories),
  user: ajv.compile<User>(apiContractSchemas.user),
  userList: ajv.compile<UserList>(apiContractSchemas.userList),
  token: ajv.compile<Token>(apiContractSchemas.token),
  post: ajv.compile<Post>(apiContractSchemas.post),
  postList: ajv.compile<PostList>(apiContractSchemas.postList),
  updatedPost: ajv.compile<UpdatedPost>(apiContractSchemas.updatedPost),
  emptyObject: ajv.compile<EmptyObject>(apiContractSchemas.emptyObject),
  error: ajv.compile<ApiError>(apiContractSchemas.error),
}

export async function expectResponseContract<T>(
  response: APIResponse,
  expectedStatus: number,
  validator: ValidateFunction<T>,
): Promise<T> {
  expect(response.status()).toBe(expectedStatus)

  const body = await response.json()
  const valid = validator(body)
  expect(valid, JSON.stringify(validator.errors)).toBe(true)

  return body
}
