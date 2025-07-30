/* eslint-disable unicorn/prefer-query-selector */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import {
  type Dispatch,
  type ReactElement,
  type SetStateAction,
  useId
} from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { MultiSelect } from '@/components/ui/multi-select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { SearchSelect } from '@/components/ui/search-select'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { DATA_TABLE_CONFIG } from '@/constants/data-table'
import { CheckIcon } from '@/icons/check'
import { ChevronDownIcon } from '@/icons/chevron-down'
import { FunnelIcon } from '@/icons/funnel'
import { TrashIcon } from '@/icons/trash'
import { XMarkIcon } from '@/icons/x-mark'
import type {
  ColumnType,
  DataTableFilterField,
  Filter,
  FilterOperator,
  StringKeyOf
} from '@/types/data-table'
import { cn } from '@/utils/cn'
import { generateId } from '@/utils/generate-id'

interface DataTableFilterListProps<TData> {
  filters: {
    fields: Array<DataTableFilterField<TData>>
    filters: Array<Filter<TData>>
    setFilters: Dispatch<SetStateAction<Array<Filter<TData>>>>
  }
}

const getFilterOperators = (
  columnType: ColumnType
): Array<{ label: string; value: FilterOperator }> => {
  const operatorMap: Record<
    ColumnType,
    Array<{ label: string; value: FilterOperator }>
  > = {
    text: DATA_TABLE_CONFIG.textOperators,
    number: DATA_TABLE_CONFIG.numericOperators,
    select: DATA_TABLE_CONFIG.selectOperators,
    boolean: DATA_TABLE_CONFIG.booleanOperators,
    'multi-select': DATA_TABLE_CONFIG.selectOperators
  }

  return operatorMap[columnType] ?? DATA_TABLE_CONFIG.textOperators
}

const getFilterValue = <TData,>(filter: Filter<TData>): string => {
  if (typeof filter.value === 'string') {
    return filter.value
  }

  if (Array.isArray(filter.value)) {
    if (filter.value.length === 0) return ''

    if (filter.value.length === 1) return filter.value[0]

    return `${filter.value.length} selected`
  }

  return ''
}

export const DataTableFilterList = <TData,>({
  filters: { fields, filters, setFilters }
}: DataTableFilterListProps<TData>): ReactElement => {
  const id = useId()

  const addFilter = (): void => {
    const { 0: filterField } = fields

    if (filterField == null) return

    setFilters([
      ...filters,
      {
        id: filterField.id,
        value: '',
        type: filterField.type,
        operator: filterField.type === 'text' ? 'iLike' : 'eq',
        rowId: generateId()
      }
    ])
  }

  const updateFilter = ({
    rowId,
    field
  }: {
    rowId: string
    field: Omit<Partial<Filter<TData>>, 'rowId'>
  }): void => {
    setFilters(prevFilters => {
      return prevFilters.map(filter => {
        if (filter.rowId === rowId) {
          return { ...filter, ...field }
        }
        return filter
      })
    })
  }

  const removeFilter = (rowId: string): void => {
    setFilters(prevFilters =>
      prevFilters.filter(filter => filter.rowId !== rowId)
    )
  }

  const renderFilterInput = ({
    filter,
    inputId
  }: {
    filter: Filter<TData>
    inputId: string
  }): ReactElement | null => {
    const filterField = fields.find(f => f.id === filter.id)

    if (filterField == null) return null

    if (filter.operator === 'isNull' || filter.operator === 'isNotNull') {
      return (
        <div
          id={inputId}
          role="status"
          aria-live="polite"
          aria-label={`${filterField.label} filter is ${filter.operator === 'isNull' ? 'empty' : 'not empty'}`}
          className="h-8 w-full rounded border border-dashed"
        />
      )
    }

    switch (filter.type) {
      case 'text':
      case 'number': {
        return (
          <Input
            id={inputId}
            type={filter.type}
            aria-label={`${filterField.label} filter value`}
            aria-describedby={`${inputId}-description`}
            placeholder={filterField.placeholder ?? 'Enter a value...'}
            className="h-8 w-full rounded"
            defaultValue={
              typeof filter.value === 'string' ? filter.value : undefined
            }
            onChange={event => {
              updateFilter({
                rowId: filter.rowId,
                field: { value: event.target.value }
              })
            }}
          />
        )
      }
      case 'select': {
        return (
          <SearchSelect
            label={filterField?.label}
            placeholder={filterField?.placeholder}
            options={filterField.options ?? []}
            value={(filter.value ?? '') as string}
            onSelectChange={value => {
              updateFilter({ rowId: filter.rowId, field: { value } })
            }}
          />
        )
      }
      case 'multi-select': {
        return (
          <MultiSelect
            label={filterField.label}
            placeholder={filterField.placeholder}
            options={filterField.options ?? []}
            value={filter.value as string[]}
            className="max-h-8"
            onSelectChange={value => {
              updateFilter({
                rowId: filter.rowId,
                field: { value }
              })
            }}
          />
        )
      }
      case 'boolean': {
        if (Array.isArray(filter.value)) return null

        return (
          <Select
            value={filter.value}
            onValueChange={value => {
              updateFilter({ rowId: filter.rowId, field: { value } })
            }}
          >
            <SelectTrigger
              id={inputId}
              aria-label={`${filterField.label} boolean filter`}
              aria-controls={`${inputId}-listbox`}
              className="h-8 w-full rounded bg-transparent"
            >
              <SelectValue
                placeholder={filter.value === '' ? 'False' : 'True'}
              />
            </SelectTrigger>
            <SelectContent id={`${inputId}-listbox`}>
              <SelectItem value="true">True</SelectItem>
              <SelectItem value="false">False</SelectItem>
            </SelectContent>
          </Select>
        )
      }
    }

    return null
  }

  return (
    <div className="flex w-full items-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            aria-label="Open filters"
            aria-controls={`${id}-filter-dialog`}
          >
            <FunnelIcon className="size-3" aria-hidden="true" />
            Filters
            {filters.length > 0 && (
              <Badge
                variant="secondary"
                className="h-[1.14rem] rounded-[0.2rem] px-[0.32rem] font-mono text-[0.65rem] font-normal"
              >
                {filters.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          id={`${id}-filter-dialog`}
          align="start"
          collisionPadding={16}
          className={cn(
            'flex w-[calc(100vw-theme(spacing.12))] min-w-60 origin-[var(--radix-popover-content-transform-origin)] flex-col p-4 sm:w-[36rem]',
            filters.length > 0 ? 'gap-3.5' : 'gap-2'
          )}
        >
          {filters.length > 0 ? (
            <h4 className="font-medium leading-none">Filters</h4>
          ) : (
            <div className="flex flex-col gap-1">
              <h4 className="font-medium leading-none">No filters applied</h4>
              <p className="text-muted-foreground text-sm">
                Add filters to refine your results.
              </p>
            </div>
          )}
          <div className="flex max-h-40 flex-col gap-2 overflow-y-auto py-0.5 pr-1">
            {filters.map((filter, index) => {
              const filterId = `${id}-filter-${filter.rowId}`
              const fieldListboxId = `${filterId}-field-listbox`
              const fieldTriggerId = `${filterId}-field-trigger`
              const operatorListboxId = `${filterId}-operator-listbox`
              const inputId = `${filterId}-input`

              return (
                <div key={filter.rowId} className="flex items-center gap-2">
                  <Popover modal>
                    <PopoverTrigger asChild>
                      <Button
                        id={fieldTriggerId}
                        variant="outline"
                        size="sm"
                        role="combobox"
                        aria-label="Select filter field"
                        aria-controls={fieldListboxId}
                        className="focus:ring-ring h-8 w-32 justify-between gap-2 rounded focus:outline-none focus:ring-0 focus-visible:ring-0"
                      >
                        <span className="truncate">
                          {fields.find(field => field.id === filter.id)
                            ?.label ?? 'Select field'}
                        </span>
                        <ChevronDownIcon className="size-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      id={fieldListboxId}
                      align="start"
                      className="w-40 p-0"
                      onCloseAutoFocus={() =>
                        document.getElementById(fieldTriggerId)?.focus({
                          preventScroll: true
                        })
                      }
                    >
                      <Command>
                        <CommandInput
                          className="border-none"
                          placeholder="Search fields..."
                        />
                        <CommandList>
                          <CommandEmpty>No fields found.</CommandEmpty>
                          <CommandGroup>
                            {fields.map(field => (
                              <CommandItem
                                key={field.id}
                                value={field.id}
                                onSelect={value => {
                                  const filterField = fields.find(
                                    col => col.id === value
                                  )

                                  if (filterField == null) return

                                  updateFilter({
                                    rowId: filter.rowId,
                                    field: {
                                      id: value as StringKeyOf<TData>,
                                      type: filterField.type,
                                      operator:
                                        filterField.type === 'text'
                                          ? 'iLike'
                                          : 'eq',
                                      value: ''
                                    }
                                  })

                                  document
                                    .getElementById(fieldTriggerId)
                                    ?.click()
                                }}
                              >
                                <span className="mr-1.5 truncate">
                                  {field.label}
                                </span>
                                <CheckIcon
                                  className={cn(
                                    'ml-auto size-4 shrink-0',
                                    field.id === filter.id
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <Select
                    value={filter.operator}
                    onValueChange={(value: FilterOperator) => {
                      updateFilter({
                        rowId: filter.rowId,
                        field: {
                          operator: value,
                          value:
                            value === 'isNull' || value === 'isNotNull'
                              ? ''
                              : filter.value
                        }
                      })
                    }}
                  >
                    <SelectTrigger
                      aria-label="Select filter operator"
                      aria-controls={operatorListboxId}
                      className="h-8 w-32 rounded text-xs font-medium"
                    >
                      <div className="truncate">
                        <SelectValue placeholder={filter.operator} />
                      </div>
                    </SelectTrigger>
                    <SelectContent id={operatorListboxId}>
                      {getFilterOperators(filter.type).map(op => (
                        <SelectItem key={op.value} value={op.value}>
                          {op.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="max-h-8 min-w-36 flex-1">
                    {renderFilterInput({ filter, inputId })}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label={`Remove filter ${index + 1}`}
                    className="size-8 shrink-0 rounded"
                    onClick={() => {
                      removeFilter(filter.rowId)
                    }}
                  >
                    <TrashIcon className="size-3.5" aria-hidden="true" />
                  </Button>
                </div>
              )
            })}
          </div>
          <div className="flex w-full items-center gap-2">
            <Button
              size="sm"
              className="h-[1.85rem] rounded"
              onClick={addFilter}
            >
              Add filter
            </Button>
            {filters.length > 0 ? (
              <Button
                size="sm"
                variant="outline"
                className="rounded"
                onClick={() => {
                  setFilters([])
                }}
              >
                Reset filters
              </Button>
            ) : null}
          </div>
        </PopoverContent>
      </Popover>

      <ScrollArea
        aria-orientation="horizontal"
        type="always"
        className="w-full items-center px-4"
      >
        <div className="flex flex-nowrap gap-2">
          {filters.map(filter => (
            <Badge
              key={filter.rowId}
              variant="outline"
              className="gap-1 truncate"
            >
              <p className="text-zinc-500">
                {fields.find(field => field.id === filter.id)?.label ??
                  'Unknown'}{' '}
                <span className="lowercase">
                  {getFilterOperators(filter.type).find(
                    op => op.value === filter.operator
                  )?.label ?? 'Unknown'}{' '}
                </span>
                <span className="max-w-[200px] truncate text-zinc-900">
                  {getFilterValue(filter)}
                </span>
              </p>

              <button
                onClick={() => {
                  removeFilter(filter.rowId)
                }}
              >
                <XMarkIcon className="size-3" />
              </button>
            </Badge>
          ))}
        </div>

        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
    </div>
  )
}
