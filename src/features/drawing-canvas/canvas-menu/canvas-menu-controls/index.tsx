import type { Dispatch, FC, SetStateAction } from 'react'

import { Button } from '@/components/ui/button'
import { ChevronLeftIcon } from '@/icons/chevron-left'
import { ChevronRightIcon } from '@/icons/chevron-right'
import { PencilIcon } from '@/icons/pencil'
import { TrashIcon } from '@/icons/trash'
import { XMarkIcon } from '@/icons/x-mark'
import type { TextGroupWithRect } from '@/types/text-groups'

import { useCanvasMenuControls } from './use-canvas-menu-controls'

interface CanvasMenuControlsProps {
  deselectTextGroup: () => void
  setIsEditMode: Dispatch<SetStateAction<boolean>>
  textGroup: TextGroupWithRect
  selectPreviousTextGroup: () => void
  selectNextTextGroup: () => void
}

export const CanvasMenuControls: FC<CanvasMenuControlsProps> = ({
  deselectTextGroup,
  setIsEditMode,
  textGroup,
  selectPreviousTextGroup,
  selectNextTextGroup
}) => {
  const { removing, handleRemoveText } = useCanvasMenuControls({
    textGroup,
    deselectTextGroup
  })

  return (
    <div className="flex items-center justify-between p-2">
      <div className="flex items-center">
        <Button
          onClick={selectPreviousTextGroup}
          size="icon-sm"
          variant="ghost"
        >
          <ChevronLeftIcon className="size-4" />
        </Button>
        <Button onClick={selectNextTextGroup} size="icon-sm" variant="ghost">
          <ChevronRightIcon className="size-4" />
        </Button>
      </div>

      <div className="flex items-center">
        <Button
          onClick={() => {
            setIsEditMode(prev => !prev)
          }}
          size="icon-sm"
          variant="ghost"
        >
          <PencilIcon className="size-4" />
        </Button>
        <Button
          onClick={handleRemoveText}
          disabled={removing}
          size="icon-sm"
          variant="ghost"
        >
          <TrashIcon className="size-4" />
        </Button>
        <Button onClick={deselectTextGroup} size="icon-sm" variant="ghost">
          <XMarkIcon className="size-4" />
        </Button>
      </div>
    </div>
  )
}
