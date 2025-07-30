import { SignedIn, SignedOut } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

import { Button } from '@/components/ui/button'
import { ABSOLUTE_ROUTES } from '@/constants/routes'

export const Navbar: FC = () => {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 laptop:px-8"
      >
        <div className="flex laptop:flex-1">
          <Link href={ABSOLUTE_ROUTES.HOME} className="-m-1.5 p-1.5">
            <span className="sr-only">Planscan</span>
            <Image
              alt="Planscan"
              width={32}
              height={32}
              src="/logo.webp"
              className="h-6 w-auto"
            />
          </Link>
        </div>
        <div className="flex flex-1 justify-end">
          <SignedOut>
            <Button size="lg" asChild>
              <Link href={ABSOLUTE_ROUTES.SIGN_IN}>Sign in</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <Button size="lg" asChild>
              <Link href={ABSOLUTE_ROUTES.PROJECTS}>Projects</Link>
            </Button>
          </SignedIn>
        </div>
      </nav>
    </header>
  )
}
