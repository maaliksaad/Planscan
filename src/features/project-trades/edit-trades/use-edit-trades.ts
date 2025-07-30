import dayjs from 'dayjs'
import { useCallback, useEffect, useState } from 'react'

import { useToast } from '@/hooks/use-toast'
import {
  type TradePackage,
  useCreateTradePackageMutation,
  useGetOrganizationMembersQuery,
  type User,
  useUpdateTradePackageMutation
} from '@/lib/graphql'
import { useProjectStore } from '@/stores/project-store'
import { generateId } from '@/utils/generate-id'
import { getAuthHeader } from '@/utils/headers'

interface UseEditTradesReturn {
  open: boolean
  onOpenChange: (value: boolean) => void
  trades: TradePackage[]
  members: User[]
  loading: boolean
  saving: boolean
  handleAddTrade: () => void
  handleUpdateName: (id: string, name: string) => void
  handleUpdateColor: (id: string, color: string) => void
  handleUpdateMembers: (id: string, user_ids: string[]) => void
  handleSave: () => Promise<void>
}

export const useEditTrades = (): UseEditTradesReturn => {
  const project = useProjectStore()(state => state.project)
  const initialTrades = useProjectStore()(state => state.trade_packages)

  const [trades, setTrades] = useState(
    initialTrades.toSorted((a, b) =>
      dayjs(b.created_at).diff(dayjs(a.created_at))
    )
  )
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  const { toast } = useToast()

  const { data: members, loading } = useGetOrganizationMembersQuery({
    onError: error => {
      toast.error({
        title: 'Something went wrong!',
        description: error.message
      })
    },
    context: {
      headers: getAuthHeader()
    },
    fetchPolicy: 'no-cache',
    errorPolicy: 'all'
  })

  const handleAddTrade = useCallback(() => {
    setTrades(prevTrades => [
      ...prevTrades,
      {
        trade_package_id: generateId(),
        trade_package_name: '',
        trade_color: '',
        users: [],
        csi_codes: [],
        created_at: new Date().toISOString()
      }
    ])
  }, [])

  const handleUpdateName = useCallback((id: string, name: string) => {
    setTrades(prevTrades =>
      prevTrades.map(trade =>
        trade.trade_package_id === id
          ? { ...trade, trade_package_name: name }
          : trade
      )
    )
  }, [])

  const handleUpdateColor = useCallback((id: string, color: string) => {
    setTrades(prevTrades =>
      prevTrades.map(trade =>
        trade.trade_package_id === id ? { ...trade, trade_color: color } : trade
      )
    )
  }, [])

  const handleUpdateMembers = useCallback(
    (id: string, user_ids: string[]) => {
      const users = user_ids
        .map(user_id => {
          return members?.organization_members.find(
            member => member.user_id === user_id
          )
        })
        .filter(user => user != null) as User[]

      setTrades(prevTrades =>
        prevTrades.map(trade =>
          trade.trade_package_id === id ? { ...trade, users } : trade
        )
      )
    },
    [members?.organization_members]
  )

  const [createTradePackageMutation] = useCreateTradePackageMutation()
  const [updateTradePackageMutation] = useUpdateTradePackageMutation()

  const handleSave = useCallback(async () => {
    setSaving(true)

    if (
      trades.length !==
      new Set(trades.map(trade => trade.trade_package_name)).size
    ) {
      toast.error({
        title: 'Trade names must be unique'
      })
      setSaving(false)
      return
    }

    const newTrades = trades.filter(trade =>
      initialTrades.every(
        initialTrade => initialTrade.trade_package_id !== trade.trade_package_id
      )
    )

    // get old trades that were edited
    const updatedTrades = trades.filter(trade =>
      initialTrades.some(
        initialTrade => initialTrade.trade_package_id === trade.trade_package_id
      )
    )

    await Promise.all(
      newTrades.map(async trade => {
        await createTradePackageMutation({
          variables: {
            data: {
              trade_package_name: trade.trade_package_name,
              trade_color: trade.trade_color ?? '#000000',
              user_ids: trade.users.map(user => user.user_id),
              project_id: project.project_id
            }
          },
          onError: error => {
            toast.error({
              title: 'Something went wrong!',
              description: error.message
            })
          },
          errorPolicy: 'none',
          context: {
            headers: getAuthHeader()
          }
        })
      })
    )

    await Promise.all(
      updatedTrades.map(async trade => {
        await updateTradePackageMutation({
          variables: {
            trade_package_id: trade.trade_package_id,
            data: {
              trade_package_name: trade.trade_package_name,
              trade_color: trade.trade_color,
              user_ids: trade.users.map(user => user.user_id)
            }
          },
          onError: error => {
            toast.error({
              title: 'Something went wrong!',
              description: error.message
            })
          },
          errorPolicy: 'none',
          context: {
            headers: getAuthHeader()
          }
        })
      })
    )

    toast.success({
      title: 'Trades saved!',
      description: 'Trades have been successfully saved.',
      duration: 5000
    })

    setSaving(false)
  }, [
    initialTrades,
    trades,
    createTradePackageMutation,
    updateTradePackageMutation,
    project.project_id,
    toast
  ])

  const onOpenChange = useCallback(
    (value: boolean) => {
      if (saving) return

      setOpen(value)
    },
    [saving]
  )

  useEffect(() => {
    setTrades(
      initialTrades.toSorted((a, b) =>
        dayjs(b.created_at).diff(dayjs(a.created_at))
      )
    )
  }, [initialTrades])

  return {
    open,
    onOpenChange,
    trades,
    members: members?.organization_members ?? [],
    loading,
    saving,
    handleAddTrade,
    handleUpdateName,
    handleUpdateMembers,
    handleUpdateColor,
    handleSave
  }
}
