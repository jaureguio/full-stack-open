import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { setContext } from 'apollo-link-context'
import App from './App'

const authLink = setContext((_, { headers }) => {
  const token = JSON.parse(window.localStorage.getItem('library-userInfo'))?.token
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
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
  connectToDevTools: true,
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)