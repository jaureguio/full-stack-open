import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'

const BlogDisplay = ({ blog, publisher }) => {
  const dispatch = useDispatch()
  const [visibility, setVisibility] = useState( false )

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogComplete = () => (
    <div data-testid='blog-complete'>
      { blog.url } <br/>
      <span>
        { blog.likes } <button onClick={() => handleUpdate({ likes: blog.likes + 1 })}>like</button><br/>
      </span>
      { blog.user.name } <br/>
      { publisher === blog.user.username &&
        <button
          style={{
            backgroundColor: 'red',
          }}
          onClick={() => handleDelete(blog.id)}>delete</button>
      }
    </div>
  )

  const handleUpdate = async ( updates ) => {
    dispatch(updateBlog({
      ...blog,
      ...updates
    }))
  }

  const handleDelete = ( blogId ) => {
    const isConfirmed = window.confirm(`Removing "${blog.title}" by ${blog.author}`)
    if(!isConfirmed) return
    dispatch(deleteBlog( blogId ))
  }

  return (
    <div style={ blogStyle }>
      { blog.title } by { blog.author }
      <button onClick={ () => setVisibility(!visibility) }>{ visibility ? 'hide' : 'show' }</button><br/>
      { visibility && blogComplete() }
    </div>
  )
}

export default BlogDisplay