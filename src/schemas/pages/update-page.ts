import { z } from 'zod'

import { PageSchemaKeys } from '@/schemas/pages'

const PageDisciplineSchema = z
  .string({
    message: 'Page discipline is invalid'
  })
  .optional()

const PageNumberSchema = z.string().optional()

const PageTitleSchema = z
  .string({
    message: 'Page title is invalid'
  })
  .optional()

export const UpdatePageSchema = z.object({
  [PageSchemaKeys.DISCIPLINE]: PageDisciplineSchema,
  [PageSchemaKeys.NUMBER]: PageNumberSchema,
  [PageSchemaKeys.TITLE]: PageTitleSchema
})

export type UpdatePageSchemaType = z.infer<typeof UpdatePageSchema>
