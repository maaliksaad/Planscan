import { z } from 'zod'

import { ProjectSchemaKeys } from '@/schemas/projects/common'

const ProjectNameSchema = z
  .string({
    message: 'Project name is required'
  })
  .min(1, 'Project name is required')

const ProjectNumberSchema = z.string().optional()

const ProjectOfficeSchema = z
  .string({
    message: 'Project office is invalid'
  })
  .optional()

const ProjectAddressSchema = z
  .string({
    message: 'Project address is invalid'
  })
  .optional()

export const CreateProjectSchema = z.object({
  [ProjectSchemaKeys.NAME]: ProjectNameSchema,
  [ProjectSchemaKeys.NUMBER]: ProjectNumberSchema,
  [ProjectSchemaKeys.OFFICE]: ProjectOfficeSchema,
  [ProjectSchemaKeys.ADDRESS]: ProjectAddressSchema
})

export type CreateProjectSchemaType = z.infer<typeof CreateProjectSchema>
