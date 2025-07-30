import type { FC } from 'react'

import { Button } from '@/components/ui/button'
import { TrashIcon } from '@/icons/trash'
import type { File } from '@/lib/graphql'

interface FilePreviewProps {
  file: File | null
  removeFile: () => void
  removing: boolean
}

export const FilePreview: FC<FilePreviewProps> = ({
  file,
  removeFile,
  removing
}) => {
  if (file == null) {
    return null
  }

  return (
    <div className="flex items-center justify-between gap-4 rounded-md border border-zinc-200 px-4 py-3">
      <p className="line-clamp-1 text-sm font-medium text-blue-500">
        {file.name}
      </p>

      <Button
        className="p-2"
        size="icon-sm"
        variant="ghost"
        onClick={removeFile}
        disabled={removing}
      >
        <TrashIcon className="size-4 text-zinc-950/70" />
      </Button>
    </div>
  )
}
