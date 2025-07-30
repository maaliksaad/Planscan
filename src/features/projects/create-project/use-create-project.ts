import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'nextjs-toploader/app'
import { useEffect, useState } from 'react'
import {
  type SubmitHandler,
  useForm,
  type UseFormReturn
} from 'react-hook-form'

import { ABSOLUTE_ROUTES } from '@/constants/routes'
import { useToast } from '@/hooks/use-toast'
import { useCreateProjectMutation } from '@/lib/graphql'
import {
  CreateProjectSchema,
  type CreateProjectSchemaType,
  ProjectSchemaKeys
} from '@/schemas/projects'
import { getAuthHeader } from '@/utils/headers'

interface UseCreateProjectReturn {
  isOpen: boolean
  onOpenChange: (value: boolean) => void
  form: UseFormReturn<CreateProjectSchemaType>
  onSubmit: SubmitHandler<CreateProjectSchemaType>
}

export const useCreateProject = (): UseCreateProjectReturn => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const [createProjectMutation] = useCreateProjectMutation()

  const form = useForm<CreateProjectSchemaType>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      [ProjectSchemaKeys.NAME]: '',
      [ProjectSchemaKeys.NUMBER]: '',
      [ProjectSchemaKeys.OFFICE]: '',
      [ProjectSchemaKeys.ADDRESS]: ''
    }
  })

  const onSubmit: SubmitHandler<CreateProjectSchemaType> = async data => {
    await createProjectMutation({
      variables: {
        data: {
          [ProjectSchemaKeys.NAME]: data[ProjectSchemaKeys.NAME],
          [ProjectSchemaKeys.OFFICE]: data[ProjectSchemaKeys.OFFICE],
          [ProjectSchemaKeys.ADDRESS]: data[ProjectSchemaKeys.ADDRESS],
          ...(data.project_number != null && {
            project_number: +data.project_number
          })
        }
      },
      onError: error => {
        toast.error({
          title: 'Something went wrong!',
          description: error.message
        })
      },
      onCompleted: ({ create_project }) => {
        toast.success({
          title: 'Project created!',
          description: 'Project has been successfully created.',
          duration: 5000
        })
        setIsOpen(false)
        router.push(ABSOLUTE_ROUTES.getProjectPath(create_project.project_id))
      },
      context: {
        headers: getAuthHeader()
      }
    })
  }

  useEffect(() => {
    form.reset()
  }, [form, isOpen])

  const onOpenChange = (value: boolean): void => {
    setIsOpen(value)
  }

  return { form, onSubmit, isOpen, onOpenChange }
}
