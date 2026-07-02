// course-assets/playwright-project-pack/data/users.ts
export const USERS = {
  standard: 'standard_user',
  lockedOut: 'locked_out_user',
  problem: 'problem_user',
  glitch: 'performance_glitch_user',
  error: 'error_user',
  visual: 'visual_user',
} as const

export const PASSWORD = 'secret_sauce'
export const INVALID_PASSWORD = 'wrong_password'
export const UNKNOWN_USER = 'no_such_user'
export const EMPTY_CREDENTIAL = ''
