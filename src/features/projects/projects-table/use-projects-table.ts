'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { useQueryState } from 'nuqs'
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useMemo,
  useState
} from 'react'

import { SearchBarKeys } from '@/constants/searchbar'
import { useTableMetadata } from '@/hooks/use-table-metadata'
import { useToast } from '@/hooks/use-toast'
import {
  type PaginatedProjects,
  type Project,
  useGetProjectsQuery
} from '@/lib/graphql'
import { useUserStore } from '@/stores/user-store'
import type { Filter } from '@/types/data-table'
import type { TableMetadata } from '@/types/table'
import { generateId } from '@/utils/generate-id'
import { getAuthHeader } from '@/utils/headers'

import { getProjectTableColumns } from './projects-table.utils'

interface UseProjectsTableReturn extends Pick<PaginatedProjects, 'data'> {
  metadata: TableMetadata
  columns: Array<ColumnDef<Project>>
  filters: Array<Filter<Project>>
  setFilters: Dispatch<SetStateAction<Array<Filter<Project>>>>
}

export const useProjectsTable = (): UseProjectsTableReturn => {
  const [searchParam, setSearchParam] = useQueryState(
    SearchBarKeys.PROJECT_SEARCH,
    {
      defaultValue: ''
    }
  )

  const user = useUserStore()(state => state.user)

  const [filters, setFilters] = useState<Array<Filter<Project>>>([])

  const columns = useMemo(() => getProjectTableColumns(user), [user])

  const metadata = useTableMetadata()

  const { toast } = useToast()

  const { data, loading } = useGetProjectsQuery({
    variables: {
      page: metadata.page,
      limit: metadata.limit,
      filters: filters.map(filter => ({
        column: filter.id,
        type: filter.operator,
        value: filter.value as string
      }))
    },
    onError: error => {
      toast.error({
        title: 'Something went wrong!',
        description: error.message
      })
    },
    context: {
      headers: getAuthHeader()
    },
    fetchPolicy: 'no-cache'
  })

  useEffect(() => {
    if (searchParam !== '') {
      setFilters(prev => [
        ...prev.filter(filter => filter.id !== 'project_name'),
        {
          id: 'project_name',
          value: searchParam,
          type: 'text',
          operator: 'iLike',
          rowId: generateId()
        }
      ])

      void setSearchParam('')
    }
  }, [searchParam, setSearchParam])

  return {
    data: (data?.projects.data ?? []) as Project[],
    metadata: {
      ...metadata,
      totalRows: data?.projects.total ?? 0,
      totalPages: data?.projects.total_pages ?? 0,
      loading
    },
    columns,
    filters,
    setFilters
  }
}
