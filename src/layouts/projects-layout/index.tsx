import type { FC, PropsWithChildren } from 'react'

import { Navbar } from '@/features/navbar'

export const ProjectsLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-full">
      <Navbar />
      <div className="px-6 py-2">{children}</div>
    </div>
  )
}
