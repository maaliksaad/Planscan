import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

import { ABSOLUTE_ROUTES } from '@/constants/routes'

export const AppLogo: FC = () => {
  return (
    <Link href={ABSOLUTE_ROUTES.PROJECTS} className="-m-1.5 p-1.5">
      <span className="sr-only">Planscan</span>
      <Image
        alt="Planscan"
        width={32}
        height={20}
        src="/logo.webp"
        className="h-5 w-auto"
      />
    </Link>
  )
}
