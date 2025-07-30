import type { Dispatch, FC, SetStateAction } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ImageIcon } from '@/icons/image'
import { TableIcon } from '@/icons/table'
import type { Page } from '@/lib/graphql'

import type {
  DrawingDiscipline,
  ReviewDrawingTab
} from '../review-drawing.types'
import { DrawingPagesGrid } from './drawing-pages-grid'
import { DrawingPagesTable } from './drawing-pages-table'
import { ReviewDrawingPagesTab } from './review-drawing-pages.types'
import { useReviewDrawingPages } from './use-review-drawing-pages'

interface ReviewDrawingPagesProps {
  setCurrentTab: (tab: ReviewDrawingTab) => void
  disciplines: DrawingDiscipline[]
  pages: Page[]
  setPages: Dispatch<SetStateAction<Page[]>>
}

export const ReviewDrawingPages: FC<ReviewDrawingPagesProps> = ({
  setCurrentTab,
  disciplines,
  pages,
  setPages
}) => {
  const {
    handleRemovePages,
    removingPages,
    reviewingDrawing,
    handleReviewDrawing,
    tab,
    setTab
  } = useReviewDrawingPages({
    pages,
    setPages
  })

  return (
    <div className="mt-4 w-full">
      <Tabs
        value={tab}
        onValueChange={value => {
          setTab(value as ReviewDrawingPagesTab)
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between mobile:px-12 tablet:px-24 laptop:px-[120px]">
          <h1 className="text-lg font-semibold text-zinc-950">
            Review drawings (2 of 2)
          </h1>

          <TabsList className="mt-0 h-auto">
            <TabsTrigger
              value={ReviewDrawingPagesTab.TABLE_TAB}
              className="size-8 p-0"
            >
              <TableIcon className="size-4" />
            </TabsTrigger>
            <TabsTrigger
              value={ReviewDrawingPagesTab.GRID_TAB}
              className="size-8 p-0"
            >
              <ImageIcon className="size-4" />
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={ReviewDrawingPagesTab.TABLE_TAB}>
          <DrawingPagesTable
            setCurrentTab={setCurrentTab}
            handleRemovePages={handleRemovePages}
            removingPages={removingPages}
            handleReviewDrawing={handleReviewDrawing}
            reviewingDrawing={reviewingDrawing}
            disciplines={disciplines}
            pages={pages}
            setPages={setPages}
          />
        </TabsContent>

        <TabsContent value={ReviewDrawingPagesTab.GRID_TAB}>
          <DrawingPagesGrid
            pages={pages}
            setPages={setPages}
            setCurrentTab={setCurrentTab}
            disciplines={disciplines}
            handleRemovePages={handleRemovePages}
            removingPages={removingPages}
            handleReviewDrawing={handleReviewDrawing}
            reviewingDrawing={reviewingDrawing}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
