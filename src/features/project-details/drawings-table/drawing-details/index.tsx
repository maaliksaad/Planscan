import type { FC } from 'react'

import { Button } from '@/components/ui/button'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizeable'
import { DrawingCanvas } from '@/features/drawing-canvas'
import { ExportData } from '@/features/export-data'
import { useSyncedState } from '@/hooks/use-synced-state'
import { ChevronLeftIcon } from '@/icons/chevron-left'
import { ChevronRightIcon } from '@/icons/chevron-right'
import type { Page } from '@/lib/graphql'
import type { Filter } from '@/types/data-table'
import type { TextGroupWithRect } from '@/types/text-groups'

import { ExtractedDataTable } from '../extracted-data-table'
import type { TransformedTextGroup } from '../extracted-data-table/extracted-data-table.types'

interface DrawingDetailsProps {
  page: Page
  canGoPrev: boolean
  canGoNext: boolean
  handlePrevPage: () => void
  handleNextPage: () => void
  extractedDataFilters: Array<Filter<TransformedTextGroup>>
}

export const DrawingDetails: FC<DrawingDetailsProps> = ({
  page,
  canGoPrev,
  canGoNext,
  handlePrevPage,
  handleNextPage,
  extractedDataFilters
}) => {
  const [activeTextGroups, setActiveTextGroups] = useSyncedState<
    TextGroupWithRect[]
  >([], {
    key: `active-text-groups-${page.page_id}`
  })

  return (
    <ResizablePanelGroup direction="vertical" className="size-full">
      <ResizablePanel defaultSize={60} minSize={20}>
        <div className="flex w-full items-center justify-between border-b border-zinc-200 px-4 py-2">
          <h2 className="text-sm font-medium text-zinc-900">
            {page.drawing_number} {page.sheet_title}
          </h2>

          <div className="flex items-center gap-4">
            <ExportData filters={extractedDataFilters} />

            <div className="flex gap-2">
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
          </div>
        </div>

        <div className="h-[calc(100%-48px)] overflow-hidden">
          <DrawingCanvas
            page={page}
            editable
            activeTextGroups={activeTextGroups}
            setActiveTextGroups={setActiveTextGroups}
          />
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ExtractedDataTable
        textGroups={page.text_groups ?? []}
        filters={extractedDataFilters}
        activeTextGroups={activeTextGroups}
        setActiveTextGroups={setActiveTextGroups}
      />
    </ResizablePanelGroup>
  )
}
