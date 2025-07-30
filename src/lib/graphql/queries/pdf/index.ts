import { gql } from '@apollo/client'

export const DOWNLOAD_PDF_MUTATION = gql`
  mutation GeneratePDF($data: DownloadPdfInput!) {
    generate_pdf(data: $data)
  }
`
