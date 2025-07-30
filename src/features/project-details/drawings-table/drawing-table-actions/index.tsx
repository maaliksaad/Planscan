'use client'

import { type FC, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { DeleteDrawing } from '@/features/project-details/delete-drawing'
import { UpdateDrawing } from '@/features/project-details/update-drawing'
import { EllipsisHorizontalIcon } from '@/icons/ellipsis-horizontal'
import type { Page } from '@/lib/graphql'

interface DrawingTableActionsProps {
  page: Page
}

export const DrawingTableActions: FC<DrawingTableActionsProps> = ({ page }) => {
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisHorizontalIcon className="size-4 text-inherit" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px]" align="end">
          <DropdownMenuItem className="w-full">
            <Button
              className="h-auto w-full justify-start p-0 text-sm font-normal"
              variant="ghost"
              onClick={() => {
                setOpenEditDialog(prev => !prev)
              }}
            >
              Edit drawing details
            </Button>
          </DropdownMenuItem>

          <DropdownMenuItem className="w-full">
            <Button
              className="h-auto w-full justify-start p-0 text-sm font-normal"
              variant="ghost"
              onClick={() => {
                setOpenDeleteDialog(prev => !prev)
              }}
            >
              Delete drawing
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {openEditDialog && <UpdateDrawing page={page} />}

      {openDeleteDialog && <DeleteDrawing page={page} />}
    </>
  )
}
