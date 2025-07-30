'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { type Dispatch, type SetStateAction, useEffect, useMemo } from 'react'
import {
  type SubmitHandler,
  useForm,
  type UseFormReturn
} from 'react-hook-form'

import { useToast } from '@/hooks/use-toast'
import {
  type Figure,
  type TextGroup,
  useGetFiguresQuery,
  useUpdateTextGroupMutation
} from '@/lib/graphql'
import {
  TextGroupSchemaKeys,
  UpdateTextGroupSchema,
  type UpdateTextGroupSchemaType
} from '@/schemas/text-groups'
import { useProjectStore } from '@/stores/project-store'
import { areArraysEqual } from '@/utils/arrays'
import { getAuthHeader } from '@/utils/headers'

interface UseTextGroupFormParams {
  textGroup: TextGroup
  setIsEditMode: Dispatch<SetStateAction<boolean>>
}

interface UseTextGroupFormReturn {
  form: UseFormReturn<UpdateTextGroupSchemaType>
  onSubmit: SubmitHandler<UpdateTextGroupSchemaType>
  csiCodeOptions: Array<{ value: string; label: string }>
  tradeOptions: Array<{ value: string; label: string }>
  figures: Figure[]
  loadingFigures: boolean
}

export const useTextGroupForm = ({
  textGroup,
  setIsEditMode
}: UseTextGroupFormParams): UseTextGroupFormReturn => {
  const {
    csi_codes: csiCodes,
    trade_packages: tradePackages,
    pages,
    setPages
  } = useProjectStore()(state => state)

  const { toast } = useToast()

  const { data: figures, loading: loadingFigures } = useGetFiguresQuery({
    variables: {
      text_group_id: textGroup.text_group_id
    },
    context: {
      headers: getAuthHeader()
    },
    errorPolicy: 'all'
  })

  const form = useForm<UpdateTextGroupSchemaType>({
    resolver: zodResolver(UpdateTextGroupSchema),
    defaultValues: {
      [TextGroupSchemaKeys.TEXT]: textGroup.user_edited_text ?? textGroup.text,
      [TextGroupSchemaKeys.FIGURE_ID]: textGroup.figure?.figure_id,
      [TextGroupSchemaKeys.CSI_CODES]: textGroup.csi_codes.map(
        csiCode => csiCode.csi_code_id
      ),
      [TextGroupSchemaKeys.TRADES]: textGroup.trade_packages.map(
        trade => trade.trade_package_id
      )
    }
  })

  const csiCodeOptions = useMemo(
    () =>
      csiCodes.map(code => ({
        value: code.csi_code_id,
        label: `${code.csi_code} - ${code.title}`
      })),
    [csiCodes]
  )

  const tradeOptions = useMemo(
    () =>
      tradePackages.map(trade => ({
        value: trade.trade_package_id,
        label: trade.trade_package_name
      })),
    [tradePackages]
  )

  const [updateTextGroupMutation] = useUpdateTextGroupMutation()

  const onSubmit: SubmitHandler<UpdateTextGroupSchemaType> = async data => {
    const areCodesSame = areArraysEqual(
      data.csi_codes,
      textGroup.csi_codes.map(code => code.csi_code_id)
    )

    const areTradesSame = areArraysEqual(
      data.trades,
      textGroup.trade_packages.map(trade => trade.trade_package_id)
    )

    await updateTextGroupMutation({
      variables: {
        text_group_id: textGroup.text_group_id,
        data: {
          user_edited_text: data[TextGroupSchemaKeys.TEXT],
          figure_id: data[TextGroupSchemaKeys.FIGURE_ID],
          ...(!areCodesSame && {
            csi_codes: data.csi_codes
          }),
          ...(!areTradesSame && {
            trades: data.trades
          })
        }
      },
      onError: error => {
        toast.error({
          title: 'Something went wrong!',
          description: error.message
        })
      },
      onCompleted: () => {
        toast.success({
          title: 'Text group updated!',
          description: 'Text group has been updated created.',
          duration: 5000
        })

        setIsEditMode(false)

        setPages(
          pages.map(page => ({
            ...page,
            ...(page.text_groups != null && {
              text_groups: page.text_groups.map(tg => {
                return {
                  ...tg,
                  ...(tg.text_group_id === textGroup.text_group_id && {
                    ...tg,
                    user_edited_text: data[TextGroupSchemaKeys.TEXT],
                    figure: {
                      ...tg.figure,
                      figure_id: data[TextGroupSchemaKeys.FIGURE_ID]
                    },
                    csi_codes: areCodesSame
                      ? tg.csi_codes
                      : csiCodes.filter(code =>
                          data.csi_codes.includes(code.csi_code_id)
                        ),
                    trade_packages: areTradesSame
                      ? tg.trade_packages
                      : tradePackages.filter(trade =>
                          data.trades.includes(trade.trade_package_id)
                        )
                  })
                } as TextGroup
              })
            })
          }))
        )
      },
      context: {
        headers: getAuthHeader()
      }
    })
  }

  useEffect(() => {
    return () => {
      form.reset()
    }
  }, [form])

  return {
    form,
    onSubmit,
    csiCodeOptions,
    tradeOptions,
    figures: (figures?.figures ?? []) as Figure[],
    loadingFigures
  }
}
