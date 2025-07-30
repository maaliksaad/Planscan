import { gql } from '@apollo/client'

import { USER_FRAGMENT } from '@/lib/graphql/queries/user'

import { CSI_CODE_FRAGMENT } from '../csi-code'
import { TRADE_PACKAGE_FRAGMENT } from '../trade-package'

export const TEXT_GROUP_FRAGMENT = gql`
  fragment TextGroupFragment on TextGroup {
    text_group_id
    text
    x1
    x2
    y1
    y2
    user_edited_text
    text_group_status
    created_at
    comments {
      comment_id
      comment
      user {
        ...UserFragment
      }
      created_at
    }
    csi_codes {
      ...CSICodeFragment
    }
    trade_packages {
      ...TradePackageFragment
    }
    figure {
      figure_number
    }
  }
  ${USER_FRAGMENT}
  ${CSI_CODE_FRAGMENT}
  ${TRADE_PACKAGE_FRAGMENT}
`

export const CREATE_TEXT_GROUP_MUTATION = gql`
  mutation CreateTextGroup($data: CreateTextGroupInput!) {
    create_text_group(data: $data) {
      ...TextGroupFragment
    }
  }
  ${TEXT_GROUP_FRAGMENT}
`

export const UPDATE_TEXT_GROUP_MUTATION = gql`
  mutation UpdateTextGroup(
    $text_group_id: String!
    $data: UpdateTextGroupInput!
  ) {
    update_text_group(id: $text_group_id, data: $data) {
      text_group_id
    }
  }
`

export const REMOVE_TEXT_GROUP_MUTATION = gql`
  mutation RemoveTextGroups($text_group_ids: [String!]!) {
    remove_text_groups(text_group_ids: $text_group_ids) {
      text_group_id
    }
  }
`
