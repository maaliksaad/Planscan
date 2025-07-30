import { gql } from '@apollo/client'

export const FIGURE_FRAGMENT = gql`
  fragment FigureFragment on Figure {
    figure_id
    figure_title
    figure_number
  }
`

export const GET_FRAGMENTS_QUERY = gql`
  query GetFigures($text_group_id: String!) {
    figures(text_group_id: $text_group_id) {
      ...FigureFragment
    }
  }
  ${FIGURE_FRAGMENT}
`
