export const HTTP_STATUS = {
  ok: 200,
  created: 201,
  badRequest: 400,
  notFound: 404,
} as const

export const API_ENDPOINTS = {
  health: '/health',
  products: '/products',
  productCategories: '/products/categories',
  productById: (id: number) => `/products/${id}`,
  users: '/users',
  userById: (id: number) => `/users/${id}`,
  login: '/login',
  posts: '/posts',
  postById: (id: number) => `/posts/${id}`,
} as const

export const API_EXPECTED = {
  productCount: 20,
  postCount: 100,
  existingProductId: 1,
  missingProductId: 9999,
  createdProductId: 21,
  existingUserId: 2,
  missingUserId: 999,
  existingPostId: 1,
  missingPostId: 9999,
  category: 'electronics',
  userName: 'Bob',
} as const

export const API_PAYLOADS = {
  newProduct: { title: 'New', price: 9.99 },
  validLogin: { email: 'a@b.com', password: 'pw' },
  missingPasswordLogin: { email: 'a@b.com' },
  newPost: { title: 'New post', body: 'New post body', userId: 1 },
  updatedPost: { title: 'Updated' },
} as const
