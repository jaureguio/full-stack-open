import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { getAllUsers } from '../reducers/userReducer'

import UserDisplay from './UserDisplay'
import UsersTable from './UsersTable'

const Users = () => {
  const match = useRouteMatch('/users/:id')
  const users  = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch]) // Unnecessary dependency

  if(!users.length) return <p>Loading users...</p>

  const userToDisplay = match
    ? users.find(( user ) => user.id === match.params.id)
    : null

  return (
    <div>
      <Switch>
        <Route path='/users/:id'>
          <UserDisplay user={userToDisplay} />
        </Route>
        <Route path='/users'>
          <h2>Users</h2>
          <UsersTable users={users} />
        </Route>
      </Switch>
    </div>
  )
}

export default Users