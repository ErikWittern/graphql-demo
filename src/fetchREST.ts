import { token } from './token'
import { ContentData } from './types'

export async function fetchRest(owner: string, name: string, issues: number, comments: number) : Promise<ContentData> {
  // Load Repository:
  const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${name}`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
  if (!repoResponse.ok) throw new Error(`Could not fetch repo ${owner}/${name}.`)
  const repoData = await repoResponse.json()

  // Load Issues:
  const issuesResponse = await fetch(`https://api.github.com/repos/${owner}/${name}/issues?per_page=${issues}`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
  const issuesData = await issuesResponse.json()

  // Load Comments per Issue:
  const commentsNodes = await Promise.all(issuesData.map(issue => {
    return fetchComments(owner, name, issue.number, comments)
  }))

  // Refactor data:
  return {
    repository: {
      name: repoData.name,
      issues: {
        nodes: issuesData.map((issue, i) => {
          return {
            title: issue.title,
            body: issue.body,
            createdAt: issue.created_at,
            author: {
              login: issue.user?.login
            },
            comments: {
              nodes: commentsNodes[i]
            }
          }
        })
      }
    }
  }
}

async function fetchComments(owner: string, name: string, issue: string, comments: number) {
  const commentResponse = await fetch(`https://api.github.com/repos/${owner}/${name}/issues/${issue}/comments?per_page=${comments}`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
  const commentData = await commentResponse.json()
  return commentData.map(comment => {
    return {
      body: comment.body,
      createdAt: comment.created_at,
      author: {
        login: comment.user?.login
      }
    }
  })
}
