import type { Rect } from 'fabric'

import { useToast } from '@/hooks/use-toast'
import { type TextGroup, useRemoveTextGroupsMutation } from '@/lib/graphql'
import { useProjectStore } from '@/stores/project-store'
import { getAuthHeader } from '@/utils/headers'

interface UseCanvasMenuControlsParams {
  textGroup: TextGroup & { rect: Rect }
  deselectTextGroup: () => void
}

interface UseCanvasMenuControlsReturn {
  handleRemoveText: () => void
  removing: boolean
}

export const useCanvasMenuControls = ({
  textGroup,
  deselectTextGroup
}: UseCanvasMenuControlsParams): UseCanvasMenuControlsReturn => {
  const { pages, setPages } = useProjectStore()(state => state)

  const { toast } = useToast()

  const [removeTextGroupsMutation, { loading: removing }] =
    useRemoveTextGroupsMutation()

  const handleRemoveText = async (): Promise<void> => {
    await removeTextGroupsMutation({
      variables: {
        text_group_ids: [textGroup.text_group_id]
      },
      onError: error => {
        toast.error({
          title: 'Something went wrong!',
          description: error.message
        })
      },
      onCompleted: () => {
        toast.success({
          title: 'Text group removed!',
          description: 'Text group has been removed successfully.',
          duration: 5000
        })

        deselectTextGroup()

        textGroup.rect.canvas?.remove(textGroup.rect)

        setPages(
          pages.map(page => ({
            ...page,
            ...(page.text_groups != null && {
              text_groups: page.text_groups.filter(
                tg => tg.text_group_id !== textGroup.text_group_id
              )
            })
          }))
        )
      },
      context: {
        headers: getAuthHeader()
      }
    })
  }

  return {
    handleRemoveText,
    removing
  }
}
