import Link from 'next/link'
import type { FC } from 'react'

import { Button } from '@/components/ui/button'
import { ABSOLUTE_ROUTES } from '@/constants/routes'
import { CheckCircleIcon } from '@/icons/check-circle'
import { DrawingIcon } from '@/icons/drawing'
import { useProjectStore } from '@/stores/project-store'

export const ReviewDrawingsCta: FC = () => {
  const project = useProjectStore()(state => state.project)

  return (
    <div className="grid min-h-[calc(100vh-54px)] grid-cols-3 divide-x divide-zinc-200">
      <div className="w-full space-y-4 p-6">
        <div className="flex items-center gap-2">
          <DrawingIcon className="size-[18px] text-zinc-950/80" />
          <h4 className="text-sm font-medium text-zinc-950">Drawings</h4>
        </div>

        <p className="text-zinc-500">
          Drawing processing is complete. Review the drawings and add them to
          your project.
        </p>

        <Button variant="outline" asChild>
          <Link
            href={ABSOLUTE_ROUTES.getReviewDrawingsPath(project.project_id)}
            prefetch
          >
            <CheckCircleIcon />
            <span>Review drawings</span>
          </Link>
        </Button>
      </div>
      <div className="col-span-2" />
    </div>
  )
}
