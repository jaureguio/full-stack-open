import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { getAllBlogs } from '../reducers/blogReducer'

import BlogDisplay from './BlogDisplay'
import AllBlogs from './AllBlogs'

const Blogs = () => {
  const match = useRouteMatch('/blogs/:id')
  const blogs  = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllBlogs())
  }, [dispatch]) // Unnecessary dependency

  if(!blogs.length) return <p>Loading blogs...</p>

  const blogToDisplay = match
    ? blogs.find(( blog ) => blog.id === match.params.id)
    : null

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
    }}>
      <Switch>
        <Route path='/blogs/:id'>
          <BlogDisplay blog={blogToDisplay} />
        </Route>
        <Route path='/blogs'>
          <AllBlogs blogs={blogs} />
        </Route>
      </Switch>
    </div>
  )
}

export default Blogs