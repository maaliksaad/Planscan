import type { ReactNode } from 'react'

import type { ToastActionElement, ToastProps } from '@/components/ui/toast'

export enum ActionType {
  ADD_TOAST = 'ADD_TOAST',
  UPDATE_TOAST = 'UPDATE_TOAST',
  DISMISS_TOAST = 'DISMISS_TOAST',
  REMOVE_TOAST = 'REMOVE_TOAST'
}

export type ToasterToast = ToastProps & {
  id: string
  title?: ReactNode
  description?: ReactNode
  action?: ToastActionElement
}

export type Action =
  | {
      type: ActionType.ADD_TOAST
      toast: ToasterToast
    }
  | {
      type: ActionType.UPDATE_TOAST
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType.DISMISS_TOAST
      toastId?: ToasterToast['id']
    }
  | {
      type: ActionType.REMOVE_TOAST
      toastId?: ToasterToast['id']
    }

export interface State {
  toasts: ToasterToast[]
}

export type Toast = Omit<ToasterToast, 'id'>

export interface ToastReturn {
  id: string
  dismiss: () => void
  update: (props: ToasterToast) => void
}

export interface UseToastReturn extends State {
  toast: {
    success: (props: Toast) => ToastReturn
    error: (props: Toast) => ToastReturn
  }
  dismiss: (id?: string) => void
}
