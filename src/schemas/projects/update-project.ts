import { z } from 'zod'

import { ProjectStatus } from '@/lib/graphql'
import { ProjectSchemaKeys } from '@/schemas/projects/common'

const ProjectNameSchema = z
  .string({
    message: 'Project name is invalid'
  })
  .min(1, 'Project name is required')
  .optional()

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

const ProjectStatusSchema = z
  .nativeEnum(ProjectStatus, {
    invalid_type_error: 'Project status is invalid'
  })
  .optional()

export const UpdateProjectSchema = z.object({
  [ProjectSchemaKeys.NAME]: ProjectNameSchema,
  [ProjectSchemaKeys.NUMBER]: ProjectNumberSchema,
  [ProjectSchemaKeys.OFFICE]: ProjectOfficeSchema,
  [ProjectSchemaKeys.ADDRESS]: ProjectAddressSchema,
  [ProjectSchemaKeys.STATUS]: ProjectStatusSchema
})

export type UpdateProjectSchemaType = z.infer<typeof UpdateProjectSchema>
