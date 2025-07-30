import { Portal } from '@radix-ui/react-portal'
import type { Rect } from 'fabric'
import { type FC, useEffect, useState } from 'react'

import Draggable from '@/components/ui/draggable'
import {
  RECT_KEYS,
  RECT_SELECT_MODE
} from '@/features/drawing-canvas/drawing-canvas.constants'
import { LoadingIcon } from '@/icons/loading'
import type { TextGroupWithRect } from '@/types/text-groups'

import { CanvasMenuControls } from './canvas-menu-controls'
import { TextGroupComments } from './text-group-comments'
import { TextGroupDetails } from './text-group-details'
import { TextGroupForm } from './text-group-form'

interface CanvasMenuProps {
  textGroup: TextGroupWithRect
  position: { x: number; y: number }
  deselectTextGroup: () => void
  selectPreviousTextGroup: () => void
  selectNextTextGroup: () => void
  creatingTextBox: boolean
  rects: Rect[]
}

export const CanvasMenu: FC<CanvasMenuProps> = ({
  textGroup,
  position,
  deselectTextGroup,
  selectPreviousTextGroup,
  selectNextTextGroup,
  creatingTextBox,
  rects
}) => {
  const [isEditMode, setIsEditMode] = useState(false)

  useEffect(() => {
    const rect = rects.find(
      r => r.get(RECT_KEYS.ID) === textGroup.text_group_id
    )

    setIsEditMode(rect?.get(RECT_KEYS.MODE) === RECT_SELECT_MODE.EDIT)
  }, [textGroup, rects])

  return (
    <Portal>
      <Draggable
        className="w-[300px] shrink-0 rounded border border-zinc-200 bg-white"
        position={position}
      >
        {creatingTextBox ? (
          <div className="flex items-center justify-center py-6">
            <LoadingIcon className="size-4" />
          </div>
        ) : (
          <div className="w-full divide-y divide-zinc-200">
            <CanvasMenuControls
              deselectTextGroup={deselectTextGroup}
              setIsEditMode={setIsEditMode}
              textGroup={textGroup}
              selectPreviousTextGroup={selectPreviousTextGroup}
              selectNextTextGroup={selectNextTextGroup}
            />

            {isEditMode ? (
              <TextGroupForm
                textGroup={textGroup}
                setIsEditMode={setIsEditMode}
              />
            ) : (
              <TextGroupDetails textGroup={textGroup} />
            )}

            <TextGroupComments
              comments={textGroup.comments}
              textGroup={textGroup}
            />
          </div>
        )}
      </Draggable>
    </Portal>
  )
}
