import type { StoreApi, UseBoundStore } from 'zustand'

import type {
  CsiCode,
  Page,
  Project,
  TradePackage
} from '@/lib/graphql/generated'

export interface ProjectState {
  project: Project
  pages: Page[]
  trade_packages: TradePackage[]
  csi_codes: CsiCode[]
}

export interface ProjectAction {
  setProject: (project: Project) => void
  setPages: (pages: Page[]) => void
  setTradePackages: (trade_packages: TradePackage[]) => void
  setCSICodes: (csi_codes: CsiCode[]) => void
}

export type UseProjectStoreContextReturn = UseBoundStore<
  StoreApi<ProjectState & ProjectAction>
>
