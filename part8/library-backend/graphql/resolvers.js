const { PubSub, UserInputError } = require('apollo-server')
const pubSub = new PubSub()
const jwt = require('jsonwebtoken')
const Author = require('../models/author')
const Book = require('../models/book')
const User = require('../models/user')
const config = require('../utils/config')

const NEW_BOOK = 'NEW_BOOK'

const resolvers = {
  Mutation: {
    addBook: async (_, args) => {
      let bookAuthor = await Author.findOne({ name: args.author})
      if(!bookAuthor) {
        bookAuthor = await Author.create({
          name: args.author
        })
      }
      args.author = bookAuthor.id
      const bookAdded = await Book.create(args)
      const bookAddedWithAuthorData = await bookAdded.populate('author').execPopulate()
      console.log(bookAddedWithAuthorData)
      
      pubSub.publish(NEW_BOOK, { bookAdded: bookAddedWithAuthorData })
      return await Book.findOne({ title: args.title }).populate('author')
    },
    editAuthor: async (_, args) => {
      const author = await Author.findOne( { name: args.name })
      if(!author) return

      author.born = args.setBornTo
      return await author.save()
    },
    createUser: async (_, args) => {
      const newUser = await User.create(args)
      return newUser
    },
    login: async (_, args) => {
      const registeredUser = await User.findOne({ username: args.username })
      
      if(!(registeredUser && args.password === 'securepwd')) {
        throw new UserInputError('Invalid credentias', {
          invalidArgs: args
        })
      }
      
      const userForToken = {
        username: registeredUser.username,
        id: registeredUser._id,
      }

      const token = jwt.sign(userForToken, config.JWT_SECRET)

      return { 
        username: registeredUser.username,
        favGenre: registeredUser.favGenre,
        token 
      }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubSub.asyncIterator(NEW_BOOK)
    }
  },
  Query: {
    me: (_, args, context) => context.currentUser,
    bookCount: async () => await Book.countDocuments({}),
    authorCount: async () => await Author.countDocuments({}),
    allBooks: async (_, args) => {
      if(!(args.author || args.genre)) {
        return await Book.find({}).populate('author')
      }

      const filters = [args.author, args.genre].filter(Boolean)
      const filteredBooks = await Book.find({ genres: { $in: filters } }).populate('author')
      return filteredBooks
    },
    // allAuthors: async () => await Author.find({}),
    allAuthors: async () => await Author.aggregate([
      {
        $lookup: {
          from: 'books',
          foreignField: 'author',
          localField: '_id',
          as: 'bookCount'
        }
      },
      {
        $addFields: {
          bookCount: { $size: '$bookCount'},
        }
      }
    ])
  },
  Author: {
    // bookCount: async (parent) => 
    //   await Book.find({ author: parent.id }).countDocuments({}),
  }
}

module.exports = resolvers