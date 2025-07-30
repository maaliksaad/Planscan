import { useState } from 'react'

import { useToast } from '@/hooks/use-toast'
import { useRemoveTextGroupsMutation } from '@/lib/graphql'
import { useProjectStore } from '@/stores/project-store'
import { getAuthHeader } from '@/utils/headers'

interface UseRemoveTextGroupsParams {
  textGroupIds: string[]
}

interface UseRemoveTextGroupsReturn {
  isOpen: boolean
  onOpenChange: (value: boolean) => void
  loading: boolean
  handleRemoveTextGroups: () => Promise<void>
}

export const useRemoveTextGroups = ({
  textGroupIds
}: UseRemoveTextGroupsParams): UseRemoveTextGroupsReturn => {
  const { pages, setPages } = useProjectStore()(state => state)

  const [isOpen, setIsOpen] = useState(false)

  const { toast } = useToast()

  const [removeTextGroupsMutation, { loading }] = useRemoveTextGroupsMutation()

  const onError = (error: Error): void => {
    toast.error({
      title: 'Something went wrong!',
      description: error.message
    })
  }

  const onCompleted = (): void => {
    toast.success({
      title: 'Text groups deleted!',
      description: 'Text groups has been deleted successfully'
    })
    setIsOpen(false)

    setPages(
      pages.map(page => ({
        ...page,
        ...(page.text_groups != null && {
          text_groups: page.text_groups.filter(tg =>
            textGroupIds.includes(tg.text_group_id)
          )
        })
      }))
    )
  }

  const handleRemoveTextGroups = async (): Promise<void> => {
    await removeTextGroupsMutation({
      variables: {
        text_group_ids: textGroupIds
      },
      onError,
      onCompleted,
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
    handleRemoveTextGroups
  }
}
