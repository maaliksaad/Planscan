import { gql } from '@apollo/client'

export const FILE_FRAGMENT = gql`
  fragment FileFragment on File {
    file_id
    name
    key
    mimetype
    created_at
  }
`

export const GET_FILE_BY_KEY_QUERY = gql`
  query GetFile($key: String!) {
    file(key: $key) {
      ...FileFragment
    }
  }
  ${FILE_FRAGMENT}
`

export const REMOVE_FILE_MUTATION = gql`
  mutation RemoveFile($key: String!) {
    remove_file(key: $key) {
      ...FileFragment
    }
  }
  ${FILE_FRAGMENT}
`
