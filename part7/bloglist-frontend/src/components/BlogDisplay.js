import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import styled from 'styled-components'
import Comments from './Comments'

const BlogsContainer = styled.div`
  background-color: rgb(233,255,230);
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: ce;
  border-radius: 8px;
  padding: 5px 0;
`

const BlogDisplay = ({ blog }) => {
  const { authUser } = useSelector( state => state.authUser )
  const dispatch = useDispatch()
  const history = useHistory()

  const handleUpdate = ( updates ) => {
    const blogWithUpdates = { ...blog, ...updates }
    dispatch(updateBlog(blogWithUpdates))
  }

  const handleDelete = async ( blogId ) => {
    const isConfirmed = window.confirm(`Removing "${blog.title}" by ${blog.author}`)
    if(!isConfirmed) return
    await dispatch(deleteBlog( blogId ))
    history.push('/blogs')
  }

  if(!blog) return <p>Try again</p>

  return (
    <BlogsContainer>
      <h3>{blog.title}</h3>
      <a href={`${blog.url}`}>{ blog.url }</a><br/>
      <span>
        { blog.likes } likes
        <button onClick={() => handleUpdate({ likes: blog.likes + 1 })}>like</button><br/>
      </span>
      added by { blog.user.name } <br/>
      { authUser.username === blog.user.username &&
        <button
          style={{
            backgroundColor: 'red',
          }}
          onClick={() => handleDelete(blog.id)}>delete</button>
      }
      <Comments
        comments={blog.comments}
        blogId={blog.id}
      />
    </BlogsContainer>
  )
}

export default BlogDisplay