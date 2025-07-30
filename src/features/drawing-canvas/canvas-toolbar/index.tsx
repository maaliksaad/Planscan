import type { Dispatch, FC, SetStateAction } from 'react'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import type { FabricMode } from '@/hooks/use-fabric/use-fabric.types'
import { BarsIcon } from '@/icons/bars'
import { CursorIcon } from '@/icons/cursor'
import { HandIcon } from '@/icons/hand'
import { MagnifyingGlassMinusIcon } from '@/icons/magnifying-glass-minus'
import { MagnifyingGlassPlusIcon } from '@/icons/magnifying-glass-plus'

interface CanvasToolbarProps {
  mode: FabricMode
  setMode: Dispatch<SetStateAction<FabricMode>>
  handleZoomOut: () => void
  handleZoomIn: () => void
}

export const CanvasToolbar: FC<CanvasToolbarProps> = ({
  mode,
  setMode,
  handleZoomIn,
  handleZoomOut
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="w-fit">
        <ToggleGroup type="multiple" value={[mode]}>
          <ToggleGroupItem
            className="rounded-none"
            value="pan"
            aria-label="Toggle pan"
            onClick={() => {
              setMode('pan')
            }}
          >
            <HandIcon className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            className="rounded-none"
            value="draw"
            aria-label="Toggle draw"
            onClick={() => {
              setMode('draw')
            }}
          >
            <BarsIcon className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            className="rounded-none"
            value="select"
            aria-label="Toggle select"
            onClick={() => {
              setMode('select')
            }}
          >
            <CursorIcon className="size-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="w-fit">
        <ToggleGroup type="multiple" value={[]}>
          <ToggleGroupItem
            className="rounded-none"
            value="zoom-in"
            aria-label="Zoom in"
            onClick={handleZoomIn}
          >
            <MagnifyingGlassPlusIcon className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            className="rounded-none"
            value="zoom-out"
            aria-label="Zoom out"
            onClick={handleZoomOut}
          >
            <MagnifyingGlassMinusIcon className="size-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  )
}
