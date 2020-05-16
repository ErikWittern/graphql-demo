export enum State {
  WELCOME,
  LOADING,
  SUCCESS,
  ERROR
}

export interface Data {
  state: State
  errorMsg?: string
  content?: ContentData
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

export type IssueData = {
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

export type ContentData = {
  repository: {
    name: string
    issues: {
      nodes: IssueData[]
    }
  }
}
