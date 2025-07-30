import type { FC } from 'react'

import type { PropsWithClassname } from '@/types/common'

export const CircleIcon: FC<PropsWithClassname> = ({ className }) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m9.75 1900.75 4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
)
