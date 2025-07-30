import type { FC } from 'react'

import { Navbar } from '@/features/home/navbar'

export const LandingPage: FC = () => {
  return (
    <div className="bg-white">
      <Navbar />

      <div className="relative isolate px-6 pt-14 laptop:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl mobile:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 mobile:left-[calc(50%-30rem)] mobile:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-3xl py-32 mobile:py-48 laptop:py-56">
          <div className="text-center">
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 mobile:text-6xl">
              Unlock efficiency and precision with Planscan.
            </h1>
            <p className="mt-8 text-pretty text-lg font-medium text-gray-500 mobile:text-xl/8">
              Planscan extracts crucial information from your construction
              documents and uses AI to transform them into an organized format,
              so you can better manage your project.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
