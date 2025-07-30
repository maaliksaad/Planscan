'use client'

import type { FC } from 'react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { ProjectForm } from '@/features/projects/project-form'
import { PlusIcon } from '@/icons/plus'

import { useCreateProject } from './use-create-project'

export const CreateProject: FC = () => {
  const { form, onSubmit, isOpen, onOpenChange } = useCreateProject()

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button size="sm">
          <PlusIcon />
          <span>New project</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="">
        <SheetHeader>
          <SheetTitle>New project</SheetTitle>
        </SheetHeader>

        {/* @ts-expect-error - form hook watch types are causing issues */}
        <ProjectForm type="create" form={form} onSubmit={onSubmit} />
      </SheetContent>
    </Sheet>
  )
}
