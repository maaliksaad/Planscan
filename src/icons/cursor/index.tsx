import type { FC } from 'react'

import type { PropsWithClassname } from '@/types/common'

export const CursorIcon: FC<PropsWithClassname> = ({ className }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="m13 13 6 6M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
