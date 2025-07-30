export interface MouseMoveEvent {
  e: {
    buttons: number
    movementX: number
    movementY: number
  }
}

export interface MouseWheelEvent {
  e: {
    deltaY: number
    offsetX: number
    offsetY: number
    preventDefault: () => void
    stopPropagation: () => void
  }
}

export interface MouseDownEvent {
  e: {
    offsetX: number
    offsetY: number
  }
}

export interface MouseUpEvent {
  e: {
    offsetX: number
    offsetY: number
  }
}

export type FabricMode = 'pan' | 'draw' | 'select'
