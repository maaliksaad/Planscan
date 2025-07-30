import { z } from 'zod'

export const SEARCHBAR_KEYS = {
  SEARCH: 'search'
} as const

const SearchSchema = z.string().optional()

export const SEARCHBAR_SCHEMA = z.object({
  [SEARCHBAR_KEYS.SEARCH]: SearchSchema
})

export type SearchSchemaType = z.infer<typeof SEARCHBAR_SCHEMA>
