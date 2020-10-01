import React, { useState } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import UserDisplay from './components/UserDisplay'
import Blogs from './components/Blogs'
import loginService from './services/login'

const App = () => {
  const [user, setUser] = useState(() => JSON.parse(window.localStorage.getItem('bloglist-user')))
  const [notification, setNotification] = useState('')

  const notify = (content, type = 'success') => {
    setNotification({ content, type })
    setTimeout(() => {
      setNotification('')
    }, 3000)
  }
  
  const login = async (credentials) => {
    const { username, password } = credentials

    const response = await loginService
      .login({ username, password })
    
    if(!response.error) {
      setUser(response)
      notify(`Welcome ${response.name.split(' ')[0]}`)
      window.localStorage.setItem('bloglist-user', JSON.stringify(response))
    } else {
      notify(`Incorrect username or password`, 'error')
    }    
  }

  const logout = () => {
    window.localStorage.removeItem('bloglist-user')
    setUser(null)
  }

  return (
    <div>
      <Notification notification={notification} />
      {user === null
        ? <LoginForm onLogin={login}/>
        : (
          <div>
            <UserDisplay user={user} onLogout={logout} />
            <Blogs user={user} notify={notify} />
          </div>
        )
      }
    </div>
  )
}

export default App