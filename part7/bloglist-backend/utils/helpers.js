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

const getTokenFromHeader = (request) => {
  const authHeader = request.get('authorization')
  if(authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }
  return null
}

// const copyObj = (obj) => {
//   const newObj = {}
//   for(let prop in obj) {
//     newObj[prop] = obj[prop]
//   }
//   return newObj
// }

// const deepEquality = (arr, copy = []) => {
//   if(arr.length === 0) return copy

//   const [item, ...rest] = arr

//   if(Array.isArray(item)) return deepEquality(item, copy)

//   if(item && typeof item === 'object') {
//     copy.push(copyObj(item))
//   }
//   return
// }

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  getTokenFromHeader,
}