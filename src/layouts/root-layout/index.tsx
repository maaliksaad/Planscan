import type { FC, PropsWithChildren } from 'react'

import { Toaster } from '@/components/ui/toaster'

import { RootLayoutInitializers } from './initializers'
import { RootLayoutProviders } from './providers'

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body className="antialiased">
        <RootLayoutInitializers />

        <RootLayoutProviders>
          <main>{children}</main>
          <Toaster />
        </RootLayoutProviders>
      </body>
    </html>
  )
}

export default RootLayout
