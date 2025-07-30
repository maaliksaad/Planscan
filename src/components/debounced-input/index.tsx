'use client'

import {
  type ComponentProps,
  type CSSProperties,
  forwardRef,
  useEffect,
  useState
} from 'react'

interface DebouncedInputProps
  extends Pick<ComponentProps<'input'>, 'className' | 'placeholder'> {
  style?: CSSProperties
  value: string
  onBlur: (value: string) => void
}

export const DebouncedInput = forwardRef<HTMLInputElement, DebouncedInputProps>(
  ({ className, style, value: initialValue, onBlur }, ref) => {
    const [value, setValue] = useState<string>(initialValue)

    useEffect(() => {
      setValue(initialValue)
    }, [initialValue])

    return (
      <input
        ref={ref}
        style={style}
        className={className}
        value={value}
        onChange={e => {
          setValue(e.target.value)
        }}
        onBlur={e => {
          onBlur(e.target.value)
        }}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.currentTarget.blur()
          }
        }}
      />
    )
  }
)
