import React from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'

const Comments = ({ blogId, comments }) => {
  const dispatch = useDispatch()

  const handleSubmit = async ( event ) => {
    event.persist()
    event.preventDefault()
    const newComment = event.target.comment.value

    await dispatch(commentBlog( blogId, newComment ))
    event.target.comment.value = ''
  }

  return (
    <div>
      <h4>comments</h4>
      <form onSubmit={handleSubmit}>
        <input name='comment' type="text"/>
        <button>add comment</button>
      </form>
      <ul>
        {comments.map(( comment, idx ) => (
          <li key={`${comment}${idx}`}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comments