import type { FC } from 'react'

import { Skeleton } from '@/components/ui/skeleton'

export const UserMenuSkeleton: FC = () => {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="size-10 rounded-full" />
      <Skeleton className="h-4 w-36" />
    </div>
  )
}
