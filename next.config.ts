import { fileURLToPath } from 'node:url'

import createJiti from 'jiti'
import type { NextConfig } from 'next'

const jiti = createJiti(fileURLToPath(import.meta.url))
jiti('./src/env/client.ts')
jiti('./src/env/server.ts')

/**
 * @see https://nextjs.org/docs/api-reference/next.config.js/introduction
 * @type {import('next').NextConfig}
 */
const config: NextConfig = {
  eslint: {
    dirs: [
      'src',
      'commitlint.config.mjs',
      'eslint.config.mjs',
      'next.config.ts',
      'postcss.config.mjs',
      'prettier.config.mjs',
      'tailwind.config.ts'
    ]
  },
  images: {
    unoptimized: true
  }
}

export default config
