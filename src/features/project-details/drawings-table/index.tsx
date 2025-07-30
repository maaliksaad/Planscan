import { flexRender } from '@tanstack/react-table'
import { type FC, useState } from 'react'

import { DataTableFilterList } from '@/components/data-table/data-table-toolbar/data-table-filters-list'
import { DataTableGroupOptions } from '@/components/data-table/data-table-toolbar/data-table-group-options'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizeable'
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
import { DrawingIcon } from '@/icons/drawing'
import { PanelIcon } from '@/icons/panel'
import { cn } from '@/utils/cn'

import { DrawingDetails } from './drawing-details'
import { useDrawingsTable } from './use-drawings-table'

export const DrawingsTable: FC = () => {
  const {
    table,
    pages,
    selectedPage,
    canGoPrev,
    canGoNext,
    handlePrevPage,
    handleNextPage,
    extractedDataFilters,
    grouping,
    setGrouping
  } = useDrawingsTable()

  const [open, setOpen] = useState(true)

  return (
    <div className="flex h-[calc(100vh-54px)] flex-col">
      <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-2">
        <DataTableFilterList filters={extractedDataFilters} />
      </div>
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel
          defaultSize={open ? 30 : 4}
          minSize={open ? 30 : 4}
          maxSize={open ? 80 : 4}
        >
          <Collapsible open={open} onOpenChange={setOpen}>
            <div className="size-full space-y-4 overflow-scroll p-6 scrollbar-none">
              <div className="flex items-center justify-between">
                {open && (
                  <div className="flex items-center gap-2">
                    <DrawingIcon className="size-[18px] text-zinc-950/80" />
                    <h4 className="text-sm font-medium text-zinc-950">
                      Drawings
                    </h4>
                  </div>
                )}

                <CollapsibleTrigger className="data-[state=open]:rotate-180">
                  <PanelIcon className="size-4 text-zinc-700" />
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-zinc-500">
                    {pages.length} total
                  </p>
                  <DataTableGroupOptions
                    state={grouping}
                    setState={setGrouping}
                    options={[
                      {
                        id: 'drawing_discipline',
                        label: 'discipline'
                      }
                    ]}
                  />
                </div>

                <div className="w-full">
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
                        {table.getRowModel().rows.length > 0 ? (
                          table.getRowModel().rows.map(row => (
                            <TableRow
                              key={row.id}
                              data-state={row.getIsSelected() && 'selected'}
                              className={cn({
                                'bg-zinc-100':
                                  selectedPage?.page_id === row.original.page_id
                              })}
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
                                    <>
                                      {!row.getIsGrouped() &&
                                        flexRender(
                                          cell.column.columnDef.cell,
                                          cell.getContext()
                                        )}
                                    </>
                                  )}
                                </TableCell>
                              ))}
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
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={70} minSize={20}>
          <div className="size-full">
            {selectedPage == null ? (
              <div className="flex size-full items-center justify-center">
                <p className="text-sm text-zinc-600">
                  Please select a drawing to view details
                </p>
              </div>
            ) : (
              <DrawingDetails
                page={selectedPage}
                canGoPrev={canGoPrev}
                canGoNext={canGoNext}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
                extractedDataFilters={extractedDataFilters.filters}
              />
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
