const dummy = (_) => 1

const totalLikes = (blogs) =>
  blogs.reduce((total, { likes }) => total + likes, 0)

const favoriteBlog = (blogs) => {
  return blogs.reduce((fav, nextBlog) => {
    const { title, author, likes } = nextBlog
    if(nextBlog.likes > fav.likes) {
      return {
        title,
        author,
        likes
      }
    }
    return fav
  }, {
    title: '',
    author: '',
    likes: 0
  })
}

const mostBlogs = (blogs) => {
  const blogCounter = blogs.reduce((blogCounter, { author }) => {
    if(author in blogCounter) {
      blogCounter[author] += 1
    } else {
      blogCounter[author] = 1
    }
    return blogCounter
  }, {})

  return Object.entries(blogCounter)
    .reduce((topBlogger, [author, blogs]) => {
      if(blogs > topBlogger.blogs) {
        return { author, blogs }
      }
      return topBlogger
    }, { author: '', blogs: 0 })
}

const mostLikes = (blogs) => {
  const likesCounter = blogs.reduce((likesCounter, { author, likes }) => {
    if(author in likesCounter) {
      likesCounter[author] += likes
    } else {
      likesCounter[author] = likes
    }
    return likesCounter
  }, {})

  return Object.entries(likesCounter)
    .reduce((topBlogger, [author, likes]) => {
      if(likes > topBlogger.likes) {
        return { author, likes }
      }
      return topBlogger
    }, { author: '', likes: 0 })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}