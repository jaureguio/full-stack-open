const { gql } = require('apollo-server')

const typeDefs = gql`
  type User {
    username: String!
    name: String!
    favGenre: String
    id: ID!
  }

  type LoggedUser {
    username: String!
    favGenre: String
    token: String!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }

  type Query {
    me: User
    bookCount: Int
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(
      username: String!,
      name: String!,
      favGenre: String
    ): User
    login(username: String!, password: String!): LoggedUser
  }

  type Subscription {
    bookAdded: Book!
  }
`

module.exports = typeDefs