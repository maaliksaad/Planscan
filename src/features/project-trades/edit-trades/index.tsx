'use client'

import Image from 'next/image'
import type { FC } from 'react'

import { Button } from '@/components/ui/button'
import { ColorPicker } from '@/components/ui/color-picker'
import { Input } from '@/components/ui/input'
import { MultiSelect } from '@/components/ui/multi-select'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { LoadingIcon } from '@/icons/loading'
import { PencilIcon } from '@/icons/pencil'
import { PlusIcon } from '@/icons/plus'

import { useEditTrades } from './use-edit-trades'

export const EditTrades: FC = () => {
  const {
    open,
    onOpenChange,
    trades,
    members,
    loading,
    saving,
    handleAddTrade,
    handleUpdateName,
    handleUpdateMembers,
    handleUpdateColor,
    handleSave
  } = useEditTrades()

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button size="sm" variant="ghost">
          <PencilIcon className="size-4" />
          <span>Edit trades</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex min-w-[600px] flex-col">
        <SheetHeader>
          <SheetTitle>Edit Trades</SheetTitle>
        </SheetHeader>

        {loading && (
          <div className="flex flex-1 items-center justify-center">
            <LoadingIcon />
          </div>
        )}

        {!loading && (
          <>
            <div className="flex-1 space-y-2">
              {trades.map(trade => (
                <div
                  key={trade.trade_package_id}
                  className="grid grid-cols-[16px_repeat(3,minmax(0,1fr))] items-center gap-2"
                >
                  <ColorPicker
                    className="size-4 rounded-[2px]"
                    value={trade.trade_color ?? '#000000'}
                    onChange={color => {
                      handleUpdateColor(trade.trade_package_id, color)
                    }}
                  />

                  <Input
                    className=""
                    value={trade.trade_package_name}
                    onChange={e => {
                      handleUpdateName(trade.trade_package_id, e.target.value)
                    }}
                  />

                  <div className="col-span-2">
                    <MultiSelect
                      options={members.map(user => ({
                        label: `${user.first_name} ${user.last_name}`,
                        value: user.user_id
                      }))}
                      value={trade.users.map(user => user.user_id)}
                      onSelectChange={selectedOptions => {
                        handleUpdateMembers(
                          trade.trade_package_id,
                          selectedOptions
                        )
                      }}
                      withPortal={false}
                      renderer={({ value, label }) => {
                        const user = members.find(mem => mem.user_id === value)

                        if (user == null) {
                          return <p className="text-nowrap text-xs">{label}</p>
                        }

                        return (
                          <div className="flex w-full items-center gap-2">
                            <Image
                              src={user.profile_photo_url}
                              alt={user.first_name}
                              width={20}
                              height={20}
                              className="size-4 rounded-full"
                            />
                            <p className="text-nowrap text-xs">
                              {user.first_name} {user.last_name}
                            </p>
                          </div>
                        )
                      }}
                    />
                  </div>
                </div>
              ))}

              <Button variant="ghost" onClick={handleAddTrade}>
                <PlusIcon className="size-4" />
                <span>Add trade</span>
              </Button>
            </div>

            <div className="flex items-center justify-end gap-4">
              <div className="flex gap-4">
                <SheetClose asChild>
                  <Button variant="link" className="p-0">
                    Cancel
                  </Button>
                </SheetClose>
                <Button
                  type="submit"
                  className="w-[80px]"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? <LoadingIcon className="size-4" /> : 'Save'}
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
