import React, { Component } from 'react';


class Question extends Component {

    constructor(props) {
        super(props);

        let nextQ = Question.getRandomNumber(this.props.questions.length);
        this.state = {
            showAnswer: false,
            nextQuestion: this.props.questions[nextQ],
            questions : this.props.questions.splice(nextQ, 1),
        };
    }

    static getRandomNumber(n) {
        return Math.floor(Math.random() * n);
    }

    chooseNextQuestion() {
        let numQuestions = this.state.questions.length;
        if (numQuestions > 0) {
            let nextQuestionId = Question.getRandomNumber(numQuestions);
            this.setState( {
                nextQuestion : this.props.questions[nextQuestionId],
                questions : this.props.questions.splice(nextQuestionId, 1),
                showAnswer : false,
            });
        } else {
            this.setState({
                nextQuestion: null,
            });
        }
    }

    showAnswer() {
        this.setState( {
            showAnswer: !this.state.showAnswer,
        });
    }

    render() {
        let question = null;
        let answer = null;

        let questionPanel = null;

        if (this.state.nextQuestion) {
            question = this.state.nextQuestion;
            questionPanel =
                <div className="ui one column grid">
                    <div className="left floated one column row">{question.question}</div>
                </div>;
            if (this.state.showAnswer) {
                answer =
                    <div id="answer">
                        <div className="ui two column grid">
                            <div className="left floated two column row">{question.answer}</div>
                            <div className="column">{this.props.books[question.bookId - 1].name}</div>
                            <div className="column">Page {question.pageNumber}</div>
                        </div>
                        <div className="Button-row">
                            <button className="ui primary button" onClick={() => this.chooseNextQuestion()}>
                                Next Question
                            </button>
                            <button className="ui primary button" onClick={() => this.showBooks()}>
                                Back to Books
                            </button>
                        </div>
                    </div>
            } else {
                answer =
                    <div className="Button-row">
                        <button className="ui primary button" onClick={() => this.showAnswer()}>
                            Show Answer
                        </button>
                    </div>
            }
        } else {
            //no more questions
            answer =
                <div className="Button-row">
                    <button className="ui primary button" onClick={() => this.showBooks()}>
                        Back to Books
                    </button>
                </div>;
        }

        return (
            <div id="question">
                {questionPanel}
                {answer}
            </div>
        );
    }
}

export default Question;