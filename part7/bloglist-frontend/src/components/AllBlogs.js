import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import BlogForm from './BlogForm'
import Togglable from './Togglable'

const BlogsContainer = styled.div`
  background-color: rgb(233,255,230);
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  padding: 5px 0;
`

const AllBlogs = ({ blogs }) => {
  const sortedBlogs = [...blogs].sort(( blogA, blogB ) => blogB.likes - blogA.likes )

  return (
    <BlogsContainer>
      <Togglable buttonText='New note'>
        {({ setVisibility }) => (
          <BlogForm
            setVisibility={setVisibility}
          />
        )}
      </Togglable>
      {sortedBlogs.map(( blog ) =>
        <div key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title}
          </Link>
        </div>
      )}
    </BlogsContainer>
  )
}

export default AllBlogs