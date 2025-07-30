import type * as SheetPrimitive from '@radix-ui/react-dialog'
import type { VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithoutRef } from 'react'

import type { sheetVariants } from './sheet.utils'

export interface SheetContentProps
  extends ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}
