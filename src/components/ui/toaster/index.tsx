'use client'

import type { FC } from 'react'

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/utils/cn'

export const Toaster: FC = () => {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        className,
        ...props
      }) {
        return (
          <Toast
            key={id}
            {...props}
            className={cn('bottom-auto top-1', className)}
          >
            <div className="grid gap-1">
              {title != null && <ToastTitle>{title}</ToastTitle>}
              {description != null && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
