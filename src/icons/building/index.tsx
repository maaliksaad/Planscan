import type { FC } from 'react'

import type { PropsWithClassname } from '@/types/common'

export const BuildingIcon: FC<PropsWithClassname> = ({ className }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className={className}
  >
    <path
      d="M4 14.667v-12a1.333 1.333 0 0 1 1.333-1.333h5.334A1.333 1.333 0 0 1 12 2.667v12m-8 0h8m-8 0H2.667a1.333 1.333 0 0 1-1.334-1.333v-4a1.333 1.333 0 0 1 1.334-1.333H4m8 6.666h1.333a1.334 1.334 0 0 0 1.334-1.333v-6a1.333 1.333 0 0 0-1.334-1.333H12M6.667 4h2.666M6.667 6.667h2.666M6.667 9.334h2.666m-2.666 2.667h2.666"
      stroke="currentColor"
      strokeWidth=".667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
