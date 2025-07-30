'use client'

import {
  createContext,
  type FC,
  type PropsWithChildren,
  useContext,
  useState
} from 'react'
import { create } from 'zustand'

import type {
  ProjectAction,
  ProjectState,
  UseProjectStoreContextReturn
} from './project-store.types'

const createStore = (
  initialState: ProjectState
): UseProjectStoreContextReturn =>
  create<ProjectState & ProjectAction>()(set => ({
    ...initialState,
    setProject: project => {
      set({ project })
    },
    setPages: pages => {
      set({ pages })
    },
    setTradePackages: trade_packages => {
      set({ trade_packages })
    },
    setCSICodes: csi_codes => {
      set({ csi_codes })
    }
  }))

const ProjectStoreContext = createContext<ReturnType<
  typeof createStore
> | null>(null)

export const useProjectStore = (): UseProjectStoreContextReturn => {
  const context = useContext(ProjectStoreContext)

  if (context == null)
    throw new Error('useProjectStore must be used within a ProjectStoreContext')

  return context
}

export const ProjectStoreProvider: FC<
  PropsWithChildren & { state: ProjectState }
> = ({ state, children }) => {
  const [store] = useState(() => createStore(state))

  return (
    <ProjectStoreContext.Provider value={store}>
      {children}
    </ProjectStoreContext.Provider>
  )
}
