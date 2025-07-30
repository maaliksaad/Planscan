'use client'

import { PDFDocument } from 'pdf-lib'

export const getPDFPages = async (file: File): Promise<number> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.addEventListener('error', () => {
      reject(new Error('Failed to read pdf file'))
    })

    reader.addEventListener('load', async () => {
      const pdfBytes = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(pdfBytes)

      resolve(pdfDoc.getPages().length)
    })

    // eslint-disable-next-line unicorn/prefer-blob-reading-methods
    reader.readAsArrayBuffer(file)
  })
}
