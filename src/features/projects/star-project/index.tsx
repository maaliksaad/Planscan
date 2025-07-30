'use client'

import type { FC } from 'react'

import { Button } from '@/components/ui/button'
import { StarIcon } from '@/icons/star'
import { StarFilledIcon } from '@/icons/star-filled'
import type { Project } from '@/lib/graphql'
import { cn } from '@/utils/cn'

import { useStarProject } from './use-star-project'

interface StarProjectProps {
  project: Project
}

export const StarProject: FC<StarProjectProps> = ({ project }) => {
  const { handleStarProject, loading, isStared } = useStarProject({ project })

  const Icon = isStared ? StarFilledIcon : StarIcon

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={async () => handleStarProject(project.project_id)}
      disabled={loading}
      className="h-auto w-auto p-0"
    >
      <Icon
        className={cn('size-4', {
          'text-zinc-950': isStared,
          'text-zinc-950/50': !isStared
        })}
      />
    </Button>
  )
}
