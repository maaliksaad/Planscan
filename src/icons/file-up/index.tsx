import type { FC } from 'react'

import type { PropsWithClassname } from '@/types/common'

export const FileUpIcon: FC<PropsWithClassname> = ({ className }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className={className}
  >
    <path
      d="M9.334 1.334v4h4M8 8.001v4m0-4 2 2M8 8l-2 2m3.667-8.667H4a1.333 1.333 0 0 0-1.333 1.333v10.667A1.333 1.333 0 0 0 4 14.667h8a1.333 1.333 0 0 0 1.334-1.333V5.001L9.667 1.334Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
