const { buildSchema } = require('graphql')

module.exports = buildSchema(`
    type Book{
        id: ID!
        name: String!
        genre: String!
        author: Author
    }

    type Author{
        id: ID!
        name: String!
        age: Int!
        books:[Book]
    }

    type Query{
        book(id: ID!): Book
        books: [Book]
        author(id: ID!): Author
        authors: [Author]
    }

    type Mutation{
        addBook(id: ID!, name: String!, genre: String!): Book
    }
`)
