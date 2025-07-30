import type { FC } from 'react'

import type { PropsWithClassname } from '@/types/common'

export const ArrowCircleIcon: FC<PropsWithClassname> = ({ className }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    className={className}
  >
    <path
      d="m17.416 7.333-3.666 3.666h2.75c0 3.034-2.466 5.5-5.5 5.5-.926 0-1.806-.229-2.567-.641l-1.338 1.338A7.27 7.27 0 0 0 11 18.333a7.331 7.331 0 0 0 7.333-7.334h2.75l-3.666-3.666ZM5.5 10.999c0-3.034 2.466-5.5 5.5-5.5.926 0 1.806.23 2.566.642l1.339-1.338A7.27 7.27 0 0 0 11 3.666a7.331 7.331 0 0 0-7.333 7.333H.917l3.666 3.667 3.667-3.667H5.5Z"
      fill="currentColor"
    />
  </svg>
)
