import type { FC } from 'react'

import type { PropsWithClassname } from '@/types/common'

export const PanelIcon: FC<PropsWithClassname> = ({ className }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className={className}
  >
    <path
      d="M6 2v12m4.667-4-2-2 2-2M3.333 2h9.334C13.403 2 14 2.597 14 3.333v9.334c0 .736-.597 1.333-1.333 1.333H3.333A1.333 1.333 0 0 1 2 12.667V3.333C2 2.597 2.597 2 3.333 2Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
