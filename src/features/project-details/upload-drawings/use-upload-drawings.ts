'use client'

import { useCallback, useState } from 'react'
import { type DropzoneState, useDropzone } from 'react-dropzone'

import { ABSOLUTE_ROUTES } from '@/constants/routes'
import { useToast } from '@/hooks/use-toast'
import { useUppy } from '@/hooks/use-uppy'
import {
  type File as BackendFile,
  type Project,
  useCreateDrawingMutation,
  useRemoveFileMutation
} from '@/lib/graphql'
import { useProjectStore } from '@/stores/project-store'
import { getAuthHeader } from '@/utils/headers'
import { getPDFPages } from '@/utils/pdf'

interface UseUploadDrawingsReturn {
  file: BackendFile | null
  project: Project
  dropzone: DropzoneState
  progress: number
  uploading: boolean
  removing: boolean
  removeFile: () => void
  cancelUpload: () => void
  creatingDrawing: boolean
  createDrawing: () => void
}

export const useUploadDrawings = (): UseUploadDrawingsReturn => {
  const project = useProjectStore()(state => state.project)

  const [file, setFile] = useState<(BackendFile & { buffer: File }) | null>(
    null
  )

  const { toast } = useToast()

  const { progress, uploading, handleUpload, abortUpload } = useUppy()

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        return
      }

      if (uploading) {
        toast.error({
          title: 'Failed to upload files',
          description: 'Another file is being uploaded'
        })
        return
      }

      const uploadedFile = await handleUpload(acceptedFiles[0])

      setFile({
        ...uploadedFile,
        name: acceptedFiles[0].name,
        buffer: acceptedFiles[0]
      })
    },
    [uploading, toast, handleUpload]
  )

  const dropzone = useDropzone({
    maxFiles: 1,
    accept: {
      'application/pdf': []
    },
    disabled: false,
    noKeyboard: true,
    noClick: true,
    multiple: false,
    onDrop,
    onDropRejected: fileRejections => {
      toast.error({
        title: 'Failed to upload files',
        description:
          fileRejections[0]?.errors[0].message ?? 'Something went wrong'
      })
    }
  })

  const [removeFileMutation, { loading: removing }] = useRemoveFileMutation()

  const removeFile = useCallback(async () => {
    if (file == null) {
      return
    }

    await removeFileMutation({
      variables: {
        key: file.key
      },
      onError: error => {
        toast.error({
          title: 'Could not remove file',
          description: error.message
        })
      },
      onCompleted: () => {
        if (dropzone.inputRef.current != null) {
          dropzone.inputRef.current.value = ''
        }

        setFile(null)
      }
    })
  }, [toast, file, removeFileMutation, dropzone.inputRef])

  const cancelUpload = useCallback(() => {
    if (!uploading) {
      return
    }

    if (dropzone.inputRef.current != null) {
      dropzone.inputRef.current.value = ''
    }

    abortUpload()
    setFile(null)
  }, [abortUpload, uploading, dropzone.inputRef])

  const [createDrawingMutation, { loading: creatingDrawing }] =
    useCreateDrawingMutation()

  const createDrawing = useCallback(async () => {
    if (file == null) {
      return
    }

    await createDrawingMutation({
      variables: {
        data: {
          file_id: file.file_id,
          project_id: project.project_id,
          page_start: 1,
          page_end: await getPDFPages(file.buffer)
        }
      },
      context: {
        headers: getAuthHeader()
      },
      onError: error => {
        toast.error({
          title: 'Could not upload drawing',
          description: error.message
        })
      },
      onCompleted: () => {
        toast.success({
          title: 'Drawing uploaded',
          description: 'Drawing has been uploaded successfully',
          duration: 5000
        })

        window.location.href = ABSOLUTE_ROUTES.getProjectPath(
          project.project_id
        )
      }
    })
  }, [createDrawingMutation, file, toast, project.project_id])

  return {
    progress,
    uploading,
    file,
    removeFile,
    removing,
    dropzone,
    cancelUpload,
    createDrawing,
    creatingDrawing,
    project
  }
}
