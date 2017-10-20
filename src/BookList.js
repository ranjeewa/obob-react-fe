import React, { Component } from 'react';

class BookList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedBooks : [],
        }
    }

    toggleBook(id) {
        let newBooks;
        if (this.state.selectedBooks.includes(id))
            newBooks = this.state.selectedBooks.filter(book => book !== id);
        else
            newBooks = this.state.selectedBooks.concat(id);
        this.setState({selectedBooks: newBooks});
    }

    render() {

        const bookRows = this.props.allBooks.map((book, idx) => (
            <tr key={book.id} onClick={() => this.toggleBook(book.id)}
                className={this.state.selectedBooks.includes(book.id) ? "positive" : null} >
                <td>{book.name}</td>
                <td>{book.author}</td>
            </tr>
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