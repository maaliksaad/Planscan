'use client'

import { flexRender } from '@tanstack/react-table'
import type { FC } from 'react'

import { DataTableFilterList } from '@/components/data-table/data-table-toolbar/data-table-filters-list'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { EditTrades } from '@/features/project-trades/edit-trades'
import { ChevronDownIcon } from '@/icons/chevron-down'
import { ChevronRightIcon } from '@/icons/chevron-right'
import { cn } from '@/utils/cn'

import { CSI_CODE_HEADERS } from './trades-table.constants'
import { useTradesTable } from './use-trades-table'

export const TradesTable: FC = () => {
  const { table, filters, setFilters, fields, csiCodes } = useTradesTable()

  return (
    <div className="flex h-[calc(100vh-53px)] flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-2">
        <div className="flex items-center gap-2">
          <p className="text-nowrap text-sm font-medium text-zinc-500">
            {csiCodes.length} total
          </p>
          <DataTableFilterList
            filters={{
              filters,
              setFilters,
              fields
            }}
          />
        </div>

        <EditTrades />
      </div>
      <Table className="relative">
        <TableHeader className="sticky top-0 z-10">
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id} className="divide-x divide-zinc-200">
              {headerGroup.headers.map(header => (
                <TableHead
                  className="bg-white"
                  key={header.id}
                  style={{
                    width: Number.isInteger(header.column.getSize())
                      ? `${header.column.getSize()}px`
                      : 'auto'
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="overflow-scroll scrollbar-none">
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row, index) => (
              <TableRow key={row.id} className="divide-x divide-zinc-200">
                {row.getVisibleCells().map(cell => {
                  return (
                    <TableCell key={cell.id} className="relative p-0">
                      {cell.getIsGrouped() ? (
                        <button
                          {...{
                            onClick: row.getToggleExpandedHandler()
                          }}
                          className={cn(
                            'flex cursor-default items-center gap-1 p-2',
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
                          {CSI_CODE_HEADERS[row.original.key]}
                        </button>
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
