import React from 'react'
import '../App.css'

class Book extends React.Component {
    render() {
        const { book, books, changeShelf } = this.props;
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        {book.imageLinks && (
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail}` }}></div>
                       )}
                        <div className="book-shelf-changer">
                            <select value={book.shelf} onChange={(event) => changeShelf(book, event.target.value, books)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    {book.authors && (
                        <div className="book-authors">{book.authors}</div>
                    )}
                </div>
            </li>
        )
    }
}

export default Book