import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './Shelf'
import '../App.css'

class BookList extends React.Component {
  
    state = {
        currentlyReading: true,
        wantToRead: true,
        read: true
    }

    render() {
        const { books, moveShelf } = this.props;
        const shelves = [
            {
                id: 'currentlyReading',
                name: 'Currently Reading'
            },
            {
                id: 'wantToRead',
                name: 'Want to Read'
            },
            {
                id: 'read',
                name: 'Read'
            }
        ]
        console.log(books);
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {shelves.map((shelf) => (
                            <BookShelf
                                key={shelf.id}
                                shelf={shelf}
                                books={books}
                                moveShelf={moveShelf}
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
  moveShelf: PropTypes.func.isRequired
}


export default BookList