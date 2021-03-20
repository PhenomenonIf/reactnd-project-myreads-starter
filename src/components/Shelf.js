import React from 'react'
import Book from './Book'
import '../App.css'

class Shelf extends React.Component {
    hideShelf(e) {
        // Hide books and change font of button
        const thisShelf = e.target.parentElement.nextElementSibling;
        const thisText = e.target;
        thisShelf.classList.toggle('hide-shelf');
        thisText.classList.toggle('depressed');
    }
    render() {
        const { books, shelf, moveShelf } = this.props;
        return (
            <div className="bookshelf" key={shelf.id}>
                <h2 className="bookshelf-title"><button className="bookshelf-button" onClick={(e) => this.hideShelf(e)}>{shelf.name}</button></h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.filter(book => book.shelf === shelf.id).map((book) => (
                            <Book
                                key={book.id}
                                book={book}
                                books={books}
                                moveShelf={moveShelf}
                            />
                        ))}
                    </ol>
                </div>
            </div>
        )
    }

}

export default Shelf