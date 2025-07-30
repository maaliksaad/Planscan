import { z } from 'zod'

export const CommentSchemaKeys = {
  COMMENT: 'comment'
}

const CreateCommentCommentSchema = z
  .string({
    message: 'Comment is required'
  })
  .min(1, {
    message: 'Comment is required'
  })

export const CreateCommentSchema = z.object({
  [CommentSchemaKeys.COMMENT]: CreateCommentCommentSchema
})

export type CreateCommentSchemaType = z.infer<typeof CreateCommentSchema>
