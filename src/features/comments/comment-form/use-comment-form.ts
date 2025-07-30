import { zodResolver } from '@hookform/resolvers/zod'
import type { Dispatch, SetStateAction } from 'react'
import {
  type SubmitHandler,
  useForm,
  type UseFormReturn
} from 'react-hook-form'

import { useToast } from '@/hooks/use-toast'
import {
  type Comment,
  type TextGroup,
  useCreateCommentMutation
} from '@/lib/graphql'
import {
  CommentSchemaKeys,
  CreateCommentSchema,
  type CreateCommentSchemaType
} from '@/schemas/comments'
import { useProjectStore } from '@/stores/project-store'
import { getAuthHeader } from '@/utils/headers'

interface UseCommentFormParams {
  textGroup: TextGroup
  setComments: Dispatch<SetStateAction<Comment[]>>
}

interface UseCommentFormReturn {
  form: UseFormReturn<CreateCommentSchemaType>
  onSubmit: SubmitHandler<CreateCommentSchemaType>
}

export const useCommentForm = ({
  textGroup,
  setComments
}: UseCommentFormParams): UseCommentFormReturn => {
  const pages = useProjectStore()(state => state.pages)
  const setPages = useProjectStore()(state => state.setPages)

  const { toast } = useToast()

  const form = useForm<CreateCommentSchemaType>({
    resolver: zodResolver(CreateCommentSchema),
    defaultValues: {
      [CommentSchemaKeys.COMMENT]: ''
    }
  })

  const [createCommentMutation] = useCreateCommentMutation()

  const onSubmit: SubmitHandler<CreateCommentSchemaType> = async data => {
    await createCommentMutation({
      variables: {
        data: {
          comment: data[CommentSchemaKeys.COMMENT],
          text_group_id: textGroup.text_group_id
        }
      },
      onError: error => {
        toast.error({
          title: 'Something went wrong!',
          description: error.message
        })
      },
      onCompleted: ({ create_comment }) => {
        toast.success({
          title: 'Comment added!',
          description: 'Comment has been added successfully.',
          duration: 5000
        })

        form.reset()

        setComments(prev => [create_comment, ...prev])

        setPages(
          pages.map(page => ({
            ...page,
            text_groups: page.text_groups?.map(tg => ({
              ...tg,
              comments:
                tg.text_group_id === textGroup.text_group_id
                  ? [create_comment, ...tg.comments]
                  : tg.comments
            }))
          }))
        )
      },
      context: {
        headers: getAuthHeader()
      }
    })
  }

  return {
    form,
    onSubmit
  }
}
