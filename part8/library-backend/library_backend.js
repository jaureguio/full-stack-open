const {
  ApolloServer,
  UserInputError,
  AuthenticationError
} = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('./utils/config')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')

;(async () => {
  await mongoose.connect(config.MONGODB_URI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  console.log('Connected to MongoDB database')
  try {
    await Author.initCollection()
    await Book.initCollection()
    // await User.deleteMany({})
  } catch (error) {
    console.log('Unable to initialize the database collection')
    console.dir(error.message)
  }
})()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, connection }) => {
    if(connection) {
      return connection.context
    }
    console.log(req.body.query)
    const auth = req ? req.headers.authorization : null
    if(auth && auth.toLowerCase().startsWith('bearer ')) {
      const token = auth.substring(7)
      const decodedToken = jwt.verify(token, config.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
    if(req.body.query.includes('addBook') || req.body.query.includes('editAuthor')) {
      throw new Error('not authenticated')
    }
  },
  subscriptions: {
    onConnect: (params) => {
      if(params && params.authorization) {
        const token = params.authorization
        const currentUser = jwt.verify(token, config.JWT_SECRET)
        console.log(currentUser)
        return { currentUser }
      }
    }
  },
  formatError: (error) => {
    const errorMessage = error.message.toLowerCase()
    const errorCode = error.extensions.code.toLowerCase()
    if(
      errorMessage.includes('validation failed') ||
      errorCode.includes('validation_failed')
    ) {
      throw new UserInputError('Bad user input')
    } 
    else if(errorMessage.includes('not authenticated')) {
      throw new AuthenticationError('not authenticated')
    }

    console.log('Unhandled ERROR', error)
    return error
  },
  plugins: [{
    requestDidStart(requestContext) {
      console.log('Request started! Query:\n', requestContext.request.query)
    }
  }]
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})