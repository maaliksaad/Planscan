import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

import { ABSOLUTE_ROUTES } from '@/constants/routes'

export const AppFavicon: FC = () => {
  return (
    <Link href={ABSOLUTE_ROUTES.PROJECTS} className="-m-1.5 p-1.5">
      <span className="sr-only">Planscan</span>
      <Image
        alt="Planscan"
        width={32}
        height={20}
        src="/logo-favicon.webp"
        className="h-11 w-[38px] p-2.5"
      />
    </Link>
  )
}
