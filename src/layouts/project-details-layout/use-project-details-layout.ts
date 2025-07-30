/* eslint-disable @typescript-eslint/no-unnecessary-condition */

'use client'

import { useParams } from 'next/navigation'
import { useMemo } from 'react'

import { useToast } from '@/hooks/use-toast'
import {
  type CsiCode,
  type Page,
  type Project,
  type TradePackage,
  useGetProjectDetailsQuery
} from '@/lib/graphql'
import { getAuthHeader } from '@/utils/headers'

type ProjectDetails = {
  project: Project
  pages: Page[]
  trade_packages: TradePackage[]
  csi_codes: CsiCode[]
}

interface UseProjectDetailsLayoutReturn {
  project: ProjectDetails | null
  loading: boolean
}

export const useProjectDetailsLayout = (): UseProjectDetailsLayoutReturn => {
  const params = useParams<{
    projectId: string
  }>()

  const { toast } = useToast()

  const { data, loading } = useGetProjectDetailsQuery({
    variables: {
      project_id: params.projectId
    },
    onError: error => {
      toast.error({
        title: 'Something went wrong!',
        description: error.message
      })
    },
    context: {
      headers: getAuthHeader(),
      timeout: Number.POSITIVE_INFINITY
    },
    fetchPolicy: 'no-cache'
  })

  const project = useMemo<ProjectDetails | null>(() => {
    if (loading || data == null) {
      return null
    }

    if (
      data.project == null ||
      data.pages == null ||
      data.trade_packages == null
    ) {
      return null
    }

    const csi_codes = data.pages.flatMap(
      page => page.text_groups?.flatMap(textGroup => textGroup.csi_codes) ?? []
    )

    return {
      project: data.project,
      pages: (data.pages as Page[]).toSorted(
        (a, b) => a.page_number - b.page_number
      ),
      trade_packages: data.trade_packages as TradePackage[],
      csi_codes: csi_codes
        .reduce<CsiCode[]>((acc, current) => {
          const exists = acc.some(item => item.csi_code === current.csi_code)
          if (!exists) {
            acc.push(current)
          }
          return acc
        }, [])
        .sort((a, b) => a.csi_code.localeCompare(b.csi_code))
    }
  }, [data, loading])

  return {
    project,
    loading
  }
}
