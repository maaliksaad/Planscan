import type { FC, PropsWithChildren } from 'react'

export const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <section className="flex min-h-screen w-full items-center justify-center p-4 tablet:px-4 tablet:pt-20">
      {children}
    </section>
  )
}
