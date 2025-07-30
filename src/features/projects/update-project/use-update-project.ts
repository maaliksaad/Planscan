import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import {
  type SubmitHandler,
  useForm,
  type UseFormReturn
} from 'react-hook-form'

import { useToast } from '@/hooks/use-toast'
import { useUpdateProjectMutation } from '@/lib/graphql'
import {
  ProjectSchemaKeys,
  UpdateProjectSchema,
  type UpdateProjectSchemaType
} from '@/schemas/projects'
import { useProjectStore } from '@/stores/project-store'
import { getAuthHeader } from '@/utils/headers'

interface UseUpdateProjectReturn {
  isOpen: boolean
  onOpenChange: (value: boolean) => void
  form: UseFormReturn<UpdateProjectSchemaType>
  onSubmit: SubmitHandler<UpdateProjectSchemaType>
}

export const useUpdateProject = (): UseUpdateProjectReturn => {
  const { project, setProject } = useProjectStore()(state => state)

  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()
  const [updateProjectMutation, { loading }] = useUpdateProjectMutation()

  const form = useForm<UpdateProjectSchemaType>({
    resolver: zodResolver(UpdateProjectSchema),
    defaultValues: {
      [ProjectSchemaKeys.NAME]: project.project_name,
      [ProjectSchemaKeys.NUMBER]:
        project.project_number === 0 ? '' : project.project_number?.toString(),
      [ProjectSchemaKeys.OFFICE]: project.office_location ?? '',
      [ProjectSchemaKeys.ADDRESS]: project.address ?? '',
      [ProjectSchemaKeys.STATUS]: project.project_status
    }
  })

  const onSubmit: SubmitHandler<UpdateProjectSchemaType> = async data => {
    await updateProjectMutation({
      variables: {
        project_id: project.project_id,
        data: {
          [ProjectSchemaKeys.NAME]: data[ProjectSchemaKeys.NAME],
          [ProjectSchemaKeys.OFFICE]: data[ProjectSchemaKeys.OFFICE],
          [ProjectSchemaKeys.ADDRESS]: data[ProjectSchemaKeys.ADDRESS],
          ...(data.project_number != null && {
            [ProjectSchemaKeys.NUMBER]: +data.project_number
          }),
          [ProjectSchemaKeys.STATUS]: data[ProjectSchemaKeys.STATUS]
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
          title: 'Project updated!',
          description: 'Project has been successfully updated.',
          duration: 5000
        })
        setIsOpen(false)

        setProject({
          ...project,
          project_name: data[ProjectSchemaKeys.NAME] ?? project.project_name,
          project_number:
            data.project_number == null
              ? project.project_number
              : +data.project_number,
          office_location: data[ProjectSchemaKeys.OFFICE],
          address: data[ProjectSchemaKeys.ADDRESS],
          project_status:
            data[ProjectSchemaKeys.STATUS] ?? project.project_status
        })
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

  return { form, onSubmit, isOpen, onOpenChange }
}
