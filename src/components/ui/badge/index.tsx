import type { FC } from 'react'

import { cn } from '@/utils/cn'

import type { BadgeProps } from './badge.types'
import { badgeVariants } from './badge.utils'

const Badge: FC<BadgeProps> = ({ className, variant, ...props }) => {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge }
export { badgeVariants } from './badge.utils'
