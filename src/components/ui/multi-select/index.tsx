'use client'

import { type FC, type ReactElement, useId, useMemo, useState } from 'react'

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { CheckIcon } from '@/icons/check'
import { ChevronUpDownIcon } from '@/icons/chevron-up-down'
import type { PropsWithClassname } from '@/types/common'
import { cn } from '@/utils/cn'

interface MultiSelectProps extends PropsWithClassname {
  label?: string
  placeholder?: string
  options: Array<{
    label: string
    value: string
  }>
  value?: string[]
  onSelectChange?: (value: string[]) => void
  withPortal?: boolean
  renderer?: (option: { label: string; value: string }) => ReactElement | null
}

export const MultiSelect: FC<MultiSelectProps> = ({
  label,
  value,
  placeholder,
  options,
  onSelectChange,
  withPortal = true,
  renderer,
  className
}) => {
  const id = useId()

  const [search, setSearch] = useState('')

  const selectedValues = useMemo(
    () => new Set(Array.isArray(value) ? value : []),
    [value]
  )

  const filteredOptions = useMemo(() => {
    const selected = options.filter(option => selectedValues.has(option.value))
    const unselected = options.filter(
      option => !selectedValues.has(option.value)
    )
    const sorted = [...selected, ...unselected]

    return sorted.filter(option => {
      if (search === '') return true
      return option.label.toLowerCase().includes(search.toLowerCase())
    })
  }, [options, selectedValues, search])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          size="sm"
          aria-label={`${label} filter values`}
          aria-controls={`${id}-listbox`}
          className={cn(
            'block h-auto max-h-[100px] min-h-8 w-full overflow-y-auto rounded text-left scrollbar-none hover:bg-transparent',
            className
          )}
        >
          {selectedValues.size === 0 && (
            <div className="flex items-center gap-2 px-1.5 py-1">
              {placeholder ?? ' Select options...'}
              <ChevronUpDownIcon className="size-4" aria-hidden="true" />
            </div>
          )}
          {selectedValues.size > 0 && (
            <div className="flex min-w-0 flex-wrap gap-1">
              {options
                .filter(option => selectedValues.has(option.value))
                .map(option => (
                  <Badge
                    variant="secondary"
                    key={option.value}
                    className="truncate text-wrap rounded-sm px-1 font-normal"
                  >
                    {renderer == null ? option.label : renderer(option)}
                  </Badge>
                ))}
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        id={`${id}-listbox`}
        className="w-[12.5rem] origin-[var(--radix-popover-content-transform-origin)]"
        withPortal={withPortal}
      >
        <Command filter={() => 1}>
          <CommandInput
            aria-label={`Search ${label} options`}
            placeholder={label ?? 'Search options...'}
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value="all"
                onSelect={() => {
                  if (
                    filteredOptions.every(option =>
                      selectedValues.has(option.value)
                    )
                  ) {
                    onSelectChange?.([])
                  } else {
                    onSelectChange?.(
                      filteredOptions.map(option => option.value)
                    )
                  }
                }}
              >
                <span
                  className={cn(
                    'mr-2 flex size-4 items-center justify-center rounded-sm border border-neutral-300',
                    filteredOptions.every(option =>
                      selectedValues.has(option.value)
                    )
                      ? 'text-zinc-900'
                      : 'opacity-50 [&_svg]:invisible'
                  )}
                >
                  <CheckIcon className="size-4" />
                </span>
                <span className="text-muted-foreground">Select all</span>
              </CommandItem>

              {filteredOptions.map(option => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => {
                    const newValue = new Set(selectedValues)
                    if (newValue.has(option.value)) {
                      newValue.delete(option.value)
                    } else {
                      newValue.add(option.value)
                    }
                    onSelectChange?.([...newValue])
                  }}
                >
                  <span
                    className={cn(
                      'mr-2 flex size-4 items-center justify-center rounded-sm border border-neutral-300',
                      selectedValues.has(option.value)
                        ? 'text-zinc-900'
                        : 'opacity-50 [&_svg]:invisible'
                    )}
                  >
                    <CheckIcon className="size-4" />
                  </span>
                  <span>
                    {renderer == null ? option.label : renderer(option)}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
