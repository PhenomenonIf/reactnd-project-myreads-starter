import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import Book from './Book'
import '../App.css'

class Search extends React.Component {
  
  state = {
    results: [],
    error: false
  }

  handleQuery(query) {
    this.setState({ error: false })
    // Run search if no empty string, otherwise clear results to prevent errors
    if (query.replace(/\s/g, "") !== "") {
      const searchQuery = query.trim();
      BooksAPI.search(searchQuery).then(result => {
        // Set book shelves if no error, otherwise clear results and set error state
        if (!result.error) {
          this.props.checkShelf(result)
          result.sort(sortBy('title'))
          this.setState({ results: result })
        } else {
          this.setState({ results: [] })
          this.setState({ error: true })
        }
      })
    } else {
      this.setState({ results: [] })
    }
  }

  clearResults(val) {
    // Clear results if search field is empty
    // Prevents issue when backspace is held down to clear query
    if (val === "") {
      this.setState({ results: [] })
    }
  }

  render() {
    const results = this.state.results;
    const { checkShelf, moveShelf } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author"
                         id="search-input" onChange={(e) => this.handleQuery(e.target.value)} 
                        onKeyDown={(e) => this.clearResults(e.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          {this.state.error && (
            <div className="no-results">
              <p>No match found.</p>
            </div>
          )}
          <ol className="books-grid">
            {results.map((result) => (
              <Book
                key={result.id}
                book={result}
                books={results}
                moveShelf={moveShelf}
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

Search.propTypes = {
  checkShelf: PropTypes.func.isRequired,
  moveShelf: PropTypes.func.isRequired
}

export default Search