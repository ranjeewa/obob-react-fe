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
    }

    loadBooks() {
        Client.books(books => {
            this.setState({
                allBooks: books.slice(0),
            });
        });
    }

    changeSelectedBooks = (books) => {
        this.setState({
            selectedBooks : books,
        });
    }

    loadQuestions() {
        console.log(this.state.selectedBooks);
    }

    clearSelections() {
        this.setState({
            selectedBooks : [],
        });
    }

    selectAllBooks() {
        this.setState({
            selectedBooks : this.state.allBooks.map((book, idx) => {
                return book.id
            }),
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
            </div>
        );
    }

}

export default App;
