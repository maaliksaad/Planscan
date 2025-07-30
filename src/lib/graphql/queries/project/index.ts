import { gql } from '@apollo/client'

import { DRAWING_FRAGMENT } from '@/lib/graphql/queries/drawing'
import { PAGE_FRAGMENT } from '@/lib/graphql/queries/page'
import { TRADE_PACKAGE_FRAGMENT } from '@/lib/graphql/queries/trade-package'

export const PROJECT_FRAGMENT = gql`
  fragment ProjectFragment on Project {
    project_id
    project_name
    project_number
    office_location
    address
    project_status
    drawing {
      ...DrawingFragment
    }
    user_projects {
      user_id
      stared
    }
    created_at
  }
  ${DRAWING_FRAGMENT}
`

export const GET_PROJECTS_QUERY = gql`
  query GetProjects($page: Int, $limit: Int, $filters: [FilterInput!]) {
    projects(page: $page, limit: $limit, filters: $filters) {
      total
      total_pages
      page
      limit
      data {
        ...ProjectFragment
      }
    }
  }
  ${PROJECT_FRAGMENT}
`

export const GET_PROJECT_BY_ID_QUERY = gql`
  query GetProjectById($id: String!) {
    project(id: $id) {
      ...ProjectFragment
    }
  }
  ${PROJECT_FRAGMENT}
`

export const CREATE_PROJECT_MUTATION = gql`
  mutation CreateProject($data: CreateProjectInput!) {
    create_project(data: $data) {
      project_id
    }
  }
`

export const UPDATE_PROJECT_MUTATION = gql`
  mutation UpdateProject($project_id: String!, $data: UpdateProjectInput!) {
    update_project(id: $project_id, data: $data) {
      project_id
    }
  }
`

export const REMOVE_PROJECT_MUTATION = gql`
  mutation RemoveProject($project_id: String!) {
    remove_project(id: $project_id) {
      project_id
    }
  }
`

export const STAR_PROJECT_MUTATION = gql`
  mutation StarProject($project_id: String!, $stared: Boolean!) {
    star_project(id: $project_id, stared: $stared) {
      project_id
    }
  }
`

export const UPDATE_PROJECT_SUBSCRIPTION = gql`
  subscription ProjectUpdated($project_id: String!) {
    update_project(project_id: $project_id) {
      ...ProjectFragment
    }
  }
  ${PROJECT_FRAGMENT}
`

export const GET_PROJECT_DETAILS_QUERY = gql`
  query GetProjectDetails($project_id: String!) {
    project(id: $project_id) {
      ...ProjectFragment
    }
    pages(project_id: $project_id) {
      ...PageFragment
    }
    trade_packages(project_id: $project_id) {
      ...TradePackageFragment
    }
  }
  ${PROJECT_FRAGMENT}
  ${PAGE_FRAGMENT}
  ${TRADE_PACKAGE_FRAGMENT}
`
