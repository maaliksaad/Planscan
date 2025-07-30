'use client'

import { type FC, useCallback, useMemo } from 'react'

import { useToast } from '@/hooks/use-toast'
import {
  type CsiCode,
  type TradePackage,
  useApplyTradeMutation,
  useUnApplyTradeMutation
} from '@/lib/graphql'
import { getAuthHeader } from '@/utils/headers'

interface ApplyTradePackageProps {
  tradePackage: TradePackage
  csiCode: Pick<CsiCode, 'csi_code_id' | 'csi_code'>
}

export const ApplyTradePackage: FC<ApplyTradePackageProps> = ({
  tradePackage,
  csiCode
}) => {
  const { toast } = useToast()

  const applied = useMemo(
    () =>
      tradePackage.csi_codes.some(
        code => code.csi_code_id === csiCode.csi_code_id
      ),
    [tradePackage, csiCode]
  )

  const tradeColor = useMemo(
    () => (applied ? (tradePackage.trade_color ?? '') : '#ffffff'),
    [tradePackage, applied]
  )

  const [applyTradeMutation, { loading: applying }] = useApplyTradeMutation()
  const [unApplyTradeMutation, { loading: unApplying }] =
    useUnApplyTradeMutation()

  const applyTrade = useCallback(async () => {
    const mutation = applied ? unApplyTradeMutation : applyTradeMutation

    await mutation({
      variables: {
        trade_package_id: tradePackage.trade_package_id,
        csi_code_ids: [csiCode.csi_code_id]
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
    toast,
    applied,
    unApplyTradeMutation,
    csiCode.csi_code_id,
    tradePackage.trade_package_id
  ])

  return (
    <button
      onClick={applyTrade}
      disabled={applying || unApplying}
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
  )
}
