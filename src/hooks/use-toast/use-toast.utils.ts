import type { Dispatch, SetStateAction } from 'react'

import { TOAST_LIMIT, TOAST_REMOVE_DELAY } from './use-toast.constants'
import { type Action, ActionType, type State } from './use-toast.types'

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()
const listeners: Array<(state: State) => void> = []
export let memoryState: State = { toasts: [] }

const addToRemoveQueue = (toastId: string): void => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: ActionType.REMOVE_TOAST,
      toastId
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.ADD_TOAST: {
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      }
    }

    case ActionType.UPDATE_TOAST: {
      return {
        ...state,
        toasts: state.toasts.map(t =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        )
      }
    }

    case ActionType.DISMISS_TOAST: {
      const { toastId } = action

      if (toastId == null) {
        state.toasts.forEach(toast => {
          addToRemoveQueue(toast.id)
        })
      } else {
        addToRemoveQueue(toastId)
      }

      return {
        ...state,
        toasts: state.toasts.map(t =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false
              }
            : t
        )
      }
    }

    case ActionType.REMOVE_TOAST: {
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: []
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter(t => t.id !== action.toastId)
      }
    }
  }

  return state
}

export const addToListeners = (
  setState: Dispatch<SetStateAction<State>>
): void => {
  listeners.push(setState)
}

export const removeFromListeners = (
  setState: Dispatch<SetStateAction<State>>
): void => {
  const index = listeners.indexOf(setState)
  if (index !== -1) {
    listeners.splice(index, 1)
  }
}

export const dispatch = (action: Action): void => {
  memoryState = reducer(memoryState, action)
  listeners.forEach(listener => {
    listener(memoryState)
  })
}
