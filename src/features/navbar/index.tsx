import type { FC } from 'react'

import { AppLogo } from '@/components/app-logo'
import { OrganizationSwitch } from '@/features/navbar/organization-switch'
import { UserMenu } from '@/features/navbar/user-menu'

export const Navbar: FC = () => {
  return (
    <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-1 shadow-sm shadow-black/5">
      <AppLogo />

      <div className="flex items-center gap-4">
        <OrganizationSwitch />

        <UserMenu />
      </div>
    </div>
  )
}
