'use client'

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'
import type { Dispatch, ReactElement, SetStateAction } from 'react'

import { DataTableFooter } from '@/components/data-table/data-table-footer'
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { ChevronDownIcon } from '@/icons/chevron-down'
import { ChevronRightIcon } from '@/icons/chevron-right'
import type { DataTableFilterField, Filter } from '@/types/data-table'
import type { TableMetadata } from '@/types/table'
import { cn } from '@/utils/cn'

interface DataTableProps<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>
  data: TData[]
  metadata?: TableMetadata
  filters?: {
    fields: Array<DataTableFilterField<TData>>
    filters: Array<Filter<TData>>
    setFilters: Dispatch<SetStateAction<Array<Filter<TData>>>>
  }
}

export const DataTable = <TData, TValue>({
  columns,
  data,
  metadata,
  filters
}: DataTableProps<TData, TValue>): ReactElement => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...(metadata != null && {
      getPaginationRowModel: getPaginationRowModel(),
      pageCount: metadata.totalRows / metadata.limit,
      state: {
        pagination: {
          pageIndex: metadata.page - 1,
          pageSize: metadata.limit
        }
      },
      manualPagination: true
    }),
    manualFiltering: true
  })

  return (
    <div className="w-full">
      <DataTableToolbar
        table={table}
        totalRows={metadata == null ? data.length : metadata.totalRows}
        filters={filters}
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {metadata?.loading === true ? (
              Array.from({ length: 10 })
                .fill(0)
                .map((_, index) => (
                  <TableRow key={index}>
                    <TableCell colSpan={columns.length}>
                      <Skeleton className="h-8 w-full" />
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <>
                {table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map(row => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id}>
                          {cell.getIsGrouped() ? (
                            <button
                              {...{
                                onClick: row.getToggleExpandedHandler()
                              }}
                              className={cn(
                                'flex cursor-default items-center gap-1',
                                {
                                  'cursor-pointer': row.getCanExpand()
                                }
                              )}
                            >
                              {row.getIsExpanded() ? (
                                <ChevronDownIcon className="size-4" />
                              ) : (
                                <ChevronRightIcon className="size-4" />
                              )}
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                              {row.subRows.length}
                            </button>
                          ) : (
                            flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>

      {metadata != null && (
        <DataTableFooter table={table} metadata={metadata} />
      )}
    </div>
  )
}
