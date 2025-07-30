import type { CsiCode, TradePackage } from '@/lib/graphql'

import type { CSI_CODE_HEADERS } from './trades-table.constants'

export type CSICodeWithKey = Pick<
  CsiCode,
  'csi_code_id' | 'csi_code' | 'title'
> & {
  key: keyof typeof CSI_CODE_HEADERS
} & Record<string, TradePackage>
