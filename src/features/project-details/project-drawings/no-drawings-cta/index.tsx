import Link from 'next/link'
import type { FC } from 'react'

import { Button } from '@/components/ui/button'
import { ABSOLUTE_ROUTES } from '@/constants/routes'
import { DrawingIcon } from '@/icons/drawing'
import { FileUpIcon } from '@/icons/file-up'
import { useProjectStore } from '@/stores/project-store'

export const NoDrawingsCta: FC = () => {
  const project = useProjectStore()(state => state.project)

  return (
    <div className="grid min-h-[calc(100vh-54px)] grid-cols-3 divide-x divide-zinc-200">
      <div className="w-full space-y-4 p-6">
        <div className="flex items-center gap-2">
          <DrawingIcon className="size-[18px] text-zinc-950/80" />
          <h4 className="text-sm font-medium text-zinc-950">Drawings</h4>
        </div>

        <p className="text-zinc-500">Upload drawings to get started</p>

        <Button variant="outline" asChild>
          <Link
            href={ABSOLUTE_ROUTES.getUploadDrawingsPath(project.project_id)}
            prefetch
          >
            <FileUpIcon />
            <span>Upload drawings</span>
          </Link>
        </Button>
      </div>
      <div className="col-span-2" />
    </div>
  )
}
