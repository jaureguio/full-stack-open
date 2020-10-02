import React, { useState } from 'react'

const BlogForm = ({ setVisibility, addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const handleBlogSubmit = async (event) => {
    event.preventDefault()

    const blogData = {
      title,
      author,
      url,
    }
    
    await addBlog(blogData)
    setVisibility(false)
  }

  return (
    <>
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
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default BlogForm