import { createRouteMatcher } from '@clerk/nextjs/server'
import dayjs from 'dayjs'
import Cookies from 'js-cookie'
import type { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies'
import { type NextRequest, NextResponse } from 'next/server'

import { COOKIE_KEYS } from '@/constants/cookie-keys'
import { ABSOLUTE_ROUTES, PUBLIC_ROUTES_SET } from '@/constants/routes'
import { AUTH_SEARCH_PARAM_KEYS } from '@/constants/search-params'

/**
 * Check if the route is a public route
 *
 * @param route - The route to check
 *
 * @returns {boolean} - Whether the route is public or not
 */
const isPublicRoute = createRouteMatcher([...PUBLIC_ROUTES_SET])

/**
 * Redirect the user to the sign-in page
 *
 * @param request
 *
 * @returns {NextResponse} - The response to send
 */
export const logoutUser = (request: NextRequest): NextResponse => {
  if (isPublicRoute(request)) {
    return NextResponse.next()
  }

  request.cookies.clear()

  request.cookies.delete(COOKIE_KEYS.TOKEN)
  Cookies.remove(COOKIE_KEYS.TOKEN)

  const requestUrl = new URL(request.nextUrl)

  const authUrl = new URL(ABSOLUTE_ROUTES.SIGN_IN, requestUrl.origin)
  authUrl.searchParams.set(AUTH_SEARCH_PARAM_KEYS.REDIRECT_URL, requestUrl.href)

  return NextResponse.redirect(authUrl)
}

/**
 * Saves the authentication token in cookies.
 *
 * @param token - The authentication token to be saved.
 * @param cookies - An optional object with a `set` method to set the cookie. If not provided, a default `Cookies` object is used.
 */
export const saveAuthTokenInCookies = (
  token: string,
  cookies?: Pick<ResponseCookies, 'set'>
): void => {
  const expires = dayjs().add(7, 'days').toDate()

  if (cookies == null) {
    Cookies.set(COOKIE_KEYS.TOKEN, token, { expires })
  } else {
    cookies.set(COOKIE_KEYS.TOKEN, token, { expires })
  }
}
