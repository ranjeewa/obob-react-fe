import React, { Component } from 'react';
import './App.css';
import Client from './Client';
import BookList from './BookList';

class App extends Component {

    state  = {
        allBooks : [],
    };

    constructor(props) {
        super(props);
        this.loadBooks();
    }

    loadBooks() {
        Client.books(books => {
            this.setState({
                allBooks: books.slice(0)
            });
        });
    }

    render() {


        return (
            <div className="App">
                <p className="App-intro">
                    OBOB books
                </p>
                <div className="ui text container">
                    <BookList allBooks={this.state.allBooks} />
                </div>
            </div>
        );
    }
}

export default App;
