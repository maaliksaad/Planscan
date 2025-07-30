import { useCallback, useMemo, useState } from 'react'

import { useToast } from '@/hooks/use-toast'
import {
  type CsiCode,
  type TradePackage,
  useApplyTradeMutation,
  useUnApplyTradeMutation
} from '@/lib/graphql'
import { useProjectStore } from '@/stores/project-store'
import { getAuthHeader } from '@/utils/headers'

import type { CSI_CODE_HEADERS } from '../trades-table.constants'

interface UseApplyGroupTradePackageParams {
  tradePackage: TradePackage
  csiCode: Pick<CsiCode, 'csi_code_id' | 'csi_code'>
}

interface UseApplyGroupTradePackageReturn {
  open: boolean
  onOpenChange: (value: boolean) => void
  prefix: keyof typeof CSI_CODE_HEADERS
  applying: boolean
  applied: boolean
  tradeColor: string
  applyTrades: () => Promise<void>
}

export const useApplyGroupTradePackage = ({
  tradePackage,
  csiCode
}: UseApplyGroupTradePackageParams): UseApplyGroupTradePackageReturn => {
  const [open, setOpen] = useState(false)

  const { toast } = useToast()

  const csiCodes = useProjectStore()(state => state.csi_codes)

  // @ts-expect-error - types
  const prefix: keyof typeof CSI_CODE_HEADERS = csiCode.csi_code
    .replace(/\s/g, '')
    .slice(0, 2)

  const groupCsiCodes = useMemo(
    () => csiCodes.filter(csi => csi.csi_code.startsWith(prefix)),
    [prefix, csiCodes]
  )

  const tradeCSICodes = useMemo(
    () => tradePackage.csi_codes.map(csi => csi.csi_code_id),
    [tradePackage]
  )

  const applied = useMemo(
    () =>
      groupCsiCodes.every(code => {
        return tradeCSICodes.includes(code.csi_code_id)
      }),
    [tradeCSICodes, groupCsiCodes]
  )

  const tradeColor = useMemo(
    () => (applied ? (tradePackage.trade_color ?? '') : '#ffffff'),
    [tradePackage, applied]
  )

  const [applyTradeMutation, { loading: applying }] = useApplyTradeMutation()
  const [unApplyTradeMutation, { loading: unApplying }] =
    useUnApplyTradeMutation()

  const onOpenChange = useCallback(
    (value: boolean) => {
      if (applying || unApplying) return

      setOpen(value)
    },
    [applying, unApplying]
  )

  const applyTrades = useCallback(async () => {
    const csiToApply = groupCsiCodes.filter(csi => {
      return !tradeCSICodes.includes(csi.csi_code_id)
    })

    const csiToRemove = groupCsiCodes.filter(csi => {
      return tradeCSICodes.includes(csi.csi_code_id)
    })

    const filteredCSIs = applied ? csiToRemove : csiToApply

    const mutation = applied ? unApplyTradeMutation : applyTradeMutation

    await mutation({
      variables: {
        trade_package_id: tradePackage.trade_package_id,
        csi_code_ids: filteredCSIs.map(csi => csi.csi_code_id)
      },
      onError: error => {
        toast.error({
          title: 'Something went wrong!',
          description: error.message
        })
      },
      onCompleted: () => {
        toast.success({
          title: `Trade ${applied ? 'removed' : 'applied'} successfully!`,
          description: `The trade has been ${applied ? 'removed from' : 'applied to'} the CSI code.`
        })
      },
      errorPolicy: 'all',
      context: {
        headers: getAuthHeader()
      }
    })
  }, [
    applyTradeMutation,
    unApplyTradeMutation,
    toast,
    applied,
    tradePackage.trade_package_id,
    groupCsiCodes,
    tradeCSICodes
  ])

  return {
    open,
    onOpenChange,
    prefix,
    applying: applying || unApplying,
    applied,
    tradeColor,
    applyTrades
  }
}
