'use client'

import Link from 'next/link'
import type { Dispatch, FC, SetStateAction } from 'react'

import { DebouncedInput } from '@/components/debounced-input'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ABSOLUTE_ROUTES } from '@/constants/routes'
import { PlusIcon } from '@/icons/plus'
import { TrashIcon } from '@/icons/trash'
import type { Page } from '@/lib/graphql'

import type {
  DrawingDiscipline,
  ReviewDrawingTab
} from '../review-drawing.types'
import { useReviewDrawingDisciplines } from './use-review-drawing-disciplines'

interface ReviewDrawingDisciplinesProps {
  setCurrentTab: (tab: ReviewDrawingTab) => void
  disciplines: DrawingDiscipline[]
  setDisciplines: Dispatch<SetStateAction<DrawingDiscipline[]>>
  pages: Page[]
  setPages: Dispatch<SetStateAction<Page[]>>
}

export const ReviewDrawingDisciplines: FC<ReviewDrawingDisciplinesProps> = ({
  setCurrentTab,
  disciplines,
  setDisciplines,
  pages,
  setPages
}) => {
  const {
    project,
    handleCodeChange,
    handleDisciplineChange,
    addDrawingDiscipline,
    handleConfirmDisciplines,
    removeDrawingDiscipline
  } = useReviewDrawingDisciplines({
    disciplines,
    setDisciplines,
    setCurrentTab,
    pages,
    setPages
  })

  return (
    <div className="mx-auto max-w-6xl space-y-4 px-6 py-8 mobile:px-12 tablet:px-24 laptop:px-[120px]">
      <div className="space-y-3">
        <h1 className="text-lg font-semibold text-zinc-950">
          Review drawing disciplines (1 of 2)
        </h1>
        <p className="text-sm text-zinc-600">
          We&apos;ve extracted these drawing disciplines from your attached
          project file.
          <br />
          Please review and confirm the drawing letters that correspond to the
          correct drawing discipline.
        </p>
      </div>

      <div className="mx-16 rounded-lg border border-zinc-200 p-6">
        <div className="">
          {disciplines.map(discipline => (
            <div
              key={discipline.id}
              className="group flex w-full items-center justify-between gap-2 rounded-lg p-2 hover:bg-zinc-100"
            >
              <DebouncedInput
                className="flex h-9 w-20 rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 tablet:text-sm"
                placeholder="Drawing discipline"
                value={discipline.code}
                onBlur={value => {
                  handleCodeChange(discipline.id, value)
                }}
              />

              <Input
                value={discipline.discipline}
                onChange={e => {
                  handleDisciplineChange(discipline.id, e.target.value)
                }}
                className="w-full flex-1"
              />

              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => {
                  removeDrawingDiscipline(discipline.id)
                }}
                className="hidden group-hover:block"
              >
                <TrashIcon className="size-4" />
              </Button>

              <div className="block size-4 group-hover:hidden" />
            </div>
          ))}

          <Button
            variant="ghost"
            onClick={addDrawingDiscipline}
            className="p-0 text-zinc-500 hover:bg-transparent hover:text-zinc-600"
          >
            <PlusIcon />
            Add drawing discipline
          </Button>
        </div>
      </div>

      <div className="flex w-full justify-end gap-4">
        <Button variant="ghost" asChild>
          <Link href={ABSOLUTE_ROUTES.getProjectPath(project.project_id)}>
            Back to project
          </Link>
        </Button>

        <Button onClick={handleConfirmDisciplines}>
          Confirm drawing disciplines
        </Button>
      </div>
    </div>
  )
}
