import React from 'react'
import snarkdown from 'snarkdown'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { IssueData } from '../types'
import { Comment } from './Comment'

// See https://day.js.org/docs/en/plugin/relative-time
dayjs.extend(relativeTime)

/**
 * Renders a single issue.
 */
export function Issue (props: {issue?: IssueData}) {
  const issue = props.issue
  return (
    <div className="mb-6 pt-2 pr-4 pb-2 pl-4 rounded-lg bg-gray-100 border-solid border-2 border-gray-300">
      <p className="text-md">
        <span className="font-bold">{issue.author.login}</span>
        <span> opened issue: </span>
        <span className="font-bold">{issue.title}</span>
        <span className="text-gray-600 ml-2">{dayjs(issue.createdAt).fromNow()}</span>
      </p>
      <hr className="mt-2 mb-2 border-gray-400"/>
      <div
        className="break-words text-gray-700"
        dangerouslySetInnerHTML={{
          __html: snarkdown(issue.body)
        }}>
      </div>
      {issue.comments?.nodes
        // Sort by creation date: newest comment first
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf())
        .map((commentData, j) => <Comment key={j} comment={commentData}/>)}
  </div>
  )
}
