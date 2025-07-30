import { useState } from 'react'

import { useToast } from '@/hooks/use-toast'
import { type Page, useRemovePagesMutation } from '@/lib/graphql'
import { useProjectStore } from '@/stores/project-store'
import { getAuthHeader } from '@/utils/headers'

interface UseDeleteDrawingParams {
  page: Page
}

interface UseDeleteDrawingReturn {
  isOpen: boolean
  onOpenChange: (value: boolean) => void
  loading: boolean
  handleDeleteDrawing: () => Promise<void>
}

export const useDeleteDrawing = ({
  page
}: UseDeleteDrawingParams): UseDeleteDrawingReturn => {
  const { pages, setPages } = useProjectStore()(state => state)

  const [isOpen, setIsOpen] = useState(true)

  const { toast } = useToast()

  const [removePagesMutation, { loading }] = useRemovePagesMutation()

  const handleDeleteDrawing = async (): Promise<void> => {
    await removePagesMutation({
      variables: {
        page_ids: [page.page_id]
      },
      onError: (error: Error) => {
        toast.error({
          title: 'Something went wrong!',
          description: error.message
        })
      },
      onCompleted: () => {
        toast.success({
          title: 'Drawing deleted!',
          description: 'Drawing has been deleted successfully'
        })
        setIsOpen(false)

        setPages(pages.filter(p => p.page_id !== page.page_id))
      },
      context: {
        headers: getAuthHeader()
      }
    })
  }

  const onOpenChange = (value: boolean): void => {
    if (loading) return

    setIsOpen(value)
  }

  return {
    isOpen,
    onOpenChange,
    loading,
    handleDeleteDrawing
  }
}
