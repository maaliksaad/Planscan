import type { FC } from 'react'

import { AppFavicon } from '@/components/app-favicon'
import { Skeleton } from '@/components/ui/skeleton'
import { OrganizationSwitch } from '@/features/navbar/organization-switch'
import { UserMenu } from '@/features/navbar/user-menu'

export const ProjectDetailsSkeleton: FC = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-1 shadow-sm shadow-black/5">
        <div className="flex items-center gap-3">
          <AppFavicon />

          <Skeleton className="h-6 w-32" />
        </div>

        <div className="flex items-center gap-3">
          <OrganizationSwitch />
          <UserMenu />
        </div>
      </div>

      <div className="w-full">
        <div className="grid min-h-[calc(100vh-54px)] grid-cols-3 divide-x divide-zinc-200">
          <div className="w-full space-y-4 p-6">
            <Skeleton className="h-6 w-32" />

            <div className="space-y-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
          <div className="col-span-2 w-full space-y-4 p-6">
            <Skeleton className="h-6 w-32" />

            <div className="space-y-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
