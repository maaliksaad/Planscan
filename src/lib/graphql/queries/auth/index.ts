import { gql } from '@apollo/client'

export const USER_WITH_TOkEN_FRAGMENT = gql`
  fragment UserWithTokenFragment on UserWithToken {
    user_id
    first_name
    last_name
    email
    profile_photo_url
    token
    created_at
  }
`

export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken {
    refresh_token {
      ...UserWithTokenFragment
    }
  }
  ${USER_WITH_TOkEN_FRAGMENT}
`
