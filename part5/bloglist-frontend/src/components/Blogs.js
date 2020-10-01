import React, { useState, useEffect } from 'react'
import BlogForm from './BlogForm'
import BlogDisplay from './BlogDisplay'
import blogService from '../services/blogs'


const Blogs = ({ user, notify }) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const addBlog = async (blogData) => {
    const newBlog = await blogService
      .createOne(blogData, user.token)

    setBlogs([
      ...blogs,
      newBlog
    ])
    notify(`a new blog, '${newBlog.title}' by ${newBlog.author}, was added`)
  }
  
  return (
    <>
      <h2>blogs</h2>
      <BlogForm 
        addBlog={addBlog}
      />
      {blogs.map(blog =>
        <BlogDisplay 
          key={blog.id} 
          blog={blog} 
        />
      )}
    </>
  )
}

export default Blogs