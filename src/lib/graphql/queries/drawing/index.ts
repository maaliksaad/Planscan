import { gql } from '@apollo/client'

export const DRAWING_FRAGMENT = gql`
  fragment DrawingFragment on Drawing {
    drawing_id
    display_file_name
    drawing_status
    created_at
  }
`

export const CREATE_DRAWING_MUTATION = gql`
  mutation CreateDrawing($data: CreateDrawingInput!) {
    create_drawing(data: $data) {
      ...DrawingFragment
    }
  }
  ${DRAWING_FRAGMENT}
`

export const REVIEW_DRAWING_MUTATION = gql`
  mutation ReviewDrawing($drawing_id: String!) {
    review_drawing(drawing_id: $drawing_id) {
      drawing_id
    }
  }
`

export const UPDATE_DRAWING_MUTATION = gql`
  mutation UpdateDrawing($drawing_id: String!, $data: UpdateDrawingInput!) {
    update_drawing(drawing_id: $drawing_id, data: $data) {
      drawing_id
    }
  }
`
