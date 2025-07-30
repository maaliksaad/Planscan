import type { ColumnDef } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { CheckCircleIcon } from '@/icons/check-circle'
import { TrashIcon } from '@/icons/trash'
import type { Page } from '@/lib/graphql'
import { cn } from '@/utils/cn'

import { DrawingThumbnail } from './drawing-thumbnail'
import { RenderCell } from './render-cell'

export const getDrawingPagesTableColumns = (
  pages: Page[],
  handleRemovePages: (pageIds: string[]) => Promise<void>,
  removingPages: boolean,
  viewedPages: string[]
): Array<ColumnDef<Page>> => [
  {
    id: 'select',
    accessorKey: 'text_group_id',
    size: 40,
    enableHiding: false,
    header: ({ table }) => (
      <div className="px-1">
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          onCheckedChange={e => {
            table.getToggleAllRowsSelectedHandler()({
              target: { checked: e }
            })
          }}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <Checkbox
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onCheckedChange={e => {
            row.getToggleSelectedHandler()({
              target: { checked: e }
            })
          }}
        />
      </div>
    )
  },
  {
    id: 'page_thumbnail_uri',
    accessorKey: 'page_thumbnail_uri',
    size: 120,
    header: 'Thumbnail',
    cell: ({ row }) => <DrawingThumbnail page={row.original} />
  },
  {
    id: 'drawing_number',
    accessorKey: 'drawing_number',
    size: 80,
    header: 'Drawing no.',
    cell: props => (
      <div className="flex items-center gap-2">
        <CheckCircleIcon
          className={cn('size-5 text-zinc-400', {
            'text-green-500': viewedPages.includes(props.row.original.page_id)
          })}
        />
        <RenderCell {...props} />
      </div>
    )
  },
  {
    id: 'drawing_discipline',
    accessorKey: 'drawing_discipline',
    header: 'Discipline',
    cell: props => <RenderCell {...props} />
  },
  {
    id: 'sheet_title',
    accessorKey: 'sheet_title',
    header: 'Drawing title',
    cell: props => <RenderCell {...props} />
  },
  {
    id: 'page_id',
    accessorKey: 'page_id',
    header: ({ table }) =>
      table.getIsAllRowsSelected() && (
        <Button
          variant="ghost"
          size="icon-sm"
          className="p-0"
          onClick={async () =>
            handleRemovePages(pages.map(page => page.page_id))
          }
          disabled={removingPages}
        >
          <TrashIcon className="size-4" />
        </Button>
      ),
    cell: ({ row }) => (
      <Button
        variant="ghost"
        size="icon-sm"
        className="p-0"
        onClick={async () => handleRemovePages([row.original.page_id])}
        disabled={removingPages}
      >
        <TrashIcon className="size-4" />
      </Button>
    )
  }
]
