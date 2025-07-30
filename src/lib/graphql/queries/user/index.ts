import { gql } from '@apollo/client'

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    user_id
    first_name
    last_name
    email
    profile_photo_url
    created_at
  }
`

export const GET_USER_QUERY = gql`
  query GetUser {
    user {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`
