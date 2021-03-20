import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Search from './components/Search'
import BookList from './components/BookList'
import sortBy from 'sort-by'
import './App.css'

class App extends React.Component {
  state = {
    books: []
  }
  componentDidMount() {
    // Initialize state with books from the endpoint when the component is mounted
    this.loadBooks()
  }

  loadBooks() {
    BooksAPI.getAll().then(books => {
      books.sort(sortBy('title'))
      this.setState({ books })
    })
  }

  // A function that organizes books in appropriate shelf
  changeShelf = (book, shelf, allBooks) => {
    BooksAPI.update(book, shelf).then(() => {
      const booksData = allBooks;
      const index = booksData.indexOf(book);
      booksData[index].shelf = shelf;
      this.setState({ books: booksData })
      this.loadBooks()
    })
  }


  assignToShelf = (booksFromQuerry) => {
    booksFromQuerry.forEach(book => {
      this.state.books.forEach(bookFromState => {
        if (book.id === bookFromState.id) {
          book.shelf = bookFromState.shelf;
        } else if (!book.shelf) {
          book.shelf = 'none'
        }
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookList
            changeShelf={this.changeShelf}
            books={this.state.books}
          />
        )} />
        <Route path="/search" render={({ location }) => (
          <Search
            assignToShelf={this.assignToShelf}
            changeShelf={this.changeShelf}
          />
        )} />
      </div>
    )
  }
}

export default App
