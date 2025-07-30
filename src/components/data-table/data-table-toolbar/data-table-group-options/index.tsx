import type { GroupingState } from '@tanstack/table-core'
import type { Dispatch, ReactElement, SetStateAction } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { CheckIcon } from '@/icons/check'
import { CogIcon } from '@/icons/cog'
import type { GroupingOptions } from '@/types/data-table'
import { cn } from '@/utils/cn'

export const DataTableGroupOptions = <TData,>({
  state,
  setState,
  options = []
}: {
  options?: GroupingOptions<TData>
  state?: GroupingState
  setState?: Dispatch<SetStateAction<GroupingState>>
}): ReactElement => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <CogIcon className="size-[18px] text-zinc-950/80" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>Table view</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            setState?.([])
          }}
          role="button"
          className="cursor-pointer"
        >
          <span
            className={cn(
              'flex size-4 items-center justify-center rounded-sm',
              state?.length === 0
                ? 'text-zinc-900'
                : 'opacity-50 [&_svg]:invisible'
            )}
          >
            <CheckIcon className="size-4" />
          </span>
          Flat
        </DropdownMenuItem>
        {options.map(option => (
          <DropdownMenuItem
            key={option.id}
            onClick={() => {
              setState?.([option.id])
            }}
            role="button"
            className="cursor-pointer"
          >
            <span
              className={cn(
                'flex size-4 items-center justify-center rounded-sm',
                state?.[0] === option.id
                  ? 'text-zinc-900'
                  : 'opacity-50 [&_svg]:invisible'
              )}
            >
              <CheckIcon className="size-4" />
            </span>
            Group by {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
