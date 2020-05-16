import React from 'react'
import snarkdown from 'snarkdown'
import dayjs from 'dayjs'
import { CommentData } from '../types'

/**
 * Renders a single comment.
 */
export function Comment (props: {comment?: CommentData}) {
  const comment = props.comment
  return (
    <div className="mt-4 mb-2 p-4 rounded-md bg-gray-200 border-solid border-2 border-gray-300">
      <p className="text-md">
        <span className="font-bold">{comment.author?.login}</span>
        <span> commented: </span>
        <span className="text-gray-600">{dayjs(comment.createdAt).fromNow()}</span>
      </p>
      <hr className="mt-2 mb-2 border-gray-400"/>
      <div
        className="break-words text-gray-700"
        dangerouslySetInnerHTML={{
          __html: snarkdown(comment.body)
        }}>
      </div>
    </div>
  )
}
