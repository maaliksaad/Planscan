import Cookies from 'js-cookie'

import { COOKIE_KEYS } from '@/constants/cookie-keys'

/**
 * Get the authorization header
 *
 * @param token
 *
 * @returns {Authorization: string} - The authorization header
 */
export const getAuthHeader = (token?: string): { Authorization: string } => {
  if (token == null) {
    token = getTokenFromCookies()
  }

  return {
    Authorization: `Bearer ${token}`
  }
}

/**
 * Retrieves the token from the provided cookies.
 *
 * @returns The token if it exists in the cookies, otherwise an empty string.
 */
const getTokenFromCookies = (): string => {
  const token = Cookies.get(COOKIE_KEYS.TOKEN)

  if (token == null) {
    return ''
  }

  return token
}
