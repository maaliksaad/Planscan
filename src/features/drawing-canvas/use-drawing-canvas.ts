/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Rect } from 'fabric'
import {
  type Dispatch,
  type RefObject,
  type SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'

import {
  RECT_KEYS,
  RECT_SELECT_MODE
} from '@/features/drawing-canvas/drawing-canvas.constants'
import { useFabric } from '@/hooks/use-fabric'
import type { FabricMode } from '@/hooks/use-fabric/use-fabric.types'
import { useToast } from '@/hooks/use-toast'
import {
  type Page,
  type TextGroup,
  TextGroupStatus,
  useCreateTextGroupMutation
} from '@/lib/graphql'
import type { TextGroupWithRect } from '@/types/text-groups'
import { getAuthHeader } from '@/utils/headers'
import { getHttpUrlFromS3 } from '@/utils/s3'

const CUSTOM_TEXT_GROUP_ID = 'custom-text-group-G6gYCWdVo4E7MabCSK6d'

interface UseDrawingCanvasParams {
  page: Page
  activeTextGroups?: TextGroupWithRect[]
  setActiveTextGroups?: Dispatch<SetStateAction<TextGroupWithRect[]>>
}

interface UseDrawingCanvasReturn {
  canvasRef: RefObject<HTMLCanvasElement>
  loading: boolean
  handleZoomIn: () => void
  handleZoomOut: () => void
  dropdownPosition: { x: number; y: number } | null
  deselectTextGroup: () => void
  selectPreviousTextGroup: () => void
  selectNextTextGroup: () => void
  mode: FabricMode
  setMode: Dispatch<SetStateAction<FabricMode>>
  creatingTextBox: boolean
  rects: Rect[]
}

export const useDrawingCanvas = ({
  page,
  activeTextGroups,
  setActiveTextGroups
}: UseDrawingCanvasParams): UseDrawingCanvasReturn => {
  const [mode, setMode] = useState<FabricMode>('pan')

  const [dropdownPosition, setDropdownPosition] = useState<{
    x: number
    y: number
  } | null>(null)

  const { toast } = useToast()

  const [createTextGroupMutation, { loading: creatingTextBox }] =
    useCreateTextGroupMutation()

  const selectTextGroup = useCallback(
    (e: { x: number; y: number }, textGroup: TextGroupWithRect) => {
      setActiveTextGroups?.([textGroup])
      setDropdownPosition({
        x: e.x,
        y: e.y
      })
    },
    [setActiveTextGroups]
  )

  const deselectTextGroup = useCallback(() => {
    setActiveTextGroups?.([])
    setDropdownPosition(null)
  }, [setActiveTextGroups])

  const rects = useMemo(() => {
    return (page.text_groups ?? []).map(textGroup => {
      const rect = new Rect({
        left: textGroup.x1,
        top: textGroup.y1,
        width: textGroup.x2 - textGroup.x1,
        height: textGroup.y2 - textGroup.y1,
        fill:
          textGroup.trade_packages.length === 0
            ? 'transparent'
            : `${textGroup.trade_packages[0].trade_color}50`,
        stroke: '#667FAF',
        strokeWidth: 2,
        hasControls: false,
        hoverCursor: 'pointer'
      })

      rect.set(RECT_KEYS.ID, textGroup.text_group_id)

      rect.on('mousedown', ({ e }) => {
        rect.set(
          RECT_KEYS.MODE,
          e.detail === 2 ? RECT_SELECT_MODE.EDIT : RECT_SELECT_MODE.VIEW
        )

        setTimeout(() => {
          // @ts-expect-error - event types
          selectTextGroup(e, {
            ...textGroup,
            rect
          })
        }, 500)
      })

      rect.on('mousedblclick', ({ e }) => {
        rect.set(RECT_KEYS.MODE, RECT_SELECT_MODE.EDIT)

        // @ts-expect-error - event types
        selectTextGroup(e, {
          ...textGroup,
          rect
        })
      })

      rect.on('deselected', () => {
        rect.set(RECT_KEYS.MODE, RECT_SELECT_MODE.VIEW)

        deselectTextGroup()
      })

      return rect
    })
  }, [page.text_groups, deselectTextGroup, selectTextGroup])

  const selectPreviousTextGroup = useCallback(() => {
    if (page.text_groups == null || activeTextGroups?.length !== 1) {
      return
    }

    const index = page.text_groups.findIndex(
      textGroup => textGroup.text_group_id === activeTextGroups[0].text_group_id
    )

    if (index === -1) {
      return
    }

    const {
      text_groups: { [index - 1]: previousTextGroup }
    } = page

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (previousTextGroup != null) {
      setDropdownPosition({
        x: screen.width / 3,
        y: screen.height / 3
      })
      setActiveTextGroups?.([
        {
          ...previousTextGroup,
          rect: rects[index - 1]
        }
      ])
    }
  }, [page, activeTextGroups, setActiveTextGroups, rects])

  const selectNextTextGroup = useCallback(() => {
    if (page.text_groups == null || activeTextGroups?.length !== 1) {
      return
    }

    const index = page.text_groups.findIndex(
      textGroup => textGroup.text_group_id === activeTextGroups[0].text_group_id
    )

    if (index === -1) {
      return
    }

    const {
      text_groups: { [index + 1]: nextTextGroup }
    } = page

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (nextTextGroup != null) {
      setDropdownPosition({
        x: screen.width / 3,
        y: screen.height / 3
      })
      setActiveTextGroups?.([
        {
          ...nextTextGroup,
          rect: rects[index + 1]
        }
      ])
    }
  }, [page, activeTextGroups, setActiveTextGroups, rects])

  const onNewRectangle = useCallback(
    async (rect: Rect) => {
      setDropdownPosition({
        x: screen.width / 3,
        y: screen.height / 3
      })
      setActiveTextGroups?.([
        {
          text_group_id: CUSTOM_TEXT_GROUP_ID,
          text: '',
          text_group_status: TextGroupStatus.Active,
          x1: Math.ceil(rect.left),
          x2: Math.ceil(rect.width + rect.left),
          y1: Math.ceil(rect.top),
          y2: Math.ceil(rect.height + rect.top),
          user_edited_text: '',
          created_at: new Date().toISOString(),
          csi_codes: [],
          comments: [],
          trade_packages: [],
          rect
        }
      ])

      await createTextGroupMutation({
        variables: {
          data: {
            page_id: page.page_id,
            x1: Math.ceil(rect.left),
            x2: Math.ceil(rect.width + rect.left),
            y1: Math.ceil(rect.top),
            y2: Math.ceil(rect.height + rect.top)
          }
        },
        onError: error => {
          toast.error({
            title: 'Something went wrong!',
            description: error.message
          })
        },
        onCompleted: ({ create_text_group }) => {
          // @ts-expect-error - event types
          rect.on('selected', ({ e }: { e: { x: number; y: number } }) => {
            setActiveTextGroups?.([
              {
                ...(create_text_group as TextGroup),
                rect
              }
            ])
            setDropdownPosition({
              x: e.x,
              y: e.y
            })
          })

          rect.on('deselected', deselectTextGroup)

          setActiveTextGroups?.([
            {
              ...(create_text_group as TextGroup),
              rect
            }
          ])
        },
        context: {
          headers: getAuthHeader()
        }
      })
    },
    [
      createTextGroupMutation,
      page,
      toast,
      deselectTextGroup,
      setActiveTextGroups
    ]
  )

  const onSelectedRectangles = useCallback(
    (selected: Rect[]) => {
      const selectedTextGroups: TextGroupWithRect[] = selected
        .map(rect => {
          const textGroup = page.text_groups?.find(
            t => t.text_group_id === rect.get(RECT_KEYS.ID)
          )

          if (textGroup == null) {
            return null
          }

          return {
            ...textGroup,
            rect
          }
        })
        .filter(Boolean) as TextGroupWithRect[]

      setActiveTextGroups?.(selectedTextGroups)
    },
    [setActiveTextGroups, page.text_groups]
  )

  const { canvasRef, loading, handleZoomIn, handleZoomOut, scrollToObject } =
    useFabric({
      rects,
      mode,
      image: {
        url: getHttpUrlFromS3(page.page_image_uri),
        width: page.page_image_width ?? 1,
        height: page.page_image_height ?? 1
      },
      onNewRectangle,
      onSelectedRectangles
    })

  useEffect(() => {
    setActiveTextGroups?.([])
  }, [mode, setActiveTextGroups])

  useEffect(() => {
    setActiveTextGroups?.([])
    setMode('pan')
  }, [page.page_id, setActiveTextGroups])

  useEffect(() => {
    setActiveTextGroups?.(prev => {
      if (prev.length === 0 || page.text_groups == null) {
        return []
      }

      const newTextGroups: TextGroupWithRect[] = page.text_groups
        .filter(t => prev.some(p => p.text_group_id === t.text_group_id))
        .map(textGroup => ({
          ...textGroup,
          rect: prev.find(p => p.text_group_id === textGroup.text_group_id)
            ?.rect!
        }))

      if (newTextGroups.length === 0) {
        return []
      }

      return newTextGroups
    })
  }, [page.text_groups, setActiveTextGroups])

  useEffect(() => {
    if (activeTextGroups?.length !== 1) {
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (activeTextGroups[0].rect != null) {
      return
    }

    const rect = rects.find(
      r => r.get(RECT_KEYS.ID) === activeTextGroups[0].text_group_id
    )

    if (rect == null) {
      return
    }

    scrollToObject(rect)
  }, [activeTextGroups, rects, scrollToObject])

  return {
    canvasRef,
    loading,
    handleZoomIn,
    handleZoomOut,
    dropdownPosition,
    deselectTextGroup,
    selectPreviousTextGroup,
    selectNextTextGroup,
    mode,
    setMode,
    rects,
    creatingTextBox
  }
}
