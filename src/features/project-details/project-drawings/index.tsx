'use client'

import type { FC } from 'react'

import { DrawingStatus } from '@/lib/graphql'
import { useProjectStore } from '@/stores/project-store'

import { DrawingsTable } from '../drawings-table'
import { NoDrawingsCta } from './no-drawings-cta'
import { ProcessingDrawingsCta } from './processing-drawings-cta'
import { ReviewDrawingsCta } from './review-drawings-cta'

export const ProjectDrawings: FC = () => {
  const { project, pages } = useProjectStore()(state => state)

  if (project.drawing == null) {
    return <NoDrawingsCta />
  }

  if (
    project.drawing.drawing_status === DrawingStatus.Pending ||
    project.drawing.drawing_status === DrawingStatus.Processing
  ) {
    return <ProcessingDrawingsCta />
  }

  if (
    project.drawing.drawing_status === DrawingStatus.Uploaded &&
    pages.length > 0
  ) {
    return <ReviewDrawingsCta />
  }

  return <DrawingsTable />
}
