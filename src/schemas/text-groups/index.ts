import { z } from 'zod'

export const TextGroupSchemaKeys = {
  TEXT: 'user_edited_text',
  FIGURE_ID: 'figure_id',
  CSI_CODES: 'csi_codes',
  TRADES: 'trades'
} as const

const TextGroupTextSchema = z.string().optional()

const TextGroupFigureIdSchema = z.string().uuid().optional()

const TextGroupCsiCodesSchema = z.array(z.string().uuid())

const TextGroupTradesSchema = z.array(z.string().uuid())

export const UpdateTextGroupSchema = z.object({
  [TextGroupSchemaKeys.TEXT]: TextGroupTextSchema,
  [TextGroupSchemaKeys.FIGURE_ID]: TextGroupFigureIdSchema,
  [TextGroupSchemaKeys.CSI_CODES]: TextGroupCsiCodesSchema,
  [TextGroupSchemaKeys.TRADES]: TextGroupTradesSchema
})

export type UpdateTextGroupSchemaType = z.infer<typeof UpdateTextGroupSchema>
