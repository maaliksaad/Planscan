import type { FC, PropsWithChildren } from 'react'

import { ProjectsLayout } from '@/layouts/projects-layout'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return <ProjectsLayout>{children}</ProjectsLayout>
}

export default Layout
