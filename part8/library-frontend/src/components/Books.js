import React, { useState, useEffect } from 'react'
import { useLazyQuery, useSubscription, gql } from '@apollo/client'

export const ALL_BOOKS = gql`
  query filteredBooks (
    $author: String,
    $genre: String
  ) {
    allBooks (
      author: $author,
      genre: $genre
    ) {
      id
      title
      author {
        name
      }
      published
      genres
    }
  }
`
const BOOKS_SUBSCRIPTION = gql`
  subscription onBookAdded {
    bookAdded {
      id
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const updateBookCache = (client, newBook, variable) => {
  let query
  try {
    query = client.readQuery({
      query: ALL_BOOKS,
      variables: { genre: variable }
    })

    const isBookInCacheAlready = query.allBooks.find((book) => book.id === newBook.id)
    if(isBookInCacheAlready) return
  } catch (error) {
    console.log('No query in cache matching the one specified', variable)
    return
  }
  const { allBooks } = query
  client.writeQuery({
    query: ALL_BOOKS,
    variables: { genre: variable },
    data: {
      allBooks: allBooks.concat(newBook)
    }
  })
}

const Books = (props) => {
  const [booksFilter, setBooksFilter] = useState('')
  const [allBooks, setAllBooks] = useState([])
  const [newBook, setNewBook] = useState('')
  const [getBooks, results] = useLazyQuery(ALL_BOOKS)

  useSubscription(BOOKS_SUBSCRIPTION, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      // console.log('SUBSCRIPTION')
      const { bookAdded } = subscriptionData.data
      setNewBook(bookAdded.title)
      setTimeout(() => {
        setNewBook('')
      }, 5000);

      ['', ...bookAdded.genres].forEach(( filter ) => updateBookCache(client, bookAdded, filter))
      // updateBookCache(client, '', bookAdded)
      // updateBookCache(client, bookAdded.genres[0], bookAdded)
    }
  })

  const getFilteredBooks = (genreFilter) => {
    getBooks({ variables: { genre: genreFilter } })
  }

  useEffect(() => {
    getFilteredBooks(booksFilter)
  }, [booksFilter]) // eslint-disable-line

  useEffect(() => {
    if(results.data && !booksFilter) {
      setAllBooks(results.data.allBooks)
    }
  }, [results.data]) // eslint-disable-line

  if (!props.show)
    return null

  if(!results.data || results.loading)
    return <p>Loading...</p>

  const allGenres = allBooks.reduce((genresList, book) => {
    book.genres.forEach(( genre ) =>
      genresList.includes(genre) || genresList.push(genre)
    )
    return genresList
  }, [])

  return (
    <div>
      <h2>books</h2>

      {newBook && <p>New book added: {newBook}</p>}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {results.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={() => setBooksFilter('')}>all</button>
      {allGenres.map(( genre ) => (
        <button
          key={genre}
          onClick={() => setBooksFilter(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  )
}

export default Books