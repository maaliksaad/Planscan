import { zodResolver } from '@hookform/resolvers/zod'
import type { Row } from '@tanstack/table-core'
import { json2csv } from 'json-2-csv'
import { useMemo, useState } from 'react'
import {
  type SubmitHandler,
  useForm,
  type UseFormReturn,
  useWatch
} from 'react-hook-form'
import useDownloader from 'react-use-downloader'

import { useToast } from '@/hooks/use-toast'
import { useUppy } from '@/hooks/use-uppy'
import { useGeneratePdfMutation } from '@/lib/graphql'
import {
  ExportSchema,
  ExportSchemaKeys,
  type ExportSchemaType
} from '@/schemas/export'
import { useProjectStore } from '@/stores/project-store'
import type { Filter } from '@/types/data-table'
import { getAuthHeader } from '@/utils/headers'

import type { TransformedTextGroup } from '../project-details/drawings-table/extracted-data-table/extracted-data-table.types'
import {
  getExtractedDataTableColumns,
  transformTextGroupsData
} from '../project-details/drawings-table/extracted-data-table/extracted-data-table.utils'

interface UseExportDataParams {
  filters: Array<Filter<TransformedTextGroup>>
}

interface UseExportDataReturn {
  open: boolean
  format: 'csv' | 'pdf'
  onOpenChange: (value: boolean) => void
  form: UseFormReturn<ExportSchemaType>
  onSubmit: SubmitHandler<ExportSchemaType>
}

export const useExportData = ({
  filters
}: UseExportDataParams): UseExportDataReturn => {
  const project = useProjectStore()(state => state.project)
  const pages = useProjectStore()(state => state.pages)

  const { toast } = useToast()

  const { handleUpload, abortUpload } = useUppy()

  const [open, setOpen] = useState(false)

  const [generatePDFMutation] = useGeneratePdfMutation()

  const form = useForm<ExportSchemaType>({
    resolver: zodResolver(ExportSchema),
    defaultValues: {
      [ExportSchemaKeys.FORMAT]: 'csv',
      [ExportSchemaKeys.DATA]: 'all',
      [ExportSchemaKeys.PDF_DRAWINGS]: 'all',
      [ExportSchemaKeys.TRADES]: true
    }
  })

  const columns = useMemo(() => getExtractedDataTableColumns([]), [])

  const format = useWatch({
    control: form.control,
    name: ExportSchemaKeys.FORMAT
  })

  const fileData = useWatch({
    control: form.control,
    name: ExportSchemaKeys.DATA
  })

  const fileDrawings = useWatch({
    control: form.control,
    name: ExportSchemaKeys.PDF_DRAWINGS
  })

  const filteredPages = useMemo(() => {
    if (fileDrawings === 'filtered') {
      return pages.filter(p =>
        transformTextGroupsData(p.text_groups ?? []).some(textGroup =>
          filters.every(filter => {
            const filterFunction = columns.find(
              col => col.id === filter.id
            )?.filterFn

            return typeof filterFunction === 'function'
              ? filterFunction(
                  {
                    original: {
                      ...textGroup
                    }
                  } as unknown as Row<TransformedTextGroup>,
                  filter.id,
                  filter.value,
                  () => {
                    //
                  }
                )
              : true
          })
        )
      )
    }

    return pages
  }, [pages, fileDrawings, filters, columns])

  const filteredTextGroups = useMemo(() => {
    let textGroups = filteredPages.flatMap(page => page.text_groups ?? [])

    if (filters.length > 0 && fileData === 'selected') {
      textGroups = textGroups.filter(textGroup =>
        filters.every(filter => {
          const filterFunction = columns.find(
            col => col.id === filter.id
          )?.filterFn

          return typeof filterFunction === 'function'
            ? filterFunction(
                {
                  original: {
                    ...textGroup
                  }
                } as unknown as Row<TransformedTextGroup>,
                filter.id,
                filter.value,
                () => {
                  //
                }
              )
            : true
        })
      )
    }

    return textGroups.map(textGroup => ({
      text_group_id: textGroup.text_group_id,
      text: textGroup.text,
      user_edited_text: textGroup.user_edited_text,
      x1: textGroup.x1,
      x2: textGroup.x2,
      y1: textGroup.y1,
      y2: textGroup.y2,
      csi_codes: textGroup.csi_codes.map(csiCode => csiCode.csi_code),
      trade_packages: textGroup.trade_packages.map(
        trade => trade.trade_package_name
      ),
      created_at: textGroup.created_at
    }))
  }, [filteredPages, filters, columns, fileData])

  const { download } = useDownloader()

  const onSubmit: SubmitHandler<ExportSchemaType> = async data => {
    if (data.format === 'csv') {
      const pagesAndTextGroups = filteredPages.flatMap(page =>
        (page.text_groups ?? []).map(textGroup => ({
          sheet_title: page.sheet_title,
          drawing_discipline: page.drawing_discipline,
          drawing_number: page.drawing_number,
          text: textGroup.user_edited_text ?? textGroup.text,
          csi_codes: textGroup.csi_codes.map(csiCode => csiCode.csi_code),
          trade_packages: textGroup.trade_packages.map(
            trade => trade.trade_package_name
          )
        }))
      )

      const csv = json2csv(pagesAndTextGroups, {
        prependHeader: true
      })

      const url = URL.createObjectURL(
        new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      )

      await download(url, `${project.project_name}-data.csv`)
    }
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    else if (data.format === 'pdf') {
      abortUpload()

      const uploadedFile = await handleUpload(
        new File(
          [
            JSON.stringify({
              page_ids: filteredPages.map(page => page.page_id),
              text_group_ids: filteredTextGroups.map(
                textGroup => textGroup.text_group_id
              ),
              csi_codes: data.csi_codes,
              trades: data.trades
            })
          ],
          `${project.project_id}-input.json`,
          {
            type: 'application/json'
          }
        )
      )

      await generatePDFMutation({
        variables: {
          data: {
            file_id: uploadedFile.file_id
          }
        },
        onError: error => {
          toast.error({
            title: 'Something went wrong!',
            description: error.message
          })
        },
        onCompleted: async ({ generate_pdf }) => {
          toast.success({
            title: 'PDF created!',
            description: 'Your download will start soon.',
            duration: 5000
          })

          await download(
            generate_pdf,
            `${project.project_name}-data.pdf`,
            10 * 60 * 1000,
            {
              method: 'GET',
              headers: {
                ContentType: 'application/pdf'
              }
            }
          )

          toast.success({
            title: 'PDF saved!',
            description: 'PDF has been successfully created and saved.',
            duration: 5000
          })
        },
        context: {
          headers: getAuthHeader()
        }
      })
    } else {
      toast.error({
        title: 'Error',
        description: 'Invalid format'
      })
    }
  }

  const onOpenChange = (value: boolean): void => {
    setOpen(value)
  }

  return {
    open,
    onOpenChange,
    form,
    onSubmit,
    format
  }
}
