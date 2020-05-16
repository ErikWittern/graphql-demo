import { token } from './token'

export async function fetchGraphQL(owner: string, name: string, issues: number, comments: number) {
  const query = `
    query fetch ($owner: String!, $name: String!, $issues: Int!, $comments: Int!){
      repository(owner: $owner name: $name) {
        name
        issues(last: $issues) {
          nodes {
            title
            createdAt
            body
            author {
              login
            }
            comments (last: $comments) {
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
        issues,
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
