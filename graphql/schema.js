const graphql = require('graphql')
const _ = require('lodash')

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull
} = graphql

// dummy data
let books = [
	{ id: '1', name: 'A', genre: 'a', authorId: '2' },
	{ id: '2', name: 'B', genre: 'b', extra: 'haha', authorId: '3' },
	{ id: '3', name: 'C', genre: 'c', authorId: '2' }
]

let authors = [
	{ id: '1', name: 'X', age: '45' },
	{ id: '2', name: 'Y', age: '38', extra: 'haha' },
	{ id: '3', name: 'Z', age: '36' }
]

// schema describes:
// 1. Object Types,
// 2. Relations between Object Types and
// 3. How you reach into the graph

// An Object Type Definition
const Book = new GraphQLObjectType({
	name: 'Book',
	// Reason for using function as value is part of this object is undefied when scanned from top to bottom
	// And this is inevitable for Object with bidirectional relations. Changind the order won't help
	// The solution is wrap it in funcion and let graphql ignore this code inside function
	// Once we use it, let's then call this function and define everything inside of it.
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: Author,
			resolve(parent, args) {
				console.log(parent)
				return authors[parent.authorId - 1]
			}
		}
	})
})

// Aother Object Type Definition
const Author = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLString },
		books: {
			type: new GraphQLList(Book),
			resolve(parent, args) {
				return _.filter(books, { authorId: parent.id })
			}
		}
	})
})

// RootQuery: An entry point for the query (how you initially get into the graph)
const RootQuery = new GraphQLObjectType({
	name: 'RootQuery',
	fields: {
		book: {
			type: Book,
			args: {
				id: { type: GraphQLID }
			},
			resolve(parent, args) {
				// Getting data from db
				return books[args.id - 1]
			}
		},
		books: {
			type: new GraphQLList(Book),
			resolve(parent, args) {
				return books
			}
		},
		author: {
			type: Author,
			args: {
				id: { type: GraphQLID }
			},
			resolve(parent, args) {
				return authors[args.id - 1]
			}
		}
	}
})

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addAuthor: {
			type: Author,
			args: {
				id: { type: GraphQLID },
				name: { type: GraphQLString },
				age: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parent, args) {
				console.log(args)
				return args
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
})
