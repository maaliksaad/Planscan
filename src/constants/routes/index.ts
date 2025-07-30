const ROOT = '/'

// auth
const SIGN_IN = 'sign-in'
const SIGN_UP = 'sign-up'

// projects
const PROJECTS = 'projects'
const DRAWINGS = 'drawings'
const UPLOAD = 'upload'
const REVIEW = 'review'

export const ABSOLUTE_ROUTES = {
  HOME: ROOT,

  // auth
  SIGN_IN: `${ROOT}${SIGN_IN}`,
  SIGN_UP: `${ROOT}${SIGN_UP}`,

  // projects
  PROJECTS: `${ROOT}${PROJECTS}`,
  getProjectPath: (id: string) => `${ROOT}${PROJECTS}/${id}`,
  getUploadDrawingsPath: (id: string) =>
    `${ROOT}${PROJECTS}/${id}/${DRAWINGS}/${UPLOAD}`,
  getReviewDrawingsPath: (id: string) =>
    `${ROOT}${PROJECTS}/${id}/${DRAWINGS}/${REVIEW}`
} as const

export const PUBLIC_ROUTES_SET = new Set([
  ABSOLUTE_ROUTES.HOME,
  `${ABSOLUTE_ROUTES.SIGN_IN}(.*)`,
  `${ABSOLUTE_ROUTES.SIGN_UP}(.*)`
])
