import React from 'react'
import ReactDOM from 'react-dom'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split
} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'
import { setContext } from 'apollo-link-context'
import App from './App'

const token = JSON.parse(window.localStorage.getItem('library-userInfo'))?.token

const authLink = setContext((_, { headers }) => {
  if(token) {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`
      }
    }
  }
})

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
  },
  connectionParams: {
    authorization: token ?? null
  }
})

const splitLink = split(
  (params) => {
    // console.log(params)
    const definition = getMainDefinition(params.query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
  connectToDevTools: true,
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)