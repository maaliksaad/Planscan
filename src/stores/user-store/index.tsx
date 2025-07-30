'use client'

import {
  createContext,
  type FC,
  type PropsWithChildren,
  useContext,
  useState
} from 'react'
import { create } from 'zustand'
import { syncTabs } from 'zustand-sync-tabs'

import type {
  UserAction,
  UserState,
  UseUserStoreContextReturn
} from './user-store.types'

const createStore = (initialState: UserState): UseUserStoreContextReturn =>
  create<UserState & UserAction>()(
    syncTabs(
      set => ({
        ...initialState,
        loginUser: (user, organization) => {
          set(() => ({
            user,
            organization
          }))
        },

        logoutUser: () => {
          set(() => ({ user: null, subscription: null }))
        }
      }),
      {
        name: 'user-store'
      }
    )
  )

const UserStoreContext = createContext<ReturnType<typeof createStore> | null>(
  null
)

export const useUserStore = (): UseUserStoreContextReturn => {
  const context = useContext(UserStoreContext)

  if (context == null)
    throw new Error('useUser must be used within a UserStoreContext')

  return context
}

export const UserStoreProvider: FC<
  PropsWithChildren & { initialState: UserState }
> = ({ initialState, children }) => {
  const [store] = useState(() => createStore(initialState))
  return (
    <UserStoreContext.Provider value={store}>
      {children}
    </UserStoreContext.Provider>
  )
}
