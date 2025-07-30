import type { FC } from 'react'
import type { SubmitHandler, UseFormReturn } from 'react-hook-form'

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { SheetClose } from '@/components/ui/sheet'
import { DeleteProject } from '@/features/projects/delete-project'
import { LoadingIcon } from '@/icons/loading'
import { type Project, ProjectStatus } from '@/lib/graphql'
import {
  type CreateProjectSchemaType,
  ProjectSchemaKeys,
  type UpdateProjectSchemaType
} from '@/schemas/projects'
import { cn } from '@/utils/cn'
import { formatEnum } from '@/utils/format-enum'

interface CreateProjectFormProps {
  type: 'create'
  project?: null
}

interface UpdateProjectFormProps {
  type: 'update'
  project: Project
}

type ProjectFormProps = (CreateProjectFormProps | UpdateProjectFormProps) & {
  form: UseFormReturn<CreateProjectSchemaType | UpdateProjectSchemaType>
  onSubmit: SubmitHandler<CreateProjectSchemaType | UpdateProjectSchemaType>
}

export const ProjectForm: FC<ProjectFormProps> = ({
  type,
  form,
  onSubmit,
  project
}) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full flex-col justify-between py-6"
      >
        <div className="flex flex-1 flex-col gap-4">
          <FormField
            control={form.control}
            name={ProjectSchemaKeys.NAME}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project name</FormLabel>
                <FormControl>
                  <Input placeholder="Project name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={ProjectSchemaKeys.NUMBER}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Project number"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={ProjectSchemaKeys.OFFICE}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Office</FormLabel>
                <FormControl>
                  <Input placeholder="Office" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={ProjectSchemaKeys.ADDRESS}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {type === 'update' && (
            <FormField
              control={form.control}
              name={ProjectSchemaKeys.STATUS}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            field.value == null ? (
                              <span className="text-neutral-500">Status</span>
                            ) : (
                              formatEnum(field.value)
                            )
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(ProjectStatus).map(intention => (
                          <SelectItem
                            key={intention}
                            value={intention}
                            className=""
                          >
                            {formatEnum(intention)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-4">
            {type === 'update' && <DeleteProject project={project} />}
          </div>
          <div className="flex gap-4">
            <SheetClose asChild>
              <Button variant="link" className="p-0">
                Cancel
              </Button>
            </SheetClose>
            <Button
              type="submit"
              className={cn({
                'w-[130px]': type === 'create',
                'w-[80px]': type === 'update'
              })}
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <LoadingIcon className="size-6" />
              ) : (
                <span>{type === 'create' ? 'Create project' : 'Save'}</span>
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
