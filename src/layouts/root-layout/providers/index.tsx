import { ClerkProvider } from '@clerk/nextjs'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import type { FC, PropsWithChildren } from 'react'

import { getUserAndOrganization } from '@/services/auth'
import { UserStoreProvider } from '@/stores/user-store'

import { ApolloProvider } from './apollo-provider'

export const RootLayoutProviders: FC<PropsWithChildren> = async ({
  children
}) => {
  const data = await getUserAndOrganization()

  return (
    <ClerkProvider>
      <NuqsAdapter>
        <UserStoreProvider
          initialState={{
            user: data?.user ?? null,
            organization: data?.organization ?? null
          }}
        >
          <ApolloProvider>{children}</ApolloProvider>
        </UserStoreProvider>
      </NuqsAdapter>
    </ClerkProvider>
  )
}
