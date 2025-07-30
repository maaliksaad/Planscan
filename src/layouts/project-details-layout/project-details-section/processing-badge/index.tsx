import type { FC } from 'react'

import { ArrowCircleIcon } from '@/icons/arrow-circle'
import { DrawingStatus, type Project } from '@/lib/graphql'

interface ProcessingBadgeProps {
  project: Project
}

export const ProcessingBadge: FC<ProcessingBadgeProps> = ({ project }) => {
  if (
    project.drawing == null ||
    ![DrawingStatus.Processing, DrawingStatus.Pending].includes(
      project.drawing.drawing_status
    )
  ) {
    return null
  }

  return (
    <div className="flex items-center gap-3 px-4 py-1.5">
      <ArrowCircleIcon className="size-5 text-zinc-900/20" />
      <p className="text-sm text-zinc-500">Processing drawings...</p>
    </div>
  )
}
