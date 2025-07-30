import {
  type FC,
  type MouseEventHandler,
  type PropsWithChildren,
  useRef,
  useState
} from 'react'

import type { PropsWithClassname } from '@/types/common'
import { cn } from '@/utils/cn'

interface DraggableProps extends PropsWithClassname, PropsWithChildren {
  position?: { x: number; y: number }
}

export const Draggable: FC<DraggableProps> = ({
  children,
  className,
  position: { x: initialX = 0, y: initialY = 0 } = {}
}) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY })
  const draggingRef = useRef(false)
  const offsetRef = useRef({ x: 0, y: 0 })

  const handleMouseDown: MouseEventHandler<HTMLDivElement> = e => {
    // Start dragging
    draggingRef.current = true

    // Calculate offset from mouse to top-left corner of the div
    offsetRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    }

    // Listen for mouse movement and release
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e: MouseEvent): void => {
    if (!draggingRef.current) return
    setPosition({
      x: e.clientX - offsetRef.current.x,
      y: e.clientY - offsetRef.current.y
    })
  }

  const handleMouseUp = (): void => {
    draggingRef.current = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  return (
    <div
      onMouseDown={handleMouseDown}
      className={cn(
        'absolute z-[20] shrink-0 cursor-grab select-none',
        className
      )}
      style={{
        left: position.x,
        top: position.y
      }}
    >
      {children}
    </div>
  )
}

export default Draggable
