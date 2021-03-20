import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Shelf from './Shelf'
import '../App.css'

class BookList extends React.Component {


    render() {
        const { books, changeShelf } = this.props;
        const shelves = [
            {
                id: 1,
                name: 'currentlyReading'
            },
            {
                id: 2,
                name: 'wantToRead'
            },
            {
                id: 3,
                name: 'read'
            }
        ]
        
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {shelves.map((shelf) => (
                            <Shelf
                                key={shelf.id}
                                shelf={shelf}
                                books={books}
                                changeShelf={changeShelf}
                            />
                        ))}
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Search</Link>
                </div>
            </div>
        )
    }
}

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired
}


export default BookList