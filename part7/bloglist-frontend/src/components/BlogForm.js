import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import styled from 'styled-components'
import { Button } from '@material-ui/core'

const CreateButton = styled(Button)`
  && {
    background-color: rgb(151, 240, 240);
    color: black;
    font-size: 0.75rem;
  }
`
const BlogForm = ({ setVisibility }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleBlogSubmit = async (event) => {
    event.preventDefault()

    const blogData = {
      title,
      author,
      url,
    }

    await dispatch( createBlog( blogData ) )
    setVisibility(false)
    // As with the login action, creating a blog happens asynchronously whereas the blog form is hidden and cleared synchronously without waiting the createBlog action to complete
  }

  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={handleBlogSubmit}>
        <div>
          <label htmlFor='title'>title</label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor='author'>author</label>
          <input
            type='text'
            id='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor='url'>url</label>
          <input
            type='text'
            id='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <CreateButton
          size='small'
          color='primary'
          variant='contained'
        >
          create
        </CreateButton>
      </form>
    </div>
  )
}

export default BlogForm