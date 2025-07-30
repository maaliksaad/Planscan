'use client'

import type { FC } from 'react'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { ProjectForm } from '@/features/projects/project-form'
import { PencilSquareIcon } from '@/icons/pencil-square'
import type { Project } from '@/lib/graphql'

import { useUpdateProject } from './use-update-project'

interface UpdateProjectProps {
  project: Project
}

export const UpdateProject: FC<UpdateProjectProps> = ({ project }) => {
  const { form, onSubmit, isOpen, onOpenChange } = useUpdateProject()

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger>
        <PencilSquareIcon className="size-4 text-zinc-950/50" />
        <span className="sr-only">Edit Project</span>
      </SheetTrigger>
      <SheetContent className="">
        <SheetHeader>
          <SheetTitle>Edit project details</SheetTitle>
        </SheetHeader>

        <ProjectForm
          type="update"
          project={project}
          form={form}
          onSubmit={onSubmit}
        />
      </SheetContent>
    </Sheet>
  )
}
