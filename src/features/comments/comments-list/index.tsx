import dayjs from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime'
import type { FC } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { Comment } from '@/lib/graphql'

dayjs.extend(RelativeTime)

interface CommentsListProps {
  comments: Comment[]
}

export const CommentsList: FC<CommentsListProps> = ({ comments }) => {
  if (comments.length === 0) {
    return <p className="py-2 text-sm leading-none text-zinc-900">No comment</p>
  }

  return (
    <>
      {comments.map(comment => (
        <div key={comment.comment_id} className="space-y-1.5 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="size-6 border">
                <AvatarImage
                  src={comment.user.profile_photo_url}
                  alt={comment.user.first_name}
                />
                <AvatarFallback
                  name={`${comment.user.first_name} ${comment.user.last_name}`}
                />
              </Avatar>

              <p className="text-xs font-medium text-zinc-900">
                {comment.user.first_name} {comment.user.last_name}
              </p>
            </div>

            <p className="text-xs text-zinc-500">
              {dayjs(comment.created_at).fromNow(true)}
            </p>
          </div>

          <p className="text-xs text-zinc-900">{comment.comment}</p>
        </div>
      ))}
    </>
  )
}
