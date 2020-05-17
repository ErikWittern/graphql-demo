import React, {useState} from 'react'
import '../index.css'
import { RepoForm } from './RepoForm'
import { Repository } from './Repository'
import { fetchRest } from '../fetchREST'
import { fetchGraphQL } from '../fetchGraphQL'
import { Data, State, RepositoryData } from '../types'

/**
 * Renders the overall application.
 */
export function App () {
  const [data, setData] = useState<Data>({state: State.WELCOME})

  async function fetchData (text: string) {
    setData({
      ...data,
      state: State.LOADING
    })

    // Parse input:
    const parts = text.split('/')
    if (parts.length != 2) {
      return setData({
        ...data,
        state: State.ERROR,
        errorMsg: 'Wrong input! Please enter "<owner>/<name>".'
      })
    }
    const [owner, name] = parts

    try {
      /**
       * Fetch using REST or GraphQL
       */
      // const content = await fetchGraphQL(owner, name, 10, 3)
      const content = await fetchRest(owner, name, 10, 3)

      return setData({
        ...data,
        state: State.SUCCESS,
        content: content as RepositoryData,
        owner,
        name
      })
    } catch (error) {
      return setData({
        ...data,
        state: State.ERROR,
        errorMsg: `Request error: ${error.message}`
      })
    }
  }

  let main
  switch (data.state) {
    case State.WELCOME:
      main = <>
        <h3 className="text-3xl">Welcome!</h3>
        <p className="text-gray-600">Load a repository's 10 latest pull requests, and 3 first comments per pull request.</p>
      </>
      break;
    case State.ERROR:
      main = <>
        <h3 className="text-red-600 text-3xl">Error!</h3>
        <p className="text-gray-500">{data.errorMsg}</p>
      </>
      break;
    case State.SUCCESS:
      main = <Repository repositoryData={(data.content)} owner={data.owner} name={data.name}/>
      break;
    case State.LOADING:
      main = <h3 className="text-3xl">Loading...</h3>
      break;
    default:
      break;
  }

  return <div className="container mx-auto px-4">
    <RepoForm onSubmit={fetchData}/>
    <div className="p-3">
      {main}
    </div>
  </div>
}
