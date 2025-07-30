import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'

import { ABSOLUTE_ROUTES } from '@/constants/routes'
import { StarIcon } from '@/icons/star'
import { StarFilledIcon } from '@/icons/star-filled'
import type { Project, User } from '@/lib/graphql'
import { formatEnum } from '@/utils/format-enum'

export const getProjectTableColumns = (
  user: User | null
): Array<ColumnDef<Project>> => {
  return [
    {
      accessorKey: 'is_stared',
      header: '',
      enableHiding: false,
      cell: ({ row }) => {
        const isStared = row.original.user_projects.some(
          ({ user_id, stared }) => user_id === user?.user_id && stared
        )

        const Icon = isStared ? StarFilledIcon : StarIcon

        return <Icon className="size-4 text-zinc-950" />
      }
    },
    {
      accessorKey: 'project_name',
      header: 'Project name',
      enableHiding: false,
      cell: ({ row }) => (
        <Link
          href={ABSOLUTE_ROUTES.getProjectPath(row.original.project_id)}
          prefetch
          className="text-blue-500"
        >
          {row.original.project_name}
        </Link>
      )
    },
    {
      accessorKey: 'project_number',
      header: 'Project No.',
      accessorFn: ({ project_number }) =>
        project_number === 0 ? '' : project_number
    },
    {
      accessorKey: 'office_location',
      header: 'Office'
    },
    {
      accessorKey: 'address',
      header: 'Address'
    },
    {
      accessorKey: 'project_status',
      header: 'Status',
      accessorFn: ({ project_status }) => formatEnum(project_status)
    }
  ]
}
