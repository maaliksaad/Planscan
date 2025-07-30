import { PopoverClose } from '@radix-ui/react-popover'
import type { FC } from 'react'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import type { CsiCode, TradePackage } from '@/lib/graphql'

import { CSI_CODE_HEADERS } from '../trades-table.constants'
import { useApplyGroupTradePackage } from './use-apply-group-trade-package'

interface ApplyGroupTradePackageProps {
  tradePackage: TradePackage
  csiCode: Pick<CsiCode, 'csi_code_id' | 'csi_code'>
}

export const ApplyGroupTradePackage: FC<ApplyGroupTradePackageProps> = ({
  tradePackage,
  csiCode
}) => {
  const {
    open,
    onOpenChange,
    prefix,
    tradeColor,
    applying,
    applied,
    applyTrades
  } = useApplyGroupTradePackage({ tradePackage, csiCode })

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button
          className="flex cursor-pointer items-center justify-center"
          style={{
            width: '100%',
            height: '50px',
            backgroundColor: tradeColor,
            color: tradeColor
          }}
        >
          {tradeColor}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="space-y-2">
        <div className="flex flex-col space-y-1.5 text-center mobile:text-left">
          <h2 className="text-lg font-semibold leading-none tracking-tight">
            {applied ? 'Remove' : 'Apply'} Trades
          </h2>
          <p className="text-sm text-zinc-500">
            {applied ? 'Remove' : 'Apply'} {tradePackage.trade_package_name}{' '}
            trade to all {CSI_CODE_HEADERS[prefix]} trades?
          </p>
        </div>
        <div className="flex flex-col-reverse mobile:flex-row mobile:justify-end mobile:space-x-2">
          <PopoverClose asChild>
            <Button variant="ghost">Cancel</Button>
          </PopoverClose>
          <Button type="button" disabled={applying} onClick={applyTrades}>
            {applied ? 'Remove' : 'Apply'}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
