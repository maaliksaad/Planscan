import {
  getCoreRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  useReactTable
} from '@tanstack/react-table'
import type { GroupingState, Row, Table } from '@tanstack/table-core'
import { useQueryState } from 'nuqs'
import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'

import { SearchBarKeys } from '@/constants/searchbar'
import { useSyncedState } from '@/hooks/use-synced-state'
import type { Page } from '@/lib/graphql'
import { useProjectStore } from '@/stores/project-store'
import type { DataTableFilterField, Filter } from '@/types/data-table'

import { getDrawingTableColumns } from './drawings-table.utils'
import type { TransformedTextGroup } from './extracted-data-table/extracted-data-table.types'
import {
  getExtractedDataTableColumns,
  getExtractedDataTableFilters,
  transformTextGroupsData
} from './extracted-data-table/extracted-data-table.utils'

interface UseDrawingsTableReturn {
  table: Table<Page>
  pages: Page[]
  selectedPage: Page | null
  canGoPrev: boolean
  canGoNext: boolean
  handlePrevPage: () => void
  handleNextPage: () => void
  grouping: GroupingState
  setGrouping: Dispatch<SetStateAction<GroupingState>>
  extractedDataFilters: {
    filters: Array<Filter<TransformedTextGroup>>
    setFilters: Dispatch<SetStateAction<Array<Filter<TransformedTextGroup>>>>
    fields: Array<DataTableFilterField<TransformedTextGroup>>
  }
}

export const useDrawingsTable = (): UseDrawingsTableReturn => {
  const { project, pages, csi_codes, trade_packages } = useProjectStore()(
    state => state
  )

  const [extractedDataFilters, setExtractedDataFilters] = useSyncedState<
    Array<Filter<TransformedTextGroup>>
  >([], {
    key: `extracted-data-filters-${project.project_id}`
  })

  const [grouping, setGrouping] = useState<GroupingState>([])
  const [currentPage, setCurrentPage] = useSyncedState<Page | null>(null, {
    key: `current-page-${project.project_id}`
  })

  const [searchParam] = useQueryState(SearchBarKeys.DRAWING_SEARCH, {
    defaultValue: ''
  })

  const extractedDataColumns = useMemo(
    () => getExtractedDataTableColumns([]),
    []
  )

  const filtersFields = useMemo(
    () =>
      getExtractedDataTableFilters(
        csi_codes,
        trade_packages.map(trade => trade.trade_package_name)
      ),
    [csi_codes, trade_packages]
  )

  const filteredPages = useMemo(() => {
    if (extractedDataFilters.length === 0 && searchParam === '') {
      return pages
    }

    return pages
      .filter(p =>
        transformTextGroupsData(p.text_groups ?? []).some(textGroup =>
          extractedDataFilters.every(filter => {
            const filterFunction = extractedDataColumns.find(
              col => col.id === filter.id
            )?.filterFn

            return typeof filterFunction === 'function'
              ? filterFunction(
                  {
                    original: {
                      ...textGroup
                    }
                  } as unknown as Row<TransformedTextGroup>,
                  filter.id,
                  filter.value,
                  () => {
                    //
                  }
                )
              : true
          })
        )
      )
      .filter(p =>
        searchParam === ''
          ? true
          : p.sheet_title?.toLowerCase().includes(searchParam.toLowerCase())
      )
  }, [pages, extractedDataFilters, extractedDataColumns, searchParam])

  const canGoPrev = useMemo(() => {
    if (currentPage == null) {
      return false
    }

    const currentPageIndex = filteredPages.findIndex(
      page => page.page_id === currentPage.page_id
    )

    return currentPageIndex > 0
  }, [currentPage, filteredPages])

  const canGoNext = useMemo(() => {
    if (currentPage == null) {
      return false
    }

    const currentPageIndex = filteredPages.findIndex(
      page => page.page_id === currentPage.page_id
    )

    return currentPageIndex < filteredPages.length - 1
  }, [currentPage, filteredPages])

  const handlePrevPage = useCallback(() => {
    if (currentPage == null) {
      return
    }

    const currentPageIndex = filteredPages.findIndex(
      page => page.page_id === currentPage.page_id
    )

    if (currentPageIndex > 0) {
      setCurrentPage(filteredPages[currentPageIndex - 1])
    }
  }, [setCurrentPage, currentPage, filteredPages])

  const handleNextPage = useCallback(() => {
    if (currentPage == null) {
      return
    }

    const currentPageIndex = filteredPages.findIndex(
      page => page.page_id === currentPage.page_id
    )

    if (currentPageIndex < filteredPages.length - 1) {
      setCurrentPage(filteredPages[currentPageIndex + 1])
    }
  }, [setCurrentPage, currentPage, filteredPages])

  const handleSelectPage = useCallback(
    (page: Page) => {
      setCurrentPage(page)
    },
    [setCurrentPage]
  )

  const columns = useMemo(
    () => getDrawingTableColumns(handleSelectPage),
    [handleSelectPage]
  )

  const table = useReactTable({
    data: filteredPages,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      grouping
    },
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel()
  })

  useEffect(() => {
    setCurrentPage(prev => pages.find(p => p.page_id === prev?.page_id) ?? null)
  }, [setCurrentPage, pages])

  useEffect(() => {
    if (!filteredPages.some(page => page.page_id === currentPage?.page_id)) {
      setCurrentPage(null)
    }
  }, [filteredPages, setCurrentPage, currentPage?.page_id])

  return {
    table,
    pages: filteredPages,
    selectedPage: currentPage,
    canGoPrev,
    canGoNext,
    handlePrevPage,
    handleNextPage,
    grouping,
    setGrouping,
    extractedDataFilters: {
      filters: extractedDataFilters,
      setFilters: setExtractedDataFilters,
      fields: filtersFields
    }
  }
}
