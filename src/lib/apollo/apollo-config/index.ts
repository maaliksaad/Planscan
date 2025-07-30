import { HttpLink, split } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import {
  ApolloClient,
  InMemoryCache
} from '@apollo/experimental-nextjs-app-support'
import { Kind, OperationTypeNode } from 'graphql/language'
import { createClient } from 'graphql-ws'

import { clientEnv } from '@/env/client'
import { getAuthHeader } from '@/utils/headers'

/**
 * Creates and configures an Apollo Client instance.
 *
 * @returns An instance of ApolloClient
 */
export function makeClient(): ApolloClient<unknown> {
  const httpLink = new HttpLink({
    uri: clientEnv.NEXT_PUBLIC_PLANSCAN_GRAPHQL_URL,
    fetchOptions: { cache: 'no-store' }
  })

  const wsLink = new GraphQLWsLink(
    createClient({
      url: clientEnv.NEXT_PUBLIC_PLANSCAN_WS_URL,
      connectionParams: getAuthHeader(),
      shouldRetry: () => true
    })
  )

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === Kind.OPERATION_DEFINITION &&
        definition.operation === OperationTypeNode.SUBSCRIPTION
      )
    },
    wsLink,
    httpLink
  )

  return new ApolloClient({
    cache: new InMemoryCache(),
    link
  })
}
