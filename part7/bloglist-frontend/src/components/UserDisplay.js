import React from 'react'
import PropTypes from 'prop-types'

const UserDisplay = ({ user, onLogout }) => (
  <p>
    {user.username} logged in
    <button onClick={onLogout}>logout</button>
  </p>
)

UserDisplay.propTypes = {
  user: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired
}

export default UserDisplay