import type { FC, PropsWithChildren } from 'react'

import { ProjectDetailsLayout } from '@/layouts/project-details-layout'

const Template: FC<PropsWithChildren> = ({ children }) => {
  return <ProjectDetailsLayout>{children}</ProjectDetailsLayout>
}

export default Template
