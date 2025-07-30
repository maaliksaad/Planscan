import {
  type ExpandedState,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  type Table,
  type Updater,
  useReactTable
} from '@tanstack/react-table'
import type { GroupingState } from '@tanstack/table-core'
import dayjs from 'dayjs'
import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useMemo,
  useState
} from 'react'

import { useSyncedState } from '@/hooks/use-synced-state'
import { useProjectStore } from '@/stores/project-store'
import type { DataTableFilterField, Filter } from '@/types/data-table'

import type { CSICodeWithKey } from './trades-table.types'
import {
  formatTradesTableData,
  getTradesTableColumns,
  getTradesTableFilters
} from './trades-table.utils'

interface UseTradesTableReturn {
  table: Table<CSICodeWithKey>
  csiCodes: CSICodeWithKey[]
  fields: Array<DataTableFilterField<CSICodeWithKey>>
  filters: Array<Filter<CSICodeWithKey>>
  setFilters: Dispatch<SetStateAction<Array<Filter<CSICodeWithKey>>>>
}

export const useTradesTable = (): UseTradesTableReturn => {
  const {
    project,
    csi_codes: csiCodes,
    trade_packages: trades
  } = useProjectStore()(state => state)

  const [grouping] = useState<GroupingState>(['key'])
  const [expanded, setExpanded] = useState<ExpandedState>({})
  const [filters, setFilters] = useSyncedState<Array<Filter<CSICodeWithKey>>>(
    [],
    {
      key: `trades-table-filters-${project.project_id}`
    }
  )

  const columns = useMemo(
    () =>
      getTradesTableColumns(
        trades.toSorted((a, b) => dayjs(b.created_at).diff(dayjs(a.created_at)))
      ),
    [trades]
  )
  const data = useMemo(
    () => formatTradesTableData(csiCodes, trades),
    [csiCodes, trades]
  )
  const fields = useMemo(() => getTradesTableFilters(data), [data])

  const onExpandedChange = useCallback(
    (state: Updater<ExpandedState>) => {
      const newExpanded = typeof state === 'function' ? state(expanded) : state

      if (
        Object.keys(newExpanded).length === 0 &&
        Object.keys(expanded).length > 0
      ) {
        return
      }

      setExpanded(newExpanded)
    },
    [expanded]
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      grouping,
      expanded,
      columnFilters: filters
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    onExpandedChange
  })

  return {
    table,
    fields,
    filters,
    setFilters,
    csiCodes: data
  }
}
