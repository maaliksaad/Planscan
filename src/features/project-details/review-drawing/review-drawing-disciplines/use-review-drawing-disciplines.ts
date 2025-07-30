'use client'

import type { Dispatch, SetStateAction } from 'react'

import { DRAWING_DISCIPLINES_TYPE_MAP } from '@/constants/drawings'
import {
  type DrawingDiscipline,
  ReviewDrawingTab
} from '@/features/project-details/review-drawing/review-drawing.types'
import { useToast } from '@/hooks/use-toast'
import type { Page, Project } from '@/lib/graphql'
import { useProjectStore } from '@/stores/project-store'
import { extractDrawingPrefix } from '@/utils/drawings'
import { generateId } from '@/utils/generate-id'

interface UseReviewDrawingDisciplinesParams {
  disciplines: DrawingDiscipline[]
  setDisciplines: Dispatch<SetStateAction<DrawingDiscipline[]>>
  setCurrentTab: (tab: ReviewDrawingTab) => void
  pages: Page[]
  setPages: Dispatch<SetStateAction<Page[]>>
}

interface UseReviewDrawingDisciplinesReturn {
  project: Project
  handleCodeChange: (id: string, value: string) => void
  handleDisciplineChange: (id: string, value: string) => void
  addDrawingDiscipline: () => void
  handleConfirmDisciplines: () => void
  removeDrawingDiscipline: (id: string) => void
}

export const useReviewDrawingDisciplines = ({
  disciplines,
  setDisciplines,
  setCurrentTab,
  pages,
  setPages
}: UseReviewDrawingDisciplinesParams): UseReviewDrawingDisciplinesReturn => {
  const { project } = useProjectStore()(state => state)

  const { toast } = useToast()

  const handleCodeChange = (id: string, value: string): void => {
    const discipline = disciplines.find(d => d.id === id)

    if (discipline == null) {
      return
    }

    setDisciplines(prev =>
      prev.map(d => {
        if (d.id === id) {
          return {
            ...d,
            code: value,
            discipline: DRAWING_DISCIPLINES_TYPE_MAP[value] ?? ''
          }
        }

        return d
      })
    )
  }

  const handleDisciplineChange = (id: string, value: string): void => {
    const discipline = disciplines.find(d => d.id === id)

    if (discipline == null) {
      return
    }

    setDisciplines(prev =>
      prev.map(d => {
        if (d.id === id) {
          return {
            ...d,
            discipline: value
          }
        }

        return d
      })
    )
  }

  const addDrawingDiscipline = (): void => {
    setDisciplines(prev => [
      ...prev,
      {
        id: generateId(),
        code: '',
        discipline: ''
      }
    ])
  }

  const removeDrawingDiscipline = (id: string): void => {
    setDisciplines(prev => prev.filter(d => d.id !== id))
  }

  const handleConfirmDisciplines = (): void => {
    const filteredDisciplines = disciplines.filter(
      d => d.code !== '' && d.discipline !== ''
    )

    if (filteredDisciplines.length === 0) {
      toast.error({
        title: 'No disciplines added',
        description: 'Please add at least one discipline to continue'
      })

      return
    }

    const disciplineCodes = filteredDisciplines.map(d => d.code)
    const uniqueDisciplineCodes = new Set(disciplineCodes)

    if (disciplineCodes.length !== uniqueDisciplineCodes.size) {
      toast.error({
        title: 'Duplicate disciplines',
        description: 'Please ensure all disciplines are unique'
      })

      return
    }

    const updatedPages = pages.map(page => {
      const prefix = extractDrawingPrefix(page.drawing_number ?? '')

      if (prefix == null) {
        return page
      }

      const discipline = filteredDisciplines.find(d => d.code === prefix)

      if (discipline != null) {
        return {
          ...page,
          drawing_discipline: discipline.discipline
        }
      }

      return page
    })

    setDisciplines(filteredDisciplines)
    setPages(updatedPages)
    setCurrentTab(ReviewDrawingTab.PAGES_TAB)
  }

  return {
    project,
    handleCodeChange,
    handleDisciplineChange,
    addDrawingDiscipline,
    handleConfirmDisciplines,
    removeDrawingDiscipline
  }
}
