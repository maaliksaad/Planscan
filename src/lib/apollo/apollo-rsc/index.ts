import { registerApolloClient } from '@apollo/experimental-nextjs-app-support'

import { makeClient } from '@/lib/apollo/apollo-config'

export const { getClient } = registerApolloClient(() => makeClient())
