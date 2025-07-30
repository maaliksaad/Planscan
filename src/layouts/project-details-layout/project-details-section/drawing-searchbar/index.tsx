import { useQueryState } from 'nuqs'
import { type FC, useEffect, useState } from 'react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import { Input } from '@/components/ui/input'
import { SearchBarKeys } from '@/constants/searchbar'
import { MagnifyingGlassIcon } from '@/icons/magnifying-glass'
import { cn } from '@/utils/cn'

export const DrawingSearchbar: FC = () => {
  const [open, setOpen] = useState(false)

  const [searchParam, setSearchParam] = useQueryState(
    SearchBarKeys.DRAWING_SEARCH,
    {
      defaultValue: ''
    }
  )

  useEffect(() => {
    if (searchParam !== '') {
      setOpen(true)
    }
  }, [searchParam])

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="relative flex flex-row-reverse overflow-hidden"
    >
      <CollapsibleTrigger
        className={cn('flex items-center justify-center px-[9px]', {
          'hidden animate-fade-in': open
        })}
      >
        <MagnifyingGlassIcon className="size-4 text-zinc-700" />
      </CollapsibleTrigger>
      <CollapsibleContent className="data-[state=closed]:animate-collapse-left data-[state=open]:animate-collapse-right">
        <div className="flex h-8 w-full items-center rounded-md border border-zinc-200 bg-transparent px-2 text-base shadow-sm transition-colors">
          <Input
            value={searchParam}
            onChange={async e => setSearchParam(e.target.value)}
            className="h-8 w-[300px] border-none px-0 focus-visible:outline-none focus-visible:ring-0"
            placeholder="Search projects"
          />

          <button
            onClick={() => {
              setOpen(false)
            }}
          >
            <MagnifyingGlassIcon className="size-4 text-zinc-700" />
          </button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
