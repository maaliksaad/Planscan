import type { VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'react'

import type { badgeVariants } from './badge.utils'

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}
