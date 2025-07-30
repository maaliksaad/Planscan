'use client'

import { parseAsStringEnum, useQueryState } from 'nuqs'
import type { FC } from 'react'

import { Tabs, TabsContent } from '@/components/ui/tabs'
import { PROJECT_TAB, PROJECT_TABS_KEY } from '@/constants/project-tabs'
import { ProjectDrawings } from '@/features/project-details/project-drawings'
import { TradesTable } from '@/features/project-trades/trades-table'

export const ProjectTabs: FC = () => {
  const [activeTab, setActiveTab] = useQueryState(
    PROJECT_TABS_KEY,
    parseAsStringEnum<PROJECT_TAB>(Object.values(PROJECT_TAB)).withDefault(
      PROJECT_TAB.DRAWINGS
    )
  )

  return (
    <Tabs
      defaultValue={PROJECT_TAB.DRAWINGS}
      value={activeTab}
      onValueChange={async value => setActiveTab(value as PROJECT_TAB)}
    >
      <TabsContent value={PROJECT_TAB.DRAWINGS}>
        <ProjectDrawings />
      </TabsContent>
      <TabsContent value={PROJECT_TAB.TRADES}>
        <TradesTable />
      </TabsContent>
    </Tabs>
  )
}
