import type { FC } from 'react'

import { Badge } from '@/components/ui/badge'
import { type TextGroup, TextGroupStatus } from '@/lib/graphql'

interface TextGroupDetailsProps {
  textGroup: TextGroup
}

export const TextGroupDetails: FC<TextGroupDetailsProps> = ({ textGroup }) => {
  return (
    <div className="w-full space-y-4 px-3 py-2">
      <div className="space-y-2">
        <h5 className="text-sm font-medium leading-none">Extracted text</h5>
        <p className="text-sm leading-none text-zinc-900">
          {textGroup.text_group_status === TextGroupStatus.Extracting
            ? 'Extracting...'
            : (textGroup.user_edited_text ?? textGroup.text)}
        </p>
      </div>

      <div className="space-y-2">
        <h5 className="text-sm font-medium leading-none">
          Figure detail number
        </h5>
        <p className="text-sm leading-none text-zinc-900">
          {textGroup.figure?.figure_number ?? '-'}
        </p>
      </div>

      <div className="space-y-2">
        <h5 className="text-sm font-medium leading-none">CSI codes</h5>
        <div className="space-y-1">
          {textGroup.csi_codes.length === 0 && (
            <p className="text-sm leading-none text-zinc-900">-</p>
          )}
          {textGroup.csi_codes.map(csiCode => (
            <Badge
              key={csiCode.csi_code_id}
              variant="secondary"
              className="text-wrap"
            >
              {csiCode.csi_code} - {csiCode.title}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h5 className="text-sm font-medium leading-none">Trades</h5>
        <div className="flex flex-wrap gap-1">
          {textGroup.trade_packages.length === 0 && (
            <p className="text-sm leading-none text-zinc-900">-</p>
          )}
          {textGroup.trade_packages.map(trade => (
            <Badge
              key={trade.trade_package_id}
              variant="secondary"
              className="text-wrap text-white"
              style={{
                backgroundColor: trade.trade_color ?? '#09090b'
              }}
            >
              {trade.trade_package_name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
