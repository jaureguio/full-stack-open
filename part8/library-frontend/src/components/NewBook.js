import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { ALL_BOOKS } from './Books'
import { ALL_AUTHORS } from './Authors'

const NEW_BOOK = gql`
  mutation newBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
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

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ createBook ] = useMutation(NEW_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS, variables: { genre: '' } }],
    update: (cache, { data: { addBook } }) => {
      // This will update the cache for the query with the genre filter of the first element in the genres array from component state
      // To update the cache for every query corresponding to each genre in the new book, the code below should be repeated for each of its genre
      const { allBooks: prevBooks } = cache.readQuery({
        query: ALL_BOOKS,
        variables: { genre: genres[0] }
      })
      cache.writeQuery({
        query: ALL_BOOKS,
        variables: { genre: genres[0] },
        data: {
          allBooks: prevBooks.concat(addBook)
        }
      })
    },
    onError: (error) => console.log(error)
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    const data = { title, author, genres, published: Number(published) }
    createBook({ variables: data })

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook