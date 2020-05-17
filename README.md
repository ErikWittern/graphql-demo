# GitHub PRs & Comments
Example GraphQL app that renders latest pull requests and their first comments for a given GitHub repository. The purpose of this app is to contrast the use of GitHub's [REST API v3](https://developer.github.com/v3/) vs. its [GraphQL API v4](https://developer.github.com/v4/). Written in [TypeScript](https://www.typescriptlang.org/), uses the [React](https://reactjs.org/) UI library and [Tailwind CSS](https://tailwindcss.com/) for styling.


## Providing an access token
To use either of GitHub's APIs, a personal access token is required. GitHub provides [instructions on how to create access tokens](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).

To make the token available to this app, create a file `src/token.ts` with the following content:

```javascript
export const token = '<your-token-goes-here>'
```


## Building and running
After cloning this repository, install dependencies:

```
npm i
```

To then compile the TypeScript code into JavaScript and start the development server:

```
npm run dev
```


## Switching between REST and GraphQL
The code in `fetchREST.ts` and `fetchGraphQL.ts` is responsible for fetching required data from GitHub's REST and respectively GraphQL APIs. This code is invoked from the `fetchData` function in `App.tsx`. Comment in the desired function.


## License
MIT
