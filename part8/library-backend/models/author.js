const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

let authors = [
  {
    name: 'Robert Martin',
    // id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    // id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    // id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    // id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    // id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
  }
]

const authorSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true,
  },
  born: Number,
  bookCount: Number,
})

authorSchema.plugin(uniqueValidator)

authorSchema.static({
  async resetCollection() {
    await Author.deleteMany({})
  },
  async initCollection(initAuthors = authors) {
    await Author.resetCollection()
    return await Author.insertMany(initAuthors)
  },
})

const Author = mongoose.model('Author', authorSchema)

module.exports = Author