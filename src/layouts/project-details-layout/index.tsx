'use client'

import type { FC, PropsWithChildren } from 'react'

import { ProjectStoreProvider } from '@/stores/project-store'

import { ProjectDetailsSection } from './project-details-section'
import { ProjectDetailsSkeleton } from './project-details-skeleton'
import { useProjectDetailsLayout } from './use-project-details-layout'

export const ProjectDetailsLayout: FC<PropsWithChildren> = ({ children }) => {
  const { project, loading } = useProjectDetailsLayout()

  if (loading || project == null) {
    return <ProjectDetailsSkeleton />
  }

  return (
    <ProjectStoreProvider state={project}>
      <ProjectDetailsSection>{children}</ProjectDetailsSection>
    </ProjectStoreProvider>
  )
}
