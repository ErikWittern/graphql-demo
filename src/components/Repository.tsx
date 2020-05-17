import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { RepositoryData } from '../types'
import { PullRequest } from './PullRequest'

// See https://day.js.org/docs/en/plugin/relative-time
dayjs.extend(relativeTime)

/**
 * Renders repository data.
 */
export function Repository (props: {repositoryData?: RepositoryData, owner: string, name: string}) {
  return (
    <div>
      <h3 className="text-3xl mb-4">{props.owner}/{props.repositoryData?.repository.name}</h3>
      <p className="text-gray-500 mb-6"><em>{props.repositoryData?.repository.description}</em></p>
      {props.repositoryData?.repository.pullRequests.nodes
        // Sort by creation date: newest PR first
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf())
        .map((prData, i) => <PullRequest key={i} pr={prData}/>)}
    </div>
  )
}
