'use client'

import type { FC } from 'react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { MagnifyingGlassIcon } from '@/icons/magnifying-glass'
import { cn } from '@/utils/cn'

import { SEARCHBAR_KEYS } from './projects-searchbar.constants'
import { useProjectsSearchbar } from './use-projects-searchbar'

export const ProjectsSearchbar: FC = () => {
  const { form, onSubmit, open, setOpen } = useProjectsSearchbar()

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger
        className={cn('flex items-center justify-center px-[9px]', {
          hidden: open
        })}
      >
        <MagnifyingGlassIcon className="size-4 text-zinc-700" />
      </CollapsibleTrigger>
      <CollapsibleContent className="data-[state=closed]:animate-collapse-left data-[state=open]:animate-collapse-right">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-8 w-full items-center rounded-md border border-zinc-200 bg-transparent px-2 text-base shadow-sm transition-colors"
          >
            <FormField
              control={form.control}
              name={SEARCHBAR_KEYS.SEARCH}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-8 w-[300px] border-none px-0 focus-visible:outline-none focus-visible:ring-0"
                      placeholder="Search projects"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <button type="submit">
              <MagnifyingGlassIcon className="size-4 text-zinc-700" />
            </button>
          </form>
        </Form>
      </CollapsibleContent>
    </Collapsible>
  )
}
