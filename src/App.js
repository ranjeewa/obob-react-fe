import React, { Component } from 'react';
import './App.css';
import Client from './Client';
import BookList from './BookList';
import Question from "./Question";

class App extends Component {

    state  = {
        allBooks : [],
        questions: [],
    };

    constructor(props) {
        super(props);
        this.loadBooks();
    }

    loadBooks() {
        Client.books(books => {
            this.setState({
                allBooks: books.slice(0),
                questions: [],
            });
        });
    }

    changeSelectedBooks = (books) => {
        Client.questions(books, response => {
            this.setState({
                questions: response.slice(0),
            });
        });
    }

    clearQuestions() {
        this.setState( {
            questions: [],
        });
    }

    render() {

        let title = null;
        let app = null;
        if (this.state.questions.length > 0) {
            title = <p className="App-intro">
                OBOB questions
            </p>;
            app = <Question questions = {this.state.questions}
                            books = {this.state.allBooks}
                            reset = {() => this.clearQuestions()} />;
        } else {
            title = <p className="App-intro">
                OBOB books
            </p>;
            app = <BookList allBooks={this.state.allBooks}
                            changeSelection={this.changeSelectedBooks} />
        }

        return (
            <div className="App">
                {title}
                <div className="ui text container">
                    {app}
                </div>
            </div>
        );
    }

}

export default App;
