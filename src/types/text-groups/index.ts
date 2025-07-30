import type { Rect } from 'fabric'

import type { TextGroup } from '@/lib/graphql'

export type TextGroupWithRect = TextGroup & { rect: Rect }
