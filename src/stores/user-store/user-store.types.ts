import type { StoreApi, UseBoundStore } from 'zustand'

import type { Organization, User } from '@/lib/graphql/generated'

export interface UserState {
  user: User | null
  organization: Organization | null
}

export interface UserAction {
  logoutUser: () => void
  loginUser: (user: User, organization: Organization) => void
}

export type UseUserStoreContextReturn = UseBoundStore<
  StoreApi<UserState & UserAction>
>
