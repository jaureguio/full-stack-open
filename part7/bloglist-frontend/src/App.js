import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import styled from 'styled-components'

import Notification from './components/Notification'
import NavigationMenu from './components/NavigationMenu'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import Users from './components/Users'

const App = () => {
  const { authUser } = useSelector(state => state.authUser)

  return (
    <div>
      {authUser === null
        ? <LoginForm />
        : (
          <div>
            <NavigationMenu />
            <Notification />
            <H1>Blog App</H1>
            <Switch>
              <Route path='/users'>
                <Users />
              </Route>
              <Route path='/blogs'>
                <Blogs />
              </Route>
              <Route path='/'>
                <Redirect to='/blogs' />
              </Route>
            </Switch>
          </div>
        )
      }
    </div>
  )
}


const H1 = styled.h1`
  font-size: 3.5rem;
  display: inline-block;
  background-image: linear-gradient(to right, black, rgb(114, 114, 114));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 12px;
`
export default App