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
    // Get books on mounting
    this.getBooks()
  }

  getBooks() {
    BooksAPI.getAll().then(books => {
      books.sort(sortBy('title'))
      this.setState({ books })
    })
  }
  moveShelf = (book, shelf, allBooks) => {
    BooksAPI.update(book, shelf).then(() => {
      // Set shelf then update state, and finally get books
      const newBooksData = allBooks;
      const bookIndex = newBooksData.indexOf(book);
      newBooksData[bookIndex].shelf = shelf;
      this.setState({ books: newBooksData })
      this.getBooks()
    })
  }

  checkShelf = (bookResults) => {
    //Check and update shelves on search
    bookResults.forEach(thisBook => {
      this.state.books.forEach(storedBook => {
        if (thisBook.id === storedBook.id) {
          thisBook.shelf = storedBook.shelf;
        } else if (!thisBook.shelf) {
          thisBook.shelf = 'none'
        }
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookList
            moveShelf={this.moveShelf}
            books={this.state.books}
          />
        )} />
        <Route path="/search" render={({ location }) => (
          <Search
            checkShelf={this.checkShelf}
            moveShelf={this.moveShelf}
          />
        )} />
      </div>
    )
  }
}

export default App
