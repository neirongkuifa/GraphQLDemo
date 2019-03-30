class Book {
	constructor(id, name, genre, author) {
		this.id = id
		this.name = name
		this.genre = genre
		this.author = author
	}
}

class Author {
	constructor(id, name, age) {
		this.id = id
		this.name = name
		this.age = age
	}

	books() {
		return [
			{ id: 1, name: 'book test', genere: 'Fiction', author: 'Abel' },
			{ id: 2, name: 'book test', genere: 'Fiction', author: 'Atwood' }
		]
	}
}

const author = new Author(1, 'abel', '25')

module.exports = {
	book: args => ({
		id: 1,
		name: 'book test',
		genere: 'Fiction',
		author: 'Abel'
	}),
	author: args => author,
	books: () => {
		return [
			{ id: 1, name: 'book test', genere: 'Fiction', author: 'Abel' },
			{ id: 2, name: 'book test', genere: 'Fiction', author: 'Atwood' }
		]
	},
	addBook: () => {
		console.log('Adding a Book')
		return { name: 'Sucess' }
	}
}
