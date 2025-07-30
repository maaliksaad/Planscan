'use client'

import Link from 'next/link'
import type { FC } from 'react'

import { Button } from '@/components/ui/button'
import { ABSOLUTE_ROUTES } from '@/constants/routes'
import { cn } from '@/utils/cn'

import { FileInput } from './file-input'
import { FilePreview } from './file-preview'
import { UploadProgress } from './upload-progress'
import { useUploadDrawings } from './use-upload-drawings'

export const UploadDrawings: FC = () => {
  const {
    dropzone,
    file,
    progress,
    uploading,
    cancelUpload,
    removeFile,
    removing,
    createDrawing,
    creatingDrawing,
    project
  } = useUploadDrawings()

  return (
    <div className="mx-auto max-w-4xl space-y-12 px-6 py-[60px] mobile:px-12 tablet:px-24 laptop:px-[120px]">
      <h1 className="text-center text-lg font-semibold text-zinc-950">
        Upload and process drawings
      </h1>

      <div className="w-full space-y-3">
        <FileInput dropzone={dropzone} />
        <p className="text-sm font-medium text-zinc-500">
          Supported format: PDF
        </p>
      </div>

      <UploadProgress
        cancelUpload={cancelUpload}
        uploading={uploading}
        progress={progress}
      />

      <FilePreview file={file} removing={removing} removeFile={removeFile} />

      <div className="flex w-full justify-end">
        <Button variant="ghost" asChild>
          <Link
            onClick={cancelUpload}
            href={ABSOLUTE_ROUTES.getProjectPath(project.project_id)}
          >
            Cancel
          </Link>
        </Button>

        <Button
          className={cn({
            hidden: file == null
          })}
          onClick={createDrawing}
          disabled={creatingDrawing}
        >
          Process drawings
        </Button>
      </div>
    </div>
  )
}
