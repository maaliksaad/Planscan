import type { CodegenConfig } from '@graphql-codegen/cli'
import { config } from 'dotenv'

config()

const graphqlConfig: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_PLANSCAN_GRAPHQL_URL,
  documents: ['src/**/*.{ts,tsx,graphql}'],
  generates: {
    './src/lib/graphql/generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo'
      ],
      config: {
        scalars: {
          DateTime: {
            input: 'string',
            output: 'string'
          }
        }
      },
      presetConfig: {
        gqlTagName: 'gql'
      }
    }
  },
  ignoreNoDocuments: true
}

export default graphqlConfig
