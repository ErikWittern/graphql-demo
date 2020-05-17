import { token } from './token'

export async function fetchGraphQL(owner: string, name: string, pullRequests: number, comments: number) {
  const query = `
    query fetch ($owner: String!, $name: String!, $pullRequests: Int!, $comments: Int!){
      repository(owner: $owner name: $name) {
        name
        description
        pullRequests(last: $pullRequests) {
          nodes {
            title
            createdAt
            body
            author {
              login
            }
            comments (first: $comments) {
              nodes {
                body
                createdAt
                author {
                  login
                }
              }
            }
          }
        }
      }
    }
  `
  
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      query,
      variables: {
        owner,
        name,
        pullRequests,
        comments
      }
    })
  })
  const data = await response.json()
  if (Array.isArray(data.errors)) {
    throw new Error(data.errors.map(err => err.message).join(', '))
  }
  return data.data
}
