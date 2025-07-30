import type { FC } from 'react'

import type { PropsWithClassname } from '@/types/common'

export const TableIcon: FC<PropsWithClassname> = ({ className }) => (
  <svg
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
    className={className}
  >
    <path
      d="M2.5 6h12m-12 4h12m-6-8v12M3.833 2h9.334c.736 0 1.333.597 1.333 1.333v9.334c0 .736-.597 1.333-1.333 1.333H3.833A1.333 1.333 0 0 1 2.5 12.667V3.333C2.5 2.597 3.097 2 3.833 2Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
