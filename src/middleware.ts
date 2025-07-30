import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

import { clientEnv } from '@/env/client'
import { serverEnv } from '@/env/server'
import { getUserAndOrganization, refreshToken } from '@/services/auth'
import { logoutUser, saveAuthTokenInCookies } from '@/utils/auth'

/**
 * Middleware to protect routes that require authentication.
 */
const middleware = clerkMiddleware(
  async (auth, req) => {
    const { getToken } = await auth()

    const token = await getToken()

    if (token == null) {
      return logoutUser(req)
    }

    const newToken = await refreshToken(token)

    if (newToken == null) {
      return logoutUser(req)
    }

    saveAuthTokenInCookies(newToken)

    const data = await getUserAndOrganization(newToken)

    if (data == null) {
      return logoutUser(req)
    }

    const requestHeaders = new Headers(req.headers)

    const response = NextResponse.next({ headers: requestHeaders })

    saveAuthTokenInCookies(newToken, response.cookies)

    return response
  },
  {
    publishableKey: clientEnv.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    secretKey: serverEnv.CLERK_SECRET_KEY,
    signInUrl: clientEnv.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    signUpUrl: clientEnv.NEXT_PUBLIC_CLERK_SIGN_UP_URL
  }
)

export default middleware

/**
 * Configuration for the middleware.
 */
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    // eslint-disable-next-line unicorn/prefer-string-raw
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api)(.*)'
  ]
}
