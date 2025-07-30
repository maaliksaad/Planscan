import type { FC } from 'react'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { XMarkIcon } from '@/icons/x-mark'

interface UploadProgressProps {
  uploading: boolean
  progress: number
  cancelUpload: () => void
}

export const UploadProgress: FC<UploadProgressProps> = ({
  uploading,
  progress,
  cancelUpload
}) => {
  if (!uploading) {
    return null
  }

  return (
    <div className="space-y-1 rounded-md border border-zinc-200 px-4 pb-5 pt-3">
      <div className="flex items-center justify-between gap-4">
        <p className="line-clamp-1 text-sm font-medium text-zinc-900">
          Uploading... {progress}%
        </p>

        <Button
          className="p-2"
          size="icon-sm"
          variant="ghost"
          onClick={cancelUpload}
        >
          <XMarkIcon className="size-4 text-zinc-950/70" />
        </Button>
      </div>

      <Progress value={progress} className="h-1.5 w-full" />
    </div>
  )
}
