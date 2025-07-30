import type { KnipConfig } from 'knip'

/**
 * @see https://knip.dev/overview/configuration
 * @type {KnipConfig}
 */
const config: KnipConfig = {
  next: {
    entry: [
      'next.config.ts',
      '{instrumentation,middleware}.{js,ts}',
      'app/global-error.{js,jsx,ts,tsx}',
      'app/**/{error,layout,loading,not-found,page,template,default}.{js,jsx,ts,tsx}',
      'app/**/route.{js,jsx,ts,tsx}',
      'app/{manifest,sitemap,robots}.{js,ts}',
      'app/**/{icon,apple-icon}.{js,jsx,ts,tsx}',
      'app/**/{opengraph,twitter}-image.{js,jsx,ts,tsx}',
      'src/{instrumentation,middleware}.{js,ts}',
      'src/app/global-error.{js,jsx,ts,tsx}',
      'src/app/**/{error,layout,loading,not-found,page,template,default}.{js,jsx,ts,tsx}',
      'src/app/**/route.{js,jsx,ts,tsx}',
      'src/app/{manifest,sitemap,robots}.{js,ts}',
      'src/app/**/{icon,apple-icon}.{js,jsx,ts,tsx}',
      'src/app/**/{opengraph,twitter}-image.{js,jsx,ts,tsx}'
    ],
    project: ['**/*.ts', '**/*.js', '**/*.mjs']
  },
  ignore: ['src/lib/graphql/**/*.ts', 'src/components/ui/**/*.{ts,tsx}'],
  ignoreDependencies: [
    'sharp',
    '@graphql-codegen/typescript-react-apollo',
    'dotenv'
  ],
  exclude: ['enumMembers']
}

export default config
