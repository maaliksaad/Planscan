import { gql } from '@apollo/client'

import { USER_FRAGMENT } from '@/lib/graphql/queries/user'

export const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($data: CreateCommentInput!) {
    create_comment(data: $data) {
      comment_id
      comment
      user {
        ...UserFragment
      }
      created_at
    }
  }
  ${USER_FRAGMENT}
`
