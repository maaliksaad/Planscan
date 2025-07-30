import { type ForwardedRef, type RefObject, useEffect, useRef } from 'react'

export const useForwardedRef = <T>(ref: ForwardedRef<T>): RefObject<T> => {
  const innerRef = useRef<T>(null)

  useEffect(() => {
    if (ref == null) return
    if (typeof ref === 'function') {
      ref(innerRef.current)
    } else {
      const { current } = ref
      ref.current = current
    }
  })

  return innerRef
}
