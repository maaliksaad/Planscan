import type { FC } from 'react'

import type { PropsWithClassname } from '@/types/common'

export const LoadingIcon: FC<PropsWithClassname> = ({ className }) => (
  <svg
    width="36"
    height="36"
    fill="currentColor"
    viewBox="0 0 24 24"
    className={className}
  >
    <circle cx="4" cy="12" r="3" className="animate-bounce" />
    <circle cx="12" cy="12" r="3" className="animate-bounce delay-150" />
    <circle cx="20" cy="12" r="3" className="animate-bounce delay-300" />
  </svg>
)
