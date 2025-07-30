'use client'

import { useEffect, useState } from 'react'

import { generateId } from '@/utils/generate-id'

import {
  ActionType,
  type State,
  type Toast,
  type ToasterToast,
  type ToastReturn,
  type UseToastReturn
} from './use-toast.types'
import {
  addToListeners,
  dispatch,
  memoryState,
  removeFromListeners
} from './use-toast.utils'

const toast = ({ ...props }: Toast): ToastReturn => {
  const id = generateId()

  const update = (toasterProps: ToasterToast): void => {
    dispatch({
      type: ActionType.UPDATE_TOAST,
      toast: { ...toasterProps, id }
    })
  }

  const dismiss = (): void => {
    dispatch({ type: ActionType.DISMISS_TOAST, toastId: id })
  }

  dispatch({
    type: ActionType.ADD_TOAST,
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: open => {
        if (!open) dismiss()
      }
    }
  })

  return {
    id,
    dismiss,
    update
  }
}

const useToast = (): UseToastReturn => {
  const [state, setState] = useState<State>(memoryState)

  useEffect(() => {
    addToListeners(setState)
    return () => {
      removeFromListeners(setState)
    }
  }, [state])

  return {
    ...state,
    toast: {
      success: (props: Toast) => toast({ ...props, variant: 'success' }),
      error: (props: Toast) => toast({ ...props, variant: 'error' })
    },
    dismiss: (toastId?: string) => {
      dispatch({ type: ActionType.DISMISS_TOAST, toastId })
    }
  }
}

export { useToast }
