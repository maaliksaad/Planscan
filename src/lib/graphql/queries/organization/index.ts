import { gql } from '@apollo/client'

import { USER_FRAGMENT } from '@/lib/graphql/queries/user'

export const ORGANIZATION_FRAGMENT = gql`
  fragment OrganizationFragment on Organization {
    organization_id
    name
    created_at
  }
`

export const GET_ORGANIZATION_QUERY = gql`
  query GetOrganization {
    organization {
      ...OrganizationFragment
    }
  }
  ${ORGANIZATION_FRAGMENT}
`

export const GET_ORGANIZATION_MEMBERS_QUERY = gql`
  query GetOrganizationMembers {
    organization_members {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`
