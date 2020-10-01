import React from 'react'

const BlogDisplay = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
)

export default BlogDisplay