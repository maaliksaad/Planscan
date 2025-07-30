import type { FC } from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { LoadingIcon } from '@/icons/loading'
import { TrayDownIcon } from '@/icons/tray-down'
import { ExportSchemaKeys } from '@/schemas/export'
import type { Filter } from '@/types/data-table'
import { cn } from '@/utils/cn'

import type { TransformedTextGroup } from '../project-details/drawings-table/extracted-data-table/extracted-data-table.types'
import { useExportData } from './use-export-data'

interface ExportDataProps {
  filters: Array<Filter<TransformedTextGroup>>
}

export const ExportData: FC<ExportDataProps> = ({ filters }) => {
  const { form, onSubmit, open, onOpenChange, format } = useExportData({
    filters
  })

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm">
          <TrayDownIcon className="size-4" />
          Export
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Export</SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full flex-col justify-between py-6"
          >
            <div className="flex flex-1 flex-col gap-4">
              <div className="flex items-center gap-2">
                <p className="text-sm text-zinc-900">Export to</p>

                <FormField
                  control={form.control}
                  name={ExportSchemaKeys.FORMAT}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Select
                          value={field.value.toString()}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={field.value} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="csv">CSV</SelectItem>
                            <SelectItem value="pdf">PDF</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div
                className={cn('grid', {
                  'grid-cols-1': format === 'csv',
                  'grid-cols-2': format === 'pdf'
                })}
              >
                {format === 'pdf' && (
                  <FormField
                    control={form.control}
                    name={ExportSchemaKeys.PDF_DRAWINGS}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Drawings selection</FormLabel>
                        <FormControl>
                          <RadioGroup
                            defaultValue="all"
                            value={field.value}
                            onValueChange={data => {
                              field.onChange({ target: { value: data } })
                            }}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="all" id="r1" />
                              <Label htmlFor="r1">All drawings</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="filtered" id="r2" />
                              <Label htmlFor="r2">Filtered drawings</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name={ExportSchemaKeys.DATA}
                  render={({ field }) => (
                    <FormItem>
                      {format === 'pdf' && (
                        <FormLabel>Data selection</FormLabel>
                      )}
                      <FormControl>
                        <RadioGroup
                          defaultValue="all"
                          value={field.value}
                          onValueChange={data => {
                            field.onChange({ target: { value: data } })
                          }}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="all" id="r1" />
                            <Label htmlFor="r1">All data</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="selected" id="r2" />
                            <Label htmlFor="r2">Selected data</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {format === 'pdf' && (
                <div className="space-y-2">
                  <FormLabel>Data tag type</FormLabel>

                  <FormField
                    control={form.control}
                    name={ExportSchemaKeys.CSI_CODES}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={() => {
                                field.onChange(!field.value)
                              }}
                            />
                          </FormControl>
                          <FormLabel className="m-0">CSI Codes</FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={ExportSchemaKeys.TRADES}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={() => {
                                field.onChange(!field.value)
                              }}
                            />
                          </FormControl>
                          <FormLabel className="m-0">Trades</FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>
            <div className="flex items-center justify-end gap-4">
              <div className="flex gap-4">
                <SheetClose asChild>
                  <Button variant="link" className="p-0">
                    Cancel
                  </Button>
                </SheetClose>
                <Button
                  type="submit"
                  className="w-[80px]"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <LoadingIcon className="size-6" />
                  ) : (
                    <span>Export</span>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
