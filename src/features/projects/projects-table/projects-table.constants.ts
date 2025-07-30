import type { Project } from '@/lib/graphql'
import type { DataTableFilterField } from '@/types/data-table'

export const PROJECTS_TABLE_FILTERS: Array<DataTableFilterField<Project>> = [
  {
    id: 'project_name',
    label: 'Name',
    type: 'text',
    placeholder: 'Search...'
  },
  {
    id: 'project_number',
    label: 'Project no',
    type: 'text',
    placeholder: 'Search...'
  },
  {
    id: 'office_location',
    label: 'Office',
    type: 'text',
    placeholder: 'Search...'
  },
  {
    id: 'address',
    label: 'Address',
    type: 'text',
    placeholder: 'Search...'
  },
  {
    id: 'project_status',
    label: 'Status',
    type: 'select',
    options: [
      { label: 'Active', value: 'ACTIVE' },
      { label: 'Closed', value: 'CLOSED' }
    ]
  }
]
