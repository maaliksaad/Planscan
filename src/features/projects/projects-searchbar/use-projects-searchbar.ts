import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryState } from 'nuqs'
import { useState } from 'react'
import {
  type SubmitHandler,
  useForm,
  type UseFormReturn
} from 'react-hook-form'

import { SearchBarKeys } from '@/constants/searchbar'

import {
  SEARCHBAR_SCHEMA,
  type SearchSchemaType
} from './projects-searchbar.constants'

interface UseProjectsSearchbarReturn {
  form: UseFormReturn<SearchSchemaType>
  onSubmit: SubmitHandler<SearchSchemaType>
  open: boolean
  setOpen: (open: boolean) => void
}

export const useProjectsSearchbar = (): UseProjectsSearchbarReturn => {
  const [open, setOpen] = useState(false)

  const [, setSearchParam] = useQueryState(SearchBarKeys.PROJECT_SEARCH, {
    defaultValue: ''
  })

  const form = useForm<SearchSchemaType>({
    resolver: zodResolver(SEARCHBAR_SCHEMA)
  })

  const onSubmit: SubmitHandler<SearchSchemaType> = async (
    data: SearchSchemaType
  ) => {
    setOpen(false)

    await setSearchParam(data.search ?? '')
    form.reset()
  }

  return {
    form,
    onSubmit,
    open,
    setOpen
  }
}
