import { useState } from 'react'

import type { TableMetadata } from '@/types/table'

type UseTableMetadataReturn = Pick<
  TableMetadata,
  'page' | 'setPage' | 'limit' | 'setLimit'
>

export const useTableMetadata = (): UseTableMetadataReturn => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  return {
    page,
    setPage,
    limit,
    setLimit
  }
}
