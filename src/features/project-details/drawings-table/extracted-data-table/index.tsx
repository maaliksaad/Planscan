'use client'

import { flexRender } from '@tanstack/react-table'
import {
  type Dispatch,
  type FC,
  type SetStateAction,
  useMemo,
  useState
} from 'react'

import { DataTableViewOptions } from '@/components/data-table/data-table-toolbar/data-table-view-option'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import { ResizablePanel } from '@/components/ui/resizeable'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { RemoveTextGroups } from '@/features/project-details/remove-text-groups'
import { PanelIcon } from '@/icons/panel'
import type { TextGroup } from '@/lib/graphql'
import type { Filter } from '@/types/data-table'
import type { TextGroupWithRect } from '@/types/text-groups'

import type { TransformedTextGroup } from './extracted-data-table.types'
import { transformTextGroupsData } from './extracted-data-table.utils'
import { useExtractedDataTable } from './use-extracted-data-table'

interface ExtractedDataTableProps {
  textGroups: TextGroup[]
  filters: Array<Filter<TransformedTextGroup>>
  activeTextGroups: TextGroupWithRect[]
  setActiveTextGroups: Dispatch<SetStateAction<TextGroupWithRect[]>>
}

export const ExtractedDataTable: FC<ExtractedDataTableProps> = ({
  textGroups: initialTextGroups,
  filters,
  activeTextGroups,
  setActiveTextGroups
}) => {
  const textGroups = useMemo(
    () => transformTextGroupsData(initialTextGroups),
    [initialTextGroups]
  )

  const [open, setOpen] = useState(true)

  const { table } = useExtractedDataTable({
    textGroups,
    filters,
    activeTextGroups,
    setActiveTextGroups
  })

  return (
    <ResizablePanel
      defaultSize={open ? 40 : 10}
      minSize={open ? 20 : 10}
      maxSize={open ? 80 : 10}
    >
      <Collapsible className="size-full" open={open} onOpenChange={setOpen}>
        <div className="flex h-full flex-col gap-2 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-900">
              Extracted data
            </h3>
            <CollapsibleTrigger className="data-[state=open]:rotate-180">
              <PanelIcon className="size-4 -rotate-90 text-zinc-700" />
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <p className="text-sm font-medium text-zinc-500">
                  {activeTextGroups.length > 0
                    ? `${activeTextGroups.length} selected`
                    : `${table.getPrePaginationRowModel().rows.length} total`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <RemoveTextGroups
                  textGroupIds={activeTextGroups.map(t => t.text_group_id)}
                />

                <DataTableViewOptions table={table} />
              </div>
            </div>

            <div className="relative h-full w-full flex-1 overflow-y-auto rounded-md border scrollbar-none">
              <Table id="extracted-data-table" className="h-full">
                <TableHeader className="">
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
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map(cell => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow className="hover:bg-transparent">
                      <TableCell colSpan={4} className="h-24 text-center">
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </ResizablePanel>
  )
}
