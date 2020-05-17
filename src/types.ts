export enum State {
  WELCOME,
  LOADING,
  SUCCESS,
  ERROR
}

export interface Data {
  state: State
  errorMsg?: string
  content?: RepositoryData
  owner?: string
  name?: string
}

export type CommentData = {
  body: string
  createdAt: string
  author: {
    login: string
  }
}

export type PullRequestData = {
  title: string
  body: string
  createdAt: string
  author: {
    login: string
  }
  comments: {
    nodes: CommentData[]
  }
}

export type RepositoryData = {
  repository: {
    name: string
    description: string
    pullRequests: {
      nodes: PullRequestData[]
    }
  }
}
