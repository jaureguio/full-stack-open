import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client'

export const ALL_BOOKS = gql`
  query {
    allBooks {
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
  const results = useQuery(ALL_BOOKS)

  if (!props.show)
    return null

  if(results.loading)
    return <p>Loading...</p>

  const books = results.data.allBooks
  const allGenres = books.reduce((genresList, book) => {
    book.genres.forEach(( genre ) =>
      genresList.includes(genre) || genresList.push(genre)
    )
    return genresList
  }, [])

  const filteredBooks = props.recommended || booksFilter
    ? books.filter(( book ) => book.genres.includes(props.recommended ? props.recommended : booksFilter))
    : books

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
          {filteredBooks.map(a =>
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
        : allGenres.map(( genre ) => (
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