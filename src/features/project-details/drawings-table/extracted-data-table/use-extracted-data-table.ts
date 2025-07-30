'use client'

import {
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table'
import type { Table } from '@tanstack/table-core'
import { type Dispatch, type SetStateAction, useMemo } from 'react'

import type { Filter } from '@/types/data-table'
import type { TextGroupWithRect } from '@/types/text-groups'

import type { TransformedTextGroup } from './extracted-data-table.types'
import { getExtractedDataTableColumns } from './extracted-data-table.utils'

interface UseExtractedDataTableParams {
  textGroups: TransformedTextGroup[]
  filters: Array<Filter<TransformedTextGroup>>
  activeTextGroups: TextGroupWithRect[]
  setActiveTextGroups: Dispatch<SetStateAction<TextGroupWithRect[]>>
}

interface UseExtractedDataTableReturn {
  table: Table<TransformedTextGroup>
}

export const useExtractedDataTable = ({
  textGroups,
  filters,
  activeTextGroups,
  setActiveTextGroups
}: UseExtractedDataTableParams): UseExtractedDataTableReturn => {
  const columns = useMemo(
    () => getExtractedDataTableColumns(activeTextGroups),
    [activeTextGroups]
  )

  const rowSelection = useMemo(() => {
    const selected = textGroups
      .filter(tg =>
        activeTextGroups.some(g => g.text_group_id === tg.text_group_id)
      )
      .map(tg => textGroups.indexOf(tg))

    return selected.reduce<Record<number, boolean>>((acc, index) => {
      acc[index] = true
      return acc
    }, {})
  }, [activeTextGroups, textGroups])

  const table = useReactTable({
    data: textGroups,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection,
      columnFilters: filters
    },
    enableRowSelection: true,
    onRowSelectionChange: rows => {
      if (typeof rows === 'function') {
        const selected = textGroups
          .filter(tg =>
            activeTextGroups.some(g => g.text_group_id === tg.text_group_id)
          )
          .map(tg => textGroups.indexOf(tg))

        const data = rows(
          selected.reduce<Record<number, boolean>>((acc, index) => {
            acc[index] = true
            return acc
          }, {})
        )

        // @ts-expect-error - data type
        setActiveTextGroups(Object.keys(data).map(index => textGroups[+index]))
      } else {
        // @ts-expect-error - rows type
        setActiveTextGroups(Object.keys(rows).map(index => textGroups[+index]))
      }
    },
    getFilteredRowModel: getFilteredRowModel()
  })

  return {
    table
  }
}
