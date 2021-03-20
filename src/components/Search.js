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

  // A function to search for books based on input parameter
  handleSearch(query) {
    this.setState({ error: false })
    if (query.replace(/\s/g, "") !== "") {
      const input = query.trim();
      BooksAPI.search(input).then(result => {
        if (!result.error) {
          this.props.assignToShelf(result)
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

  clear(val) {
    // This function ensures that the search result page is cleared when there is no text in the search box
    if (val === "") {
      this.setState({ results: [] })
    }
  }

  render() {
    const results = this.state.results;
    const { assignToShelf, changeShelf } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author"
                         id="search-input" onChange={(e) => this.handleSearch(e.target.value)} 
                        onKeyDown={(e) => this.clear(e.target.value)} />
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
                changeShelf={changeShelf}
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

Search.propTypes = {
  assignToShelf: PropTypes.func.isRequired,
  changeShelf: PropTypes.func.isRequired
}

export default Search