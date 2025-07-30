'use client'

import type { FC } from 'react'

import { DataTable } from '@/components/data-table'
import { CreateProject } from '@/features/projects/create-project'
import { ProjectsSearchbar } from '@/features/projects/projects-searchbar'
import { BuildingIcon } from '@/icons/building'

import { PROJECTS_TABLE_FILTERS } from './projects-table.constants'
import { useProjectsTable } from './use-projects-table'

export const ProjectsTable: FC = () => {
  const { data, metadata, columns, filters, setFilters } = useProjectsTable()

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between py-2">
        <div className="flex items-center gap-2">
          <BuildingIcon className="size-4 text-zinc-950" />
          <h2 className="text-sm font-medium text-zinc-950">Projects</h2>
        </div>

        <div className="flex items-center gap-2">
          <ProjectsSearchbar />

          <CreateProject />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={data}
        metadata={metadata}
        filters={{
          filters,
          setFilters,
          fields: PROJECTS_TABLE_FILTERS
        }}
      />
    </div>
  )
}
