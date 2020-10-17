import React, { useEffect } from 'react'
import { useMutation, gql } from '@apollo/client'

const LOGIN = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(
      username: $username,
      password: $password
    ) {
      username
      favGenre
      token
    }
  }
`

const Login = ({ show, setLoggedUser, setPage }) => {
  const [ onLogin, result ] = useMutation(LOGIN)

  useEffect(() => {
    if(result.data) {
      const userInfo = result.data.login
      window.localStorage.setItem('library-userInfo', JSON.stringify(userInfo))
      setLoggedUser(userInfo)
      setPage('books')
    }
  }, [result.data]) // eslint-disable-line

  if(!show) return null

  const handleLogin = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    onLogin({ variables: { username, password } })
    event.target.username.value = ''
    event.target.password.value = ''
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor='username'>username</label>
        <input type='text' id='username'/>
      </div>
      <div>
        <label htmlFor='password'>password</label>
        <input type='password' id='password'/>
      </div>
      <button>login</button>
    </form>
  )
}

export default Login