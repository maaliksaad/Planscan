import { z } from 'zod'

export const ExportSchemaKeys = {
  FORMAT: 'format',
  DATA: 'data',
  PDF_DRAWINGS: 'pdf_drawings',
  CSI_CODES: 'csi_codes',
  TRADES: 'trades'
} as const

const ExportFormSchema = z.enum(['csv', 'pdf']).default('csv')

const ExportDataSchema = z.enum(['all', 'selected']).default('all')

const ExportDrawingsSchema = z.enum(['all', 'filtered']).optional()

const ExportCSICodesSchema = z.boolean().default(false)

const ExportTradesSchema = z.boolean().default(true)

export const ExportSchema = z.object({
  [ExportSchemaKeys.FORMAT]: ExportFormSchema,
  [ExportSchemaKeys.DATA]: ExportDataSchema,
  [ExportSchemaKeys.PDF_DRAWINGS]: ExportDrawingsSchema,
  [ExportSchemaKeys.CSI_CODES]: ExportCSICodesSchema,
  [ExportSchemaKeys.TRADES]: ExportTradesSchema
})

export type ExportSchemaType = z.infer<typeof ExportSchema>
