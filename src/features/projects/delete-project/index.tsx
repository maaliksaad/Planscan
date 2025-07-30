import type { FC } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { LoadingIcon } from '@/icons/loading'
import { TrashIcon } from '@/icons/trash'
import type { Project } from '@/lib/graphql'

import { useDeleteProject } from './use-delete-project'

interface DeleteProjectProps {
  project: Project
}

export const DeleteProject: FC<DeleteProjectProps> = ({ project }) => {
  const { loading, handleDeleteProject, isOpen, onOpenChange } =
    useDeleteProject({ project })

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button type="button" variant="ghost-destructive" className="p-0">
          <TrashIcon className="size-4" />
          <span>Delete project</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="mobile:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Delete project?</DialogTitle>
          <DialogDescription>
            Delete this project? This will delete all of the drawings and
            extracted text within the project.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            disabled={loading}
            className="w-[170px]"
            onClick={handleDeleteProject}
          >
            {loading ? (
              <LoadingIcon className="size-6" />
            ) : (
              <>
                <TrashIcon className="size-4" />
                <span>Yes, delete project</span>
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
