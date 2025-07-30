import { type FC, useEffect, useState } from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordian'
import { CommentForm } from '@/features/comments/comment-form'
import { CommentsList } from '@/features/comments/comments-list'
import type { Comment, TextGroup } from '@/lib/graphql/generated'

interface TextGroupCommentsProps {
  comments: Comment[]
  textGroup: TextGroup
}

export const TextGroupComments: FC<TextGroupCommentsProps> = ({
  comments: initialComments,
  textGroup
}) => {
  const [comments, setComments] = useState<Comment[]>(
    Array.isArray(initialComments) ? [...initialComments] : []
  )

  useEffect(() => {
    setComments(prev => {
      const updatedComments = Array.isArray(textGroup.comments)
        ? [...textGroup.comments]
        : []

      return [
        ...prev,
        ...updatedComments.filter(
          comment =>
            !prev.some(
              prevComment => prevComment.comment_id === comment.comment_id
            )
        )
      ]
    })
  }, [textGroup.comments])

  return (
    <div className="w-full">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="comments">
          <AccordionTrigger className="p-0 px-3 py-2">
            Comments ({comments.length})
          </AccordionTrigger>
          <AccordionContent className="divide-y divide-zinc-200">
            <div className="max-h-[300px] space-y-1 divide-y divide-zinc-200 overflow-y-auto px-3">
              <CommentsList comments={comments} />
            </div>
            <div className="px-3">
              <CommentForm setComments={setComments} textGroup={textGroup} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
