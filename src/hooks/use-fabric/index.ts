import { Canvas, FabricImage, Point, Rect, type TMat2D, util } from 'fabric'
import {
  type RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react'

import type {
  FabricMode,
  MouseDownEvent,
  MouseMoveEvent,
  MouseUpEvent,
  MouseWheelEvent
} from './use-fabric.types'

interface UseFabricParams {
  mode: FabricMode
  rects: Rect[]
  image: {
    url: string
    width: number
    height: number
  }
  onNewRectangle: (rect: Rect) => Promise<void>
  onSelectedRectangles: (rects: Rect[]) => void
}

interface UseFabricReturn {
  canvasRef: RefObject<HTMLCanvasElement>
  loading: boolean
  handleZoomIn: () => void
  handleZoomOut: () => void
  scrollToObject: (rect: Rect) => void
}

export const useFabric = ({
  rects,
  mode,
  image,
  onNewRectangle,
  onSelectedRectangles
}: UseFabricParams): UseFabricReturn => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricRef = useRef<Canvas | null>()
  const lastFabricRef = useRef<Canvas | null>()
  const [loading, setLoading] = useState(false)

  // drawing
  const [drawing, setDrawing] = useState(false)
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(
    null
  )

  const handleZoomIn = useCallback(() => {
    if (fabricRef.current == null) {
      return
    }

    let zoom = fabricRef.current.getZoom()

    zoom *= 1.1

    if (zoom > 2) {
      zoom = 2
    }
    if (zoom < 0.05) {
      zoom = 0.05
    }

    fabricRef.current.setZoom(zoom)
    fabricRef.current.requestRenderAll()
  }, [])

  const handleZoomOut = useCallback(() => {
    if (fabricRef.current == null) {
      return
    }

    let zoom = fabricRef.current.getZoom()

    zoom *= 0.9

    if (zoom > 2) {
      zoom = 2
    }
    if (zoom < 0.05) {
      zoom = 0.05
    }

    fabricRef.current.setZoom(zoom)
    fabricRef.current.requestRenderAll()
  }, [])

  const handleMouseMove = useCallback(
    ({ e }: MouseMoveEvent) => {
      if (fabricRef.current == null) {
        return
      }

      if (mode === 'pan' && e.buttons === 1) {
        const delta = new Point(e.movementX, e.movementY)
        fabricRef.current.relativePan(delta)
      }

      if (mode === 'draw' && drawing && startPoint != null) {
        // @ts-expect-error - property fo e
        const mouse = fabricRef.current.getScenePoint(e)

        const w = Math.abs(mouse.x - startPoint.x)
        const h = Math.abs(mouse.y - startPoint.y)

        if (w === 0 || h === 0) {
          return
        }

        const rect = fabricRef.current.getActiveObject()

        if (rect == null) {
          return
        }

        rect.set('width', w).set('height', h)
        fabricRef.current.renderAll()
      }
    },
    [mode, drawing, startPoint]
  )

  const handleMouseDown = useCallback(
    ({ e }: MouseDownEvent) => {
      if (fabricRef.current == null) {
        return
      }

      if (mode === 'draw') {
        // @ts-expect-error - property fo e
        const mouse = fabricRef.current.getScenePoint(e)
        setDrawing(true)
        setStartPoint({ x: mouse.x, y: mouse.y })

        const rect = new Rect({
          width: 0,
          height: 0,
          left: mouse.x,
          top: mouse.y,
          fill: 'transparent',
          stroke: '#667FAF',
          strokeWidth: 2,
          hasControls: false,
          hoverCursor: 'pointer'
        })

        fabricRef.current.add(rect)
        fabricRef.current.renderAll()
        fabricRef.current.setActiveObject(rect)
      }
    },
    [mode]
  )

  const handleMouseUp = useCallback(
    async (_: MouseUpEvent) => {
      if (fabricRef.current == null) {
        return
      }

      if (mode === 'draw') {
        setDrawing(false)
        setStartPoint(null)

        const rect = fabricRef.current.getActiveObject()

        if (rect == null) {
          return
        }

        if (rect.width < 10 || rect.height < 10) {
          fabricRef.current.remove(rect)
          fabricRef.current.renderAll()
          return
        }

        await onNewRectangle(rect as Rect)

        fabricRef.current.remove(rect)

        fabricRef.current.add(rect)
        fabricRef.current.renderAll()
      }
    },
    [mode, onNewRectangle]
  )

  const handleMouseWheel = useCallback(
    ({ e }: MouseWheelEvent) => {
      if (fabricRef.current == null) {
        return
      }

      if (mode === 'pan') {
        let zoom = fabricRef.current.getZoom()

        zoom *= 0.999 ** e.deltaY

        if (zoom > 2) {
          zoom = 2
        }
        if (zoom < 0.05) {
          zoom = 0.05
        }

        const point = new Point(e.offsetX, e.offsetY)

        fabricRef.current.zoomToPoint(point, zoom)
        fabricRef.current.requestRenderAll()
      }
    },
    [mode]
  )

  const registerEvents = useCallback(
    (canvas: Canvas) => {
      canvas.off()

      canvas.on('mouse:wheel', options => {
        handleMouseWheel(options as MouseWheelEvent)
      })

      canvas.on('mouse:move', options => {
        handleMouseMove(options as MouseMoveEvent)
      })

      canvas.on('mouse:down', options => {
        handleMouseDown(options as MouseDownEvent)
      })

      canvas.on('mouse:up', async options => {
        await handleMouseUp(options as MouseUpEvent)
      })

      canvas.on('selection:created', e => {
        const selection = canvas.getActiveObject()
        if (selection != null) {
          selection.hasControls = false
        }

        onSelectedRectangles(e.selected as Rect[])
      })

      canvas.on('selection:cleared', () => {
        onSelectedRectangles([])
      })
    },
    [
      handleMouseWheel,
      handleMouseMove,
      handleMouseUp,
      handleMouseDown,
      onSelectedRectangles
    ]
  )

  const drawPage = useCallback(async () => {
    if (canvasRef.current == null) {
      return
    }

    setLoading(true)

    if (fabricRef.current != null) {
      await fabricRef.current.dispose()
      const { current: fabric } = fabricRef
      lastFabricRef.current = fabric
      fabricRef.current = null
    }

    const canvas = new Canvas(canvasRef.current, {
      selection: false,
      width: screen.width,
      height: screen.height,
      stopContextMenu: true
    })

    const img = await FabricImage.fromURL(
      image.url,
      {
        crossOrigin: 'anonymous'
      },
      {
        width: image.width,
        height: image.height,
        selectable: false
      }
    )

    canvas.add(img)

    rects.forEach(rect => {
      canvas.add(rect)
    })

    registerEvents(canvas)

    canvas.renderAll()

    setLoading(false)

    canvas.setZoom(lastFabricRef.current?.getZoom() ?? 0.1)

    canvas.setViewportTransform(
      lastFabricRef.current?.viewportTransform ?? [1, 0, 0, 1, 0, 0]
    )

    if (lastFabricRef.current == null) {
      canvas.absolutePan(new Point(image.width / 1.5, image.height / 1.5))
    }

    fabricRef.current = canvas
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rects, image.url, image.height, image.width])

  const scrollToObject = useCallback((rect: Rect) => {
    if (fabricRef.current == null) {
      return
    }

    fabricRef.current.setZoom(1)

    const {
      current: {
        viewportTransform: { 4: currentX, 5: currentY }
      }
    } = fabricRef

    const vpw = fabricRef.current.width / 2
    const vph = fabricRef.current.height / 2
    const finalX = -(rect.left - vpw / 2)
    const finalY = -(rect.top - vph / 2)

    util.animate({
      startValue: 0,
      endValue: 1,
      duration: 1000,
      easing: util.ease.easeInOutCubic,
      onChange: value => {
        const newX = currentX + (finalX - currentX) * value
        const newY = currentY + (finalY - currentY) * value

        if (fabricRef.current == null) {
          return
        }

        fabricRef.current.setViewportTransform([
          ...fabricRef.current.viewportTransform.slice(0, 4),
          newX,
          newY
        ] as TMat2D)
      },
      onComplete: () => {
        fabricRef.current?.requestRenderAll()
      }
    })
  }, [])

  useLayoutEffect(() => {
    void drawPage()
  }, [rects, drawPage, image.url, image.height, image.width])

  useEffect(() => {
    if (fabricRef.current == null) {
      return
    }

    switch (mode) {
      case 'pan': {
        fabricRef.current.isDrawingMode = false
        fabricRef.current.selection = false
        fabricRef.current.hoverCursor = 'grab'
        break
      }
      case 'draw': {
        fabricRef.current.isDrawingMode = true
        fabricRef.current.selection = false
        fabricRef.current.hoverCursor = 'crosshair'
        break
      }
      case 'select': {
        fabricRef.current.isDrawingMode = false
        fabricRef.current.selection = true
        fabricRef.current.hoverCursor = 'default'
        break
      }
    }

    registerEvents(fabricRef.current)
  }, [mode, registerEvents])

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return { canvasRef, loading, handleZoomIn, handleZoomOut, scrollToObject }
}
