import React, { useState } from 'react'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendations from './components/Recommendations'

const App = () => {
  const [page, setPage] = useState('books')
  const [loggedUser, setLoggedUser] = useState(() =>
    JSON.parse(window.localStorage.getItem('library-userInfo')))
  const [recommended, setRecommended] = useState('')

  const onLogout = () => {
    window.localStorage.removeItem('library-userInfo')
    setLoggedUser(null)
    setPage('books')
    setRecommended('')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => {
          setPage('books')
          setRecommended('')
        }}>
          books
        </button>
        {loggedUser ? (
          <span>
            <button onClick={() => {
              setPage('recommended')
              setRecommended(loggedUser.favGenre)
            }}>
              recommended
            </button>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={onLogout}>logout</button>
          </span>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Authors
        show={page === 'authors'}
        token={loggedUser?.token}
      />

      <Books
        show={page === 'books'}
      />

      <Recommendations
        show={page === 'recommended'}
        recommended={recommended}
      />

      <NewBook
        show={page === 'add'}
      />

      <Login
        show={page === 'login'}
        setPage={setPage}
        setLoggedUser={setLoggedUser}
      />

    </div>
  )
}

export default App