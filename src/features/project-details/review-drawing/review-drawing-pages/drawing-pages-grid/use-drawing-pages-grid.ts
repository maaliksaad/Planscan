import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useMemo
} from 'react'

import type { DrawingDiscipline } from '@/features/project-details/review-drawing/review-drawing.types'
import { useSyncedState } from '@/hooks/use-synced-state'
import type { Page } from '@/lib/graphql'
import { useProjectStore } from '@/stores/project-store'
import { extractDrawingPrefix } from '@/utils/drawings'

interface UseDrawingPagesGridParams {
  disciplines: DrawingDiscipline[]
  pages: Page[]
  setPages: Dispatch<SetStateAction<Page[]>>
}

interface UseDrawingPagesGridReturn {
  canGoNext: boolean
  canGoPrev: boolean
  currentPage: Page
  currentPageIndex: number
  handleDisciplineChange: (page_id: string, value: string) => void
  handleNextPage: () => void
  handleNumberChange: (page_id: string, value: string) => void
  handlePrevPage: () => void
  handleTitleChange: (page_id: string, value: string) => void
  handlePageIndexChange: (index: string) => void
}

export const useDrawingPagesGrid = ({
  disciplines,
  pages,
  setPages
}: UseDrawingPagesGridParams): UseDrawingPagesGridReturn => {
  const { project } = useProjectStore()(state => state)

  const [currentPageIndex, setCurrentPageIndex] = useSyncedState(0, {
    key: `current-review-page-index-${project.project_id}`
  })

  const [, setViewedPages] = useSyncedState<string[]>([], {
    key: `viewed-pages-${project.project_id}`
  })

  const canGoPrev = useMemo(() => currentPageIndex > 0, [currentPageIndex])

  const canGoNext = useMemo(
    () => currentPageIndex < pages.length - 1,
    [currentPageIndex, pages.length]
  )

  const handlePrevPage = useCallback(() => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1)
    }
  }, [currentPageIndex, setCurrentPageIndex])

  const handleNextPage = useCallback(() => {
    if (currentPageIndex < pages.length - 1) {
      setCurrentPageIndex(prev => prev + 1)
    }
  }, [currentPageIndex, pages.length, setCurrentPageIndex])

  const handlePageIndexChange = useCallback(
    (index: string) => {
      const parsedIndex = Number.parseInt(index, 10) - 1
      if (parsedIndex >= 0 && parsedIndex < pages.length) {
        setCurrentPageIndex(parsedIndex)
      }
    },
    [pages.length, setCurrentPageIndex]
  )

  const handleNumberChange = useCallback(
    (page_id: string, value: string) => {
      setPages(
        pages.map(page => {
          if (page.page_id === page_id) {
            const prefix = extractDrawingPrefix(value)

            if (prefix != null) {
              return {
                ...page,
                drawing_number: value,
                drawing_discipline:
                  disciplines.find(discipline => discipline.code === prefix)
                    ?.discipline ?? page.drawing_discipline
              }
            }
          }

          return page
        })
      )
    },
    [pages, setPages, disciplines]
  )

  const handleDisciplineChange = useCallback(
    (page_id: string, value: string) => {
      setPages(
        pages.map(page => {
          if (page.page_id === page_id) {
            return {
              ...page,
              drawing_discipline: value
            }
          }

          return page
        })
      )
    },
    [pages, setPages]
  )

  const handleTitleChange = useCallback(
    (page_id: string, value: string) => {
      setPages(
        pages.map(page => {
          if (page.page_id === page_id) {
            return {
              ...page,
              sheet_title: value
            }
          }

          return page
        })
      )
    },
    [pages, setPages]
  )

  useEffect(() => {
    setViewedPages(prev => [...prev, pages[currentPageIndex].page_id])
  }, [currentPageIndex, setViewedPages, pages])

  return {
    currentPage: pages[currentPageIndex],
    currentPageIndex,
    canGoPrev,
    canGoNext,
    handlePrevPage,
    handleNextPage,
    handlePageIndexChange,
    handleNumberChange,
    handleDisciplineChange,
    handleTitleChange
  }
}
