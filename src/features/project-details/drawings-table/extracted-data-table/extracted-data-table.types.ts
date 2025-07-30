import type { TextGroup } from '@/lib/graphql'

export type TransformedTextGroup = Pick<TextGroup, 'text_group_id' | 'text'> & {
  csi_codes: string[]
  trade_packages: string[]
  comments: number
  original: TextGroup
}
