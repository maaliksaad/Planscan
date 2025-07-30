'use client'

import type { Dispatch, FC, SetStateAction } from 'react'

import { LoadingIcon } from '@/icons/loading'
import type { Page } from '@/lib/graphql'
import type { TextGroupWithRect } from '@/types/text-groups'

import { CanvasMenu } from './canvas-menu'
import { CanvasToolbar } from './canvas-toolbar'
import { useDrawingCanvas } from './use-drawing-canvas'

type EditableProps = {
  page: Page
  editable: true
  activeTextGroups: TextGroupWithRect[]
  setActiveTextGroups: Dispatch<SetStateAction<TextGroupWithRect[]>>
}

type NonEditableProps = {
  page: Page
  editable?: false
  activeTextGroups?: TextGroupWithRect[]
  setActiveTextGroups?: () => void
}

type DrawingCanvasProps = EditableProps | NonEditableProps

export const DrawingCanvas: FC<DrawingCanvasProps> = ({
  page,
  editable = false,
  activeTextGroups,
  setActiveTextGroups
}) => {
  const {
    dropdownPosition,
    loading,
    canvasRef,
    handleZoomOut,
    handleZoomIn,
    deselectTextGroup,
    selectNextTextGroup,
    selectPreviousTextGroup,
    mode,
    setMode,
    creatingTextBox,
    rects
  } = useDrawingCanvas({
    page,
    activeTextGroups,
    setActiveTextGroups
  })

  return (
    <>
      {loading && (
        <div className="flex size-full items-center justify-center py-6">
          <LoadingIcon className="size-10" />
        </div>
      )}

      <div className="relative size-full">
        {editable && (
          <div className="absolute bottom-4 right-4 z-10 flex flex-col">
            <CanvasToolbar
              mode={mode}
              setMode={setMode}
              handleZoomOut={handleZoomOut}
              handleZoomIn={handleZoomIn}
            />
          </div>
        )}

        <canvas ref={canvasRef} />
      </div>

      {editable &&
        dropdownPosition != null &&
        activeTextGroups?.length === 1 && (
          <CanvasMenu
            textGroup={activeTextGroups[0]}
            position={dropdownPosition}
            deselectTextGroup={deselectTextGroup}
            selectPreviousTextGroup={selectPreviousTextGroup}
            selectNextTextGroup={selectNextTextGroup}
            creatingTextBox={creatingTextBox}
            rects={rects}
          />
        )}
    </>
  )
}
