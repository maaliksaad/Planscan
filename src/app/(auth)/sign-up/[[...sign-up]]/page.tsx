import { SignUp } from '@clerk/nextjs'
import type { FC } from 'react'

import { ABSOLUTE_ROUTES } from '@/constants/routes'
import type { PropsWithSearchParams } from '@/types/next'

type PageProps = PropsWithSearchParams<{
  redirect_url?: string
}>

const Page: FC<PageProps> = async ({ searchParams }) => {
  const params = await searchParams
  const redirectUrl = params.redirect_url ?? ABSOLUTE_ROUTES.PROJECTS

  return (
    <SignUp
      path={ABSOLUTE_ROUTES.SIGN_UP}
      routing="path"
      forceRedirectUrl={redirectUrl}
      signInForceRedirectUrl={redirectUrl}
    />
  )
}

export default Page
