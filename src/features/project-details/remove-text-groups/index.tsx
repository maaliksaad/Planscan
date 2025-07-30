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

import { useRemoveTextGroups } from './use-remove-text-groups'

interface RemoveTextGroupsProps {
  textGroupIds: string[]
}

export const RemoveTextGroups: FC<RemoveTextGroupsProps> = ({
  textGroupIds
}) => {
  const { isOpen, onOpenChange, handleRemoveTextGroups, loading } =
    useRemoveTextGroups({ textGroupIds })

  if (textGroupIds.length === 0) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="sm">
          <TrashIcon className="size-4" />
          <span>Delete</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="mobile:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Delete text groups?</DialogTitle>
          <DialogDescription>
            Delete the selected text groups? This will delete all of the data
            related to these text groups.
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
            onClick={handleRemoveTextGroups}
          >
            {loading ? (
              <LoadingIcon className="size-6" />
            ) : (
              <>
                <TrashIcon className="size-4" />
                <span>Yes, delete</span>
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
