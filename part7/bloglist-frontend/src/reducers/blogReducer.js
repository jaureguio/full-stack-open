import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

const blogActions = {
  GET_ALL_BLOGS: 'GET_ALL_BLOGS',
  CREATE_BLOG: 'CREATE_BLOG',
  UPDATE_BLOG: 'UPDATE_BLOG',
  DELETE_BLOG: 'DELETE_BLOG',
  COMMENT_BLOG: 'COMMENT_BLOG',
}

const blogReducer = (state = [], action) => {
  switch (action.type) {

    case blogActions.GET_ALL_BLOGS:
      return action.data.blogs

    case blogActions.CREATE_BLOG:
      return [ ...state, action.data.newBlog ]

    case blogActions.UPDATE_BLOG:
    case blogActions.COMMENT_BLOG: {
      const updatedBlogs = state.map((blog) => {
        if(action.data.updatedBlog.id !== blog.id) return blog
        return action.data.updatedBlog
      })
      return updatedBlogs
    }

    case blogActions.DELETE_BLOG:
      return state.filter(({ id }) => action.data.blogId !== id)

    default:
      return state
  }
}


/**
 *
 * ACTION CREATORS
 *
 */

export const getAllBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll()
  dispatch({
    type: blogActions.GET_ALL_BLOGS,
    data: { blogs }
  })
}

export const createBlog = ( blogData ) => async ( dispatch ) => {
  const newBlog = await blogService.createOne( blogData )

  dispatch({
    type: blogActions.CREATE_BLOG,
    data: { newBlog }
  })
  dispatch(showNotification({ message: `successfully created ${newBlog.title}` }))
}

export const updateBlog = ( blogWithUpdates ) => async ( dispatch ) => {
  const updatedBlog = await blogService.updateOne( blogWithUpdates )
  dispatch({
    type: blogActions.UPDATE_BLOG,
    data: { updatedBlog }
  })
  dispatch(showNotification({ message: 'Blog successfully updated' }))
}

export const deleteBlog = ( blogId ) => async ( dispatch ) => {
  await blogService
    .deleteOne( blogId )

  dispatch({
    type: blogActions.DELETE_BLOG,
    data: { blogId }
  })
  dispatch(showNotification({ message: 'Blog successfully deleted' }))
}

export const commentBlog = ( blogId, comment ) => async ( dispatch ) => {
  const updatedBlog = await blogService.commentOne( blogId, comment )
  dispatch({
    type: blogActions.COMMENT_BLOG,
    data: { updatedBlog }
  })
  dispatch(showNotification({ message: 'Comment succesfully added' }))
}

export default blogReducer