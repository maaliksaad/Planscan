'use client'

import Uppy from '@uppy/core'
import Tus from '@uppy/tus'
import { useState } from 'react'

import { clientEnv } from '@/env/client'
import { type File as BackendFile, useGetFileLazyQuery } from '@/lib/graphql'

interface UseUppyReturn {
  progress: number
  uploading: boolean
  handleUpload: (file: File) => Promise<BackendFile>
  abortUpload: () => void
}

const CHUNK_SIZE = 1024 * 1024

export const useUppy = (): UseUppyReturn => {
  const [progress, setProgress] = useState<number>(0)
  const [uploading, setUploading] = useState<boolean>(false)

  const [getFileByKey] = useGetFileLazyQuery()

  const abortUpload = (): void => {
    setProgress(0)
    setUploading(false)
  }

  const handleUpload = async (file: File): Promise<BackendFile> => {
    return new Promise((resolve, reject) => {
      const uppy = new Uppy({
        debug: clientEnv.NEXT_PUBLIC_IS_DEBUG,
        autoProceed: true,
        allowMultipleUploadBatches: false
      })

      const { href: endpoint } = new URL(
        '/files',
        clientEnv.NEXT_PUBLIC_PLANSCAN_API_URL
      )

      abortUpload()

      uppy.addFile({
        name: file.name,
        type: file.type,
        data: file
      })

      uppy.use(Tus, {
        endpoint,
        chunkSize: CHUNK_SIZE,
        headers: {
          'file-name': file.name,
          'file-type': file.type
        },
        onShouldRetry: () => false
      })

      uppy.on('complete', async result => {
        if (result.successful == null || result.successful.length === 0) {
          return
        }

        const url = new URL(
          result.successful[0].uploadURL ?? '',
          clientEnv.NEXT_PUBLIC_PLANSCAN_API_URL
        )

        const key = url.href.split('/').pop()

        if (key == null) {
          abortUpload()
          reject(new Error('Failed to upload file'))
          return
        }

        const { data } = await getFileByKey({
          variables: {
            key
          },
          errorPolicy: 'all',
          fetchPolicy: 'no-cache'
        })

        if (data?.file == null) {
          abortUpload()
          reject(new Error('Failed to upload file'))
          return
        }

        abortUpload()
        resolve(data.file)
      })

      uppy.on('upload', () => {
        setUploading(true)
      })

      uppy.on('error', error => {
        abortUpload()
        reject(new Error(error.message))
      })

      uppy.on('progress', data => {
        setProgress(data)
      })
    })
  }

  return { progress, uploading, handleUpload, abortUpload }
}
