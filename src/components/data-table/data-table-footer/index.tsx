import type { Table } from '@tanstack/table-core'
import type { ReactElement } from 'react'

import { Button } from '@/components/ui/button'
import type { TableMetadata } from '@/types/table'

interface DataTableFooterProps<TData> {
  table: Table<TData>
  metadata: TableMetadata
}

export const DataTableFooter = <TData,>({
  table,
  metadata: { setPage, totalPages }
}: DataTableFooterProps<TData>): ReactElement => {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          setPage(prev => {
            if (prev > 1) {
              return prev - 1
            }
            return prev
          })
        }}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          setPage(prev => {
            if (prev < totalPages) {
              return prev + 1
            }
            return prev
          })
        }}
        disabled={!table.getCanNextPage()}
      >
        Next
      </Button>
    </div>
  )
}
