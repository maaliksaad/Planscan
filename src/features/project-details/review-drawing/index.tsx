'use client'

import type { FC } from 'react'

import { Tabs, TabsContent } from '@/components/ui/tabs'

import { ReviewDrawingTab } from './review-drawing.types'
import { ReviewDrawingDisciplines } from './review-drawing-disciplines'
import { ReviewDrawingPages } from './review-drawing-pages'
import { useReviewDrawing } from './use-review-drawing'

export const ReviewDrawing: FC = () => {
  const {
    pages,
    setPages,
    currentTab,
    setCurrentTab,
    disciplines,
    setDisciplines
  } = useReviewDrawing()

  return (
    <Tabs value={currentTab} className="size-full">
      <TabsContent
        value={ReviewDrawingTab.DISCIPLINES_TAB}
        className="mt-0 size-full data-[state='inactive']:hidden"
      >
        <ReviewDrawingDisciplines
          setCurrentTab={setCurrentTab}
          disciplines={disciplines}
          setDisciplines={setDisciplines}
          pages={pages}
          setPages={setPages}
        />
      </TabsContent>

      <TabsContent
        value={ReviewDrawingTab.PAGES_TAB}
        className="mt-0 size-full data-[state='inactive']:hidden"
      >
        <ReviewDrawingPages
          disciplines={disciplines}
          setCurrentTab={setCurrentTab}
          pages={pages}
          setPages={setPages}
        />
      </TabsContent>
    </Tabs>
  )
}
