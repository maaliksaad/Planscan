'use client'

import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev'
import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support'
import type { FC, PropsWithChildren } from 'react'

import { clientEnv } from '@/env/client'
import { makeClient } from '@/lib/apollo/apollo-config'

export const ApolloProvider: FC<PropsWithChildren> = ({ children }) => {
  if (clientEnv.NEXT_PUBLIC_IS_DEBUG) {
    loadDevMessages()
    loadErrorMessages()
  }

  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
