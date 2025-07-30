import { gql } from '@apollo/client'

import { TEXT_GROUP_FRAGMENT } from '../text-group'

export const PAGE_FRAGMENT = gql`
  fragment PageFragment on Page {
    page_id
    drawing_number
    drawing_discipline
    sheet_title
    page_number
    page_image_width
    page_image_height
    page_thumbnail_uri
    page_image_uri
    text_groups {
      ...TextGroupFragment
    }
    created_at
  }
  ${TEXT_GROUP_FRAGMENT}
`

export const GET_PROJECT_PAGES_QUERY = gql`
  query GetProjectPages($project_id: String!) {
    pages(project_id: $project_id) {
      ...PageFragment
    }
  }
  ${PAGE_FRAGMENT}
`

export const UPDATE_PAGE_MUTATION = gql`
  mutation UpdatePage($page_id: String!, $data: UpdatePageInput!) {
    update_page(id: $page_id, data: $data) {
      ...PageFragment
    }
  }
  ${PAGE_FRAGMENT}
`

export const REMOVE_PAGES_MUTATION = gql`
  mutation RemovePages($page_ids: [String!]!) {
    remove_pages(page_ids: $page_ids) {
      page_id
    }
  }
`

export const UPDATE_PAGES_SUBSCRIPTION = gql`
  subscription PagesUpdated($project_id: String!) {
    update_pages(project_id: $project_id) {
      ...PageFragment
    }
  }
  ${PAGE_FRAGMENT}
`
