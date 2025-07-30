import type { Metadata } from 'next'
import type { FC, PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: 'Planscan',
  description: 'Planscan'
}

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return <>{children}</>
}

export default Layout
