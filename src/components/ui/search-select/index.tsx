'use client'

import { type FC, useId } from 'react'

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
import { ChevronDownIcon } from '@/icons/chevron-down'
import { cn } from '@/utils/cn'

interface SearchSelectProps {
  label?: string
  placeholder?: string
  options: Array<{
    label: string
    value: string
  }>
  value?: string
  onSelectChange: (value: string) => void
}

export const SearchSelect: FC<SearchSelectProps> = ({
  label,
  placeholder,
  options,
  value,
  onSelectChange
}) => {
  const id = useId()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          size="sm"
          aria-label={`${label} filter value`}
          aria-controls={`${id}-listbox`}
          className="h-8 w-full justify-start gap-2 rounded px-1.5 text-left text-sm"
        >
          {value !== '' && typeof value === 'string' ? (
            <Badge
              variant="secondary"
              className="rounded-sm px-1 text-sm font-normal"
            >
              {options.find(option => option.value === value)?.label ?? value}
            </Badge>
          ) : (
            <span className="text-sm">
              {placeholder ?? 'Select an option...'}
              <ChevronDownIcon className="size-4" aria-hidden="true" />
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        id={`${id}-listbox`}
        className="w-[12.5rem] origin-[var(--radix-popover-content-transform-origin)]"
      >
        <Command>
          <CommandInput
            placeholder={label ?? 'Search options...'}
            aria-label={`Search ${label} options`}
          />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {options.map(option => (
                <CommandItem
                  key={option.value}
                  aria-selected={value === option.value}
                  data-selected={value === option.value}
                  value={option.value}
                  onSelect={selected => {
                    onSelectChange(selected)
                    setTimeout(() => {
                      // eslint-disable-next-line unicorn/prefer-query-selector
                      document.getElementById(id)?.click()
                    }, 0)
                  }}
                >
                  <span
                    className={cn(
                      'border-primary mr-2 flex size-4 items-center justify-center rounded-sm border',
                      value === option.value
                        ? 'bg-primary text-primary-foreground'
                        : 'opacity-50 [&_svg]:invisible'
                    )}
                  >
                    <CheckIcon className="size-4" />
                  </span>
                  <span>{option.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
