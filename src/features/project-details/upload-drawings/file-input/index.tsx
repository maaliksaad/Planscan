import type { FC } from 'react'
import type { DropzoneState } from 'react-dropzone'

import { FileUpIcon } from '@/icons/file-up'
import { cn } from '@/utils/cn'

interface FileInputProps {
  dropzone: DropzoneState
}

export const FileInput: FC<FileInputProps> = ({ dropzone }) => {
  return (
    <div
      {...dropzone.getRootProps()}
      className={cn(
        'flex w-full flex-col items-center justify-center space-y-2.5 rounded-lg border border-dashed border-zinc-800 bg-zinc-100/90 px-12 py-12 text-zinc-500 mobile:px-24 tablet:px-[100px] laptop:px-[140px]',
        {
          'border-blue-500 text-blue-500': dropzone.isDragAccept,
          'border-red-500 text-red-500': dropzone.isDragReject
        }
      )}
    >
      <FileUpIcon className="size-6" />
      <p className="text-center text-sm font-medium">
        {dropzone.isDragActive ? (
          <span>
            {dropzone.isDragAccept
              ? 'Drop your file here'
              : 'This is not a valid file'}
          </span>
        ) : (
          <>
            Drag and drop, or{' '}
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer font-semibold text-blue-500 focus-within:outline-none focus-within:ring-0"
            >
              <span>choose file</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                {...dropzone.getInputProps()}
              />
            </label>{' '}
            file to upload
          </>
        )}
      </p>
    </div>
  )
}
