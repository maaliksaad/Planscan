import type { FC } from 'react'

import { DrawingIcon } from '@/icons/drawing'

export const ProcessingDrawingsCta: FC = () => {
  return (
    <div className="grid min-h-[calc(100vh-54px)] grid-cols-3 divide-x divide-zinc-200">
      <div className="w-full space-y-4 p-6">
        <div className="flex items-center gap-2">
          <DrawingIcon className="size-[18px] text-zinc-950/80" />
          <h4 className="text-sm font-medium text-zinc-950">Drawings</h4>
        </div>

        <p className="text-sm text-zinc-500">
          Your drawings are being processed. This may take a few minutes. We
          will notify you once the drawings are ready.
        </p>
      </div>
      <div className="col-span-2" />
    </div>
  )
}
