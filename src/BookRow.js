import React, { Component } from 'react';

class BookRow extends Component {

    render() {
        let book = this.props.book;
        return (
            <tr key={book.id} onClick={() => this.props.toggleBook()}
                className={this.props.selectedBooks.includes(book.id) ? "positive" : null} >
                <td>{book.name}</td>
                <td>{book.author}</td>
            </tr>

        );
    }
}

export default BookRow;