import type { CellContext, ColumnDef } from '@tanstack/react-table'

import { ApplyGroupTradePackage } from '@/features/project-trades/trades-table/apply-group-trade-package'
import type { CsiCode, TradePackage } from '@/lib/graphql'
import type { DataTableFilterField } from '@/types/data-table'
import { cn } from '@/utils/cn'
import { slugify } from '@/utils/slug'

import { ApplyTradePackage } from './apply-trade-package'
import type { CSICodeWithKey } from './trades-table.types'

const getCSICodeKey = (code: string): string => {
  return code.replace(/\s/g, '').slice(0, 2)
}

export const formatTradesTableData = (
  csiCodes: CsiCode[],
  trades: TradePackage[]
): CSICodeWithKey[] => {
  // @ts-expect-error - types
  return csiCodes
    .map(csiCode => ({
      ...csiCode,
      key: getCSICodeKey(csiCode.csi_code),
      ...Object.fromEntries(
        trades.map(trade => [slugify(trade.trade_package_name), trade])
      )
    }))
    .toSorted((a, b) => a.key.localeCompare(b.key))
}

export const getTradesTableColumns = (
  trades: TradePackage[]
): Array<ColumnDef<CSICodeWithKey>> => [
  {
    accessorKey: 'key',
    header: 'CSI Code',
    cell: ({ row }) => (
      <p
        className={cn('text-nowrap p-2 text-sm', {
          'pl-8': !row.getIsGrouped()
        })}
      >
        {row.original.csi_code} {row.original.title}
      </p>
    ),
    filterFn: 'arrIncludesSome'
  },
  ...trades.map(trade => ({
    accessorKey: slugify(trade.trade_package_name),
    header: trade.trade_package_name,
    size: 100,
    cell: ({ row }: CellContext<CSICodeWithKey, unknown>) => {
      const Item = row.getIsGrouped()
        ? ApplyGroupTradePackage
        : ApplyTradePackage

      return <Item tradePackage={trade} csiCode={row.original} />
    }
  }))
]

export const getTradesTableFilters = (
  codes: CSICodeWithKey[]
): Array<DataTableFilterField<CSICodeWithKey>> => [
  {
    id: 'csi_code',
    label: 'CSI Code',
    type: 'multi-select',
    placeholder: 'Search...',
    options: [...new Set(codes.flatMap(code => code.csi_code))].map(
      csiCode => ({
        label: csiCode,
        value: csiCode
      })
    )
  }
]
