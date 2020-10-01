import React from 'react'

const UserDisplay = ({ user, onLogout }) => (
  <p>
  {user.username} logged in 
  <button onClick={onLogout}>logout</button>
  </p>
)

export default UserDisplay