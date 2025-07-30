import {
  getCoreRowModel,
  type RowSelectionState,
  useReactTable
} from '@tanstack/react-table'
import type { Table } from '@tanstack/table-core'
import { type Dispatch, type SetStateAction, useMemo, useState } from 'react'

import type { DrawingDiscipline } from '@/features/project-details/review-drawing/review-drawing.types'
import { useSyncedState } from '@/hooks/use-synced-state'
import type { Page } from '@/lib/graphql'
import { useProjectStore } from '@/stores/project-store'
import { extractDrawingPrefix } from '@/utils/drawings'

import { getDrawingPagesTableColumns } from './drawing-pages-table.utils'

interface UseDrawingPagesTableParams {
  removingPages: boolean
  handleRemovePages: (pageIds: string[]) => Promise<void>
  disciplines: DrawingDiscipline[]
  pages: Page[]
  setPages: Dispatch<SetStateAction<Page[]>>
}

interface UseDrawingPagesTableReturn {
  table: Table<Page>
}

export const useDrawingPagesTable = ({
  removingPages,
  handleRemovePages,
  disciplines,
  pages,
  setPages
}: UseDrawingPagesTableParams): UseDrawingPagesTableReturn => {
  const project = useProjectStore()(state => state.project)

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const [viewedPages, setViewedPages] = useSyncedState<string[]>([], {
    key: `viewed-pages-${project.project_id}`
  })

  const columns = useMemo(
    () =>
      getDrawingPagesTableColumns(
        pages,
        handleRemovePages,
        removingPages,
        viewedPages
      ),
    [pages, handleRemovePages, removingPages, viewedPages]
  )

  const table = useReactTable({
    data: pages,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection
    },
    onRowSelectionChange: setRowSelection,
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setPages(
          pages.map((row, index) => {
            if (index === rowIndex) {
              if (columnId === 'drawing_number') {
                const prefix = extractDrawingPrefix(value)

                if (prefix != null) {
                  return {
                    ...pages[rowIndex],
                    drawing_number: value,
                    drawing_discipline:
                      disciplines.find(discipline => discipline.code === prefix)
                        ?.discipline ?? row.drawing_discipline
                  }
                }
              }

              return {
                ...pages[rowIndex],
                [columnId]: value
              }
            }
            return row
          })
        )

        setViewedPages(prev => [...new Set([...prev, pages[rowIndex].page_id])])
      }
    }
  })

  return {
    table
  }
}
