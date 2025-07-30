'use client'

import { type Dispatch, type SetStateAction, useState } from 'react'

import { ABSOLUTE_ROUTES } from '@/constants/routes'
import { useSyncedState } from '@/hooks/use-synced-state'
import { useToast } from '@/hooks/use-toast'
import {
  type Page,
  useRemovePagesMutation,
  useReviewDrawingMutation,
  useUpdatePageMutation
} from '@/lib/graphql'
import { useProjectStore } from '@/stores/project-store'
import { getAuthHeader } from '@/utils/headers'

import { ReviewDrawingPagesTab } from './review-drawing-pages.types'

interface UseReviewDrawingPagesParams {
  pages: Page[]
  setPages: Dispatch<SetStateAction<Page[]>>
}

interface UseReviewDrawingPagesReturn {
  handleRemovePages: (page_ids: string[]) => Promise<void>
  removingPages: boolean
  handleReviewDrawing: () => Promise<void>
  reviewingDrawing: boolean
  tab: ReviewDrawingPagesTab
  setTab: (tab: ReviewDrawingPagesTab) => void
}

export const useReviewDrawingPages = ({
  pages,
  setPages
}: UseReviewDrawingPagesParams): UseReviewDrawingPagesReturn => {
  const { project, pages: initialPages } = useProjectStore()(state => state)

  const [tab, setTab] = useSyncedState(ReviewDrawingPagesTab.TABLE_TAB, {
    key: `review-page-tab-${project.project_id}`
  })

  const [reviewingDrawing, setReviewingDrawing] = useState(false)

  const { toast } = useToast()

  const [removePagesMutation, { loading: removingPages }] =
    useRemovePagesMutation()
  const [reviewDrawingMutation] = useReviewDrawingMutation()
  const [updatePageMutation] = useUpdatePageMutation()

  const handleRemovePages = async (page_ids: string[]): Promise<void> => {
    if (removingPages) {
      toast.error({
        title: 'Please wait',
        description: 'We are processing your request'
      })
      return
    }

    await removePagesMutation({
      variables: {
        page_ids
      },
      onError: error => {
        toast.error({
          title: 'Something went wrong!',
          description: error.message
        })
      },
      onCompleted: () => {
        toast.success({
          title: 'Pages deleted',
          description: 'Pages have been successfully deleted.',
          duration: 5000
        })

        setPages(pages.filter(page => !page_ids.includes(page.page_id)))
      },
      context: {
        headers: getAuthHeader()
      }
    })
  }

  const handleReviewDrawing = async (): Promise<void> => {
    setReviewingDrawing(true)

    if (reviewingDrawing) {
      toast.error({
        title: 'Please wait',
        description: 'We are processing your request'
      })
      return
    }

    const pagesToUpdate = pages.filter(page => {
      const initialPage = initialPages.find(p => p.page_id === page.page_id)

      if (initialPage == null) {
        return false
      }

      return (
        page.drawing_number !== initialPage.drawing_number ||
        page.drawing_discipline !== initialPage.drawing_discipline ||
        page.sheet_title !== initialPage.sheet_title
      )
    })

    for (const page of pagesToUpdate) {
      await updatePageMutation({
        variables: {
          page_id: page.page_id,
          data: {
            drawing_number: page.drawing_number,
            drawing_discipline: page.drawing_discipline,
            sheet_title: page.sheet_title
          }
        },
        onError: error => {
          toast.error({
            title: 'Something went wrong!',
            description: error.message
          })
        },
        context: {
          headers: getAuthHeader()
        }
      })
    }

    if (project.drawing?.drawing_id == null) {
      toast.error({
        title: 'Invalid drawing',
        description: 'Invalid drawing provided'
      })
      return
    }

    await reviewDrawingMutation({
      variables: {
        drawing_id: project.drawing.drawing_id
      },
      onError: error => {
        toast.error({
          title: 'Something went wrong!',
          description: error.message
        })
      },
      onCompleted: () => {
        toast.success({
          title: 'Drawing reviewed',
          description: 'Drawings successfully added to project.',
          duration: 5000
        })

        window.location.href = ABSOLUTE_ROUTES.getProjectPath(
          project.project_id
        )
      },
      context: {
        headers: getAuthHeader()
      }
    })

    setReviewingDrawing(false)
  }

  return {
    handleRemovePages,
    removingPages,
    handleReviewDrawing,
    reviewingDrawing,
    tab,
    setTab
  }
}
