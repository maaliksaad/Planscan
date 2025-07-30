import { gql } from '@apollo/client'

import { CSI_CODE_FRAGMENT } from '@/lib/graphql/queries/csi-code'
import { USER_FRAGMENT } from '@/lib/graphql/queries/user'

export const TRADE_PACKAGE_FRAGMENT = gql`
  fragment TradePackageFragment on TradePackage {
    trade_package_id
    trade_package_name
    trade_color
    users {
      ...UserFragment
    }
    csi_codes {
      ...CSICodeFragment
    }
  }
  ${USER_FRAGMENT}
  ${CSI_CODE_FRAGMENT}
`

export const CREATE_TRADE_PACKAGE_MUTATION = gql`
  mutation CreateTradePackage($data: CreateTradePackageInput!) {
    create_trade_package(data: $data) {
      trade_package_id
    }
  }
`

export const UPDATE_TRADE_PACKAGE_MUTATION = gql`
  mutation UpdateTradePackage(
    $trade_package_id: String!
    $data: UpdateTradePackageInput!
  ) {
    update_trade_package(trade_package_id: $trade_package_id, data: $data) {
      trade_package_id
    }
  }
`

export const APPLY_TRADE_MUTATION = gql`
  mutation ApplyTrade($trade_package_id: String!, $csi_code_ids: [String!]!) {
    apply_trade_package(
      trade_package_id: $trade_package_id
      csi_code_ids: $csi_code_ids
    ) {
      trade_package_id
    }
  }
`

export const UNAPPLY_TRADE_MUTATION = gql`
  mutation UnApplyTrade($trade_package_id: String!, $csi_code_ids: [String!]!) {
    unapply_trade_package(
      trade_package_id: $trade_package_id
      csi_code_ids: $csi_code_ids
    ) {
      trade_package_id
    }
  }
`

export const UPDATE_TRADES_SUBSCRIPTION = gql`
  subscription TradesUpdated($project_id: String!) {
    update_trades(project_id: $project_id) {
      ...TradePackageFragment
    }
  }
  ${TRADE_PACKAGE_FRAGMENT}
`
