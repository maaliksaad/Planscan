import type { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { ExtractedTableCheckbox } from '@/features/project-details/drawings-table/extracted-data-table/extracted-table-checkbox'
import { TextGroupComments } from '@/features/project-details/drawings-table/text-group-comments'
import { type CsiCode, type TextGroup, TextGroupStatus } from '@/lib/graphql'
import type { DataTableFilterField } from '@/types/data-table'
import type { TextGroupWithRect } from '@/types/text-groups'

import type { TransformedTextGroup } from './extracted-data-table.types'

export const transformTextGroupsData = (
  textGroups: TextGroup[]
): TransformedTextGroup[] => {
  return textGroups.map(textGroup => ({
    text_group_id: textGroup.text_group_id,
    text: textGroup.user_edited_text ?? textGroup.text,
    csi_codes: textGroup.csi_codes.map(code => code.csi_code),
    trade_packages: textGroup.trade_packages.map(
      trade => trade.trade_package_name
    ),
    comments: textGroup.comments.length,
    original: textGroup
  }))
}

export const getExtractedDataTableColumns = (
  activeTextGroups: TextGroupWithRect[]
): Array<ColumnDef<TransformedTextGroup>> => {
  return [
    {
      id: 'select',
      accessorKey: 'text_group_id',
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
        <ExtractedTableCheckbox activeTextGroups={activeTextGroups} row={row} />
      )
    },
    {
      id: 'text',
      accessorKey: 'text',
      header: () => (
        <span className="whitespace-nowrap px-2">Extracted Text</span>
      ),
      cell: ({ row: { original } }) => (
        <span className="block w-[300px] truncate px-2 text-sm">
          {original.text}
        </span>
      ),
      filterFn: (row, _, filterValue) => {
        return row.original.text
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      }
    },
    {
      id: 'csi_codes',
      accessorKey: 'csi_codes',
      header: () => <span className="whitespace-nowrap px-2">CSI Codes</span>,
      cell: ({ row: { original } }) => (
        <div className="inline-flex max-w-[400px] flex-wrap gap-1">
          {original.original.text_group_status === TextGroupStatus.CsiEditing
            ? 'Editing...'
            : original.csi_codes.map(csiCode => (
                <Badge
                  key={csiCode}
                  variant="secondary"
                  className="text-nowrap"
                >
                  {csiCode}
                </Badge>
              ))}
        </div>
      ),
      filterFn: (row, _, filterValue) => {
        if (filterValue.length === 0) {
          return true
        }

        return row.original.csi_codes.some(csiCode => {
          return filterValue.includes(csiCode)
        })
      }
    },
    {
      id: 'trade_packages',
      accessorKey: 'trade_packages',
      header: () => <span className="whitespace-nowrap px-2">Trades</span>,
      cell: ({ row: { original } }) => (
        <div className="inline-flex max-w-[400px] flex-wrap gap-1">
          {original.trade_packages.map(tradePackage => {
            const backgroundColor =
              original.original.trade_packages.find(
                trade => trade.trade_package_name === tradePackage
              )?.trade_color ?? '#09090b'

            return (
              <Badge
                key={tradePackage}
                variant="secondary"
                className="text-nowrap text-white"
                style={{
                  backgroundColor
                }}
              >
                {tradePackage}
              </Badge>
            )
          })}
        </div>
      ),
      filterFn: (row, _, filterValue) => {
        if (filterValue.length === 0) {
          return true
        }

        return row.original.trade_packages.some(tradePackage => {
          return filterValue.includes(tradePackage)
        })
      }
    },
    {
      id: 'comments',
      accessorKey: 'comments',
      header: () => <span className="whitespace-nowrap px-2">Comments</span>,
      cell: ({ row: { original } }) => (
        <div className="relative mx-auto flex size-6 items-center justify-center">
          {original.comments > 0 && (
            <TextGroupComments textGroup={original.original} />
          )}
        </div>
      )
    }
  ]
}

export const getExtractedDataTableFilters = (
  csiCodes: CsiCode[],
  trades: string[]
): Array<DataTableFilterField<TransformedTextGroup>> => {
  return [
    {
      id: 'text',
      label: 'Extracted Text',
      type: 'text'
    },
    {
      id: 'csi_codes',
      label: 'CSI Codes',
      type: 'multi-select',
      placeholder: 'Search...',
      options: [...new Set(csiCodes.map(csiCode => csiCode.csi_code))]
        .toSorted((a, b) => a.localeCompare(b))
        .map(csiCode => ({
          label: csiCode,
          value: csiCode
        }))
    },
    {
      id: 'trade_packages',
      label: 'Trades',
      type: 'multi-select',
      placeholder: 'Search...',
      options: trades.map(tradePackage => ({
        label: tradePackage,
        value: tradePackage
      }))
    }
  ]
}
