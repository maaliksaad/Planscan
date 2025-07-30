import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import {
  type SubmitHandler,
  useForm,
  type UseFormReturn
} from 'react-hook-form'

import { useToast } from '@/hooks/use-toast'
import { type Page, useUpdatePageMutation } from '@/lib/graphql'
import {
  PageSchemaKeys,
  UpdatePageSchema,
  type UpdatePageSchemaType
} from '@/schemas/pages'
import { useProjectStore } from '@/stores/project-store'
import { getAuthHeader } from '@/utils/headers'

interface UseUpdateDrawingParam {
  page: Page
}

interface UseUpdateDrawingReturn {
  isOpen: boolean
  onOpenChange: (value: boolean) => void
  form: UseFormReturn<UpdatePageSchemaType>
  onSubmit: SubmitHandler<UpdatePageSchemaType>
}

export const useUpdateDrawing = ({
  page
}: UseUpdateDrawingParam): UseUpdateDrawingReturn => {
  const { pages, setPages } = useProjectStore()(state => state)

  const [isOpen, setIsOpen] = useState(true)
  const { toast } = useToast()
  const [updatePageMutation, { loading }] = useUpdatePageMutation()

  const form = useForm<UpdatePageSchemaType>({
    resolver: zodResolver(UpdatePageSchema),
    defaultValues: {
      [PageSchemaKeys.DISCIPLINE]: page.drawing_discipline ?? '',
      [PageSchemaKeys.NUMBER]: page.drawing_number ?? '',
      [PageSchemaKeys.TITLE]: page.sheet_title ?? ''
    }
  })

  const onOpenChange = (value: boolean): void => {
    if (loading) return

    setIsOpen(value)
  }

  const onSubmit: SubmitHandler<UpdatePageSchemaType> = async data => {
    await updatePageMutation({
      variables: {
        page_id: page.page_id,
        data: {
          [PageSchemaKeys.DISCIPLINE]: data[PageSchemaKeys.DISCIPLINE],
          [PageSchemaKeys.NUMBER]: data[PageSchemaKeys.NUMBER],
          [PageSchemaKeys.TITLE]: data[PageSchemaKeys.TITLE]
        }
      },
      onError: error => {
        toast.error({
          title: 'Something went wrong!',
          description: error.message
        })
      },
      onCompleted: () => {
        toast.success({
          title: 'Page updated!',
          description: 'Page has been successfully updated.',
          duration: 5000
        })
        setIsOpen(false)

        setPages(
          pages.map(p => {
            if (p.page_id === page.page_id) {
              return {
                ...p,
                drawing_discipline: data[PageSchemaKeys.DISCIPLINE],
                drawing_number: data[PageSchemaKeys.NUMBER],
                sheet_title: data[PageSchemaKeys.TITLE]
              }
            }

            return p
          })
        )
      },
      context: {
        headers: getAuthHeader()
      }
    })
  }

  return { form, onSubmit, isOpen, onOpenChange }
}
