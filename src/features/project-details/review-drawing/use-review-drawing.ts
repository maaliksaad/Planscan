'use client'

import { type Dispatch, type SetStateAction, useMemo, useState } from 'react'

import { useSyncedState } from '@/hooks/use-synced-state'
import type { Page } from '@/lib/graphql'
import { useProjectStore } from '@/stores/project-store'

import {
  type DrawingDiscipline,
  ReviewDrawingTab
} from './review-drawing.types'
import { getDrawingDisciplines } from './review-drawing.utils'

interface UseReviewDrawingReturn {
  pages: Page[]
  setPages: Dispatch<SetStateAction<Page[]>>
  currentTab: ReviewDrawingTab
  setCurrentTab: (tab: ReviewDrawingTab) => void
  disciplines: DrawingDiscipline[]
  setDisciplines: Dispatch<SetStateAction<DrawingDiscipline[]>>
}

export const useReviewDrawing = (): UseReviewDrawingReturn => {
  const [currentTab, setCurrentTab] = useState(ReviewDrawingTab.DISCIPLINES_TAB)

  const { pages: initialPages, project } = useProjectStore()(state => state)

  const [pages, setPages] = useSyncedState(initialPages, {
    key: `review-drawing-pages-${project.project_id}`
  })

  const initialDisciplines = useMemo(
    () => getDrawingDisciplines(pages),
    [pages]
  )

  const [disciplines, setDisciplines] = useSyncedState(initialDisciplines, {
    key: `review-drawing-disciplines-${project.project_id}`
  })

  return {
    pages,
    setPages,
    currentTab,
    setCurrentTab,
    disciplines,
    setDisciplines
  }
}
