import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ContentData } from '../types'
import { Issue } from './Issue'

// See https://day.js.org/docs/en/plugin/relative-time
dayjs.extend(relativeTime)

/**
 * Renders issues and their comments.
 */
export function Content (props: {content?: ContentData, owner: string, name: string}) {
  return (
    <div>
      <h3 className="text-3xl mb-4">{props.owner}/{props.name}</h3>
        {props.content?.repository.issues.nodes
          // Sort by creation date: newest issue first
          .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf())
          .map((issueData, i) => <Issue key={i} issue={issueData}/>)}
    </div>
  )
}
