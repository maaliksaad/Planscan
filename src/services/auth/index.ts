import combinedQuery from 'graphql-combine-query'
import { cookies } from 'next/headers'

import { COOKIE_KEYS } from '@/constants/cookie-keys'
import { getClient } from '@/lib/apollo/apollo-rsc'
import type {
  GetOrganizationQuery,
  GetUserQuery,
  Organization,
  RefreshTokenMutation,
  User
} from '@/lib/graphql'
import { REFRESH_TOKEN_MUTATION } from '@/lib/graphql/queries/auth'
import { GET_ORGANIZATION_QUERY } from '@/lib/graphql/queries/organization'
import { GET_USER_QUERY } from '@/lib/graphql/queries/user'
import { getAuthHeader } from '@/utils/headers'

export const getUserAndOrganization = async (
  token?: string | null
): Promise<{
  user: User
  organization: Organization
} | null> => {
  const cookieStore = await cookies()

  if (token == null) {
    token = cookieStore.get(COOKIE_KEYS.TOKEN)?.value
  }

  const { document } = combinedQuery('UserAndOrganization')
    .add(GET_USER_QUERY)
    .add(GET_ORGANIZATION_QUERY)

  const { data, errors } = await getClient().query<
    Partial<GetUserQuery> & Partial<GetOrganizationQuery>
  >({
    query: document,
    context: {
      headers: getAuthHeader(token ?? '')
    },
    fetchPolicy: 'no-cache',
    errorPolicy: 'all'
  })

  if (errors != null) {
    return null
  }

  if (data.user == null || data.organization == null) {
    return null
  }

  return {
    user: data.user,
    organization: data.organization
  }
}

export const refreshToken = async (
  token: string | null
): Promise<string | null> => {
  const { data, errors } = await getClient().query<
    Partial<RefreshTokenMutation>
  >({
    query: REFRESH_TOKEN_MUTATION,
    context: {
      headers: getAuthHeader(token ?? '')
    },
    fetchPolicy: 'no-cache',
    errorPolicy: 'all'
  })

  if (errors != null) {
    return null
  }

  if (data.refresh_token == null) {
    return null
  }

  return data.refresh_token.token
}
