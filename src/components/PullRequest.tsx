import React from 'react'
import snarkdown from 'snarkdown'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { PullRequestData } from '../types'
import { Comment } from './Comment'

// See https://day.js.org/docs/en/plugin/relative-time
dayjs.extend(relativeTime)

/**
 * Renders a single pull request.
 */
export function PullRequest (props: {pr?: PullRequestData}) {
  const pr = props.pr
  return (
    <div className="mb-6 pt-2 pr-4 pb-2 pl-4 rounded-lg bg-gray-100 border-solid border-2 border-gray-300">
      <p className="text-md">
        <span className="font-bold">{pr.author.login}</span>
        <span> created PR: </span>
        <span className="font-bold">{pr.title}</span>
        <span className="text-gray-600 ml-2">{dayjs(pr.createdAt).fromNow()}</span>
      </p>
      <hr className="mt-2 mb-2 border-gray-400"/>
      <div
        className="break-words text-gray-700"
        dangerouslySetInnerHTML={{
          __html: snarkdown(pr.body)
        }}>
      </div>
      {pr.comments?.nodes
        // Sort by creation date: oldest comment first
        .sort((a, b) => dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf())
        .map((commentData, j) => <Comment key={j} comment={commentData}/>)}
  </div>
  )
}
