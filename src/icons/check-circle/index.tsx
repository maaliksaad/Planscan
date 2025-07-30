import type { FC } from 'react'

import type { PropsWithClassname } from '@/types/common'

export const CheckCircleIcon: FC<PropsWithClassname> = ({ className }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className={className}
  >
    <g clipPath="url(#clip0_366_6389)">
      <path
        d="M6.642 10.774a.533.533 0 0 0 .816-.067l-.816.067Zm0 0-1.69-1.72 1.69 1.72Zm3.785-5.155-3.377 4.8a.033.033 0 0 1-.051.004l-1.69-1.72a.033.033 0 1 1 .048-.047l1.24 1.264.421.428.345-.49 3.01-4.277.054.038Zm0 0a.033.033 0 0 0-.008-.046l.008.046ZM1.436 8a6.564 6.564 0 1 1 13.128 0A6.564 6.564 0 0 1 1.436 8ZM8 1.45A6.551 6.551 0 1 0 8 14.55 6.551 6.551 0 0 0 8 1.449Z"
        fill="#059669"
        stroke="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_366_6389">
        <path fill="currentColor" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
)
