import React, { Component } from 'react';
import './App.css';
import Client from './Client';
import BookList from './BookList';

class App extends Component {

    state  = {
        allBooks : [],
        selectedBooks : [],
    };

    constructor(props) {
        super(props);
        this.loadBooks();
        this.changeSelectedBooks = this.changeSelectedBooks.bind(this);
    }

    loadBooks() {
        Client.books(books => {
            this.setState({
                allBooks: books.slice(0),
            });
        });
    }

    changeSelectedBooks(books) {
        this.setState({
            selectedBooks : books,
        });
    }

    render() {

        return (
            <div className="App">
                <p className="App-intro">
                    OBOB books
                </p>
                <div className="ui text container">
                    <BookList allBooks={this.state.allBooks}
                              selectedBooks={this.state.selectedBooks}
                              changeSelection={this.changeSelectedBooks} />
                </div>
            </div>
        );
    }
}

export default App;
