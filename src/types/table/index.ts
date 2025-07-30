import type { Dispatch, SetStateAction } from 'react'

export interface TableMetadata {
  page: number
  setPage: Dispatch<SetStateAction<number>>
  limit: number
  setLimit: Dispatch<SetStateAction<number>>
  totalRows: number
  totalPages: number
  loading: boolean
}
