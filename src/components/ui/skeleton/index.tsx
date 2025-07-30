import type { FC, HTMLAttributes } from 'react'

import { cn } from '@/utils/cn'

const Skeleton: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-zinc-900/10', className)}
      {...props}
    />
  )
}

export { Skeleton }
