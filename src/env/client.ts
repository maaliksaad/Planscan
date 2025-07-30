import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const clientEnv = createEnv({
  client: {
    NEXT_PUBLIC_IS_DEBUG: z.boolean(),
    NEXT_PUBLIC_PLANSCAN_API_URL: z.string(),
    NEXT_PUBLIC_PLANSCAN_GRAPHQL_URL: z.string(),
    NEXT_PUBLIC_PLANSCAN_WS_URL: z.string(),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string(),
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string()
  },
  runtimeEnv: {
    NEXT_PUBLIC_IS_DEBUG: process.env.NODE_ENV !== 'production',
    NEXT_PUBLIC_PLANSCAN_API_URL: process.env.NEXT_PUBLIC_PLANSCAN_API_URL,
    NEXT_PUBLIC_PLANSCAN_GRAPHQL_URL:
      process.env.NEXT_PUBLIC_PLANSCAN_GRAPHQL_URL,
    NEXT_PUBLIC_PLANSCAN_WS_URL: process.env.NEXT_PUBLIC_PLANSCAN_WS_URL,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL
  }
})
