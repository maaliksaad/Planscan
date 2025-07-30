'use client'

import { useAuth, useOrganizationList } from '@clerk/nextjs'
import dayjs from 'dayjs'
import Cookies from 'js-cookie'
import Image from 'next/image'
import { useRouter } from 'nextjs-toploader/app'
import { type FC, useCallback, useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { COOKIE_KEYS } from '@/constants/cookie-keys'
import { ABSOLUTE_ROUTES } from '@/constants/routes'
import { ChevronDownIcon } from '@/icons/chevron-down'
import { useRefreshTokenMutation } from '@/lib/graphql'
import { getAuthHeader } from '@/utils/headers'

import { OrganizationSwitchSkeleton } from './organization-switch-skeleton'

export const OrganizationSwitch: FC = () => {
  const [switching, setSwitching] = useState(false)
  const [open, setOpen] = useState(false)

  const router = useRouter()

  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true
    }
  })
  const { orgId, isLoaded: isLoadedAuth, getToken } = useAuth()

  const [refreshTokenMutation] = useRefreshTokenMutation()

  const activeMembership = useMemo(
    () =>
      userMemberships.data?.find(
        membership => membership.organization.id === orgId
      ),
    [userMemberships, orgId]
  )

  const activeRole = useMemo(
    () => activeMembership?.role.split(':').pop(),
    [activeMembership]
  )

  const handleSwitch = useCallback(
    async (id: string) => {
      setSwitching(true)

      await setActive?.({
        organization: id
      })

      setSwitching(false)
      setOpen(false)

      const token = await getToken()

      await refreshTokenMutation({
        context: {
          headers: getAuthHeader(token ?? '')
        },
        onCompleted: data => {
          Cookies.set(COOKIE_KEYS.TOKEN, data.refresh_token.token, {
            expires: dayjs().add(7, 'days').toDate()
          })
        },
        fetchPolicy: 'no-cache',
        errorPolicy: 'all'
      })

      router.push(ABSOLUTE_ROUTES.PROJECTS)
    },
    [setActive, getToken, refreshTokenMutation, router]
  )

  if (!isLoaded || !isLoadedAuth) {
    return <OrganizationSwitchSkeleton />
  }

  if (activeMembership == null) {
    return null
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="flex items-center gap-2 text-zinc-900">
        <Image
          className="size-6 rounded-lg"
          src={activeMembership.organization.imageUrl}
          alt={activeMembership.organization.name}
          width={40}
          height={40}
        />

        <h2 className="text-nowrap text-xs font-medium">
          {activeMembership.organization.name} -{' '}
          <span className="capitalize">{activeRole}</span>
        </h2>

        <ChevronDownIcon className="size-3" />
      </PopoverTrigger>
      <PopoverContent align="end" className="divide-y divide-zinc-200 p-0">
        {userMemberships.data.map(mem => (
          <Button
            key={mem.id}
            variant="ghost"
            onClick={async () => {
              await handleSwitch(mem.organization.id)
            }}
            disabled={switching}
            className="flex h-auto w-full cursor-pointer items-center justify-start gap-2 rounded-none px-3 py-3 text-zinc-900"
          >
            <Image
              className="size-6 rounded-lg"
              src={mem.organization.imageUrl}
              alt={mem.organization.name}
              width={40}
              height={40}
            />

            <h2 className="text-nowrap text-xs font-medium">
              {mem.organization.name}
            </h2>
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  )
}
