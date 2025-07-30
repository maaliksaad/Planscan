import { useMemo } from 'react'

import { useToast } from '@/hooks/use-toast'
import { type Project, useStarProjectMutation } from '@/lib/graphql'
import { useUserStore } from '@/stores/user-store'
import { getAuthHeader } from '@/utils/headers'

interface UseStarProjectParams {
  project: Project
}

interface UseStarProjectReturn {
  isStared: boolean
  loading: boolean
  handleStarProject: (projectId: string) => Promise<void>
}

export const useStarProject = ({
  project
}: UseStarProjectParams): UseStarProjectReturn => {
  const user = useUserStore()(state => state.user)

  const isStared = useMemo(
    () =>
      project.user_projects.some(
        userProject =>
          userProject.user_id === user?.user_id && userProject.stared
      ),
    [project, user]
  )

  const { toast } = useToast()
  const [starProjectMutation, { loading }] = useStarProjectMutation()

  const handleStarProject = async (projectId: string): Promise<void> => {
    if (loading) return

    await starProjectMutation({
      variables: {
        project_id: projectId,
        stared: !isStared
      },
      onError: error => {
        toast.error({
          title: 'Something went wrong!',
          description: error.message
        })
      },
      onCompleted: () => {
        toast.success({
          title: `Project ${isStared ? 'unstarred' : 'starred'}`,
          description: `Project has been ${isStared ? 'unstarred' : 'starred'} successfully`
        })
      },
      context: {
        headers: getAuthHeader()
      }
    })
  }

  return {
    isStared,
    loading,
    handleStarProject
  }
}
