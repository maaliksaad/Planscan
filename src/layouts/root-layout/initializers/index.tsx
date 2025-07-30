import NextTopLoader from 'nextjs-toploader'
import type { FC } from 'react'

export const RootLayoutInitializers: FC = () => {
  return (
    <>
      <NextTopLoader
        color="#2563eb"
        showSpinner={false}
        crawlSpeed={50}
        height={2}
      />
    </>
  )
}
