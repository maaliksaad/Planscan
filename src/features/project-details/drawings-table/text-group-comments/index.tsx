'use client'

import { type FC, useEffect, useState } from 'react'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { CommentForm } from '@/features/comments/comment-form'
import { CommentsList } from '@/features/comments/comments-list'
import { ChatBubbleIcon } from '@/icons/chat-bubble'
import type { Comment, TextGroup } from '@/lib/graphql'

interface TextGroupCommentsProps {
  textGroup: TextGroup
}

export const TextGroupComments: FC<TextGroupCommentsProps> = ({
  textGroup
}) => {
  const [comments, setComments] = useState<Comment[]>(
    Array.isArray(textGroup.comments) ? [...textGroup.comments] : []
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
    <Sheet>
      <SheetTrigger>
        <ChatBubbleIcon className="size-4" />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Comments</SheetTitle>
        </SheetHeader>
        <div className="flex-1 space-y-1 divide-y divide-zinc-200">
          <CommentsList comments={comments} />
        </div>

        <CommentForm setComments={setComments} textGroup={textGroup} />
      </SheetContent>
    </Sheet>
  )
}
