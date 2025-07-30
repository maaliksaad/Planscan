'use client'

import type { Dispatch, FC, SetStateAction } from 'react'

import { DebouncedInput } from '@/components/debounced-input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { DrawingCanvas } from '@/features/drawing-canvas'
import { ChevronLeftIcon } from '@/icons/chevron-left'
import { ChevronRightIcon } from '@/icons/chevron-right'
import { TrashIcon } from '@/icons/trash'
import type { Page } from '@/lib/graphql'

import {
  type DrawingDiscipline,
  ReviewDrawingTab
} from '../../review-drawing.types'
import { useDrawingPagesGrid } from './use-drawing-pages-grid'

interface DrawingPagesGridProps {
  setCurrentTab: (tab: ReviewDrawingTab) => void
  disciplines: DrawingDiscipline[]
  handleRemovePages: (pageIds: string[]) => Promise<void>
  removingPages: boolean
  handleReviewDrawing: () => Promise<void>
  reviewingDrawing: boolean
  pages: Page[]
  setPages: Dispatch<SetStateAction<Page[]>>
}

export const DrawingPagesGrid: FC<DrawingPagesGridProps> = ({
  setCurrentTab,
  handleRemovePages,
  removingPages,
  handleReviewDrawing,
  reviewingDrawing,
  disciplines,
  pages,
  setPages
}) => {
  const {
    currentPage,
    currentPageIndex,
    handlePrevPage,
    canGoPrev,
    handleNextPage,
    canGoNext,
    handleNumberChange,
    handleDisciplineChange,
    handleTitleChange,
    handlePageIndexChange
  } = useDrawingPagesGrid({
    disciplines,
    pages,
    setPages
  })

  return (
    <div className="h-full w-full">
      <div className="w-full border-t border-zinc-200 px-8 py-2">
        <div className="flex w-full items-center justify-between">
          <div className="flex w-full items-center gap-4">
            <div className="flex items-center gap-2">
              <Label className="whitespace-nowrap">Drawing no.</Label>
              <DebouncedInput
                className="flex h-9 w-[80px] rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 tablet:text-sm"
                value={currentPage.drawing_number ?? ''}
                onBlur={value => {
                  handleNumberChange(currentPage.page_id, value)
                }}
              />
            </div>

            <div className="flex items-center gap-2">
              <Label className="whitespace-nowrap">Discipline</Label>
              <DebouncedInput
                className="flex h-9 w-[120px] rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 tablet:text-sm"
                value={currentPage.drawing_discipline ?? ''}
                onBlur={value => {
                  handleDisciplineChange(currentPage.page_id, value)
                }}
              />
            </div>

            <div className="flex items-center gap-2">
              <Label className="whitespace-nowrap">Drawing title</Label>
              <DebouncedInput
                className="flex h-9 w-[160px] rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 tablet:text-sm"
                value={currentPage.sheet_title ?? ''}
                onBlur={value => {
                  handleTitleChange(currentPage.page_id, value)
                }}
              />
            </div>
          </div>

          <div className="flex w-full items-center justify-end gap-4">
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="ghost"
                className="h-full p-0 text-red-500 hover:bg-transparent hover:text-red-500"
                onClick={async () => {
                  await handleRemovePages([currentPage.page_id])
                }}
                disabled={removingPages}
              >
                <TrashIcon className="size-4" />
                Delete
              </Button>

              <div className="flex items-center gap-1">
                <DebouncedInput
                  className="w-fit border-none bg-transparent p-0 text-right"
                  style={{
                    width: `${pages.length.toString().length}ch`
                  }}
                  value={(currentPageIndex + 1).toString()}
                  onBlur={value => {
                    handlePageIndexChange(value)
                  }}
                />
                <p className="text-nowrap">of {pages.length}</p>
              </div>

              <Button
                variant="outline"
                size="icon-sm"
                onClick={handlePrevPage}
                disabled={!canGoPrev}
              >
                <ChevronLeftIcon className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                onClick={handleNextPage}
                disabled={!canGoNext}
              >
                <ChevronRightIcon className="size-4" />
              </Button>
            </div>

            <div className="flex items-center justify-center gap-2">
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
        </div>
      </div>

      <div className="relative h-[calc(100vh-175px)] w-full border-t border-zinc-200">
        <DrawingCanvas page={currentPage} />
      </div>
    </div>
  )
}
