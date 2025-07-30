'use client'

import { parseAsStringEnum, useQueryState } from 'nuqs'
import { type FC, useMemo } from 'react'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PROJECT_TAB, PROJECT_TABS_KEY } from '@/constants/project-tabs'

export const ProjectTabs: FC = () => {
  const [activeTab, setActiveTab] = useQueryState(
    PROJECT_TABS_KEY,
    parseAsStringEnum<PROJECT_TAB>(Object.values(PROJECT_TAB)).withDefault(
      PROJECT_TAB.DRAWINGS
    )
  )

  const tabs = useMemo(
    () => [
      {
        key: PROJECT_TAB.DRAWINGS,
        label: 'Drawings'
      },
      {
        key: PROJECT_TAB.TRADES,
        label: 'Trades'
      }
    ],
    []
  )

  return (
    <Tabs
      defaultValue={activeTab}
      value={activeTab}
      onValueChange={async value => setActiveTab(value as PROJECT_TAB)}
    >
      <TabsList className="grid w-full grid-cols-2">
        {tabs.map(({ key, label }) => (
          <TabsTrigger key={key} value={key}>
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
