import React, { useState, useEffect } from 'react'
import { useLazyQuery, gql } from '@apollo/client'

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

const Books = (props) => {
  const [booksFilter, setBooksFilter] = useState('')
  const [allBooks, setAllBooks] = useState([])
  const [getBooks, results] = useLazyQuery(ALL_BOOKS)

  const getFilteredBooks = (genreFilter) => {
    getBooks({ variables: { genre: genreFilter } })
  }

  // =D sorry for all this conditional mess
  // All this complicated logic is due to the fact that i'm implementing a unique view to conditionally show either all books, filtered books, or recommended books.
  // A simplification to all this is achieved implementing a different view for the recommendations section
  useEffect(() => {
    console.log('EFFECT 1')
    getFilteredBooks(props.recommended ? props.recommended : booksFilter)
  }, [props.recommended, booksFilter]) // eslint-disable-line

  useEffect(() => {
    console.log('EFFECT 2', results.data)
    if(results?.data && !props.recommended && !booksFilter) {
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
      {props.recommended
        ? (
          <div>
            <h2>recommendations</h2>
            <p>books in your favourite genre <strong>{props.recommended}</strong></p>
          </div>
        )
        : <h2>books</h2>
      }

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
      {props.recommended
        ? null
        : (
          <>
            <button onClick={() => setBooksFilter('')}>all</button>
            {allGenres.map(( genre ) => (
              <button
                key={genre}
                onClick={() => setBooksFilter(genre)}
              >
                {genre}
              </button>
            ))}
          </>
        )}
    </div>
  )
}

export default Books