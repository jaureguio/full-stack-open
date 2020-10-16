const mongoose = require('mongoose')
const Author = require('./author')
const uniqueValidator = require('mongoose-unique-validator')

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    // id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    // id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    // id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    // id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    // id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    // id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    // id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'revolution']
  },
]

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    required: true,
    unique: true,
  },
  published: {
    type: Number,
    required: true,
  },
  genres: [{
    type: String,
    required: true,
  }],
  author: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }
})

bookSchema.plugin(uniqueValidator)

bookSchema.static({
  async resetCollection () {
    await Book.deleteMany({})
  },
  async initCollection (initBooks = books) {
    await Book.resetCollection()
    for(book of initBooks) {
      const { _id: authorId } = await Author.findOne({ name: book.author })
      book.author = authorId
      const newBook = new Book(book)
      await newBook.save()
    }
  },
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book
