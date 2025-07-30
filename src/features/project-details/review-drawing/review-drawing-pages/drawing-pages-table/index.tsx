import { flexRender } from '@tanstack/react-table'
import type { Dispatch, FC, SetStateAction } from 'react'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import type { Page } from '@/lib/graphql'

import {
  type DrawingDiscipline,
  ReviewDrawingTab
} from '../../review-drawing.types'
import { useDrawingPagesTable } from './use-drawing-pages-table'

interface DrawingPagesTableProps {
  setCurrentTab: (tab: ReviewDrawingTab) => void
  handleRemovePages: (pageIds: string[]) => Promise<void>
  removingPages: boolean
  handleReviewDrawing: () => Promise<void>
  reviewingDrawing: boolean
  disciplines: DrawingDiscipline[]
  pages: Page[]
  setPages: Dispatch<SetStateAction<Page[]>>
}

export const DrawingPagesTable: FC<DrawingPagesTableProps> = ({
  setCurrentTab,
  handleRemovePages,
  removingPages,
  handleReviewDrawing,
  reviewingDrawing,
  disciplines,
  pages,
  setPages
}) => {
  const { table } = useDrawingPagesTable({
    removingPages,
    handleRemovePages,
    disciplines,
    pages,
    setPages
  })

  return (
    <div className="mx-auto mb-6 mt-3 w-full max-w-6xl space-y-4 mobile:px-12 tablet:px-24 laptop:px-[120px]">
      <p className="text-sm text-zinc-600">
        We&apos;ve extracted these drawings from your attached project file. You
        may double click a row value to edit. <br />
        Please review and confirm the drawing details before adding them to the
        project.
      </p>

      <div className="overflow-hidden rounded-lg border border-zinc-200">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id} className="p-2">
                {headerGroup.headers.map(header => (
                  <TableHead
                    key={header.id}
                    style={{
                      width: header.column.columnDef.size
                    }}
                    className={
                      headerGroup.headers.indexOf(header) ===
                      headerGroup.headers.length - 1
                        ? 'text-right'
                        : ''
                    }
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

          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      key={cell.id}
                      className={
                        index === row.getVisibleCells().length - 1
                          ? 'text-right'
                          : ''
                      }
                    >
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

      <div className="flex w-full justify-end gap-4">
        <Button
          variant="ghost"
          onClick={() => {
            setCurrentTab(ReviewDrawingTab.DISCIPLINES_TAB)
          }}
        >
          Back
        </Button>

        <Button onClick={handleReviewDrawing} disabled={reviewingDrawing}>
          Confirm, add all drawings
        </Button>
      </div>
    </div>
  )
}
