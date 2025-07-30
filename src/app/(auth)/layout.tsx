import type { Metadata } from 'next'
import type { FC, PropsWithChildren } from 'react'

import { AuthLayout } from '@/layouts/auth-layout'

export const metadata: Metadata = {
  title: 'Planscan',
  description: 'Planscan'
}

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return <AuthLayout>{children}</AuthLayout>
}

export default Layout
