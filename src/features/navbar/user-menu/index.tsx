'use client'

import { useClerk } from '@clerk/nextjs'
import type { FC } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ChevronDownIcon } from '@/icons/chevron-down'
import { useUserStore } from '@/stores/user-store'

import { UserMenuSkeleton } from './user-menu-skeleton'

export const UserMenu: FC = () => {
  const user = useUserStore()(state => state.user)

  const { signOut } = useClerk()

  const handleSignOut = async (): Promise<void> => {
    await signOut()
  }

  if (user == null) {
    return <UserMenuSkeleton />
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 outline-0 focus:outline-0">
        <Avatar className="size-10 border">
          <AvatarImage src={user.profile_photo_url} alt={user.first_name} />
          <AvatarFallback name={`${user.first_name} ${user.last_name}`} />
        </Avatar>

        <div className="flex items-center gap-1 px-1">
          <p className="text-sm font-medium text-zinc-950">
            {user.first_name} {user.last_name}
          </p>

          <ChevronDownIcon className="size-4 text-zinc-950" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px]">
        <DropdownMenuItem
          onClick={handleSignOut}
          role="button"
          className="cursor-pointer"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
