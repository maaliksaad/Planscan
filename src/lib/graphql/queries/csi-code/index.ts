import { gql } from '@apollo/client'

export const CSI_CODE_FRAGMENT = gql`
  fragment CSICodeFragment on CSICode {
    csi_code_id
    csi_code
    title
    created_at
  }
`
