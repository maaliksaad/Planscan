import Image from 'next/image'
import type { FC } from 'react'

import { useSyncedState } from '@/hooks/use-synced-state'
import type { Page } from '@/lib/graphql'
import { useProjectStore } from '@/stores/project-store'
import { getHttpUrlFromS3 } from '@/utils/s3'

import { ReviewDrawingPagesTab } from '../../review-drawing-pages.types'

interface DrawingThumbnailProps {
  page: Page
}

export const DrawingThumbnail: FC<DrawingThumbnailProps> = ({ page }) => {
  const { project, pages } = useProjectStore()(state => state)

  const [, setTab] = useSyncedState(ReviewDrawingPagesTab.TABLE_TAB, {
    key: `review-page-tab-${project.project_id}`
  })

  const [, setCurrentPageIndex] = useSyncedState(0, {
    key: `current-review-page-index-${project.project_id}`
  })

  return (
    <button
      onClick={() => {
        setTab(ReviewDrawingPagesTab.GRID_TAB)
        setCurrentPageIndex(pages.map(p => p.page_id).indexOf(page.page_id))
      }}
      className="relative h-[80px] w-[120px] overflow-hidden rounded-md border border-zinc-200 bg-zinc-200"
    >
      <Image
        src={getHttpUrlFromS3(page.page_thumbnail_uri ?? '')}
        alt={page.drawing_discipline ?? ''}
        fill
      />
    </button>
  )
}
