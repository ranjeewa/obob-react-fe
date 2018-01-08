import React, { Component } from 'react';


class Question extends Component {

    constructor(props) {
        super(props);

        let nextQ = Question.getRandomNumber(this.props.questions.length);
        this.props.questions.splice(nextQ, 1);
        this.state = {
            nextQuestion: this.props.questions[nextQ],
            questions : this.props.questions,
            showAnswer: false,
            numCorrect: 0,
            numAsked: 0,
            totalQuestions: this.props.questions.length + 1,
        };
    }

    static getRandomNumber(n) {
        return Math.floor(Math.random() * n);
    }

    markCorrect() {
        this.setState( {
            numCorrect: ++this.state.numCorrect,
        });
        this.chooseNextQuestion();
    }

    chooseNextQuestion() {
        this.setState( {
            numAsked: ++this.state.numAsked,
        });

        let numQuestions = this.state.questions.length;
        if (numQuestions > 0) {
            let nextQuestionId = Question.getRandomNumber(numQuestions);
            let nextQ = this.state.questions[nextQuestionId];
            this.state.questions.splice(nextQuestionId, 1)
            this.setState( {
                nextQuestion : nextQ,
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
        let answerPanel = null;
        let questionPanel = null;

        if (this.state.nextQuestion) {
            question = this.state.nextQuestion;
            questionPanel =
                <div className="ui one column grid">
                    <div className="left floated one column row"><div className="ui horizontal label">Book</div>  {this.props.books[question.bookId - 1].name}</div>

                    <div className="left floated one column row">
                        <div className="ui horizontal label">Q:</div>
                        {question.question}
                        </div>
                </div>;
            if (this.state.showAnswer) {
                answerPanel =
                    <div id="answer">
                        <div className="Button-row">
                            <button className="negative ui button" onClick={() => this.chooseNextQuestion()}>
                                I got it wrong!
                            </button>
                            <button className="positive ui button" onClick={() => this.markCorrect()}>
                                I got it right!
                            </button>
                            <button className="ui button" onClick={() => this.props.reset()}>
                                Back to Books
                            </button>
                        </div>
                        <div className="ui one column grid">
                            <div className="left floated one column row">
                                <div className="ui horizontal label">A:</div>
                                {question.answer}
                                </div>

                            {question.chapter &&
                            <div className="left floated one column row">
                                <div className="ui horizontal label">Chapter</div>
                                {question.chapter}</div>
                            }
                            {question.pageNumber &&
                            <div className="left floated one column row">
                                <div className="ui horizontal label">Page</div>
                                {question.pageNumber}</div>
                            }

                        </div>
                    </div>
            } else {
                answerPanel =
                    <div className="Button-row">
                        <button className="ui button" onClick={() => this.showAnswer()}>
                            Show Answer
                        </button>
                    </div>
            }
        } else {
            //no more questions
            answerPanel =
                <div className="Button-row">
                    <button className="ui primary button" onClick={() => this.props.reset()}>
                        Back to Books
                    </button>
                </div>;
        }

        let statsPanel =
            <div>
                Score so far : {this.state.numCorrect} of {this.state.numAsked}<br />
                Total questions : {this.state.totalQuestions}
            </div>

        return (
            <div id="question">
                {questionPanel}
                {answerPanel}
                {statsPanel}
            </div>
        );
    }
}

export default Question;