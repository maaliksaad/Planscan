import type { RowData } from '@tanstack/table-core'

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: string) => void
  }
}

interface Option {
  label: string
  value: string
  count?: boolean
}

export type StringKeyOf<TData> = Extract<keyof TData, string>

export type ColumnType =
  | 'text'
  | 'number'
  | 'boolean'
  | 'select'
  | 'multi-select'

export type FilterOperator =
  | 'iLike'
  | 'notILike'
  | 'eq'
  | 'ne'
  | 'isNull'
  | 'isNotNull'
  | 'lt'
  | 'lte'
  | 'gt'
  | 'gte'

export interface DataTableFilterField<TData> {
  id: StringKeyOf<TData>
  label: string
  placeholder?: string
  options?: Option[]
  type: ColumnType
}

export type Filter<TData> = {
  id: StringKeyOf<TData>
  value: string | string[]
  type: ColumnType
  operator: FilterOperator
  rowId: string
}

export type GroupingOptions<TData> = Array<{
  id: StringKeyOf<TData>
  label: string
}>
