import type { FC } from 'react'

import type { PropsWithClassname } from '@/types/common'

export const HandIcon: FC<PropsWithClassname> = ({ className }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M18 11V6a2 2 0 1 0-4 0m0 4V4a2 2 0 1 0-4 0v2m0 0v4.5M10 6a2 2 0 1 0-4 0v8m12-6a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
