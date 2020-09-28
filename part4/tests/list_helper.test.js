const utils = require('../utils')

const { listHelper } = utils
const {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
} = listHelper

const emptyBlogList = []

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]
const listWithMultipleBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 25,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 37,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 25,
    __v: 0
  },
  {
    _id: '5f714a441c8fedeafc498f8e',
    title: 'Sports Statistics Apps',
    author: 'Oscar Jauregui',
    url: 'https://oscarincredibleapps.com/',
    likes: 27,
    __v: 0
  }
]

test('dummy returns one', () => {
  expect(dummy(emptyBlogList)).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(totalLikes(emptyBlogList)).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    expect(totalLikes(listWithOneBlog)).toBe(5)
  })

  test('of a bigger list calculated right', () => {
    expect(totalLikes(listWithMultipleBlogs)).toBe(126)
  })
})

describe('favorite blog', () => {
  const newList = [...listWithMultipleBlogs]

  test('of the most likes to be 37', () => {
    expect(favoriteBlog(newList).likes).toBe(37)
  })

  test('when the list contains multiple most liked blogs, it returns only the first found', () => {
    newList.push({
      title: 'Blog of the People',
      author: 'Oscar Jauregui',
      likes: 37
    })
    expect(favoriteBlog(newList).title).toBe('First class tests')
  })
})

describe('author with most blogs', () => {
  const newList = [...listWithMultipleBlogs]

  newList.push(
    {
      title: 'Blog of the People',
      author: 'Oscar Jauregui',
      likes: 37
    },
    {
      title: 'The most liked blog',
      author: 'Oscar Jauregui',
      likes: 45
    }
  )
  test('when multiple top bloggers found, return the first found', () => {
    expect(mostBlogs(newList)).toEqual({ author: 'Robert C. Martin', blogs: 3 })
  })
})

describe('most liked author', () => {
  test('of the author whose blogs have the largest amount of likes in total', () => {
    expect(mostLikes(listWithMultipleBlogs)).toEqual({ author: 'Robert C. Martin', likes: 62 })
  })
})