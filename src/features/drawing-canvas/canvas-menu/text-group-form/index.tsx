'use client'

import type { Dispatch, FC, SetStateAction } from 'react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { MultiSelect } from '@/components/ui/multi-select'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import type { TextGroup } from '@/lib/graphql'
import { TextGroupSchemaKeys } from '@/schemas/text-groups'
import { formatEnum } from '@/utils/format-enum'

import { useTextGroupForm } from './use-text-group-form'

interface TextGroupFormProps {
  textGroup: TextGroup
  setIsEditMode: Dispatch<SetStateAction<boolean>>
}

export const TextGroupForm: FC<TextGroupFormProps> = ({
  textGroup,
  setIsEditMode
}) => {
  const {
    form,
    onSubmit,
    csiCodeOptions,
    tradeOptions,
    figures,
    loadingFigures
  } = useTextGroupForm({
    textGroup,
    setIsEditMode
  })

  return (
    <div key={textGroup.text_group_id} className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4 px-3 py-2"
        >
          <FormField
            control={form.control}
            name={TextGroupSchemaKeys.TEXT}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Extracted text</FormLabel>
                <FormControl>
                  <Input placeholder="Text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={TextGroupSchemaKeys.FIGURE_ID}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Figure detail number</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          field.value == null ? (
                            <span className="text-neutral-500">
                              Figure Number
                            </span>
                          ) : (
                            formatEnum(field.value)
                          )
                        }
                      />
                    </SelectTrigger>
                    <SelectContent className="z-[110]">
                      {loadingFigures ? (
                        <p>Loading</p>
                      ) : (
                        figures.map(figure => (
                          <SelectItem
                            key={figure.figure_id}
                            value={figure.figure_id}
                            className=""
                          >
                            {figure.figure_title == null &&
                            figure.figure_number == null
                              ? figure.figure_id
                              : `${figure.figure_number ?? 'N/A'} - ${figure.figure_title}`}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={TextGroupSchemaKeys.CSI_CODES}
            render={({ field }) => (
              <FormItem>
                <FormLabel>CSI Codes</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={csiCodeOptions}
                    value={field.value}
                    onSelectChange={field.onChange}
                    label="Select csi codes"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={TextGroupSchemaKeys.TRADES}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trades</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={tradeOptions}
                    value={field.value}
                    onSelectChange={field.onChange}
                    label="Select trades"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsEditMode(false)
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
