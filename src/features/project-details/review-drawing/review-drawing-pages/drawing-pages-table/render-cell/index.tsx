'use client'

import type { CellContext } from '@tanstack/table-core'
import type { FC } from 'react'

import { DebouncedInput } from '@/components/debounced-input'
import type { Page } from '@/lib/graphql'

export const RenderCell: FC<CellContext<Page, unknown>> = ({
  table,
  getValue,
  row: { index },
  column: { id }
}) => {
  const initialValue = getValue<string>().toString()

  const onBlur = (value: string): void => {
    table.options.meta?.updateData(index, id, value)
  }

  return (
    <DebouncedInput
      className="w-full border-none bg-transparent p-0"
      value={initialValue}
      onBlur={onBlur}
    />
  )
}
