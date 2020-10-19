import React from 'react'
import { useQuery, gql } from '@apollo/client'

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
// const BOOK_ADDED = gql`
//   subscription bookAdded {
//     bookAdded {
//       title
//     }
//   }
// `

const Recommendations = (props) => {
  const { subscribeToMore, ...results } = useQuery(ALL_BOOKS, {
    variables: {
      genre: props.recommended
    }
  })

  if (!props.show)
    return null

  if(!results.data || results.loading)
    return <p>Loading...</p>

  return (
    <div>
      <div>
        <h2>recommendations</h2>
        <p>books in your favourite genre <strong>{props.recommended}</strong></p>
      </div>
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
    </div>
  )
}

export default Recommendations