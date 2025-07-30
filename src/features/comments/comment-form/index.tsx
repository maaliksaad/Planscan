import type { Dispatch, FC, SetStateAction } from 'react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { AirplaneIcon } from '@/icons/airplane'
import { LoadingIcon } from '@/icons/loading'
import type { Comment, TextGroup } from '@/lib/graphql'
import { CommentSchemaKeys } from '@/schemas/comments'

import { useCommentForm } from './use-comment-form'

interface CommentFormProps {
  textGroup: TextGroup
  setComments: Dispatch<SetStateAction<Comment[]>>
}

export const CommentForm: FC<CommentFormProps> = ({
  textGroup,
  setComments
}) => {
  const { form, onSubmit } = useCommentForm({ textGroup, setComments })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-2 py-2"
      >
        <FormField
          control={form.control}
          name={CommentSchemaKeys.COMMENT}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className="h-20 resize-none"
                  placeholder="Enter a comment"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button variant="outline" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <LoadingIcon className="size-4" />
            ) : (
              <AirplaneIcon className="size-4" />
            )}
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </form>
    </Form>
  )
}
