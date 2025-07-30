import {
  type CsiCode,
  type Page,
  type Project,
  type TradePackage,
  usePagesUpdatedSubscription,
  useProjectUpdatedSubscription,
  useTradesUpdatedSubscription
} from '@/lib/graphql'
import { useProjectStore } from '@/stores/project-store'

interface UseProjectDetailsSectionReturn {
  project: Project
  pages: Page[]
}

export const useProjectDetailsSection = (): UseProjectDetailsSectionReturn => {
  const {
    project,
    pages,
    setProject,
    setPages,
    setCSICodes,
    setTradePackages
  } = useProjectStore()(state => state)

  useProjectUpdatedSubscription({
    variables: {
      project_id: project.project_id
    },
    onData: ({ data }) => {
      if (
        data.data?.update_project == null ||
        data.data.update_project.project_id !== project.project_id
      ) {
        return
      }

      setProject(data.data.update_project)
    },
    errorPolicy: 'all'
  })

  usePagesUpdatedSubscription({
    variables: {
      project_id: project.project_id
    },
    onData: ({ data }) => {
      if (data.data?.update_pages == null) {
        return
      }

      const csi_codes = data.data.update_pages.flatMap(
        page =>
          page.text_groups?.flatMap(textGroup => textGroup.csi_codes) ?? []
      )

      setPages(
        (data.data.update_pages as Page[]).toSorted(
          (a, b) => a.page_number - b.page_number
        )
      )

      setCSICodes(
        csi_codes
          .reduce<CsiCode[]>((acc, current) => {
            const exists = acc.some(item => item.csi_code === current.csi_code)
            if (!exists) {
              acc.push(current)
            }
            return acc
          }, [])
          .sort((a, b) => a.csi_code.localeCompare(b.csi_code))
      )
    },
    errorPolicy: 'all'
  })

  useTradesUpdatedSubscription({
    variables: {
      project_id: project.project_id
    },
    onData: ({ data }) => {
      if (data.data?.update_trades == null) {
        return
      }

      setTradePackages(data.data.update_trades as TradePackage[])
    },
    errorPolicy: 'all'
  })

  return {
    project,
    pages
  }
}
