import { useRouter } from 'nextjs-toploader/app'
import { useState } from 'react'

import { ABSOLUTE_ROUTES } from '@/constants/routes'
import { useToast } from '@/hooks/use-toast'
import { type Project, useRemoveProjectMutation } from '@/lib/graphql'
import { getAuthHeader } from '@/utils/headers'

interface UseDeleteProjectParams {
  project: Project
}

interface UseDeleteProjectReturn {
  isOpen: boolean
  onOpenChange: (value: boolean) => void
  loading: boolean
  handleDeleteProject: () => Promise<void>
}

export const useDeleteProject = ({
  project
}: UseDeleteProjectParams): UseDeleteProjectReturn => {
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()
  const { toast } = useToast()

  const [removeProjectMutation, { loading }] = useRemoveProjectMutation()

  const onError = (error: Error): void => {
    toast.error({
      title: 'Something went wrong!',
      description: error.message
    })
  }

  const onCompleted = (): void => {
    toast.success({
      title: 'Project deleted!',
      description: 'Project has been deleted successfully'
    })
    setIsOpen(false)

    setTimeout(() => {
      router.push(ABSOLUTE_ROUTES.PROJECTS)
    }, 2000)
  }

  const handleDeleteProject = async (): Promise<void> => {
    await removeProjectMutation({
      variables: {
        project_id: project.project_id
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
    handleDeleteProject
  }
}
