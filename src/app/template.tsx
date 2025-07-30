import './globals.css'

import type { FC, PropsWithChildren } from 'react'

import RootLayout from '@/layouts/root-layout'

const Template: FC<PropsWithChildren> = ({ children }) => {
  return <RootLayout>{children}</RootLayout>
}

export default Template
