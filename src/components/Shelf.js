import React from 'react'
import Book from './Book'
import '../App.css'

class Shelf extends React.Component {
    hideBookShelf(e) {
        // Hide books and change font of button
        const currentShelf = e.target.parentElement.nextElementSibling;
        const inputText = e.target;
        currentShelf.classList.toggle('hide-shelf');
        inputText.classList.toggle('depressed');
    }
    render() {
        const { books, shelf, changeShelf } = this.props;
        return (
            <div className="bookshelf" key={shelf.id}>
                <h2 className="bookshelf-title"><button className="bookshelf-button" onClick={(e) => this.hideBookShelf(e)}>{shelf.name}</button></h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.filter(book => book.shelf === shelf.name).map((book) => (
                            <Book
                                key={book.id}
                                book={book}
                                books={books}
                                changeShelf={changeShelf}
                            />
                        ))}
                    </ol>
                </div>
            </div>
        )
    }

}

export default Shelf