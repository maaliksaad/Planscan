'use client'

import type { FC } from 'react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { LoadingIcon } from '@/icons/loading'
import type { Page } from '@/lib/graphql'
import { PageSchemaKeys } from '@/schemas/pages'

import { useUpdateDrawing } from './use-update-drawing'

interface UpdateDrawingProps {
  page: Page
}

export const UpdateDrawing: FC<UpdateDrawingProps> = ({ page }) => {
  const { form, onSubmit, isOpen, onOpenChange } = useUpdateDrawing({ page })

  return (
    <Sheet defaultOpen open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="">
        <SheetHeader>
          <SheetTitle>Edit project details</SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full flex-col justify-between py-6"
          >
            <div className="flex flex-1 flex-col gap-4">
              <FormField
                control={form.control}
                name={PageSchemaKeys.DISCIPLINE}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discipline</FormLabel>
                    <FormControl>
                      <Input placeholder="Discipline" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={PageSchemaKeys.NUMBER}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Drawing no.</FormLabel>
                    <FormControl>
                      <Input placeholder="Drawing no." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={PageSchemaKeys.TITLE}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Drawing title</FormLabel>
                    <FormControl>
                      <Input placeholder="Drawing title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-end gap-4">
              <div className="flex gap-4">
                <SheetClose asChild>
                  <Button variant="link" className="p-0">
                    Cancel
                  </Button>
                </SheetClose>
                <Button
                  type="submit"
                  className="w-[80px]"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <LoadingIcon className="size-6" />
                  ) : (
                    <span>Save</span>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
