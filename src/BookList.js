import React, { Component } from 'react';

import BookRow from './BookRow';

class BookList extends Component {

    state = {
      selectedBooks : [],
    };

    toggleBook(id) {
        let newBooks;
        if (this.state.selectedBooks.includes(id))
            newBooks = this.state.selectedBooks.filter(book => book !== id);
        else
            newBooks = this.state.selectedBooks.concat(id);
        this.setState({
            selectedBooks: newBooks,
        });
    }

    loadQuestions() {
        this.props.changeSelection(this.state.selectedBooks);
    }

    clearSelections() {
        this.setState({
            selectedBooks : [],
        });
    }

    selectAllBooks() {
        this.setState({
            selectedBooks : this.props.allBooks.map((book, idx) => {
                return book.id
            }),
        });
    }

    render() {

        const bookRows = this.props.allBooks.map((book, idx) => (
            <BookRow key={idx}
                     book={book}
                     selectedBooks={this.state.selectedBooks}
                     toggleBook={() => this.toggleBook(book.id)} />
        ));

        return (
            <div id="book-list">
                <div className="Button-row">
                    <button className="ui button" onClick={() => this.selectAllBooks()}>
                        Select All
                    </button>
                    <button className="ui primary button" onClick={() => this.loadQuestions()}>
                        Load Questions
                    </button>
                    <button className="ui button" onClick={() => this.clearSelections()}>
                        Clear Selection
                    </button>
                </div>
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