'use client'

import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useRef,
  useSyncExternalStore
} from 'react'

/**
 * A React hook for syncing state across browser tabs using localStorage.
 *
 * @param initialState The default value for the state.
 * @param options  Optionally provide a localStorage key. Otherwise, a random one is generated once per component.
 */
export function useSyncedState<T>(
  initialState: T,
  options: { key: string }
): [T, Dispatch<SetStateAction<T>>] {
  const { key } = options

  const lastSnapshotRef = useRef<{
    rawString: string | null
    parsedValue: T
  }>({
    rawString: null,
    parsedValue: initialState
  })

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const handleStorage = (event: StorageEvent): void => {
        if (event.key === key) {
          onStoreChange()
        }
      }

      window.addEventListener('storage', handleStorage)
      return () => {
        window.removeEventListener('storage', handleStorage)
      }
    },
    [key]
  )

  const getSnapshot = useCallback(() => {
    const currentString = localStorage.getItem(key)
    if (currentString == null) {
      if (lastSnapshotRef.current.rawString !== null) {
        lastSnapshotRef.current.rawString = null
        lastSnapshotRef.current.parsedValue = initialState
      }
      return lastSnapshotRef.current.parsedValue
    }

    if (currentString === lastSnapshotRef.current.rawString) {
      return lastSnapshotRef.current.parsedValue
    }

    try {
      const parsed = JSON.parse(currentString) as T
      lastSnapshotRef.current.rawString = currentString
      lastSnapshotRef.current.parsedValue = parsed
      return parsed
    } catch {
      return initialState
    }
  }, [initialState, key])

  const getServerSnapshot = useCallback(() => {
    return initialState
  }, [initialState])

  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const setState = useCallback(
    (valueOrUpdater: T | ((prev: T) => T)) => {
      const {
        current: { rawString: oldRawString, parsedValue: oldParsed }
      } = lastSnapshotRef

      const newValue =
        typeof valueOrUpdater === 'function'
          ? (valueOrUpdater as (prev: T) => T)(oldParsed)
          : valueOrUpdater

      const newRawString = JSON.stringify(newValue)

      if (newRawString === oldRawString) {
        return
      }

      localStorage.setItem(key, newRawString)

      window.dispatchEvent(
        new StorageEvent('storage', { key, newValue: newRawString })
      )
    },
    [key]
  )

  return [state, setState]
}
