'use client'

import type { FC } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { LoadingIcon } from '@/icons/loading'
import { TrashIcon } from '@/icons/trash'
import type { Page } from '@/lib/graphql'

import { useDeleteDrawing } from './use-delete-drawing'

interface DeleteDrawingProps {
  page: Page
}

export const DeleteDrawing: FC<DeleteDrawingProps> = ({ page }) => {
  const { isOpen, onOpenChange, loading, handleDeleteDrawing } =
    useDeleteDrawing({ page })

  return (
    <Dialog defaultOpen open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="mobile:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Delete drawing?</DialogTitle>
          <DialogDescription>
            Delete this drawing? This will delete all the data of the drawing.
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
            onClick={handleDeleteDrawing}
          >
            {loading ? (
              <LoadingIcon className="size-6" />
            ) : (
              <>
                <TrashIcon className="size-4" />
                <span>Yes, delete drawing</span>
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
