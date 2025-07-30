import type { Row } from '@tanstack/table-core'
import { type FC, useEffect, useRef } from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import type { TextGroupWithRect } from '@/types/text-groups'

import type { TransformedTextGroup } from '../extracted-data-table.types'

interface ExtractedTableCheckboxProps {
  row: Row<TransformedTextGroup>
  activeTextGroups: TextGroupWithRect[]
}

export const ExtractedTableCheckbox: FC<ExtractedTableCheckboxProps> = ({
  row,
  activeTextGroups
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (row.original.text_group_id === activeTextGroups.at(-1)?.text_group_id) {
      ref.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  }, [activeTextGroups, row.original.text_group_id])

  return (
    <div className="px-1" ref={ref}>
      <Checkbox
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onCheckedChange={e => {
          row.getToggleSelectedHandler()({
            target: { checked: e }
          })
        }}
      />
    </div>
  )
}
