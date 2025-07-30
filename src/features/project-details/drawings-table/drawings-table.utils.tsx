import type { ColumnDef } from '@tanstack/react-table'

import type { Page } from '@/lib/graphql'

import { DrawingTableActions } from './drawing-table-actions'

export const getDrawingTableColumns = (
  onSelect: (page: Page) => void
): Array<ColumnDef<Page>> => [
  {
    accessorKey: 'drawing_discipline',
    header: () => <span className="whitespace-nowrap px-2">Discipline</span>,
    cell: ({ getValue }) => (
      <span className="block whitespace-nowrap px-2">{getValue<string>()}</span>
    )
  },
  {
    accessorKey: 'drawing_number',
    header: () => <span className="whitespace-nowrap px-2">Drawing No.</span>,
    cell: ({ getValue, row }) => (
      <button
        onClick={() => {
          onSelect(row.original)
        }}
        className="block whitespace-nowrap px-2 text-blue-500"
      >
        {getValue<string>()}
      </button>
    )
  },
  {
    accessorKey: 'sheet_title',
    header: () => <span className="whitespace-nowrap px-2">Drawing Title</span>,
    cell: ({ getValue }) => (
      <span className="block whitespace-nowrap px-2">{getValue<string>()}</span>
    )
  },
  {
    accessorKey: 'page_number',
    header: () => <span className="whitespace-nowrap px-2">Page No.</span>,
    cell: ({ getValue }) => (
      <span className="block whitespace-nowrap px-2">{getValue<string>()}</span>
    ),
    filterFn: (row, id, filterValue) => {
      if (filterValue === '') return true
      return row.original.page_number.toString() === filterValue
    }
  },
  {
    accessorKey: 'page_id',
    header: '',
    enableHiding: false,
    enableGrouping: false,
    cell: ({ row }) => <DrawingTableActions page={row.original} />
  }
]
