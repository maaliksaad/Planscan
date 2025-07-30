import type { Table } from '@tanstack/table-core'
import type { Dispatch, ReactElement, SetStateAction } from 'react'

import type { DataTableFilterField, Filter } from '@/types/data-table'

import { DataTableFilterList } from './data-table-filters-list'
import { DataTableViewOptions } from './data-table-view-option'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  totalRows: number
  filters?: {
    fields: Array<DataTableFilterField<TData>>
    filters: Array<Filter<TData>>
    setFilters: Dispatch<SetStateAction<Array<Filter<TData>>>>
  }
}

export const DataTableToolbar = <TData,>({
  table,
  totalRows,
  filters
}: DataTableToolbarProps<TData>): ReactElement => {
  return (
    <div className="flex h-12 items-center justify-between">
      <div className="flex items-center gap-3">
        <p className="text-nowrap text-sm font-medium text-zinc-500">
          {totalRows} total
        </p>

        {filters != null && <DataTableFilterList filters={filters} />}
      </div>

      <div className="flex gap-3">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
