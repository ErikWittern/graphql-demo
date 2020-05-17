import { token } from './token'
import { RepositoryData } from './types'

export async function fetchRest(owner: string, name: string, pullRequests: number, comments: number) : Promise<RepositoryData> {
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

  // Load pull requests:
  const prResponse = await fetch(`https://api.github.com/repos/${owner}/${name}/pulls?per_page=${pullRequests}&state=all`, {
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
  const prData = await prResponse.json()

  // Load Comments per pull request:
  const commentsNodes = await Promise.all(prData.map(pr => {
    return fetchComments(owner, name, pr.number, comments)
  }))

  // Refactor data:
  return {
    repository: {
      name: repoData.name,
      description: repoData.description,
      pullRequests: {
        nodes: prData.map((pr, i) => {
          return {
            title: pr.title,
            body: pr.body,
            createdAt: pr.created_at,
            author: {
              login: pr.user?.login
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

async function fetchComments(owner: string, name: string, pr: string, comments: number) {
  const commentResponse = await fetch(`https://api.github.com/repos/${owner}/${name}/issues/${pr}/comments?per_page=${comments}`, {
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
      databaseId: comment.id,
      body: comment.body,
      createdAt: comment.created_at,
      author: {
        login: comment.user?.login
      }
    }
  })
}
