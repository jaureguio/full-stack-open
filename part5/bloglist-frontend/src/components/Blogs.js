import React, { useState, useEffect } from 'react'
import BlogForm from './BlogForm'
import BlogDisplay from './BlogDisplay'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const Blogs = ({ user, notify }) => {
  const [ blogs, setBlogs ] = useState([])

  useEffect(() => {
    blogService.setToken( user.token )
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [ user.token ])


  const addBlog = async ( blogData ) => {
    const newBlog = await blogService
      .createOne( blogData )

    setBlogs([ ...blogs, newBlog ])
    notify( `a new blog, '${ newBlog.title }' by ${ newBlog.author }, was added` )
  }

  const updateBlog = async ( newData ) => {
    const newBlog = await blogService
      .updateOne( newData )

    const updatedBlogs = blogs.map(( blog ) => {
      if( blog.id !== newBlog.id ) return blog
      return newBlog
    })
    setBlogs( updatedBlogs )
    notify( 'Blog updated successfully' )
  }

  const deleteBlog = async ( blogId ) => {
    await blogService
      .deleteOne( blogId )

    const updatedBlogs = blogs.filter(({ id }) => blogId !== id)
    setBlogs( updatedBlogs )
    notify( 'Blog deleted successfully' )
  }

  const sortedBlogs = [...blogs].sort(( blogA, blogB ) => blogB.likes - blogA.likes )

  return (
    <>
      <h2>blogs</h2>
      <Togglable buttonText='New note'>
        {({ setVisibility }) => (
          <BlogForm
            setVisibility={setVisibility}
            addBlog={ addBlog }
          />
        )}
      </Togglable>
      {sortedBlogs.map((blog, idx) =>
        <BlogDisplay
          key={ blog.id }
          idx={idx}
          blog={ blog }
          publisher={ user.username }
          updateBlog={ updateBlog }
          deleteBlog={ deleteBlog }
        />
      )}
    </>
  )
}

export default Blogs