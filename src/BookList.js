import React, { Component } from 'react';

import BookRow from './BookRow';

class BookList extends Component {

    toggleBook(id) {
        let newBooks;
        if (this.props.selectedBooks.includes(id))
            newBooks = this.props.selectedBooks.filter(book => book !== id);
        else
            newBooks = this.props.selectedBooks.concat(id);
        this.props.changeSelection(newBooks);
    }


    render() {

        const bookRows = this.props.allBooks.map((book, idx) => (
            <BookRow key={idx}
                     book={book}
                     selectedBooks={this.props.selectedBooks}
                     toggleBook={() => this.toggleBook(book.id)} />
        ));

        return (
            <div id="book-list">
                <table className="ui selectable structured large table">
                    <thead>
                    <tr>
                        <th className="one wide">Name</th>
                        <th className="one wide">Author</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bookRows}
                    </tbody>
                </table>
            </div>
        );
    }

}

export default BookList;