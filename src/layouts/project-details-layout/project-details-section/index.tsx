'use client'

import type { FC, PropsWithChildren } from 'react'

import { AppFavicon } from '@/components/app-favicon'
import { OrganizationSwitch } from '@/features/navbar/organization-switch'
import { UserMenu } from '@/features/navbar/user-menu'
import { StarProject } from '@/features/projects/star-project'
import { UpdateProject } from '@/features/projects/update-project'
import { DrawingStatus } from '@/lib/graphql'

import { DrawingSearchbar } from './drawing-searchbar'
import { ProcessingBadge } from './processing-badge'
import { ProjectTabs } from './project-tabs'
import { useProjectDetailsSection } from './use-project-details-section'

export const ProjectDetailsSection: FC<PropsWithChildren> = ({ children }) => {
  const { project } = useProjectDetailsSection()

  return (
    <div className="w-full">
      <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-1 shadow-sm shadow-black/5">
        <div className="flex items-center gap-3">
          <AppFavicon />

          <h1 className="text-sm font-medium text-zinc-900">
            {project.project_name}
          </h1>

          <StarProject project={project} />

          <UpdateProject project={project} />

          {project.drawing?.drawing_status === DrawingStatus.Processed && (
            <ProjectTabs />
          )}
        </div>

        <div className="flex items-center gap-3">
          {project.drawing?.drawing_status === DrawingStatus.Processed && (
            <DrawingSearchbar />
          )}

          <ProcessingBadge project={project} />

          <OrganizationSwitch />

          <UserMenu />
        </div>
      </div>
      <div className="w-full">{children}</div>
    </div>
  )
}
