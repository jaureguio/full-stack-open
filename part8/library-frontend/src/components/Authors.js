import React from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

const SET_BIRTHYEAR = gql`
  mutation setBirthyear ($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
    }
  }
`

const Authors = (props) => {
  const results = useQuery(ALL_AUTHORS)
  const [ setBirthyear ] = useMutation(SET_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => console.log(error)
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    const { name, born } = event.target
    const data = { name: name.value, born: Number(born.value) }
    setBirthyear({ variables: data })
    event.target.name.value = ''
    event.target.born.value = null

  }

  if (!props.show)
    return null

  if(results.loading)
    return <p>Loading...</p>

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {results.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {props.token && (
        <div>
          <h3>Set birthyear</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Author</label>
              <select
                id='name'
                defaultValue=''
                required
              >
                <option value=''>--Please select an author--</option>
                {
                  results.data.allAuthors.map(({ name, id }) => (
                    <option key={id} value={name}>{name}</option>
                  ))
                }
              </select>
            </div>
            <div>
              <label htmlFor='born'>born</label>
              <input id='born' type='number'/>
            </div>
            <button>set birthyear</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Authors
