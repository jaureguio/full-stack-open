import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@material-ui/core'
import styled from 'styled-components'

import { logout } from '../reducers/authReducer'
import { showNotification } from '../reducers/notificationReducer'

const AuthUser = () => {
  const { authUser } = useSelector(state => state.authUser)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    // The following notification does not get to be shown due to the way <Notification /> is rendered, which is only when there is a user logged in
    dispatch(showNotification({
      message: 'Sad to see you leave :(',
    }))
  }

  return (
    <span>
      {authUser.username} logged in
      <LogoutButton
        variant='outlined'
        color='secondary'
        onClick={handleLogout}
      >
        logout
      </LogoutButton>
    </span>
  )
}

const LogoutButton = styled(Button)`
  && {
    font-size: 0.6rem;
    font-family: 'lato';
    margin-left: 24px;
  }
`

export default AuthUser